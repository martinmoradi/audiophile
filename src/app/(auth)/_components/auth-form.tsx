import React from "react";
import Link from "next/link";
import { LogoIcon } from "~/components/icons/logo";
import { Button } from "~/components/ui/button";
import { SocialAuthButtons } from "~/app/(auth)/_components/social-auth-buttons";
import { SignInForm } from "~/app/(auth)/_components/sign-in-form";
import { SignUpForm } from "~/app/(auth)/_components/sign-up-form";

type AuthFormVariant = "signin" | "signup";

interface AuthFormConfig {
  headerLabel: string;
  headerLabelHighlight: string;
  headerSubLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial: boolean;
  FormComponent: React.ComponentType;
}

const authFormConfigs: Record<AuthFormVariant, AuthFormConfig> = {
  signin: {
    headerLabel: "Sign",
    headerLabelHighlight: "in",
    headerSubLabel: "Welcome back! Please sign in to continue",
    backButtonHref: "/signup",
    backButtonLabel: "Don't have an account yet?",
    showSocial: true,
    FormComponent: SignInForm,
  },
  signup: {
    headerLabel: "Sign",
    headerLabelHighlight: "up",
    headerSubLabel: "Create an account to get started",
    backButtonHref: "/signin",
    backButtonLabel: "Already have an account?",
    showSocial: true,
    FormComponent: SignUpForm,
  },
};

interface AuthFormProps {
  variant: AuthFormVariant;
  isModal?: boolean;
}

const AuthForm = ({ variant, isModal = false }: Readonly<AuthFormProps>) => {
  const config = authFormConfigs[variant];
  const {
    headerLabel,
    headerLabelHighlight,
    headerSubLabel,
    backButtonLabel,
    backButtonHref,
    showSocial,
    FormComponent,
  } = config;

  return (
    <div className={isModal ? "p-12" : "bg-lighter"}>
      <div className="flex w-full flex-col items-center justify-center gap-y-10 pt-10">
        <LogoIcon className="text-dark" />
        <div className="mx-auto flex items-center justify-center gap-8">
          <h1 className="text-4xl font-semibold uppercase">
            {headerLabel}
            <span className="font-bold text-primary">
              {headerLabelHighlight}
            </span>
          </h1>
        </div>
        <p className="text-muted-foreground text-base">{headerSubLabel}</p>
      </div>
      <div className="mt-10 flex flex-col items-center justify-center gap-y-10">
        {showSocial && (
          <>
            <div className="mb-5 w-full">
              <SocialAuthButtons variant={variant} />
            </div>
            <div className="flex w-full items-center opacity-30">
              <div className="h-px flex-grow bg-dark"></div>
              <span className="px-8 text-base">or</span>
              <div className="h-px flex-grow bg-dark"></div>
            </div>
          </>
        )}
        <FormComponent />
      </div>
      <div className="mt-8 flex justify-center">
        <Button variant="link" className="font-normal">
          <Link href={backButtonHref}>{backButtonLabel}</Link>
        </Button>
      </div>
    </div>
  );
};

export { AuthForm };
