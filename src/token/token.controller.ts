import { Body, Controller, Put } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { RefreshTokenDto } from './dto/refresh.token.dto';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
  constructor(private tokenService: TokenService) {}

  @ApiCreatedResponse({
    type: RefreshTokenDto,
  })
  @Put('refresh')
  async refreshToken(@Body() data: RefreshTokenDto) {
    return this.tokenService.refreshToken(data.oldToken);
  }
}
