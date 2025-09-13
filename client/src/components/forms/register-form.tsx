import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import { useAuth } from "@/context/auth-context";

const registerFormSchema = z.object({
  fullName: z
    .string()
    .min(6, { message: "Fullname must be atleast 6 characters" })
    .max(50),
  email: z.email({ message: "Please provide Email" }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters long" }),
  confirmPassword: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters long" }),
  avatar: z.file().optional(),
});

const RegisterForm = () => {
  const { loading, registerPlayer } = useAuth();
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      avatar: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    try {
      await registerPlayer({
        fullName: values.fullName,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
                  placeholder="Create a strong password"
                  {...field}
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Confirm your password"
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
          className="w-full py-7 rounded-xl text-lg"
        >
          {loading ? "Creating..." : "Create Account"}
        </Button>
        <p className="text-center text-secondary-foreground">
          Already have an account?{" "}
          <Link to={"/login"} className="text-primary cursor-pointer">
            Sign in here
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default RegisterForm;
