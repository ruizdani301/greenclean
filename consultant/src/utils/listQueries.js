/**
 * Retrieves a list of queries from the API.
 *
 * @return {Promise<Response>} A promise that resolves to the API response.
 */
export function listQueries() {
  const apiUrl = `http://127.0.0.1:8000/api/v1/query/localquery/`;

  return fetch(apiUrl);
}
