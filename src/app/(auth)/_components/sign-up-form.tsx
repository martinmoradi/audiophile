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
import { SignUpSchema } from "~/lib/validation-schemas";
import { Button } from "~/components/ui/button";
import { PasswordInput } from "~/app/(auth)/_components/password-input";

const SignUpForm = () => {
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
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
          <PasswordInput
            control={form.control}
            name="confirmPassword"
            placeholder="Confirm  your password"
            label="Confirm your password"
          />
          <Button type="submit" className="self-center">
            Create my account
          </Button>
        </form>
      </Form>
    </div>
  );
};

export { SignUpForm };
