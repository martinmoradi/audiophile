"use client";

import Link from "next/link";
import { Container } from "~/components/container";
import { LogoIcon } from "~/components/icons/logo";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";

interface AuthFormProps {
  children: React.ReactNode;
  headerLabel: string;
  headerLabelHighlight: string;
  headerSubLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

const AuthForm = ({
  children,
  headerLabel,
  headerLabelHighlight,
  headerSubLabel,
  backButtonLabel,
  backButtonHref,
}: Readonly<AuthFormProps>) => {
  // const onClick = (provider: "google" | "github") => {
  //   signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
  // };
  return (
    <Container className="w-full p-8">
      <Card className="bg-lighter shadow-md">
        <CardHeader>
          <div className="flex w-full flex-col items-center justify-center gap-y-10 pt-10">
            <LogoIcon className="text-dark" />
            <div className="mx-auto flex items-center justify-center gap-8">
              <h1 className="text-4xl font-semibold uppercase">
                {headerLabel}{" "}
                <span className="font-bold text-primary">
                  {headerLabelHighlight}
                </span>
              </h1>
            </div>
            <p className="text-muted-foreground text-base">{headerSubLabel}</p>
          </div>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter>
          <Button variant="link" className="w-full font-normal">
            <Link href={backButtonHref}>{backButtonLabel}</Link>
          </Button>
        </CardFooter>
      </Card>
    </Container>
  );
};

export { AuthForm };
