import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";

interface DialogWrapperProps {
  title: string;
  openPrompt: string;
  description?: string;
  footerText?: string;
  footerHref?: string;
  children: React.ReactElement;
}

export default function DialogWrapper({
  title,
  openPrompt,
  description,
  footerText,
  footerHref,
  children,
}: DialogWrapperProps) {
  return (
    <Dialog>
      <DialogTrigger>{openPrompt}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div>{children}</div>
        <div className="flex justify-center">
          {footerText && footerHref && (
            <Link href={footerHref}>{footerText}</Link>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
