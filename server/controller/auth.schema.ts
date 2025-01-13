import { z } from "zod";

export const UserLoginSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi girin."),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır."),
});

export const CreateUserSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi girin."),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır.").max(50, "Sifre en fazla 50 karakterden olusmalidir."),
  username: z.string().min(2, "Kullanici ismi en az 2 karatker olmalidir.").max(28, "Kullanici ismi en fazla 28 karakterden olusmalidir.")
});