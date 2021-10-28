import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiController } from 'src/commons/api/api.controller';
import { CustomResponse } from 'src/commons/api/custom.response';
import { ContatosService } from './contatos.service';
import { ContatoCadastrarDto } from './dto/contato.cadastrar.dto';
import { Contato } from './models/contato.model';

@Controller(Contato.name)
export class ContatosController extends ApiController {
  constructor(private readonly contatoService: ContatosService) {
    super();
  }

  @UseGuards(JwtAuthGuard)
  @Get('listarTodos/:usuarioId')
  async listarTodos(usuarioId: string): Promise<CustomResponse<Contato[]>> {
    return this.response(await this.contatoService.listaTodosPorId(usuarioId));
  }

  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    type: ContatoCadastrarDto,
  })
  @Post('cadastrar')
  async cadastrar(@Body() contato: ContatoCadastrarDto) {
    await this.contatoService.cadastro(contato);
  }

  @UseGuards(JwtAuthGuard)
  @Get('listarTodos')
  async listar(): Promise<CustomResponse<Contato[]>> {
    return this.response(await this.contatoService.listaTodos());
  }
}
