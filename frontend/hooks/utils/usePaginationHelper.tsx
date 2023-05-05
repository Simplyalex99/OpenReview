import { useEffect, useState } from 'react';

interface PaginationData {
  maxPages: number;
  filterData: Array<any>;
}
export const usePaginationHelper = (
  dataPerPage: number,
  currentPage: number,
  data: Array<any>
): PaginationData => {
  const maxPages = Math.ceil(data.length / dataPerPage);
  const pagesVisited = (currentPage - 1) * dataPerPage;
  const [filterData, setFilterData] = useState<any[]>([]);
  useEffect(() => {
    const newFilterData = data.slice(pagesVisited, pagesVisited + dataPerPage);
    setFilterData(newFilterData);
  }, [currentPage, data]);

  return { filterData, maxPages };
};
export default usePaginationHelper;
