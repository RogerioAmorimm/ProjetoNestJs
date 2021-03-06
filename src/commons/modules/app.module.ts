import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { ContatosModule } from 'src/contatos/contatos.module';
import { MensagensModule } from 'src/mensagens/mensagens.module';
import { TokenModule } from 'src/token/token.module';
import { UsuarioModule } from 'src/user/user.module';
//SUBISTITUA AQUI A STRING DE CONEXÃO
const connection_string = 'mongodb://hiper-dev:123456@localhost:27017/admin';

@Module({
  imports: [
    MongooseModule.forRoot(connection_string),
    UsuarioModule,
    AuthModule,
    MensagensModule,
    ContatosModule,
    TokenModule,
  ],
})
export class AppModule {}
