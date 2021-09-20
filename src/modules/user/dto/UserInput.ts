import { IsEmail, Length } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IsEmailAlreadyUsed } from "../IsEmailAlreadyUsed";

@InputType()
export class UserInput {
  @Field()
  @Length(1, 30)
  firstName: string;

  @Field()
  @Length(1, 30)
  lastName: string;

  @Field()
  @IsEmail()
  @IsEmailAlreadyUsed()
  email: string;

  @Field()
  password: string;
}