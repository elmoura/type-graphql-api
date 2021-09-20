import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { hash } from 'bcryptjs';
import { User } from "../../database/entities/User";
import { UserInput } from "./dto/UserInput";

@Resolver(User)
export class UserResolver {
  @Query(() => String, { description: 'Sends hello message' })
  async hello() {
    return "Hello world :D";
  }

  /* Commented on purpose, that's a FieldResolver example
  
  @FieldResolver()
  async name(@Root() user: User) {
    return `${user.firstName} ${user.lastName}`;
  } 
  */

  @Mutation(() => User, { name: 'user' })
  async save(
    @Arg('input') { firstName, lastName, email, password }: UserInput
  ): Promise<User> {
    const hashedPassword = await hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }).save();

    return user;
  }
}