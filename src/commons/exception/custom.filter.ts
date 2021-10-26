import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { CustomResponse } from '../api/custom.response';
import { CustomException } from './custom.exception';

@Catch(CustomException)
export class CustomFilter implements ExceptionFilter {
  catch(exception: CustomException, host: ArgumentsHost) {
    const responseHttp = host.switchToHttp().getResponse();
    return responseHttp
      .status(400)
      .json(
        CustomResponse.fromValidationErros(
          exception.validationErrors.map((ex) => ex.message),
        ),
      );
  }
}
