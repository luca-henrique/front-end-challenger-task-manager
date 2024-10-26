import toast from "react-hot-toast";
import { SignInScreenSchema } from "./sign-in-form.schema";
import { useAuth } from "@/store/auth";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  FieldTypeSignInScreenSchema,
  SignInScreenSchemaType,
} from "./sign-in-form.type";

export const useSignInModel = () => {
  const { setValue, handleSubmit, clearErrors, formState } =
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

  const { errors } = formState;

  async function handleEvent(value: SignInScreenSchemaType) {
    try {
      await signInRequest(value);
      toast.success("You did it!");
      router.push("/dashboard");
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
