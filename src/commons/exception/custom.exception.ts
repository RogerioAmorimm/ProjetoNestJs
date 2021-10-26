import { BadRequestException } from '@nestjs/common';

interface Error {
  error: string;
  message: string;
}
export class CustomException extends BadRequestException {
  constructor(public validationErrors: Error[]) {
    super();
  }
}
