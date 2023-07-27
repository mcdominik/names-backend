import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { InquiriesModule } from './inquiries/inquiries.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ApiProxyModule } from './api-proxy/api-proxy.module';

@Module({
  imports: [ApiProxyModule]
})
export class AppModule {
  static forRoot(options?: {
    mongoHost?: string;
    mongoPassword?: string;
  }): DynamicModule {
    return {
      module: AppModule,
      imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(
          `mongodb+srv://admin:${
            options?.mongoPassword ?? process.env.MONGO_PASSWORD
          }@${options?.mongoHost ?? process.env.MONGO_HOST}/admin`,
          { dbName: 'names' },
        ),
        InquiriesModule,
        UsersModule,
        AuthModule,
      ],
    };
  }
}
