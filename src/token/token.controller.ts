import { Body, Controller, Put } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { ApiController } from 'src/commons/api/api.controller';
import { RefreshTokenDto } from './dto/refresh.token.dto';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController extends ApiController {
  constructor(private tokenService: TokenService) {
    super();
  }

  @ApiBody({
    type: RefreshTokenDto,
  })
  @Put('refresh')
  async refreshToken(@Body() data: RefreshTokenDto) {
    return this.response(this.tokenService.refreshToken(data.oldToken));
  }
}
