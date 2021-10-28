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
    @Inject(forwardRef(() => UsuarioService))
    private usuarioService: UsuarioService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async save(hash: string, email: string) {
    const objToken = await this.tokenContext.findOne({ email: email }).exec();
    if (objToken) {
      objToken.hash = hash;
      await this.tokenContext.updateOne({ _id: objToken._id }, objToken).exec();
    } else {
      const novoToken = new this.tokenContext({
        hash: hash,
        email: email,
      });
      await novoToken.save();
    }
  }

  async refreshToken(oldToken: string): Promise<Token | HttpException> {
    const objToken = await this.tokenContext.findOne({ hash: oldToken }).exec();
    if (objToken) {
      let usuario = await this.usuarioService.getByEmail(objToken.email);
      usuario = await this.authService.login({
        username: usuario.email,
        password: usuario.password,
      });
      return await this.tokenContext.findOne({ hash: usuario.token }).exec();
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
