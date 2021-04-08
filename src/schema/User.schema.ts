import { Field, ID, ObjectType, registerEnumType } from "type-graphql";

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

registerEnumType(Role, {
  name: "Role",
});

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  email: string;

  // @Field(() => String)
  password: string;

  @Field(() => Role, { defaultValue: "USER" })
  role: "USER" | "ADMIN";

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
