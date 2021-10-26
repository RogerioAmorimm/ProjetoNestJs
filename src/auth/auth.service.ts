import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsuarioService } from 'src/user/usuario.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async validarUsuario(email: string, senha: string): Promise<any> {
    const usuario = await this.usuarioService.getByEmail(email);
    if (usuario && bcrypt.compareSync(senha, usuario.password)) {
      const { password, ...result } = usuario;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);
    // this.tokenService.save(token, user.email);
    return {
      access_token: token,
    };
  }

  // async loginToken(token: string) {
  //   // const usuario: Usuario = await this.tokenService.getUsuarioByToken(token);
  //   if (usuario) {
  //     return this.login(usuario);
  //   } else {
  //     return new HttpException(
  //       {
  //         errorMessage: 'Token inválido',
  //       },
  //       HttpStatus.UNAUTHORIZED,
  //     );
  //   }
  // }
}
