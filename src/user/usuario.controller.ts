import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiController } from 'src/commons/api/api.controller';
import { CustomResponse } from 'src/commons/api/custom.response';
import { LoginDto } from './dto/login.dto';
import { UsuarioCadastrarDto } from './dto/usuario.cadastrar.dto';
import { Usuario } from './models/usuario.model';
import { UsuarioService } from './usuario.service';

@Controller(Usuario.name)
export class UsuarioController extends ApiController {
  constructor(
    private readonly usuarioService: UsuarioService,
    private authService: AuthService,
  ) {
    super();
  }

  @UseGuards(JwtAuthGuard)
  @Get('listar')
  async listar(): Promise<CustomResponse<Usuario[]>> {
    return this.response(await this.usuarioService.listar());
  }
  @ApiCreatedResponse({
    type: UsuarioCadastrarDto,
  })
  @Post('cadastrar')
  async cadastrar(@Body() data: UsuarioCadastrarDto) {
    return this.usuarioService.cadastrar(data);
  }

  @ApiCreatedResponse({
    type: LoginDto,
  })
  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Body() dto: LoginDto) {
    return this.response(this.authService.login(dto));
  }

  @Post('login-token')
  async loginToken(@Request() req, @Body() data) {
    return this.response(this.authService.loginToken(data.token));
  }
}
