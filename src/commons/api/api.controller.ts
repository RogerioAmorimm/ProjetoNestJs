import { CustomResponse } from './custom.response';

export abstract class ApiController {
  public response<T>(data: T) {
    return CustomResponse.fromSuccess<T>(data);
  }
}
