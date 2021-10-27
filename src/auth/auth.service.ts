import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsuarioService } from 'src/user/usuario.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/user/dto/login.dto';
import { TokenService } from 'src/token/token.service';
import { Usuario } from 'src/user/models/usuario.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
    private tokenService: TokenService,
  ) {}

  async validarUsuario(email: string, senha: string): Promise<any> {
    const usuario = await this.usuarioService.getByEmail(email);
    if (usuario && bcrypt.compareSync(senha, usuario.password)) {
      const { password, ...result } = usuario;
      return result;
    }
    return null;
  }

  async login(user: LoginDto) {
    const payload = { username: user.username, sub: user.password };
    const token = this.jwtService.sign(payload);
    this.tokenService.save(token, user.username);
    return {
      access_token: token,
    };
  }

  async loginToken(token: string) {
    const usuario: Usuario = await this.tokenService.getUsuarioByToken(token);
    if (usuario) {
      return this.login({
        username: usuario.email,
        password: usuario.password,
      });
    } else {
      return new HttpException(
        {
          errorMessage: 'Token inválido',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
