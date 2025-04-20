import { z } from "zod";

export const UserSchema = z.object({
  username: z.string()
    .min(3, "Kullanıcı adı en az 3 karakter olmalıdır.")
    .max(20, "Kullanıcı adı en fazla 20 karakter olabilir.")
    .regex(/^[a-zA-Z0-9_]+$/, "Kullanıcı adı sadece harf, sayı ve alt çizgi içerebilir")
    .trim(),

  email: z.string()
    .email("Geçerli bir e-posta adresi giriniz")
    .max(100, "E-posta en fazla 100 karakter olabilir")
    .trim(),

  password: z.string()
    .min(8, "Şifre en az 8 karakter olmalıdır")
    .max(50, "Şifre en fazla 50 karakter olabilir")
    .optional(),

  image: z.string()
    .default('default'),

  role: z.enum(['user', 'admin'])
    .default('user'),

  googleId: z.string()
    .optional(),

  authMethods: z.array(z.enum(['local', 'google', 'github']))
    .default(['local']),

  createdAt: z.date()
    .default(() => new Date()),

  updatedAt: z.date()
    .default(() => new Date())
});