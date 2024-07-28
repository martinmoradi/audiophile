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
import { LoginSchema } from "~/lib/validation-schemas";
import { Button } from "~/components/ui/button";
import { PasswordInput } from "~/app/(auth)/_components/password-input";

const SignInForm = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
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
          className="flex w-[48rem] flex-col space-y-12"
        >
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
                    placeholder="john.doe@example.com"
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
