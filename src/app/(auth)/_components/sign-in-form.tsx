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
        <form onSubmit={() => null} className="flex flex-col space-y-12">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    // disabled={isPending}
                    placeholder="Enter your email address."
                    type="email"
                    aria-label="Email input field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <PasswordInput control={form.control} name="password" />
          <Button type="submit" className="self-center">
            Sign in
          </Button>
        </form>
      </Form>
    </div>
  );
};

export { SignInForm };
