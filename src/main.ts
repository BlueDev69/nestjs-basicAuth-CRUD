import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // const document = SwaggerModule.createDocument(
  //   app,
  //   new DocumentBuilder()
  //     .setVersion('0.0.1')
  //     .setTitle('ROY DEE APP API')
  //     .setDescription('API for ROY-DEE-APP')
  //     .addBearerAuth()
  //     .build(),
  // );
  // SwaggerModule.setup('swagger', app, document);
  const config = new DocumentBuilder()
    .setTitle('ROY DEE APP API')
    .setDescription('The Roy Dee App API description')
    .setVersion('1.0')
    // .addTag('mos')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  app.setGlobalPrefix('api/v1');
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
