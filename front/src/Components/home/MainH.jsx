import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import HomeContext from "../../Contexts/HomeContext";
import ListH from "./ListH";
import CreateH from "./CreateH";
import { authConfig } from "../../Functions/auth";

const MainH = () => {
  const [savivaldybes, setSavivaldybes] = useState(null);
  const [sritys, setSritys] = useState(null);
  const [komentarai, setKomentarai] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [createData, setCreateData] = useState(null);

  const filterOn = useRef(false);
  const filterWhat = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost:3003/home/savivaldybes", authConfig())
      .then((res) => {
        setSavivaldybes(res.data);
      });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3003/home/sritys", authConfig()).then((res) => {
      setSritys(res.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3003/home/komentarai", authConfig())
      .then((res) => {
        setKomentarai(res.data.map((d, i) => ({ ...d, show: true, row: i })));
        console.log(res.data);
      });
  }, [lastUpdate]);

  // CREATE KOMENTARAS

  useEffect(() => {
    if (createData === null) {
      return;
    }
    axios
      .post("http://localhost:3003/home/komentarai", createData, authConfig())
      .then((res) => {
        setLastUpdate(Date.now());
      });
    console.log(createData);
  }, [createData]);

  return (
    <HomeContext.Provider
      value={{
        komentarai,
        savivaldybes,
        sritys,
        setKomentarai,
        setCreateData,
        createData,
        filterOn,
        filterWhat,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col col-lg-10 col-md-10 col-sm-12">
            <CreateH savivaldybes={savivaldybes} />
          </div>
        </div>
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
