import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { join } from 'path';
import { readFile } from 'fs/promises';
import { load } from 'js-yaml';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { FavoritesModule } from './favorites/favorites.module';
import { config } from 'dotenv';

config();
const port = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const apiPath = join(__dirname, '..', 'doc/api.yaml');
  const apiYaml = await readFile(apiPath, 'utf-8');

  const config: OpenAPIObject = load(apiYaml) as OpenAPIObject;
  const document = SwaggerModule.createDocument(app, config, {
    include: [
      UserModule,
      ArtistModule,
      AlbumModule,
      TrackModule,
      FavoritesModule,
    ],
  });

  SwaggerModule.setup('docs', app, document);

  await app.listen(port);
  console.log(`Server starts at http://localhost:${port}`);
  console.log(`Docs at http://localhost:${port}/docs`);
}
bootstrap();
