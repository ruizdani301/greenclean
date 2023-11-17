/**
 * Runs a query using the provided parameters and fetches data from the API.
 *
 * @param {string} material - The material to query.
 * @param {string} startDate - The start date for the query.
 * @param {string} endDate - The end date for the query.
 */
export function runQuery(material, startDate, endDate) {
  const requestData = {
    material: material,
    startDate: startDate,
    endDate: endDate,
  };
  const queryParams = new URLSearchParams(requestData).toString();
  const apiUrl = `http://127.0.0.1:8000/api/v1/query/bigquery/?${queryParams}`;

  return fetch(apiUrl);
}
