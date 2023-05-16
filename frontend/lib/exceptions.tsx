export class APIError extends Error {
  constructor(
    message = 'The information required for this page is not available. Try again later'
  ) {
    super(message);
    this.name = 'APIError';
  }
}
export default APIError;
