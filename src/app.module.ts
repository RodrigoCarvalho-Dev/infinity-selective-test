import { Module } from '@nestjs/common';
import { UserController } from './modules/user/controllers/user.controller';
import { UserService } from './modules/user/services/user.service';

@Module({
  imports: [],
  controllers: [ UserController ],
  providers: [ UserService ],
})
export class AppModule {}
