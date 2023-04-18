export const fetcher = (url: string, token?: string) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
export default fetcher;
