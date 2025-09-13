import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useHome } from "@/context/home-context";

type GameOverDialogProps = {
  open?: boolean;
  modal?: boolean;
  winner?: string;
  isAbandoned: boolean;
  onOpenChange?(open: boolean): void;
};

const GameOverDialog = ({
  open,
  winner,
  isAbandoned,
  onOpenChange,
  ...props
}: GameOverDialogProps) => {
  const { playAgain, quitGame } = useHome();

  return (
    <Dialog open={open} onOpenChange={onOpenChange} {...props}>
      <DialogContent className="text-center w-[400px]">
        <DialogHeader className="flex justify-center  items-center">
          <DialogTitle className="text-3xl font-bold text-center">
            {isAbandoned
              ? "You Abandoned the Game"
              : winner === "player"
              ? "You Win!"
              : "Game Over!"}
          </DialogTitle>
        </DialogHeader>
        {!isAbandoned && (
          <p className="text-lg text-muted-foreground">
            {winner === "player"
              ? "Congratulations! You defeated the monster!"
              : "The monster proved too powerful this time"}
          </p>
        )}

        <p className="text-xl font-medium">Play Again?</p>
        <DialogFooter className="flex gap-4">
          <Button
            variant={"secondary"}
            onClick={quitGame}
            className="flex-1 py-6 rounded-xl text-xl cursor-pointer"
          >
            No
          </Button>

          <Button
            onClick={playAgain}
            className="flex-1 py-6 rounded-xl text-xl cursor-pointer"
          >
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GameOverDialog;
