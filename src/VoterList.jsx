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
  let uc = React.createRef();
  const [voters, setVoters] = useState([]);
  const [scheme, setScheme] = useState([]);
  const [selectedUv, setSelectedUv] = useState("uc-2 OR.json");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    console.log("Use Effect");
    setIsLoading(true);
    fetch(selectedUv).then((response) => {
      response.json().then((data) => setVoterList(data));
      setIsLoading(false);
    });

    fetch("Scheme.json").then((response) => {
      // setVoterList(response);
      response.json().then((data) => setSchemeList(data));
    });
  }, [selectedUv]);

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
  function selectUc() {
    setSelectedUv(uc.current.value);
  }
  return (
    <div style={{ margin: "30px 10px" }}>
      <span>Select UC </span>
      <select ref={uc} onChange={selectUc}>
        <option value="uc-2 OR.json">UC-2 Orangi</option>
        <option value="uc-3 OR.json">UC-3 Orangi</option>
        <option value="uc-4 OR.json">UC-4 Orangi</option>
        <option value="uc-6 OR.json">UC-6 Orangi</option>
        <option value="uc-7 OR.json">UC-7 Orangi</option>
        <option value="uc-14 MP.json">UC-14 manghopir</option>
        <option value="uc-3 NK.json">UC-3 North Karachi</option>
        <option value="uc-12 NK.json">UC-12 North Karachi</option>
        <option value="uc-5 DV.json">UC-5 Defence View</option>
      </select>
      <span style={{ display: isLoading == true ? "block" : "none" }}>
        Loading...
      </span>
      <br></br>
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
