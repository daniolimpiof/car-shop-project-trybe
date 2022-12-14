import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

const CarZodSchema = z.object({
  doorsQty: z.number().gte(2).lte(4),
  seatsQty: z.number().int().gte(2).lte(7),
  
});
  
const CarWithVehicle = CarZodSchema.merge(VehicleZodSchema);
export type ICar = z.infer<typeof CarWithVehicle>;
  
export { CarWithVehicle };