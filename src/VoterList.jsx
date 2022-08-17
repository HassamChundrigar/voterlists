import React, { useState, useEffect } from "react";
import "./VoterList.css";

const inputStyle = {
  margin: "50px",
};
const VoterList = () => {
  const [voterList, setVoterList] = useState([]);
  const [schemeList, setSchemeList] = useState([]);
  let cnic = React.createRef();
  let block = React.createRef();
  const [voters, setVoters] = useState([]);
  const [scheme, setScheme] = useState([]);
  useEffect(() => {
    console.log("Use Effect");
    fetch(
      "https://storage.googleapis.com/staging.voterlists.appspot.com/static/Data.json",
      { mode: "no-cors" }
    ).then((response) => {
      // setVoterList(response);
      response.json().then((data) => setVoterList(data));
    });
    fetch("Scheme.json").then((response) => {
      // setVoterList(response);
      response.json().then((data) => setSchemeList(data));
    });
  }, []);

  function searchByCnic() {
    const cnicVal = cnic.current.value;
    setVoters(
      voterList
        .filter((x) => x.cnic.toString().indexOf(cnicVal.toString()) > -1)
        .slice(0, 5)
    );
  }
  function searchByBlock() {
    const blockVal = block.current.value;
    setScheme(
      schemeList
        .filter((x) => x.block.toString().indexOf(blockVal.toString()) > -1)
        .slice(0, 5)
    );
  }
  return (
    <div style={{ margin: "30px 10px" }}>
      <input
        ref={cnic}
        placeholder="Search by cnic: 13 digits"
        style={{ margin: "5px", fontSize: 16 }}
        type="number"
      />
      <button style={{ fontSize: 16 }} onClick={searchByCnic}>
        search
      </button>
      <div style={{ overflowX: "auto", margin: "20px 10px" }}>
        <table>
          <thead>
            <tr>
              <th>NAME</th>
              <th>FNAME</th>
              <th>CNIC</th>
              <th>BLOCK</th>
              <th>SILSILA</th>
              <th>GHARANA</th>
            </tr>
          </thead>
          <tbody>
            {voters.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.f_name}</td>
                <td>{item.cnic}</td>
                <td>{item.block}</td>
                <td>{item.silsila}</td>
                <td>{item.gharana}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <input
        ref={block}
        placeholder="Search by block: 9 digits"
        style={{ margin: "5px", fontSize: 16 }}
      />
      <button style={{ fontSize: 16 }} onClick={searchByBlock}>
        search
      </button>

      <div style={{ overflowX: "auto", margin: "20px 10px" }}>
        <table>
          <thead>
            <tr>
              <th>BLOCK</th>
              <th>ZILA</th>
              <th>UC</th>
              <th>WARD</th>
              <th>STATION</th>
              <th>MALE</th>
              <th>FEMALE</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {scheme.map((item, index) => (
              <tr key={index}>
                <td>{item.block}</td>
                <td>{item.Town}</td>
                <td>{item.uc}</td>
                <td>{item.ward}</td>
                <td>{item.station}</td>
                <td>{item.Male}</td>
                <td>{item.Female}</td>
                <td>{item.Total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default VoterList;
