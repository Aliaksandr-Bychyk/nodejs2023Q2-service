import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { FavoritesModule } from './favorites/favorites.module';
import { LoggingService } from './logging/logging.service';
import { LoggingMiddleware } from './logging/logging.middleware';
import { APP_FILTER } from '@nestjs/core';
import { LoggingFilter } from './logging/logging.filter';

@Module({
  imports: [
    UserModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    LoggingService,
    {
      provide: APP_FILTER,
      useClass: LoggingFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
