import { Injectable } from '@nestjs/common';
import { UsuarioCadastrarDto } from './dto/usuario.cadastrar.dto';
import { Usuario } from './models/usuario.model';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { TokenService } from 'src/token/token.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel(Usuario.name) private readonly usuarioContext: Model<Usuario>,
    private tokenContext: TokenService,
    private jwtService: JwtService,
  ) {}

  async listar(): Promise<Usuario[]> {
    return this.usuarioContext.find().exec();
  }

  async cadastrar(data: UsuarioCadastrarDto) {
    const usuario = new this.usuarioContext();
    usuario.email = data.email;
    usuario.nome = data.nome;
    usuario.password = bcrypt.hashSync(data.senha, 8);
    const token = this.jwtService.sign({
      username: data.email,
      sub: data.senha,
    });
    await this.tokenContext.save(token, data.email);
    usuario.token = token;
    await usuario.save();
  }

  async getByEmail(email: string): Promise<Usuario | undefined> {
    return this.usuarioContext.findOne({ email: email }).exec();
  }
  async atualizarLogin(usuario: Usuario) {
    await this.usuarioContext.updateOne({ _id: usuario._id }, usuario);
  }
}
