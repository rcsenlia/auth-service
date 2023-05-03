import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RefreshTokenGuard } from './refreshToken.guard';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto)
    if(createUserDto.username == null){
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'username not found',
      }, HttpStatus.FORBIDDEN,);
    }
    if(createUserDto.password == null){
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'password not found',
      }, HttpStatus.FORBIDDEN,);
    }
    return this.authService.signUp(createUserDto);
  }

  @Post('signin')
  signin(@Body() data: AuthDto) {
    return this.authService.signIn(data);
  }
  @UseGuards(JwtAuthGuard)
  @Get('logout')
  logout(@Req() req: Request) {
    this.authService.logout(req.user['sub']);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
  return this.authService.refreshTokens(userId, refreshToken);
}
@UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Req() req: Request) {
    return req.user;
  }
}