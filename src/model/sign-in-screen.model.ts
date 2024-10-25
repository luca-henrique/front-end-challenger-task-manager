import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const PASSWORD_MIN_LENGTH = 4;
const PASSWORD_MAX_LENGTH = 16;

export const SignInScreenSchema = z
  .object({
    email: z.string({ required_error: "Email é obrigatório." }),
    password: z
      .string()
      .min(
        PASSWORD_MIN_LENGTH,
        `A senha deve ter no mínimo ${PASSWORD_MIN_LENGTH} caracteres.`
      )
      .max(
        PASSWORD_MAX_LENGTH,
        `A senha deve ter no máximo ${PASSWORD_MAX_LENGTH} caracteres.`
      ),
  })
  .required();

export type SignInScreenSchemaType = z.infer<typeof SignInScreenSchema>;

import { useAuth } from "@/store/auth";
import { z } from "zod";
import toast from "react-hot-toast";

export type FieldTypeSignInScreenSchema = keyof SignInScreenSchemaType;

export const useSignInModel = () => {
  const { setValue, handleSubmit, clearErrors, watch, formState } =
    useForm<SignInScreenSchemaType>({
      resolver: zodResolver(SignInScreenSchema),
      mode: "all",
      defaultValues: {
        email: "",
        password: "",
      },
    });

  const router = useRouter();

  const {
    actions: { signInRequest },
  } = useAuth();

  console.log(watch());
  const { errors } = formState;

  console.log(errors);

  async function handleEvent(value: SignInScreenSchemaType) {
    try {
      await signInRequest(value);
      toast.success("You did it!");
      // router.push("/dashboard");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message || "Erro ao tentar autenticar.");
    }
  }

  const handleChangeInputValue = (
    fieldName: FieldTypeSignInScreenSchema,
    value: string
  ) => {
    setValue(fieldName, value);
    clearErrors(fieldName);
  };

  return {
    handleSubmit: handleSubmit(handleEvent),
    handleChangeInputValue,
    errors,
  };
};
