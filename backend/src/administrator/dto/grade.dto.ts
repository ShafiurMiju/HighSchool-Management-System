import { IsNotEmpty } from "class-validator";

export class gradeDTO{
    ID: number;

    @IsNotEmpty({message: 'Grade name can not be Empty'})
    GradeNane: string;
}