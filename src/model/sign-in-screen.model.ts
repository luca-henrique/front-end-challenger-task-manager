import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { SignInScreenSchema, SignInScreenSchemaType } from "@/app/page";
import { redirect, useRouter } from "next/navigation";

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

  const mutation = useMutation({
    mutationFn: (newTodo: SignInScreenSchemaType) => {
      return axios.post("http://localhost:3000/sign-in", newTodo);
    },
  });

  console.log(watch());
  const { errors } = formState;

  console.log(errors);

  function handleEvent(value: SignInScreenSchemaType) {
    mutation.mutate(value);
    router.push("/dashboard");
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
