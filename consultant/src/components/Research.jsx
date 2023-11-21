import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/Research.css";
import { runQuery } from "../utils/runQuery.js";
import Save from "./Save";
import { FormGroup, Input, Label, Form, Button } from "reactstrap";

/**
 * Handles the submit event for the form.
 *
 * @param {Event} e - The submit event object.
 * @return {void} This function does not return anything.
 */

function Research(props) {
  const [inputMaterial, setinputMaterial] = useState("ALL");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  //const [inputCheck, setinputCheck] = useState(false);
  const [user, setUser] = useState();
  const [comments, setComments] = useState();
  const [title, setTitle] = useState();

  /**
   * Handles the submit event for the form.
   *
   * @param {Event} e - The submit event object.
   * @return {void} This function does not return anything.
   */
  const hadleSubmit = (e) => {
    e.preventDefault();
    const run = runQuery(inputMaterial, startDate, endDate);
    //   handleSubmit(e);
    props.setLoading(true);
    run
      .then((response) => response.json())
      .then((data) => {
        props.fillData(data);
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      })
      .finally(() => {
        props.setLoading(false);
      });
  };
  useEffect(() => {
    if (props.responseOneQuery.material) {
      setinputMaterial(props.responseOneQuery.material);
    }
    if (props.responseOneQuery.start_date) {
      setStartDate(props.responseOneQuery.start_date);
    }
    if (props.responseOneQuery.end_date) {
      setEndDate(props.responseOneQuery.end_date);
    }

    if (props.responseOneQuery?.commentid_id?.user) {
      setUser(props.responseOneQuery?.commentid_id?.user);
    }
    if (props.responseOneQuery?.commentid_id?.description) {
      setComments(props.responseOneQuery?.commentid_id?.description);
    }
    if (props?.responseOneQuery?.query_name) {
      setTitle(props?.responseOneQuery?.query_name);
    }
  }, [
    props.responseOneQuery.material,
    props.responseOneQuery.start_date,
    props.responseOneQuery.end_date,
    props.responseOneQuery,
  ]);

  return (
    <div className="container-research">
      <Form onSubmit={hadleSubmit}>
        <FormGroup>
          <Label for="exampleSelect">Select material</Label>
          <Input
            name="material"
            id="material"
            type="select"
            onChange={(e) => setinputMaterial(e.target.value)}
          >
            <option value="ALL" selected={inputMaterial === "ALL"}>
              All material
            </option>
            <option value="PAPER" selected={inputMaterial === "PAPER"}>
              Paper
            </option>
            <option value="MATTRESS" selected={inputMaterial === "MATTRESS"}>
              Mattress
            </option>
            <option value="ANIMAL" selected={inputMaterial === "ANIMAL"}>
              Animal Dead
            </option>
            <option value="COMIGLE" selected={inputMaterial === "COMIGLE"}>
              Comingle
            </option>
            <option value="ORGANICS" selected={inputMaterial === "ORGANICS"}>
              Organics
            </option>
            <option value="SWEEPING" selected={inputMaterial === "SWEEPING"}>
              Sweeping
            </option>
          </Input>
        </FormGroup>

        <FormGroup>
          <Label for="Date">Date initial</Label>
          <Input
            id="initialDate"
            name="initialdate"
            placeholder="date placeholder"
            type="date"
            required
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <br />
          <Label for="Date end">Date end</Label>
          <Input
            id="endDate"
            name="enddate"
            placeholder="date placeholder"
            type="date"
            required
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </FormGroup>

        <div className="d-flex justify-content-center align-items-center">
          <Button color="success">Run Query</Button>
        </div>
        <br />
      </Form>
      <div className="container-save">
        <Save
          user={user}
          setUser={setUser}
          setComments={setComments}
          comments={comments}
          setTitle={setTitle}
          title={title}
          material={inputMaterial}
          startDate={startDate}
          endDate={endDate}
        />
      </div>
    </div>
  );
}

export default Research;
