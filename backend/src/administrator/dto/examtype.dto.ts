import { IsNotEmpty } from "class-validator";

export class examtypeDTO{
    ID: number;

    @IsNotEmpty({message: 'Exam Type name can not be Empty'})
    ExamTypeName: string;
}