import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';

@Module({
  imports: [UsersModule, ArtistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
