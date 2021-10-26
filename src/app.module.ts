import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonsModule } from './commons/commons.module';

const connection = '';

@Module({
  imports: [
    AuthModule,
    UsuarioModule,
    MongooseModule.forRoot(connection),
    CommonsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
