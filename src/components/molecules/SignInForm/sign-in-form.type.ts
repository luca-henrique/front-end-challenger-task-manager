import { useSignInModel } from "./sign-in-form.model";
import { SignInScreenSchema } from "./sign-in-form.schema";
import { z } from "zod";

export type SignInFormType = ReturnType<typeof useSignInModel>;
export type SignInScreenSchemaType = z.infer<typeof SignInScreenSchema>;

export type FieldTypeSignInScreenSchema = keyof SignInScreenSchemaType;
