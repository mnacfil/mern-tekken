import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import monsterLogo from "../assets/monster.png";
import { cn } from "@/lib/utils";

type AppLogoProps = {
  className?: string;
};

const AppLogo = ({ className }: AppLogoProps) => {
  return (
    <div className="flex justify-center">
      <Avatar className={cn("size-24", className)}>
        <AvatarImage src={monsterLogo} alt="logo avatar" />
        <AvatarFallback>Mo</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default AppLogo;
