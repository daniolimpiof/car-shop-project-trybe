import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

const CarZodSchema = z.object({
  doorsQty: z.number().min(2).max(4),
  seatsQty: z.number().int().min(2).max(7),
  
});
  
const CarWithVehicle = CarZodSchema.merge(VehicleZodSchema);
export type ICar = z.infer<typeof CarWithVehicle>;
  
export { CarZodSchema }; 