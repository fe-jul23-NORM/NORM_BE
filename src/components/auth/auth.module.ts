import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TokenModule } from '../token/token.module';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';

@Module({
  providers: [AuthService, UserService],
  controllers: [AuthController],
  imports: [TypeOrmModule.forFeature([User]), TokenModule],
  exports: [AuthService],
})
export class AuthModule {}
