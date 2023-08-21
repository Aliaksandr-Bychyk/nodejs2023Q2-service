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
import { LoggingService } from './logging/logging.service';
import { AuthModule } from './auth/auth.module';

config();
const port = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const apiPath = join(__dirname, '../..', 'doc/api.yaml');
  const apiYaml = await readFile(apiPath, 'utf-8');

  const config: OpenAPIObject = load(apiYaml) as OpenAPIObject;
  const document = SwaggerModule.createDocument(app, config, {
    include: [
      AuthModule,
      UserModule,
      ArtistModule,
      AlbumModule,
      TrackModule,
      FavoritesModule,
    ],
  });

  SwaggerModule.setup('docs', app, document);

  const loggingService = app.get(LoggingService);

  process
    .on('uncaughtException', (error) => {
      loggingService.logError(`UncaughtException: ${error.message}`);
    })
    .on('unhandledRejection', (error) => {
      loggingService.logError(
        `UnhandledRejection: ${(error as Error).message}`,
      );
    });

  await app.listen(port);
  console.log(`Server starts at http://localhost:${port}`);
  console.log(`Docs at http://localhost:${port}/docs`);
}
bootstrap();
