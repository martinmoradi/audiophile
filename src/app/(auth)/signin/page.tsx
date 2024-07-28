import { AuthForm } from "~/app/(auth)/_components/auth-form";
import { SignInForm } from "~/app/(auth)/_components/sign-in-form";
import { SocialAuthButtons } from "~/app/(auth)/_components/social-auth-buttons";

const SignInPage = () => {
  return (
    <AuthForm
      headerLabel="Sign"
      headerLabelHighlight="in"
      headerSubLabel="Welcome back! Please sign in to continue"
      backButtonHref="/signup"
      backButtonLabel="Don't have an account yet ?"
      showSocial
    >
      <div className="mt-10 flex flex-col items-center justify-center gap-y-10">
        <div className="mb-5 w-full">
          <SocialAuthButtons type="signin" />
        </div>
        <div className="flex w-full items-center opacity-30">
          <div className="h-px flex-grow bg-dark"></div>
          <span className="px-8 text-base">or</span>
          <div className="h-px flex-grow bg-dark"></div>
        </div>
        <SignInForm />
      </div>
    </AuthForm>
  );
};

export default SignInPage;
