import { z } from "zod";

const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;
const emailRegex = /\w+@\w+\.\w/;

export const registerFormSchema = z.object({
  email: z
    .string()
    .min(5, "Email must be at least 5 characters.")
    .max(32, "Email Must not exceed 32 characters in length.")
    .regex(emailRegex, "Email is not valid."),
  password: z
    .string()
    .min(7, "Password must be 7 characters long")
    .max(32, "Password must be less than 32 characters in length."),
  confirmPassword: z
    .string()
    .min(7, "Confirm Password must be 7 characters long")
    .max(32, "Confirm Password must be less than 32 characters in length."),
  firstName: z
    .string()
    .min(1, "First Name must contain at least 1 character")
    .max(32, "First Name mustn't exceedd 32 characters in length."),
  lastName: z
    .string()
    .min(1, "Last Name must contain at least 1 character")
    .max(32, "Last Name mustn't exceedd 32 characters in length."),
  phoneNumber: z.string().regex(phoneRegex, "Phone number is not valid"),
});

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(5, { message: "Your email must be at least 5 characters long." })
    .regex(emailRegex),
  password: z
    .string()
    .min(7, { message: "Your password must be at least 7 characters." }),
});
