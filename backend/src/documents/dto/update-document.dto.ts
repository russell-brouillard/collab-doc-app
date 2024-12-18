import { IsOptional, IsString, IsArray } from 'class-validator';

export class UpdateDocumentDto {
  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @IsString()
  readonly content?: string;

  @IsOptional()
  @IsArray()
  readonly collaborators?: string[];

  @IsOptional()
  @IsString()
  readonly owner?: string;
}
