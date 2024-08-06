"use client";

import { GithubIcon } from "~/components/icons/socials/github";
import { GoogleIcon } from "~/components/icons/socials/google";
import { Button } from "~/components/ui/button";

interface SocialAuthButtonsProps {
  variant: "signin" | "signup";
}

const SocialAuthButtons = ({ variant }: Readonly<SocialAuthButtonsProps>) => {
  const googleLabel =
    variant === "signin" ? "Sign in with Google" : "Sign up with Google";
  const githubLabel =
    variant === "signin" ? "Sign in with Github" : "Sign up with Github";

  return (
    <div className="flex w-full items-center gap-x-2 hover:text-white">
      <Button
        className="w-full space-x-4"
        variant="secondary"
        onClick={() => null}
        aria-label={googleLabel}
      >
        <GoogleIcon className="h-10 w-10" />
        <span className="opacity-80">Google</span>
        <span className="sr-only">{googleLabel}</span>
      </Button>
      <Button
        className="w-full space-x-4"
        variant="secondary"
        onClick={() => null}
        aria-label={githubLabel}
      >
        <GithubIcon className="h-10 w-10" />
        <span className="opacity-80">Github</span>
        <span className="sr-only">{githubLabel}</span>
      </Button>
      <Button
        className="w-full space-x-4"
        variant="secondary"
        onClick={() => null}
        aria-label={githubLabel}
      >
        <GithubIcon className="h-10 w-10" />
        <span className="opacity-80">Discord</span>
        <span className="sr-only">{githubLabel}</span>
      </Button>
    </div>
  );
};

export { SocialAuthButtons };
