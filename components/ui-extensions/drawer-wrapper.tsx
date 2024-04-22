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

interface DrawerWrapperProps {
  openPrompt: string;
  title: string;
  children?: React.ReactElement;
  description?: string;
}

export default function DrawerWrapper({
  openPrompt,
  title,
  description,
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
          <DrawerClose>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
