"use client";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Form, FormField, FormLabel, FormItem, FormControl } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import DrawerWrapper from "../ui-extensions/drawer-wrapper";
import { createPost } from "./create-post";
import { createPostFormSchema } from "@/schema/handler-schema";

export default function CreatePostForm() {
  const form = useForm<z.infer<typeof createPostFormSchema>>({
    resolver: zodResolver(createPostFormSchema),
    defaultValues: {
      description: "",
      title: "",
      price: 0.0,
      picture: undefined,
    },
  });

  async function handleSubmit(data: z.infer<typeof createPostFormSchema>) {
    const file = data.picture as FileList;
    if (!file || !file.length) throw new Error("Unable to parse the file.");

    const validFile = file.item(0);
    if (!validFile) throw new Error("Unable to parse the file.");

    const readOperation = new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        resolve(e.target?.result as string);
      };
      reader.onerror = (err: ProgressEvent<FileReader>) => {
        reject(err);
      };
      reader.readAsDataURL(validFile);
    });

    const readResult = await readOperation;

    const res = await createPost(
      JSON.stringify({ ...data, picture: readResult }),
    );

    console.log(res.message);
  }

  return (
    <DrawerWrapper
      description="Create a new post for others to see"
      title="Create New Post"
      openPrompt="Create Post"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid grid-cols-2 gap-12 py-8">
            <div className="flex flex-col gap-6">
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
                          className="h-full"
                          {...field}
                          placeholder="Product description..."
                        />
                      </FormControl>
                    </FormItem>
                  </>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="picture"
                render={() => (
                  <>
                    <FormItem className="h-full">
                      <FormLabel>Upload a picture</FormLabel>
                      <FormControl>
                        <Input
                          className="h-full cursor-pointer"
                          type="file"
                          onChange={(e) =>
                            e.target.files &&
                            form.setValue("picture", e.target.files)
                          }
                        />
                      </FormControl>
                    </FormItem>
                  </>
                )}
              />
            </div>
          </div>
          <Button type="submit" className="mt-12 w-full">
            Create
          </Button>
        </form>
      </Form>
    </DrawerWrapper>
  );
}
