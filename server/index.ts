import { loginFormSchema, registerFormSchema } from "@/schema/form-schema";
import { TRPCError, initTRPC } from "@trpc/server";
import { db } from "@/server/drizzle";
import { TRPCAppContext } from "./trpc";
import { UserInformation } from "@/schema/drizzle/schema";
import * as bcrypt from "bcrypt";

const t = initTRPC.context<TRPCAppContext>().create();

export const appRouter = t.router({
  userLogin: t.procedure.input(loginFormSchema).query(async (opts) => {
    return "query success";
  }),

  userRegister: t.procedure
    .input(registerFormSchema)
    .mutation(async ({ input, ctx }) => {
      const salt = await bcrypt.genSalt();
      const hashed = await bcrypt.hash(input.password, salt);

      const { confirmPassword: confirm, ...userdata } = input;

      if (confirm != userdata.password) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Confirm password does not match password.",
        });
      }

      db.insert(UserInformation).values({
        ...userdata,
        salt: salt,
        password: hashed,
      });

      ctx.resHeaders.set("Access-Control-Allow-Origin", "*");

      return "Data inserted successfully.";
    }),
});

export type AppRouter = typeof appRouter;
