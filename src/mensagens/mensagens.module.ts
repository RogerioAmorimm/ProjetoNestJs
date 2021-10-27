import { Module } from '@nestjs/common';
import { MensagensService } from './mensagens.service';

@Module({
  providers: [MensagensService]
})
export class MensagensModule {}
