import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { appConfig } from './commons/api/app-config';
import { AppModule } from './commons/modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  appConfig(app);
  const config = new DocumentBuilder()
    .setTitle('Contatos com NestJs')
    .setDescription('Api nestjs para hiper dev')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
