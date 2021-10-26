import { Injectable } from '@nestjs/common';
import { UsuarioCadastrarDto } from './dto/usuario.cadastrar.dto';
import { Usuario } from './models/usuario.model';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel(Usuario.name) private readonly usuarioContext: Model<Usuario>,
  ) {}

  async listar(): Promise<Usuario[]> {
    return this.usuarioContext.find().exec();
  }

  async cadastrar(data: UsuarioCadastrarDto) {
    const usuario = new Usuario();
    usuario.email = data.email;
    usuario.nome = data.nome;
    usuario.password = bcrypt.hashSync(data.senha, 8);

    this.usuarioContext.create(usuario);

    // return this.usuarioRepository
    //   .save(usuario)
    //   .then((result) => {
    //     return <ResultadoDto>{
    //       status: true,
    //       mensagem: 'Usuário cadastrado com sucesso',
    //     };
    //   })
    //   .catch((error) => {
    //     return <ResultadoDto>{
    //       status: false,
    //       mensagem: 'Houve um errro ao cadastrar o usuário',
    //     };
    //   });
  }

  async getByEmail(email: string): Promise<Usuario | undefined> {
    return this.usuarioContext.findOne({ email: email }).exec();
  }
}
