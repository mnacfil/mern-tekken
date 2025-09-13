import AppLogo from "@/components/app-logo";
import BackButton from "@/components/back-button";
import LoginForm from "@/components/forms/login-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const LoginPage = () => {
  return (
    <Card className="rounded-2xl border-primary-foreground p-0">
      <CardHeader className="bg-primary text-primary-foreground rounded-t-2xl p-5 text-center relative">
        <AppLogo className="size-16" />
        <CardTitle className="text-2xl fond-bold">Welcome Back</CardTitle>
        <CardDescription className="text-primary-foreground">
          Sign in to continue your battle
        </CardDescription>
        <div className="absolute left-5 top-1/2 -translate-y-1/2">
          <BackButton />
        </div>
      </CardHeader>
      <CardContent className="p-8 pt-0">
        <LoginForm />
      </CardContent>
    </Card>
  );
};

export default LoginPage;
