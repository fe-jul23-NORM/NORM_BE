import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from '../../entities/token.entity';

@Module({
  controllers: [],
  providers: [TokenService],
  imports: [
    TypeOrmModule.forFeature([Token]),
    TokenModule,
    JwtModule.register({
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  exports: [TokenService],
})
export class TokenModule {}
