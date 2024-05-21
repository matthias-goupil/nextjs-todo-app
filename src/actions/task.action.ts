"use server"

import { TaskSchema } from "@/schemas/task.zod"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
type FormState = {
    message: string
}

export const createTask = async (prevState: FormState, data: FormData): Promise<FormState> => {
    const formData = Object.fromEntries(data)
    const parsed = TaskSchema.safeParse(formData)
    if(!parsed.success){
        return {
            message: "Invalid form data"
        }
    }
    try {
        const createdTask = await prisma.task.create({
            data: parsed.data
        })
    } catch(e) {
        return {
            message: "Une erreur est survenue"
        }
    }

    return {
        message: "Task succesfully created"
    }
}