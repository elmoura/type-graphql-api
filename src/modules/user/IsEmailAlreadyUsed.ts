import { registerDecorator, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface, ValidatorOptions } from "class-validator";
import { User } from "../../database/entities/User";

@ValidatorConstraint({ async: true })
export class IsEmailAlreadyUsedConstraint implements ValidatorConstraintInterface {
  async validate(email: string, args: ValidationArguments) {
    const isUserCreated = await User.findOne({ where: { email } });
    return !isUserCreated;
  }
}

export const IsEmailAlreadyUsed = (validatorOptions?: ValidatorOptions) => {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      propertyName,
      target: object.constructor,
      options: validatorOptions || { message: 'This email is already in use' },
      constraints: [],
      validator: IsEmailAlreadyUsedConstraint,
    })
  }
};