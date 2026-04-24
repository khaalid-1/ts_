import z from "zod";

const createSchema = z.object({
  title: z.string().min(3, "Task is to short").max(40, "task is too much"),
  userId: z.coerce
    .number("user id must be number")
    .int("user id must integer number")
    .positive("user id must be numbe rpositive"),
});
const updateSchema = z.object({
  status: z.enum(["todos", "inProgress", "done"]),
  userId: z.coerce
    .number("user id must be number")
    .int("user id must integer number")
    .positive("user id must be numbe rpositive"),
});

const paramid = z.object({
  id: z.coerce
    .number("user id must be number")
    .int("user id must integer number")
    .positive("user id must be numbe positive"),
});

export const createTaskSchema = z.object({
  body: createSchema,
});
export const paramTaskSchema = z.object({
  params: paramid,
});
export const updateTaskSchema = z.object({
  body: updateSchema,
  params: paramid,
});
export const deleteTaskSchema = z.object({
  body: z.object({
    userId: z.coerce
      .number("user id must be number")
      .int("user id must integer number")
      .positive("user id must be numbe rpositive"),
  }),
  params: paramid,
});
