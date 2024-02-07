import { OffererDto } from '@dtos/offerer.dto';
import { Offerer } from '@entity/Offerer';
import { Page } from '@interfaces';
import { OffererRepository } from '@interfaces/offerer.interface';

class OffererService {
  private static instance: OffererService;
  private offererRepository: OffererRepository;

  private constructor() {}

  public async getAllUsers(
    filters?: Partial<Offerer>,
    pageNumber?: number,
    pageSize?: number
  ): Promise<Page<Offerer>> {
    return this.offererRepository.find(filters, pageNumber, pageSize);
  }

  public async getOffererById(id: number): Promise<Offerer> {
    return this.offererRepository.findOneBy({ id });
  }

  public async addOfferer(offererDto: OffererDto): Promise<number> {
    throw new Error('Method not implemented.');
    // const offerer = new Offerer();
    // offerer.id_user = offererDto.id_user;
  }

  public async updateOfferer(id: number, offererDto: Partial<OffererDto>): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async deleteOfferer(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public static getInstance(): OffererService {
    if (!OffererService.instance) OffererService.instance = new OffererService();
    return OffererService.instance;
  }
}

export default OffererService;
