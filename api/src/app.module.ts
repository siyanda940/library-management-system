
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { GenresModule } from './genres/genres.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    PrismaModule,
    GenresModule,
    BooksModule,
  ],
})
export class AppModule {}
