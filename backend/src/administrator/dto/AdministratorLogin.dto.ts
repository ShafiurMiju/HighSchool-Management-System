import { IsNotEmpty } from "class-validator";

export class AdministratorLoginDTO {
  @IsNotEmpty({message:"Should Not Empty"})
  Email: string;

  @IsNotEmpty({message:"Should Not Empty"})
  Password: string;
}
