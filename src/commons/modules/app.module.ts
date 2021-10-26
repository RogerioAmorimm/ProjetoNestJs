import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { UsuarioModule } from 'src/user/user.module';
//SUBISTITUA AQUI A STRING DE CONEXÃO
const connection_string = '';

@Module({
  imports: [
    MongooseModule.forRoot(connection_string),
    UsuarioModule,
    AuthModule,
  ],
})
export class AppModule {}
