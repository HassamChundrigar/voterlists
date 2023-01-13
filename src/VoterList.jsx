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
  let cnicGharana = React.createRef();
  let uc = React.createRef();
  const [voters, setVoters] = useState([]);
  const [scheme, setScheme] = useState([]);
  const [votersGharana, setVotersGharana] = useState([]);
  const [selectedUv, setSelectedUv] = useState("UC-1OR.json");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch("https://storage.googleapis.com/voterlists/"+selectedUv).then((response) => {
      response.json().then((data) => {
        setVoterList(data)
      });
      setIsLoading(false);
    });

     fetch("https://storage.googleapis.com/voterlists/Scheme.json").then((response) =>{
      response.json().then((data)=>{
        setSchemeList(data)})
     });

  }, [selectedUv]);

  function searchByCnic() {
    const cnicVal = cnic.current.value;
    const temp_voters = voterList
      .filter((x) => x.cnic.toString().indexOf(cnicVal.toString()) > -1)
      .slice(0, 5);

    for (var i = 0; i < temp_voters.length; i++) {
      const temp_scheme = schemeList.filter(
        (x) => x.block.toString().indexOf(temp_voters[i].block.toString()) > -1
      );
      if (temp_scheme.length > 0) {
        var station = ''
        var booth = ''
        temp_scheme.forEach((tmp) =>{
          if((tmp.Male > 0) & (tmp.Female > 0)){
            station+= '(M,F) '
          }
          else if(tmp.Male >0){
            station+= '(M) '
          }
          else if(tmp.Female >0){
            station+= '(F) '
          }
          station+= tmp.station +', '
          booth += tmp.booth+ ', '
        })
        temp_voters[i]["station"] = station;
        temp_voters[i]["booth"] = booth;
      }
    }

    setVoters(
      temp_voters
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
  function searchByCnicGharana() {
    const tempCnicVal = cnicGharana.current.value;
    var tempVoters = voterList
      .filter((x) => x.cnic.toString() === tempCnicVal.toString())
      .slice(0, 1);

    if (tempVoters.length > 0) {
      tempVoters = voterList.filter(
        (x) =>
          x.gharana.toString() === tempVoters[0].gharana.toString() &&
          x.block.toString() === tempVoters[0].block.toString()
      );
    }
    for (var i = 0; i < tempVoters.length; i++) {
      const temp_scheme = schemeList.filter(
        (x) => x.block.toString().indexOf(tempVoters[i].block.toString()) > -1
      );
      if (temp_scheme.length > 0) {
        var station = ''
        var booth = ''
        temp_scheme.forEach((tmp) =>{
          if((tmp.Male > 0) & (tmp.Female > 0)){
            station+= '(M,F) '
          }
          else if(tmp.Male >0){
            station+= '(M) '
          }
          else if(tmp.Female >0){
            station+= '(F) '
          }
          station+= tmp.station +', '
          booth += tmp.booth+ ', '
        })
        tempVoters[i]["station"] = station;
        tempVoters[i]["booth"] = booth;
      }
    }

    setVotersGharana(tempVoters);
  }
  function selectUc() {
    setSelectedUv(uc.current.value);
  }
  return (
    <div id="main_div">
      <div className="userbox">
        <span>Select UC </span>
        <select ref={uc} onChange={selectUc}>
          <option value="UC-1OR.json">UC-1 Orangi</option>
          <option value="UC-2OR.json">UC-2 Orangi</option>
          <option value="UC-3OR.json">UC-3 Orangi</option>
          {/* <option value="UC-4OR.json">UC-4 Orangi</option> */}
          <option value="UC-5OR.json">UC-5 Orangi</option>
          <option value="UC-6OR.json">UC-6 Orangi</option>
          <option value="UC-7OR.json">UC-7 Orangi</option>
          {/* <option value="UC-14MP.json">UC-14 manghopir</option> */}
          <option value="UC-3NK.json">UC-3 North Karachi</option>
          <option value="UC-12NK.json">UC-12 North Karachi</option>
          <option value="UC-5DV.json">UC-5 Defence View</option>
        </select>
        <span style={{ display: isLoading == true ? "block" : "none" }}>
          Loading...
        </span>
      </div>
      <div className="userbox">
        <input
          ref={cnic}
          placeholder="شناختی کارڈ سے تلاش کریں"
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
                <th>سلسلہ</th>
                <th>گھرانہ</th>
                <th>نام</th>
                <th>شناختی کارڈ</th>
                <th>بلاک کوڈ</th>
                <th>پولنگ اسٹیشن</th>
                <th>بوتھ نمبر</th>
              </tr>
            </thead>
            <tbody>
              {voters.map((item, index) => (
                <tr key={index}>
                  <td>{item.silsila}</td>
                  <td>{item.gharana}</td>
                  <td>{item.name}</td>
                  <td>{item.cnic}</td>
                  <td>{item.block}</td>
                  <td>{item.station}</td>
                  <td>{item.booth}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="userbox">
        <input
          ref={block}
          placeholder="بلاک کوڈ سے تلاش کریں"
          style={{ margin: "5px", fontSize: 16 }}
        />
        <button style={{ fontSize: 16 }} onClick={searchByBlock}>
          search
        </button>

        <div style={{ overflowX: "auto", margin: "20px 10px" }}>
          <table>
            <thead>
              <tr>
                <th>بلاک کوڈ</th>
                <th>ضلع</th>
                <th>یوسی</th>
                <th>وارڈ</th>
                <th>پولنگ اسٹیشن</th>
                <th>بوتھ نمبر</th>
                <th>مرد </th>
                <th>خواتین </th>
                <th>ٹوٹل</th>
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
                  <td>{item.booth}</td>
                  <td>{item.Male}</td>
                  <td>{item.Female}</td>
                  <td>{item.Total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="userbox">
        <input
          ref={cnicGharana}
          placeholder="شناختی کارڈ سے گھرانہ تلاش کریں"
          style={{ margin: "5px", fontSize: 16 }}
          type="number"
        />
        <button style={{ fontSize: 16 }} onClick={searchByCnicGharana}>
          search
        </button>
        <div style={{ overflowX: "auto", margin: "20px 10px" }}>
          <table>
            <thead>
              <tr>
                <th>سلسلہ</th>
                <th>گھرانہ</th>
                <th>نام</th>
                <th>شناختی کارڈ</th>
                <th>بلاک کوڈ</th>
                <th>پولنگ اسٹیشن</th>
                <th>بوتھ نمبر</th>
              </tr>
            </thead>
            <tbody>
              {votersGharana.map((item, index) => (
                <tr key={index}>
                  <td>{item.silsila}</td>
                  <td>{item.gharana}</td>
                  <td>{item.name}</td>
                  <td>{item.cnic}</td>
                  <td>{item.block}</td>
                  <td>{item.station}</td>
                  <td>{item.booth}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default VoterList;
