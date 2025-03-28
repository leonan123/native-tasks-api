import { z } from "zod"

export const createTaskSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional()
})

export const updateTaskSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional()
  })
  .refine((data) => data.title || data.description, {
    message: "Provide a title or description to update."
  })
