import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from '../products/products.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmConfigService } from '../../config/config';
import { AuthModule } from '../auth/auth.module';
import { CoreModule } from '../core/core.module';
import { OrderModule } from '../order/order.module';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../..', '/public/img'),
      exclude: ['/api/(.*)'],
      serveRoot: '/img',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../..', '/client'),
      exclude: ['/api/(.*)'],
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    CoreModule,
    ProductsModule,
    AuthModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
