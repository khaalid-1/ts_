import z, { email } from "zod";

const createSchema = z.object({
  title: z.string().min(3, "Task is to short").max(40, "task is too much")
  
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

export const getAllTaskSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().default(1).optional(),
    limit: z.coerce.number().int().min(10).max(100).optional(),
    status: z.enum(["todos", "inProgress", "done"]).optional(),
    search: z.string().optional(),
  }),
});

export const signSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, "name must greater then 3 character")
      .max(20, "name must less then 20 character"),
    email: z.email(),
    password: z
      .string()
      .min(8, "password must greater then 8 character")
      .max(20, "password must less then 20 character"),
  }),
});
export const loginSchema = z.object({
  body: z.object({
    email: z.email(),
    password: z.string().trim(),
  }),
});
