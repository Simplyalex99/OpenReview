export const buildFilterOptions = (
  checkedOptions: {
    [key: string]: string | number;
  },
  checkedList: Array<boolean>
) => {
  const filterOptions: { [key: string]: string | number } = {};
  const options = Object.keys(checkedOptions);
  if (options.length !== checkedList.length) {
    return {};
  }
  options.forEach((key, position) => {
    const isChecked = checkedList[position];

    if (isChecked) {
      filterOptions[key] = checkedOptions[key as keyof typeof checkedOptions];
    }
  });

  return filterOptions;
};

export default buildFilterOptions;
