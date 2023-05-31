import { Edit } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "./dialog";

interface DialogWrapperProps {
  children: React.ReactNode;
  trigger?: React.ReactNode;
  open?: boolean;
}

export function DialogWrapper({ children, open, trigger }: DialogWrapperProps) {
  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        {trigger ?? <Edit className="h-5 w-5 " />}
      </DialogTrigger>
      <DialogContent className="">{children}</DialogContent>
    </Dialog>
  );
}
