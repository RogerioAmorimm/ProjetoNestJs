import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { Usuario } from 'src/user/models/usuario.model';
import { UsuarioService } from 'src/user/usuario.service';
import { Token } from './model/token.model';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token.name) private readonly tokenContext: Model<Token>,
    private usuarioService: UsuarioService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async save(hash: string, email: string) {
    const objToken = await this.tokenContext.findOne({ email: email }).exec();
    if (objToken) {
      this.tokenContext.updateOne({ _id: objToken.id }, objToken).exec();
    } else {
      const newToken = new this.tokenContext({
        hash: hash,
        email: email,
      });
      await newToken.save();
    }
  }

  async refreshToken(oldToken: string) {
    const objToken = await this.tokenContext.findOne({ hash: oldToken }).exec();
    if (objToken) {
      const usuario = await this.usuarioService.getByEmail(objToken.email);
      return this.authService.login({
        username: usuario.email,
        password: usuario.password,
      });
    } else {
      //é uma requisição inválida
      return new HttpException(
        {
          errorMessage: 'Token inválido',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async getUsuarioByToken(token: string): Promise<Usuario> {
    token = token.replace('Bearer ', '').trim();
    const objToken = await this.tokenContext.findOne({ hash: token }).exec();
    if (objToken) {
      const usuario = await this.usuarioService.getByEmail(objToken.email);
      return usuario;
    } else {
      //é uma requisição inválida
      return null;
    }
  }
}
