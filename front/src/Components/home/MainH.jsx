import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import HomeContext from "../../Contexts/HomeContext";
import ListH from "./ListH";
import { authConfig } from "../../Functions/auth";

const MainH = () => {
  const [containers, setContainers] = useState(null);
  // const [lastUpdate, setLastUpdate] = useState(Date.now());

  const filterOn = useRef(false);
  const filterWhat = useRef(null);

  const reList = (data) => {
    const d = new Map();
    data.forEach((line) => {
      if (d.has(line.id)) {
        d.set(line.id, [...d.get(line.id), line]);
      } else {
        d.set(line.id, [line]);
      }
    });
    return [...d];
  };

  // READ for list
  useEffect(() => {
    axios.get("http://localhost:3003/home/joined", authConfig()).then((res) => {
      console.log(reList(res.data));
      setContainers(reList(res.data));
    });
  }, []);

  return (
    <HomeContext.Provider
      value={{
        containers,
        filterOn,
        filterWhat,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col col-lg-10 col-md-12 col-sm-12">
            <ListH />
          </div>
        </div>
      </div>
    </HomeContext.Provider>
  );
};

export default MainH;
