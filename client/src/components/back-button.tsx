import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router";

type BackButtonProps = {
  backTo?: string;
};

const BackButton = ({ backTo = "/" }: BackButtonProps) => {
  return (
    <Link to={backTo}>
      <Button variant={"ghost"} size={"icon"} className="rounded-full">
        <ArrowLeft className="size-5" />
      </Button>
    </Link>
  );
};

export default BackButton;
