import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { createBook } from "../http/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  author: z.string().min(2, {
    message: "author must be at least 2 characters.",
  }),
  genre: z.string().min(2, {
    message: "genre must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  imageUrl: z.string().min(2, {
    message: "imageUrl must be at least 2 characters.",
  }),

  price: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        return parseFloat(val);
      }
      return val;
    },
    z.number().min(2, {
      message: "Price must be at least 2.",
    })
  ),
});
const CreateBook = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      description: "",
      imageUrl: "",
      price: 0.0,
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createBook,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });

      console.log("Book created successfully");
      navigate("/dashboard/books");
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formdata = new FormData();
    formdata.append("title", values.title);
    formdata.append("author", values.author);
    formdata.append("genre", values.genre);
    formdata.append("description", values.description);
    formdata.append("imageUrl", values.imageUrl);
    formdata.append("price", values.price.toString());

    mutation.mutate(formdata);

    console.log(values);
  }
  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard/home">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard/books">Books</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink>Create</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-2">
              <Link to={"/dashboard/books"}>
                <Button size="sm" className="h-8 gap-1" variant={"outline"}>
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Cancel
                  </span>
                </Button>
              </Link>
              <Button
                type="submit"
                size="sm"
                className="h-8 gap-1"
                disabled={mutation.isPending}
              >
                {mutation.isPending && (
                  <LoaderCircle className="animate-spin" />
                )}
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Submit
                </span>
              </Button>
            </div>
          </div>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Create Book</CardTitle>
              <CardDescription>
                Create a new book with the required details.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input type="text" className="w-full" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author</FormLabel>
                      <FormControl>
                        <Input type="text" className="w-full" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="genre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Genre</FormLabel>
                      <FormControl>
                        <Input type="text" className="w-full" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea className="min-h-32" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Book Image Url</FormLabel>
                      <FormControl>
                        <Input type="text" className="w-full" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Book Price</FormLabel>
                      <FormControl>
                        <Input type="number" className="w-full" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </section>
  );
};

export default CreateBook;
