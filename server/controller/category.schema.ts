import { z } from "zod";

export const CategorySchema = z.object({
  categoryName: z.string()
    .min(2, "Kategori en az 2 karakter olmalıdır.")
    .max(50, "Kategori en fazla 50 karakter olabilir.")
    .regex(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, "Kategori adı sadece harf ve boşluk içerebilir")
    .regex(/^(?!.*\s{2})/, "Birden fazla boşluk kullanılamaz")
    .trim()
    .refine(val => val.trim().length > 0, "Kategori adı sadece boşluklardan oluşamaz")
});