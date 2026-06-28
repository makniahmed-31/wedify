import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ThrottlerModule } from "@nestjs/throttler";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { VendorsModule } from "./modules/vendors/vendors.module";
import { ServicesModule } from "./modules/services/services.module";
import { BookingsModule } from "./modules/bookings/bookings.module";
import { ReviewsModule } from "./modules/reviews/reviews.module";
import { SubscriptionsModule } from "./modules/subscriptions/subscriptions.module";
import { SearchModule } from "./modules/search/search.module";
import { SeoModule } from "./modules/seo/seo.module";
import { AnalyticsModule } from "./modules/analytics/analytics.module";
import { AdminModule } from "./modules/admin/admin.module";
import { NotificationsModule } from "./modules/notifications/notifications.module";
import { MarketplaceModule } from "./modules/marketplace/marketplace.module";
import { BlogModule } from "./modules/blog/blog.module";

@Module({
  controllers: [AppController],
  imports: [
    // Config
    ConfigModule.forRoot({ isGlobal: true }),

    // Database
    TypeOrmModule.forRoot({
      type: "postgres",
      url: process.env.DATABASE_URL,
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: process.env.NODE_ENV !== "production",
      logging: false,
      ssl: false,
    }),

    // Rate limiting: 100 requests per 60 seconds globally
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),

    // Feature modules
    AuthModule,
    UsersModule,
    VendorsModule,
    ServicesModule,
    BookingsModule,
    ReviewsModule,
    SubscriptionsModule,
    SearchModule,
    SeoModule,
    AnalyticsModule,
    AdminModule,
    NotificationsModule,
    MarketplaceModule,
    BlogModule,
  ],
})
export class AppModule {}
