import React from "react";
import "../styles/Title.css";
import { Button } from "reactstrap";
import { listQueries } from "../utils/listQueries";

/**
 * Handles the submit event of the form to list queries.
 *
 * @param {object} props
 * @return {void}
 */
function ListTitle(props) {
  const hadleSubmit = (e) => {
    e.preventDefault();
    const listOfQueries = listQueries();
    listOfQueries
      .then((response) => response.json())
      .then((data) => {
        props.listResponse(data);
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      })
      .finally(() => {
        // props.setLoading(false);
      });
  };

  return (
    <div className="container-title">
      <Button color="success" type="submit" onClick={hadleSubmit}>
        List Queries
      </Button>
    </div>
  );
}

export default ListTitle;
