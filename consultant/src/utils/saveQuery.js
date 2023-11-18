export function saveQuery(
  inputMaterial,
  startDate,
  endDate,
  user,
  comments,
  title
) {
  const data = {
    query_name: title,
    material: inputMaterial,
    start_date: startDate,
    end_date: endDate,
    user: user,
    description: comments,
  };

  const apiUrl = "http://127.0.0.1:8000/api/v1/query/localquery/";

  return fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
