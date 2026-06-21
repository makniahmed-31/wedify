CAHIER DES CHARGES COMPLET - BONPLANMARIAGE.TN

1. Résumé Exécutif
   BonPlanMariage.tn est une marketplace SaaS spécialisée dans le mariage en Tunisie. L’objectif est de connecter les futurs mariés avec les prestataires et fournisseurs du secteur grâce à un système de profils professionnels, demandes de devis, abonnements et espaces publicitaires.
2. Objectifs du Projet

- Centraliser l’offre mariage en Tunisie.
- Générer des leads qualifiés.
- Offrir une visibilité premium aux prestataires.
- Devenir la référence SEO du mariage en Tunisie.

3. Business Model
   Revenus issus des abonnements Bronze, Silver et Gold, des bannières sponsorisées, des résultats sponsorisés et des articles sponsorisés.
4. Stack Technique
   Frontend : Next.js
   Backend : NestJS
   Base : PostgreSQL
   ORM : Prisma
   Shadcn
   Stockage : Cloudflare R2/S3
   Authentification : JWT + Refresh Token + google provider
5. Utilisateurs
   Administrateur, Prestataire, Futur Marié.
6. Modules Front Office
   Accueil, catégories, moteur de recherche, fiches prestataires, blog, favoris, comparateur, devis individuels et groupés.
7. Modules Espace Marié
   Gestion du profil, favoris, historique des devis, avis, comparaison des prestataires.
8. Modules Espace Prestataire
   Gestion du profil, médias, offres, promotions, calendrier, statistiques, abonnements, documents de vérification.
9. Modules Administrateur
   Gestion des utilisateurs, prestataires, catégories, publicités, blog, SEO, abonnements, avis et statistiques.
10. Catégories de Lancement
    Salles de fête, photographes, vidéastes, DJ, troupes musicales, décoration, traiteurs, wedding planners, robes de mariée, costumes, maquillage, coiffure, location de voiture, meubles, électroménager, cuisine, literie et cadeaux.
11. Gestion des Prestataires
    Un établissement par défaut. Multi-établissements selon le pack. Validation obligatoire par l’administrateur.
12. Vérification des Comptes
    CIN, registre de commerce, matricule fiscal, validation manuelle et badge vérifié.
13. Gestion des Médias
    Galeries photos, vidéos, image de couverture, logo, limitation selon le pack.
14. Gestion des Offres et Promotions
    Chaque prestataire peut publier des offres commerciales et promotions temporaires.
15. Gestion des Disponibilités
    Calendrier de disponibilités pour salles et prestataires selon le pack souscrit.
16. Workflow de Demande de Devis
    Le marié remplit un formulaire. Notification email et dashboard. Suivi des statuts : Nouveau, Vu, En discussion, Accord trouvé, Refusé, Clôturé.
17. Demandes de Devis Groupées
    Possibilité d’envoyer la même demande à plusieurs prestataires sélectionnés.
18. Favoris
    Sauvegarde des prestataires, offres et produits pour consultation ultérieure.
19. Comparateur
    Comparaison des prestataires selon prix, services, localisation et avis.
20. Gestion des Avis
    Avis uniquement après prestation validée. Note sur 5 étoiles et réponse du prestataire.
21. Packs d’Abonnement
    Bronze : 25 DT/mois ou 250 DT/an
    Silver : 50 DT/mois ou 500 DT/an
    Gold : 75 DT/mois ou 750 DT/an
22. Gestion des Expirations
    Notifications J-30, J-15, J-7, J-3 et J-1. Période de grâce de 15 jours.
23. Publicités
    Bannière accueil, bannière catégorie, résultats sponsorisés et articles sponsorisés avec validation administrateur.
24. Blog SEO
    Rédaction exclusivement par l’administrateur. Guides, conseils, budgets, classements et actualités.
25. SEO
    URLs optimisées, méta données, sitemap XML, Schema.org, Open Graph, pages villes/catégories.
26. Statistiques Prestataires
    Vues profil, clics téléphone, clics WhatsApp, demandes reçues, performances des offres.
27. Statistiques Administrateur
    Nombre de prestataires, abonnements actifs, revenus, demandes de devis, trafic et performances SEO.
28. Sécurité
    JWT, permissions par rôle, validation serveur, protection contre le spam et sauvegardes automatiques.
29. Structure Base de Données
    Users, Providers, Categories, Establishments, Packages, Subscriptions, Quotes, Reviews, Ads, BlogPosts, Media, Promotions, Favorites.
30. Roadmap V2
    Application mobile, arabe/anglais, géolocalisation avancée, IA, gestion budget mariage, liste de mariage et planning mariage.
31. Estimation de Développement
    Phase analyse, conception UX/UI, développement frontend, backend, administration, SEO, tests, déploiement et documentation.
32. Conclusion
    BonPlanMariage.tn a vocation à devenir la plateforme de référence du mariage en Tunisie grâce à un modèle SaaS évolutif et fortement optimisé pour le SEO.
