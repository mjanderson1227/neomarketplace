import { db } from "@/server/drizzle";
import { UserInformation } from "@/schema/drizzle/schema";
import { registerFormSchema } from "@/schema/form-schema";
import * as bcrypt from "bcrypt";

export async function POST(req: Request) {
  const result = registerFormSchema.safeParse(await req.json());
  if (!result.success) {
    return Response.error();
  }
  const { confirmPassword, ...userdata } = result.data;
  const salt = await bcrypt.genSalt();
  const hashed = await bcrypt.hash(userdata.password, salt);

  db.insert(UserInformation).values({ ...userdata, salt, password: hashed });

  return Response.json({
    message: "User Created Successfully.",
  });
}
