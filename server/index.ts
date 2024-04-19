import { loginFormSchema, registerFormSchema } from "@/schema/form-schema";
import { initTRPC } from "@trpc/server";

const t = initTRPC.create();

export const appRouter = t.router({
  userLogin: t.procedure.input(loginFormSchema).query(async (opts) => {
    return "query success";
  }),
  userRegister: t.procedure.input(registerFormSchema).mutation(async (opts) => {
    return "query success";
  }),
});

export type AppRouter = typeof appRouter;
