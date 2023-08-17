export interface IPagination {
  total: number;
}

export interface IResponse<T> {
  data: T;
}

export interface IResponseWidthPagination<T> {
  data: T;
  pagination: IPagination;
}

export interface IQueryPagination {
  currentPage?: number;
  itemsPerPage?: number;
}
