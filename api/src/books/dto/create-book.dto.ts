import {
  IsString,
  IsNotEmpty,
  IsISBN,
  IsInt,
  Min,
  IsOptional,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsISBN()
  isbn: string;

  @IsInt()
  @Min(0)
  totalCopies: number;

  @IsString()
  @IsNotEmpty()
  genreId: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  publishedAt?: number;
}