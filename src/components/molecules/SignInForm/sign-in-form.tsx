import { useSignInModel } from "./sign-in-form.model"
import { SignInFormView } from "./sign-in-form.view"

export const SignInForm = () => {
  const props = useSignInModel()
  return (
    <SignInFormView {...props} />
  )
}