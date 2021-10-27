import { ApiProperty } from '@nestjs/swagger';

export class UsuarioCadastrarDto {
  @ApiProperty()
  nome: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  senha: string;
}
