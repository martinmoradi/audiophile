"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { SignInSchema } from "~/lib/validation-schemas";
import { Button } from "~/components/ui/button";
import { PasswordInput } from "~/app/(auth)/_components/password-input";
import { Mail } from "lucide-react";

const SignInForm = () => {
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={() => null}
          className="flex min-w-[48rem] flex-col space-y-12"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-black/30" />
                    <Input
                      {...field}
                      // disabled={isPending}
                      placeholder="Enter your email address."
                      type="email"
                      aria-label="Email input field"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <PasswordInput control={form.control} name="password" />
          <div className="mt-8">
            <Button type="submit" className="w-full self-center">
              Sign in
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export { SignInForm };
