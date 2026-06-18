import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto, LoginDto, RefreshTokenDto, AuthResponseDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async register(dto: RegisterDto): Promise<AuthResponseDto> {
    // TODO: Check for existing user, hash password, persist to DB
    // TODO: Send verification email via NotificationsService
    throw new Error('Not implemented');
  }

  async login(dto: LoginDto): Promise<AuthResponseDto> {
    // TODO: Validate credentials, compare hashed password
    // TODO: Issue access + refresh tokens
    throw new Error('Not implemented');
  }

  async refresh(dto: RefreshTokenDto): Promise<AuthResponseDto> {
    // TODO: Verify refresh token, issue new token pair
    throw new Error('Not implemented');
  }

  async logout(userId: string): Promise<void> {
    // TODO: Invalidate refresh token in DB / cache
  }

  async verifyEmail(token: string): Promise<void> {
    // TODO: Validate email verification token
  }

  async forgotPassword(email: string): Promise<void> {
    // TODO: Generate reset token, send reset email
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    // TODO: Validate token, update hashed password
  }

  private issueTokens(payload: Record<string, any>): AuthResponseDto {
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    return { accessToken, refreshToken, expiresIn: 900 };
  }
}
