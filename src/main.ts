import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Teste seleção Infinity')
    .setDescription('Api experimental apenas para o teste, muitas coisas podem ser irrelevantes, utilize o README.md. feito para processo de seleção com criação de tabelas e autenticação')
    .setVersion('1.0')
    .addBearerAuth() 
    .build();

  
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document); // http://localhost:3000/api-docs

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err) => {
  console.error(`type of error in the main.ts: ${err}`);
});
