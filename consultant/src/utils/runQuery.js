// se llama al enponit de django para q me retorne los datos

/**
 * Runs a query using the provided parameters and fetches data from the API.
 *
 * @param {string} material - The material to query.
 * @param {string} startDate - The start date for the query.
 * @param {string} endDate - The end date for the query.
 * @param {boolean} check - A flag indicating whether to perform a check.
 */
export function runQuery(material, startDate, endDate, check) {
  alert(startDate);
  console.log(material, startDate, endDate, check);

  // Definir los datos que deseas enviar
  const requestData = {
    material: material,
    startDate: startDate,
    endDate: endDate,
    check: check,
  };

  // Construir la URL con parámetros
  const queryParams = new URLSearchParams(requestData).toString();
  const apiUrl = `http://127.0.0.1:8000/api/v1/query/bigquery/?${queryParams}`;

  return fetch(apiUrl);
}
