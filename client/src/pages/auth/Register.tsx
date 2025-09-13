import AppLogo from "@/components/app-logo";
import BackButton from "@/components/back-button";
import RegisterForm from "@/components/forms/register-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Register = () => {
  return (
    <Card className="rounded-2xl border-primary-foreground p-0">
      <CardHeader className="bg-primary text-primary-foreground rounded-t-2xl p-5 text-center relative">
        <AppLogo className="size-16" />
        <CardTitle className="text-2xl fond-bold">Join the Battle</CardTitle>
        <CardDescription className="text-primary-foreground">
          Create your warrior account
        </CardDescription>
        <div className="absolute left-5 top-1/2 -translate-y-1/2">
          <BackButton />
        </div>
      </CardHeader>
      <CardContent className="p-8 pt-0">
        <RegisterForm />
      </CardContent>
    </Card>
  );
};

export default Register;
