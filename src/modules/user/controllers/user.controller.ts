import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { Public } from 'src/commun/decorators/public.decorator';
import { SupabaseAuthGuard } from 'src/modules/auth/guards/supabase-auth.guard';
import { User } from '../decorators/user.decorator';
import { User as UserTypeSupabase } from '@supabase/supabase-js';
import { UserService } from '../services/user.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'pegar profile pelo username' })
  @ApiResponse({ status: 200, description: 'efetuado com sucesso.' })
  @Public()
  @Get(':username')
  async getUserByUsername(
    @Param('username') username: string,
    @Res() res: Response,
  ) {
    const profile = await this.userService.GetUsernameByParam(username);

    if (!profile) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'error on get user',
        status: HttpStatus.UNAUTHORIZED,
      });
    }

    return res.status(HttpStatus.OK).json({
      message: 'success on get profile',
      status: HttpStatus.OK,
      ...profile,
      followed_count: profile.followers.length,
      following_count: profile.following.length,
    });
  }

  @ApiOperation({ summary: 'seguir o usuário com username e autenticado' })
  @ApiResponse({ status: 200, description: 'efetuado com sucesso.' })
  @Post('follow/:username')
  @UseGuards(SupabaseAuthGuard)
  async followUser(
    @User() user: UserTypeSupabase,
    @Param('username') username: string,
    @Res() res: Response,
  ) {
    const { currentUser, userToFollow } =
      await this.userService.ProfileFollowed(user, username);

    if (!currentUser || !userToFollow) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'error on get user',
        status: HttpStatus.UNAUTHORIZED,
      });
    }

    return res.status(HttpStatus.OK).json({
      message: 'profile followed',
      status: HttpStatus.OK,
    });
  }

  @Public()
  @ApiOperation({ summary: 'desseguir de usuário e autenticado' })
  @ApiResponse({ status: 200, description: 'efetuado com sucesso.' })
  @Post('unfollow/:username')
  @UseGuards(SupabaseAuthGuard)
  async unfollowUser(
    @User() user: UserTypeSupabase,
    @Param('username') username: string,
    @Res() res: Response,
  ) {
    const { currentProfile, userToUnfollow } =
      await this.userService.ProfileUnfollowed(user, username);

    if (!currentProfile || !userToUnfollow) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'error on get user',
        status: HttpStatus.UNAUTHORIZED,
      });
    }

    return res.status(HttpStatus.OK).json({
      message: 'profile unfollowed',
      status: HttpStatus.OK,
    });
  }
}
