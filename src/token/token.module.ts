import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { UsuarioModule } from 'src/user/user.module';
import { Token } from './model/token.model';
import { tokenSchema } from './model/token.schema';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: tokenSchema }]),
    forwardRef(() => AuthModule),
    UsuarioModule,
  ],
  controllers: [TokenController],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
