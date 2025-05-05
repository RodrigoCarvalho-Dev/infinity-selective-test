import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { SupabaseService } from 'src/modules/supabase/services/supabase.service';
import { RegisterDto } from '../dto/register.dto';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly prismaService: PrismaService,
  ) {}

  async register(registerDto: RegisterDto) {
    // em caso de que o código precise ser emcriptado
    // const hashPassword = await bcrypt.hash(registerDto.password, 10);

    const supabase = this.supabaseService.getSupabaseClient();

    if (!supabase) {
      throw new InternalServerErrorException('Error connecting to Supabase');
    }

    const existingUser = await this.prismaService.profile.findUnique({
      where: {
        username: registerDto.username,
      },
    });

    if (existingUser) {
      throw new ConflictException('Error creating user');
    }

    const { data, error } = await supabase.auth.signUp({
      email: registerDto.email,
      password: registerDto.password,
    });

    await this.prismaService.profile.create({
      data: {
        userId: String(data.user?.id),
        username: registerDto.username,
        full_name: registerDto.full_name,
        followers: [],
        following: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    if (error) {
      throw new InternalServerErrorException(error);
    }

    return data;
  }

  async login(loginDto: LoginDto) {
    const { data: userData, error: userError } = await this.supabaseService
      .getSupabaseClient()
      .auth.signInWithPassword({
        email: loginDto.email,
        password: loginDto.password,
      });

    if (userError || !userData) {
      throw new InternalServerErrorException(userError);
    }
    return userData;
  }
}
