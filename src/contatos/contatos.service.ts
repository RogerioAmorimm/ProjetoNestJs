import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario } from 'src/user/models/usuario.model';
import { ContatoCadastrarDto } from './dto/contato.cadastrar.dto';
import { Contato } from './models/contato.model';

@Injectable()
export class ContatosService {
  constructor(
    @InjectModel(Contato.name) private readonly contatoContext: Model<Contato>,
  ) {}

  async listaTodosPorId(usuarioId: string): Promise<Contato[]> {
    return this.contatoContext.find({ usuario: usuarioId }).exec();
  }
  async listaTodos(): Promise<Contato[]> {
    const teste = await this.contatoContext
      .find()
      .sort({ nome: 'asc' })
      .populate('usuarios')
      .exec();
    return teste;
  }
  async cadastro(contato: ContatoCadastrarDto) {
    const novoContato = new this.contatoContext({
      nome: contato.nome,
      foto: contato.urlFoto,
      usuario: contato.usuarioId,
    });
    await novoContato.save();
  }
}
