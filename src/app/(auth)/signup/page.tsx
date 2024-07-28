import { AuthForm } from "~/app/(auth)/_components/auth-form";
import { SignUpForm } from "~/app/(auth)/_components/sign-up-form";
import { SocialAuthButtons } from "~/app/(auth)/_components/social-auth-buttons";

const SignUpPage = () => {
  return (
    <AuthForm
      headerLabel="Let's create your"
      headerLabelHighlight="account"
      headerSubLabel="Welcome! Let's get you started"
      backButtonHref="/signin"
      backButtonLabel="Already have an account ?"
      showSocial
    >
      <div className="mt-10 flex flex-col items-center justify-center gap-y-10">
        <div className="mb-5 w-full">
          <SocialAuthButtons type="signup" />
        </div>
        <div className="flex w-full items-center opacity-30">
          <div className="h-px flex-grow bg-dark" />
          <span className="px-8 text-base">or</span>
          <div className="h-px flex-grow bg-dark" />
        </div>
        <SignUpForm />
      </div>
    </AuthForm>
  );
};

export default SignUpPage;
