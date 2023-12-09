import { IsNotEmpty } from "class-validator";

export class SubjectDTO {
  ID: number;

  @IsNotEmpty({ message: 'Department name is required' })
  SubjectName: string;
}
