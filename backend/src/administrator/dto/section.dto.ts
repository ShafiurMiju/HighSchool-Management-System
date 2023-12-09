import { IsNotEmpty } from "class-validator";

export class sectionDTO{
    ID:number
    
    @IsNotEmpty({message:"Should not empty"})
    SectionName: string
}