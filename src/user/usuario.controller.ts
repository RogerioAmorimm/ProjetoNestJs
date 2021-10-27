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
import { LoginDto } from './dto/login.dto';
// import { ResultadoDto } from 'src/dto/resultado.dto';
// import { TokenService } from 'src/token/token.service';
import { UsuarioCadastrarDto } from './dto/usuario.cadastrar.dto';
import { Usuario } from './models/usuario.model';
import { UsuarioService } from './usuario.service';

@Controller(Usuario.name)
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService,
    private authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('listar')
  async listar(): Promise<Usuario[]> {
    return await this.usuarioService.listar();
  }
  @ApiCreatedResponse({
    type: UsuarioCadastrarDto,
  })
  @Post('cadastrar')
  async cadastrar(@Body() data: UsuarioCadastrarDto): Promise<void> {
    return this.usuarioService.cadastrar(data);
  }

  @ApiCreatedResponse({
    type: LoginDto,
  })
  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('login-token')
  async loginToken(@Request() req, @Body() data) {
    return this.authService.loginToken(data.token);
  }
}
