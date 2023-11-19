import { z } from 'zod';

export const Hero = z.object({
    id: z.string(),
    name: z.string(),
    localized_name: z.string(),
    type: z.string(),
});

export type Hero = z.infer<typeof Hero>;