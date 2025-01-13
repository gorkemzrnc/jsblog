import { z } from "zod";

export const CategorySchema = z.object({
  categoryName: z.string().min(2, "Kategori en az 2 karakter olmalidir."),
});