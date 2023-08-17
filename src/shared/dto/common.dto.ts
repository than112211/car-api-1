import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { PAGINATION } from 'src/constant/constant.common';

export class QueryPaginationDto {
  @IsOptional()
  currentPage: number;

  @IsOptional()
  itemsPerPage: number;
}
