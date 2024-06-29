import { EPropertyStatus, EPropertyType } from '@prisma/client';
import { z } from 'zod';

const createValidation = z.object({
  body: z.object({
    thumbnail: z.string({ required_error: 'thumbnail is required' }),
    title: z.string({ required_error: 'title is required' }),
    description: z.string({ required_error: 'description is required' }),
    rooms: z.number().optional().nullable(),
    size: z.string({ required_error: 'size is required' }),
    floor: z.string().optional(),
    status: z
      .enum(Object.keys(EPropertyStatus) as [string, ...string[]])
      .optional(),
    price: z.number({ required_error: 'price is required' }),
    streetLocation: z.string({ required_error: 'streetLocation is required' }),
    videoUrl: z.string({ required_error: 'videoUrl is required' }),
    images: z.array(z.string()),
    locationId: z.string({ required_error: 'locationId is required' }),
    type: z.enum(Object.keys(EPropertyType) as [string, ...string[]]),
  }),
});
const updateValidation = z.object({
  body: z.object({
    thumbnail: z.string({ required_error: 'thumbnail is required' }).optional(),
    title: z.string({ required_error: 'title is required' }).optional(),
    description: z
      .string({ required_error: 'description is required' })
      .optional(),
    rooms: z.number().optional().optional(),
    size: z.string({ required_error: 'size is required' }).optional(),
    floor: z.string().optional(),

    price: z.number({ required_error: 'price is required' }).optional(),
    streetLocation: z
      .string({ required_error: 'streetLocation is required' })
      .optional(),
    videoUrl: z.string({ required_error: 'videoUrl is required' }).optional(),
    images: z.array(z.string()).optional(),
    locationId: z
      .string({ required_error: 'locationId is required' })
      .optional(),
    type: z.enum(['apartment', 'house', 'condo']).optional(),
  }),
});
export const PropertyValidation = {
  createValidation,
  updateValidation,
};
