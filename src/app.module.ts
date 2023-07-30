import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';

@Module({
  imports: [UsersModule, ArtistsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
