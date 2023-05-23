export const customFetcher = (
  url: string,
  token?: string,
  method?: string,
  data?: object
) => {
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: method || 'POST',
    body: data ? JSON.stringify(data) : JSON.stringify({}),
  }).then((res) => res.json());
};
export default customFetcher;
