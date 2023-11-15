import React, { useState } from "react";
import Research from "./components/Research";
import Header from "./components/Header";
import Graph from "./components/Graph";
import List from "./components/List";
import Title from "./components/graphTitle";
import ListTitle from "./components/ListTitle";
// import Save from "./components/Save";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [jsonData, setJsonData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [responseList, setResponseList] = useState([]);
  const [responseOneQuery, setResponseOneQuery] = useState([]);
  const fillData = (data) => setJsonData(data);
  const listResponse = (data) => setResponseList(data);
  const OneQueryResponse = (data) => setResponseOneQuery(data);
  console.log(responseOneQuery);
  return (
    <div className="App">
      <Header />
      <div className="container-details">
        <Research
          jsonData={jsonData}
          setJsonData={setJsonData}
          fillData={fillData}
          setLoading={setLoading}
          responseOneQuery={responseOneQuery}
        />

        <div className="container-list-graph">
          <Title />
          <Graph jsonData={jsonData} loading={loading} />

          <ListTitle listResponse={listResponse} />
          <List
            responseList={responseList}
            oneQueryResponse={OneQueryResponse}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
