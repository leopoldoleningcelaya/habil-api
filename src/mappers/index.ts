import { ParsedQs } from 'qs';

export function mapQueryToPaginationParams(query: ParsedQs): {
  pageNumber?: number;
  pageSize?: number;
} {
  let pageNumber: number = parseInt(query.pageNumber as string);
  if (!pageNumber && pageNumber !== 0) pageNumber = undefined;
  const pageSize: number = parseInt(query.pageSize as string) || undefined;
  return { pageNumber, pageSize };
}
