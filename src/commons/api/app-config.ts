import { INestApplication } from '@nestjs/common';
import { CustomFilter } from '../exception/custom.filter';

export const appConfig = (app: INestApplication) => {
  app.useGlobalFilters(new CustomFilter());
};
