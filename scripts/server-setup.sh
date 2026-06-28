#!/bin/bash
# Run once on the server as root to create a non-root deploy user.
# After this script runs, disable root SSH login.
set -e

DEPLOY_USER=deploy
DEPLOY_HOME=/home/$DEPLOY_USER
APP_DIR=/var/www/wedify

echo "==> Creating deploy user..."
id $DEPLOY_USER &>/dev/null || useradd -m -s /bin/bash $DEPLOY_USER

echo "==> Adding deploy user to www-data group..."
usermod -aG www-data $DEPLOY_USER

echo "==> Setting up SSH key auth for deploy user..."
mkdir -p $DEPLOY_HOME/.ssh
chmod 700 $DEPLOY_HOME/.ssh

# Copy your local public key: ssh-copy-id deploy@<server-ip>
# Or paste it manually:
# echo "ssh-rsa AAAA..." >> $DEPLOY_HOME/.ssh/authorized_keys
chmod 600 $DEPLOY_HOME/.ssh/authorized_keys 2>/dev/null || true
chown -R $DEPLOY_USER:$DEPLOY_USER $DEPLOY_HOME/.ssh

echo "==> Granting deploy user ownership of app directory..."
mkdir -p $APP_DIR
chown -R $DEPLOY_USER:$DEPLOY_USER $APP_DIR

echo "==> Allowing deploy user to manage PM2 via sudo (no password)..."
cat > /etc/sudoers.d/deploy-pm2 <<EOF
$DEPLOY_USER ALL=(ALL) NOPASSWD: /usr/bin/pm2, /usr/local/bin/pm2
EOF
chmod 440 /etc/sudoers.d/deploy-pm2

echo "==> Allowing deploy user to reload nginx via sudo (no password)..."
cat > /etc/sudoers.d/deploy-nginx <<EOF
$DEPLOY_USER ALL=(ALL) NOPASSWD: /usr/sbin/nginx
EOF
chmod 440 /etc/sudoers.d/deploy-nginx

echo ""
echo "==> Done. Next steps:"
echo "  1. Copy your SSH public key:  ssh-copy-id deploy@$(hostname -I | awk '{print $1}')"
echo "  2. Test login:                ssh deploy@$(hostname -I | awk '{print $1}')"
echo "  3. Disable root SSH login:    edit /etc/ssh/sshd_config → PermitRootLogin no"
echo "  4. Restart SSH:               systemctl restart sshd"
echo "  5. Update deploy.sh remote:   ssh deploy@<ip> instead of root@<ip>"
