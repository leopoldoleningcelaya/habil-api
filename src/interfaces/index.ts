import BaseEntity from '@entity';

export interface Page<T> {
  content: T[];
  totalPages?: number; // total number of pages
  totalElements: number; // total number of elements
  pageNumber: number; // current page number
}

export interface CRUDRepository<T extends BaseEntity> {
  find(filters?: Partial<T>): Promise<T[]>;
  findOneBy(filters?: Partial<T>): Promise<T>;
  save(data: T): Promise<void>;
  update(id: string, data: Partial<T>): Promise<void>;
  delete(id: string): Promise<void>;
}
