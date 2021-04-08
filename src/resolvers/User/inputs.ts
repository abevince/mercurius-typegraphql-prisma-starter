import { Field, InputType } from "type-graphql";

import { User } from "../../schema/User.schema";

@InputType()
export class RegisterInput implements Partial<User> {
  @Field()
  email: string;

  @Field()
  password: string;
}
