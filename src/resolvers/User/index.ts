import argon2 from "argon2";
import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
import { Context } from "../../context";

import { User } from "../../schema/User.schema";
import { RegisterInput } from "./inputs";

@Resolver()
export class UserResolver {
  @Query()
  hello(): string {
    return "hello world";
  }

  @Mutation(() => Boolean)
  async register(
    @Arg("data") data: RegisterInput,
    @Ctx() ctx: Context
  ): Promise<boolean> {
    try {
      const hashedPassword = await argon2.hash(data.password);
      const createdUser = await ctx.prisma.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
        },
      });
      if (!createdUser) return false;
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  @Query(() => [User])
  async users(@Ctx() ctx: Context): Promise<User[]> {
    const users = ctx.prisma.user.findMany();
    return users;
  }
}
