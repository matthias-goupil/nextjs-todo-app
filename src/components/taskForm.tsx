"use client";

import React, { useRef, useState, useTransition } from "react";

import { TaskSchema } from "@/schemas/task.zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { createTask } from "@/actions/task.action";

type TaskFormType = z.infer<typeof TaskSchema>;

function TaskForm() {
  const [state, setState] = useState({
    message: "",
  });

  const [pending, startTransition] = useTransition();

  const form = useForm<TaskFormType>({
    resolver: zodResolver(TaskSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      content: "",
    },
  });

  async function onSubmit(data: TaskFormType) {
    const formData = new FormData();
    formData.set("title", data.title);
    formData.set("content", data.content || "");
    startTransition(async () => {
      setState(await createTask(state, formData));
    });
  }

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre</FormLabel>
              <FormControl>
                <Input placeholder="Titre" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Description"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Créer</Button>
      </form>
    </Form>
  );
}

export default TaskForm;
