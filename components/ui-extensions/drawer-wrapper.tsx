import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";

interface DrawerWrapperProps {
  openPrompt: string;
  title: string;
  submitPrompt: string;
  children?: React.ReactElement;
  description?: string;
}

export default function DrawerWrapper({
  openPrompt,
  title,
  description,
  submitPrompt,
  children,
}: DrawerWrapperProps) {
  return (
    <Drawer>
      <DrawerTrigger>{openPrompt}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
          <div>{children}</div>
        </DrawerHeader>
        <DrawerFooter>
          <Button>{submitPrompt}</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
