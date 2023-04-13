export const objectKeyToArray = (
  data: Array<object>,
  key: any
): Array<string> =>
  data.map((content) => {
    if (Reflect.has(content, key)) {
      return content[key as keyof typeof content];
    }
    return '';
  });
export default objectKeyToArray;
