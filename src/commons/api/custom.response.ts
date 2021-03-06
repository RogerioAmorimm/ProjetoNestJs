export class CustomResponse<T> {
  public sucesso: boolean;
  public errors: string[];
  public data: T;
  constructor(success: boolean, errors: string[], data: T) {
    this.sucesso = success;
    this.errors = errors;
    this.data = data;
  }
  public static fromSuccess<T>(data: T) {
    return new CustomResponse(true, null, data);
  }
  public static fromValidationErros(errors: string[]) {
    return new CustomResponse(false, errors, null);
  }
}
