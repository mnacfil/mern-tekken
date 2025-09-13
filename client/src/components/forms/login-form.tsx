import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import { useAuth } from "@/context/auth-context";
import { cn } from "@/lib/utils";

const loginFormSchema = z.object({
  email: z.email({ message: "Please provide Email" }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters long" }),
});

const LoginForm = () => {
  const { loginPlayer, loading } = useAuth();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    try {
      await loginPlayer({ email: values.email, password: values.password });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your password"
                  {...field}
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={loading}
          className={cn(
            "w-full py-7 rounded-xl text-lg",
            loading ? "cursor-not-allowed opacity-80" : "cursor-pointer"
          )}
        >
          {loading ? "Signing..." : " Sign In"}
        </Button>
        <p className="text-center text-secondary-foreground">
          Don't have an account?{" "}
          <Link to={"/register"} className="text-primary cursor-pointer">
            Create one here
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default LoginForm;
