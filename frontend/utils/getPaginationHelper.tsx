interface PaginationData {
  maxPages: number;
  filterData: Array<any>;
}

export const getPaginationHelper = (
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

  const page = validateCurrentPage(currentPage);
  const pagesVisited = page * dataPerPage;
  const filterData = data.slice(pagesVisited, pagesVisited + dataPerPage);
  const totalPages = getTotalPages(filterData, dataPerPage);
  let maxPages = totalPages;
  if (totalPages < currentPage) {
    maxPages = 1;
  }

  return { filterData, maxPages };
};
export default getPaginationHelper;
