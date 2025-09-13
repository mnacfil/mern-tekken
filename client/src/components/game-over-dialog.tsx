import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

type GameOverDialogProps = {
  open?: boolean;
  modal?: boolean;
  winner?: "player" | "monster";
  onOpenChange?(open: boolean): void;
};

const GameOverDialog = ({
  open,
  winner,
  onOpenChange,
  ...props
}: GameOverDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} {...props}>
      <DialogContent className="text-center w-[400px]">
        <DialogHeader className="flex justify-center  items-center">
          <DialogTitle className="text-3xl font-bold">Game Over!</DialogTitle>
        </DialogHeader>
        <p className="text-lg text-muted-foreground">
          {winner === "player"
            ? "You win congratulations"
            : "The monster proved too powerful this time"}
        </p>
        <p className="text-xl font-medium">Play Again?</p>
        <DialogFooter className="flex gap-4">
          <Button
            variant={"secondary"}
            className="flex-1 py-6 rounded-xl text-xl cursor-pointer"
          >
            No
          </Button>
          <Button className="flex-1 py-6 rounded-xl text-xl cursor-pointer">
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GameOverDialog;
