import React, { useState, useEffect } from "react";
import axios from "axios";
import KomentaraiContext from "../../Contexts/KomentaraiContext";
import ListKom from "./ListKom";
import { authConfig } from "../../Functions/auth";

const MainKomentarai = () => {
  const [komentarai, setKomentarai] = useState(null);
  const [komentaras, setKomentaras] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  useEffect(() => {
    axios
      .get("http://localhost:3003/server/komentarai", authConfig())
      .then((res) => {
        setKomentarai(res.data.map((d, i) => ({ ...d, show: true, row: i })));
      });
  }, [lastUpdate]);

  // UPDATE KOMENTARAS (for admin)

  useEffect(() => {
    if (komentaras === null) {
      return;
    }
    axios
      .put(
        "http://localhost:3003/home/komentarai/" + komentaras.id,
        komentaras,
        authConfig()
      )
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [komentaras]);

  // DELETE KOMENTARAS (for admin)

  useEffect(() => {
    if (deleteData === null) {
      return;
    }
    axios
      .delete(
        "http://localhost:3003/server/komentarai/" + deleteData.id,
        authConfig()
      )
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [deleteData]);

  return (
    <KomentaraiContext.Provider
      value={{
        setKomentaras,
        komentarai,
        setKomentarai,
        setDeleteData,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col col-lg-10 col-md-12 col-sm-12">
            <ListKom />
          </div>
        </div>
      </div>
    </KomentaraiContext.Provider>
  );
};

export default MainKomentarai;
