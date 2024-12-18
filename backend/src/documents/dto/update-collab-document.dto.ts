import { IsArray, IsString } from 'class-validator';

export class UpdateCollaboratorsDto {
  @IsArray()
  @IsString({ each: true })
  collaborators: string[];
}
