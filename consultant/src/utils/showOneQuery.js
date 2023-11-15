export function showOneQuery(key) {
  alert(key);

  const apiUrl = `http://127.0.0.1:8000/api/v1/query/localquery/${key}`;

  return fetch(apiUrl);
}
