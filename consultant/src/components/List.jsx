import React from "react";
import "../styles/List.css";
import { Table } from "reactstrap";
import { showOneQuery } from "../utils/showOneQuery";
function List(props) {
  const hadleSubmit = (k, e) => {
    // e.preventDefault();
    const showQuery = showOneQuery(k);
    console.log(showQuery);
    //   handleSubmit(e);
    //props.setLoading(true);
    showQuery
      .then((response) => response.json())
      .then((data) => {
        props.oneQueryResponse(data);
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      })
      .finally(() => {
        // props.setLoading(false);
      });
  };
  return (
    <div className="container-Lists">
      <div className="justify-content-center align-items-center">
        <Table>
          <thead>
            <tr>
              <th>User</th>
              <th>Name query </th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.responseList.map((item) => (
              <tr key={item.id}>
                <td className="table-secondary">{item.user}</td>
                <td className="table-secondary">{item.query_name}</td>
                <td className="table-secondary">{item.description}</td>
                <td
                  className="table-secondary bg-success"
                  onClick={() => hadleSubmit(item.id)}
                >
                  Load
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default List;
