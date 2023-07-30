import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { join } from 'path';
import { readFile } from 'fs/promises';
import { load } from 'js-yaml';
import { UsersModule } from './user/user.module';
import { ArtistsModule } from './artists/artists.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const apiPath = join(__dirname, '..', 'doc/api.yaml');
  const apiYaml = await readFile(apiPath, 'utf-8');

  const config: OpenAPIObject = load(apiYaml) as OpenAPIObject;
  const document = SwaggerModule.createDocument(app, config, {
    include: [UsersModule, ArtistsModule],
  });

  SwaggerModule.setup('docs', app, document);

  await app.listen(4000);
  console.log('Server starts at http://localhost:4000');
  console.log('Docs at http://localhost:4000/docs');
}
bootstrap();
