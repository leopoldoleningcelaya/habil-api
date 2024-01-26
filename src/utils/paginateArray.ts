import { Page } from '@interfaces';

export function paginateArray<T>(array: T[], pageNumber?: number, pageSize?: number): Page<T> {
  const totalElements: number = array.length;
  let totalPages: number = pageSize ? Math.ceil(totalElements / pageSize) : 1;

  if (pageSize === 0) totalPages = undefined;

  if ((pageNumber || pageNumber === 0) && (pageSize || pageSize === 0)) {
    array = array.splice(pageNumber * pageSize, pageSize);
  }

  return {
    content: array,
    totalPages,
    totalElements,
    pageNumber: pageNumber || 0,
  };
}
