import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

interface CardWrapperProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function CardWrapper({
  title,
  description,
  children,
}: CardWrapperProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex justify-center"></CardFooter>
    </Card>
  );
}
