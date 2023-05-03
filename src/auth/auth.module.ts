import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.auth';
import { RefreshTokenStrategy } from './refreshToken.strategy';
import { UsersModule } from 'src/users/users.module';
@Module({
  imports: [JwtModule.register({
  }),UsersModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, RefreshTokenStrategy],
})
export class AuthModule {}