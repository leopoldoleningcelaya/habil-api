import BaseEntity from '@entity';

export interface Page<T> {
  content: T[];
  totalPages?: number; // total number of pages
  totalElements: number; // total number of elements
  pageNumber: number; // current page number
}

export interface CRUDRepository<T extends BaseEntity> {
  find(filters?: Partial<T>, pageNumber?: number, pageSize?: number): Promise<Page<T>>;
  findOneBy(filters?: Partial<T>): Promise<T>;
  create(data: T): Promise<number>;
  update(id: number, data: Partial<T>): Promise<void>;
  delete(id: number): Promise<void>;
}
