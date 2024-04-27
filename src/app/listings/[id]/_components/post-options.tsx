import DialogWrapper from "@/src/components/ui-extensions/dialog-wrapper";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { revisePost } from "@/src/server/queries";
import { useToast } from "@/src/components/ui/use-toast";
import { editPostSchema } from "@/src/schema/edit-post-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormLabel,
  FormControl,
  FormField,
  FormItem,
} from "@/src/components/ui/form";
import { z } from "zod";
import { useState } from "react";

export default function PostOptions({
  listing,
}: {
  listing: ListingData | undefined;
}) {
  const { toast } = useToast();
  const [changed, setChanged] = useState(false);
  const form = useForm<z.infer<typeof editPostSchema>>({
    resolver: zodResolver(editPostSchema),
    defaultValues: {
      title: listing?.title || "",
      description: listing?.description || "",
      price: listing?.price || "",
    },
  });

  async function handleSubmission(data: z.infer<typeof editPostSchema>) {
    if (!listing?.id) {
      return;
    }
    try {
      await revisePost(data, listing.id);
      toast({
        title: "Post Successfully Edited.",
        description: "No issues occurred while editing the post.",
      });
    } catch (error) {
      toast({
        title: "Uh Oh! An Error Occurred!",
        description: "Unable to edit the post.",
      });
      console.error(error);
    }
  }

  return (
    <DialogWrapper
      title="Post Options"
      openPrompt="Options"
      description="Change various aspects of this listing"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmission)}
          className="flex flex-col gap-8"
        >
          {Object.keys(editPostSchema.shape).map((fieldTitle) => (
            <FormField
              control={form.control}
              name={fieldTitle as "title" | "description" | "price"}
              key={fieldTitle}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{fieldTitle}</FormLabel>
                  <FormControl onChange={() => setChanged(true)}>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          ))}
          {changed && (
            <Button type="submit" className="mt-4">
              Edit Listing
            </Button>
          )}
        </form>
      </Form>
    </DialogWrapper>
  );
}
