import { Body, Controller, HttpException, Put } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { ApiController } from 'src/commons/api/api.controller';
import { CustomResponse } from 'src/commons/api/custom.response';
import { RefreshTokenDto } from './dto/refresh.token.dto';
import { Token } from './model/token.model';
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
  async refreshToken(
    @Body() data: RefreshTokenDto,
  ): Promise<CustomResponse<Token | HttpException>> {
    return this.response(await this.tokenService.refreshToken(data.oldToken));
  }
}
