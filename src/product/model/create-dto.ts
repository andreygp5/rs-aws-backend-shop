import { IsInt, Min, IsString } from 'class-validator'

export class CreateProductDto {
  @IsString()
    title: string

  @IsString()
    description: string

  @IsInt()
  @Min(0)
    price: number

  @IsInt()
  @Min(0)
    count: number

  @IsString({ each: true })
    images : string[]
}
