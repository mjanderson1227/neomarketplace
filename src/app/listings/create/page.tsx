"use client";
import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormControl,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Textarea } from "@/src/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { createPost } from "@/src/server/queries";
import { createPostFormSchema } from "@/src/schema/create-post-schema";
import { useUser } from "@clerk/nextjs";
import { useToast } from "@/src/components/ui/use-toast";
import clipboardPic from "@/public/clipboard.svg";
import Image from "next/image";

export default function CreatePostForm() {
  const session = useUser();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof createPostFormSchema>>({
    resolver: zodResolver(createPostFormSchema),
    defaultValues: {
      description: "",
      title: "",
      price: "",
    },
  });

  async function handleSubmit(data: z.infer<typeof createPostFormSchema>) {
    if (!session.user) {
      console.error("Not logged in");
      return;
    }

    try {
      await createPost(
        data.title,
        session.user.id,
        data.price.toString(),
        data.description,
      );

      toast({
        title: "Post Creation Successful",
        description: "Good Job...",
      });
    } catch (error: any) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with creating your post.",
      });

      console.error(error.message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="grid px-10">
        <div className="grid grid-cols-2 gap-12 py-8 overflow-hidden">
          <div className="flex text-gray-100 flex-col gap-4 bg-utsablue px-10 py-4  rounded-xl pb-36">
            <h1 className="text-xl self-center">Create a Post</h1>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel>Post Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="ex. Old Baseball Glove"
                        type="text"
                        className="text-black"
                      />
                    </FormControl>
                  </FormItem>
                </>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="ex. $10.99"
                        type="text"
                        className="text-black"
                      />
                    </FormControl>
                  </FormItem>
                </>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-full text-black"
                        {...field}
                        placeholder="Product description..."
                      />
                    </FormControl>
                  </FormItem>
                </>
              )}
            />
          </div>
          <div className="max-h-56">
            <Image src={clipboardPic} alt="A picture of a clipboard."></Image>
          </div>
          <Button
            type="submit"
            className="w-full h-14 text-2xl bg-utsablue rounded-xl"
            onClick={() => console.log("Button clicked")}
          >
            Create Listing
          </Button>
        </div>
      </form>
    </Form>
  );
}
