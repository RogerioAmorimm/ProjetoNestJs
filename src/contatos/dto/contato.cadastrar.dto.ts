import { ApiProperty } from '@nestjs/swagger';

export class ContatoCadastrarDto {
  @ApiProperty()
  nome: string;
  @ApiProperty()
  urlFoto: string;
  @ApiProperty()
  usuarioId: string;
}
