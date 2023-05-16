import { useEffect, useState } from 'react';
import { to } from 'react-spring';

interface PaginationData {
  maxPages: number;
  filterData: Array<any>;
}

export const usePaginationHelper = (
  dataPerPage: number,
  currentPage: number,
  data: Array<any>
): PaginationData => {
  const validateCurrentPage = (page: number) => {
    if (page < 1) {
      return 0;
    }
    return page - 1;
  };

  const hasInvalidPage = (list: Array<any>, listPerPage: number) => {
    return list.length === 0 || listPerPage === 0;
  };
  const getTotalPages = (list: Array<any>, listPerPage: number) => {
    const isInvalidPage = hasInvalidPage(list, listPerPage);
    return isInvalidPage ? 0 : Math.ceil(data.length / dataPerPage);
  };
  const initialTotalPages = getTotalPages(data, dataPerPage);

  const [filterData, setFilterData] = useState<any[]>(data);
  const [maxPages, setMaxPages] = useState(initialTotalPages);
  useEffect(() => {
    const page = validateCurrentPage(currentPage);
    const pagesVisited = page * dataPerPage;
    const newFilterData = data.slice(pagesVisited, pagesVisited + dataPerPage);
    setFilterData(newFilterData);
    const totalPages = getTotalPages(filterData, dataPerPage);

    if (totalPages < currentPage) {
      setMaxPages(1);
    } else {
      setMaxPages(totalPages);
    }
  }, [currentPage, data]);

  return { filterData, maxPages };
};
export default usePaginationHelper;
