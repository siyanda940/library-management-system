import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class GenresService {
  constructor(private prisma: PrismaService) {}

  async create(createGenreDto: CreateGenreDto) {
    try {
      return await this.prisma.genre.create({
        data: createGenreDto,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Genre already exists');
      }
      throw error;
    }
  }

  async findAll() {
    return this.prisma.genre.findMany({
      include: { books: true },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    const genre = await this.prisma.genre.findUnique({
      where: { id },
      include: { books: true },
    });

    if (!genre) {
      throw new NotFoundException('Genre not found');
    }

    return genre;
  }

  async update(id: string, updateGenreDto: UpdateGenreDto) {
    try {
      return await this.prisma.genre.update({
        where: { id },
        data: updateGenreDto,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Genre not found');
        }

        if (error.code === 'P2002') {
          throw new ConflictException('Genre already exists');
        }
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.genre.delete({
        where: { id },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Genre not found');
        }

        if (error.code === 'P2003') {
          throw new ConflictException(
            'Cannot delete a genre that has books assigned to it',
          );
        }
      }
      throw error;
    }
  }
}