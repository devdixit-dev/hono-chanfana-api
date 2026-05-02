import { z } from 'zod';

export const envSchema = z.object({
  DATABASE_URL: z.url()
});

export type Env = z.infer<typeof envSchema>;

export const validateEnv = (env: unknown): Env => {
  const parsed = envSchema.safeParse(env);

  if(!parsed.success) {
    console.error(parsed.error.format());
    throw new Error('Invalid environment variables');
  }

  return parsed.data;
}