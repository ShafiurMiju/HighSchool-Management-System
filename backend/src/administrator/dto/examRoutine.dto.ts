import { IsNotEmpty, IsDateString } from 'class-validator';

export class ExamRoutineDTO {
  @IsNotEmpty({ message: 'Class ID is required' })
  Class: number;

  @IsNotEmpty({ message: 'Section ID is required' })
  Section: number;

  @IsNotEmpty({ message: 'Exam ID is required' })
  Exam: number;

  File: string;

  @IsNotEmpty({ message: 'Date is required' })
  Date: Date;
}
