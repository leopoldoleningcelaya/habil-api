import { Offerer } from '@entity/Offerer';
import { CRUDRepository } from '.';

export interface OffererRepository extends CRUDRepository<Offerer> {
  addServiceCategory(offererId: number, serviceId: number): Promise<void>;
  removeServiceCategory(offererId: number, serviceId: number): Promise<void>;
}
