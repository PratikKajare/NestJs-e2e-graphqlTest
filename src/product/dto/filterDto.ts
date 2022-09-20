import { IsIn, IsOptional } from 'class-validator';
import { productFormat } from '../enum/filter.enum';

export class GetProjectFilterDto {
  @IsOptional()
  @IsIn([productFormat.HB, productFormat.SB])
  productFormat: productFormat;
}
