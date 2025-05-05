import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { Public } from 'src/commun/decorators/public.decorator';
import { SupabaseAuthGuard } from '../guards/supabase-auth.guard';
import { AuthService } from '../services/auth.service';
import { User } from 'src/modules/user/decorators/user.decorator';
import { User as UserTypeSupabase } from '@supabase/supabase-js';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ApiOperation({ summary: 'Registro de usuário' })
  @ApiBody({ type: RegisterDto }) 
  @ApiResponse({ status: 200, description: 'efetuado com sucesso.' })
  @Post('register')
  async register(
    @Body()
    body: {
      email: string;
      password: string;
      username: string;
      full_name: string;
    },
    @Res() res: Response,
  ) {
    const data = await this.authService.register({
      email: body.email,
      password: body.password,
      username: body.username,
      full_name: body.full_name,
    });

    if (!data) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'error on register',
        status: HttpStatus.BAD_REQUEST,
      });
    }

    return res.status(HttpStatus.CREATED).json({
      message: 'success on register',
      status: HttpStatus.CREATED,
      id: data.user?.id,
      email: data.user?.email,
      username: body.username,
      full_name: body.full_name,
      confirmationSentAt: data.user?.confirmation_sent_at,
    });
  }

  @ApiOperation({ summary: 'Login de usuário' })
  @ApiBody({ type: LoginDto }) 
  @ApiResponse({ status: 200, description: 'efetuado com sucesso.' })
  @Public()
  @Get('login')
  async login(
    @Body()
    body: {
      email: string;
      password: string;
    },
    @Res() res: Response,
  ) {

    const data = await this.authService.login({
      email: body.email,
      password: body.password,
    });

    if (!data) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'error on login',
        status: HttpStatus.BAD_REQUEST,
      });
    }

    res.cookie('access-token', data.session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      sameSite: 'lax',
      maxAge: data.session.expires_in * 1000,
    });

    return res.status(HttpStatus.OK).json({
      message: 'success on login',
      status: HttpStatus.OK,
      id: data.user?.id,
      email: data.user?.email,
      access_token: data.session.access_token
    });
  }

  @ApiOperation({ summary: 'Pegar usuario autenticado de usuário' })
  @ApiResponse({ status: 200, description: 'efetuado com sucesso.' })
  @Get('me')
  @UseGuards(SupabaseAuthGuard)
  getMe(@User() user: UserTypeSupabase, @Res() res: Response): Response {
    if (!user) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'error on get user',
        status: HttpStatus.UNAUTHORIZED,
      });
    }

    return res.status(HttpStatus.OK).json({
      message: 'success on get user',
      status: HttpStatus.OK,
      user: user,
    });
  }
}
