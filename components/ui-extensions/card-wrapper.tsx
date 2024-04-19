import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface CardWrapperProps {
  title: string;
  description: string;
  submissionText: string;
  children: React.ReactNode;
  backButtonHref: string;
}

export default function CardWrapper({
  title,
  description,
  submissionText,
  children,
  backButtonHref,
}: CardWrapperProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex justify-center">
        <Link href={backButtonHref}>{submissionText}</Link>
      </CardFooter>
    </Card>
  );
}
