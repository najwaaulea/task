import { IsString, IsNumber, Min } from 'class-validator';

export class CreateTaskDto {
  @IsNumber()
  productId: number; // Sesuai permintaan soal: productId

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  userId: number;
}