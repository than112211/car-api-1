import { PAGINATION } from 'src/constant/constant.common';
import { IQueryPagination } from '../types/common.type';

export const convertPagination = (query: IQueryPagination) => {
  const currentPage = query.currentPage || PAGINATION.CURRENT_PAGE;
  const itemsPerPage = query.itemsPerPage || PAGINATION.ITEM_PER_PAGE;

  return {
    skip: (currentPage - 1) * itemsPerPage,
    take: itemsPerPage,
  };
};
