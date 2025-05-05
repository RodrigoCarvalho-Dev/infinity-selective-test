import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@supabase/supabase-js';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async GetUsernameByParam(username: string) {
    const profile = await this.prismaService.profile.findUnique({
      where: {
        username: username,
      },
    });

    return profile;
  }

  async ProfileFollowed(currentUser: User, usernameToFollow: string) {
    // Busca os perfis em paralelo para melhor performance
    const [followerProfile, targetProfile] = await Promise.all([
      this.prismaService.profile.findUnique({
        where: { userId: currentUser.id },
      }),
      this.prismaService.profile.findUnique({
        where: { username: usernameToFollow },
      }),
    ]);

    // Validações básicas
    if (!followerProfile || !targetProfile) {
      throw new NotFoundException('User not found');
    }

    if (followerProfile.username === targetProfile.username) {
      throw new BadRequestException('You cannot follow yourself');
    }

    // Verifica se já está seguindo usando userId para maior precisão
    if (followerProfile.following.includes(targetProfile.username)) {
      throw new BadRequestException('You are already following this user');
    }

    // Executa as atualizações em transação atômica
    await this.prismaService.$transaction([
      this.prismaService.profile.update({
        where: { userId: followerProfile.userId },
        data: {
          following: { push: targetProfile.username },
          updatedAt: new Date(),
        },
      }),
      this.prismaService.profile.update({
        where: { userId: targetProfile.userId },
        data: {
          followers: { push: followerProfile.username },
          updatedAt: new Date(),
        },
      }),
    ]);

    return { currentUser: followerProfile, userToFollow: targetProfile };
  }

  async ProfileUnfollowed(user: User, username: string) {
    const [currentProfile, targetProfile] = await Promise.all([
      this.prismaService.profile.findUnique({ where: { userId: user.id } }),
      this.prismaService.profile.findUnique({ where: { username } }),
    ]);

    // Validações básicas
    if (!currentProfile || !targetProfile) {
      throw new NotFoundException('User not found');
    }
    if (currentProfile.username === targetProfile.username) {
      throw new BadRequestException('Cannot unfollow yourself');
    }
    if (!currentProfile.following.includes(targetProfile.username)) {
      throw new BadRequestException('Not following this user');
    }

    // Executa o unfollow em transação
    try {
      await this.prismaService.$transaction([
        this.prismaService.profile.update({
          where: { userId: currentProfile.userId },
          data: {
            following: currentProfile.following.filter(
              (username) => username !== targetProfile.username,
            ),
            updatedAt: new Date(),
          },
        }),
        this.prismaService.profile.update({
          where: { userId: targetProfile.userId },
          data: {
            followers: targetProfile.followers.filter(
              (username) => username !== currentProfile.username,
            ),
            updatedAt: new Date(),
          },
        }),
      ]);

      return { currentProfile: currentProfile, userToUnfollow: targetProfile };
    } catch (error) {
      throw new BadRequestException(
        `Unfollow operation failed, error : ${error}`,
      );
    }
  }
}
