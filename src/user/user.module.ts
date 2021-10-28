import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { TokenModule } from 'src/token/token.module';
import { Usuario } from './models/usuario.model';
import { UsuarioSchema } from './models/usuario.schema';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Usuario.name, schema: UsuarioSchema }]),
    forwardRef(() => AuthModule),
    forwardRef(() => TokenModule),
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
