//import React, { useState } from "react";
import { saveQuery } from "../utils/saveQuery.js";
import { FormGroup, Input, Label, Form, Button } from "reactstrap";

/**
 * Handles the submission of the save form.
 *
 * @param {object} props - The props object containing the input material, start date, end date, user, comments, and title.
 * @return {void}
 */
function Save(props) {
  const hadleSubmitSave = (e) => {
    e.preventDefault();

    const querySave = saveQuery(
      props.material,
      props.startDate,
      props.endDate,
      props.user,
      props.comments,
      props.title
    );
    querySave
      .then((response) => response.json())
      .then((data) => {
        // Realiza alguna acción con los datos devueltos
        console.log("Data:", data);
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
  };

  return (
    <div className="container-save">
      <Form onSubmit={hadleSubmitSave}>
        <FormGroup>
          <Label for="user">User</Label>
          <Input
            id="user"
            name="user"
            placeholder="User"
            type="text"
            required
            value={props?.user}
            onChange={(e) => props?.setUser(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="comment">Title</Label>
          <Input
            id="comment"
            name="comment"
            placeholder="Title"
            type="text"
            required
            value={props?.title}
            onChange={(e) => props.setTitle(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="comment">Comments</Label>
          <Input
            id="comment"
            name="comment"
            placeholder="Write your comments"
            type="text"
            required
            value={props?.comments}
            onChange={(e) => props.setComments(e.target.value)}
          />
        </FormGroup>
        <div className="d-flex justify-content-center align-items-center">
          <Button color="success" type="submit">
            Save Query
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Save;
