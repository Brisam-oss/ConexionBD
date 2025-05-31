import { z } from 'zod';

export const filmSchema = z.object({
    title: z.string().min(10, "El título es obligatorio con una longitud mínima de 10"),
    description: z.string().min(10, "La descripción es obligatoria y minima de 10"),
});