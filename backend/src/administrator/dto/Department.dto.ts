import { IsNotEmpty } from 'class-validator';

export class DepartmentDTO {
  @IsNotEmpty({ message: 'Department name is required' })
  DeptName: string;
}
