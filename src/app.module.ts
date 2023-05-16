import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeConfigService } from './config/sequelizeConfig.service';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './config/configuration';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AccountsController } from './accounts/accounts.controller';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [
    UsersModule,
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useClass: SequelizeConfigService,
    }),
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
    AuthModule,
    AccountsModule,
  ],
  controllers: [AccountsController],
})
export class AppModule {}
