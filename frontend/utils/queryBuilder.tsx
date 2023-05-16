type queryBuilderProps = {
  [key: string]: any;
};
export const queryBuilder = (params: queryBuilderProps) => {
  let query = '';
  let count = 0;
  const size = Object.keys(params).length;
  if (size === 0) {
    return query;
  }
  query += '?';
  Object.keys(params).forEach((key) => {
    query += `${key}=${params[key]}`;
    if (count !== size - 1) {
      query += '&';
    }
    count += 1;
  });
  return query;
};

export default queryBuilder;
