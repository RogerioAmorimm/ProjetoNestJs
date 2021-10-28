import { Module } from '@nestjs/common';
import { ContatosService } from './contatos.service';
import { ContatosController } from './contatos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Contato } from './models/contato.model';
import { contatoSchema } from './models/contato.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Contato.name, schema: contatoSchema }]),
  ],
  providers: [ContatosService],
  controllers: [ContatosController],
  exports: [ContatosService],
})
export class ContatosModule {}
