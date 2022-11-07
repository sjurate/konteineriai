import React, { useState, useEffect } from "react";
import axios from "axios";
import SavContext from "../../Contexts/SavContext";
import CreateSav from "./CreateSav";
import ListSav from "./ListSav";
import EditSav from "./EditSav";
import { authConfig } from "../../Functions/auth";

const MainC = () => {
  const [savivaldybes, setSavivaldybes] = useState(null);
  const [createData, setCreateData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [editData, setEditData] = useState(null);

  const [lastUpdate, setLastUpdate] = useState(Date.now());

  // CREATE ITEM

  useEffect(() => {
    if (createData === null) {
      return;
    }
    axios
      .post("http://localhost:3003/home/savivaldybes", createData, authConfig())
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [createData]);

  // READ ITEMS

  useEffect(() => {
    axios
      .get("http://localhost:3003/home/savivaldybes", authConfig())
      .then((res) => {
        setSavivaldybes(res.data);
      });
  }, [lastUpdate]);

  // UPDATE ITEM

  useEffect(() => {
    if (editData === null) {
      return;
    }
    axios
      .put(
        "http://localhost:3003/home/savivaldybes/" + editData.id,
        editData,
        authConfig()
      )
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [editData]);

  // DELETE ITEM

  useEffect(() => {
    if (deleteData === null) {
      return;
    }
    axios
      .delete(
        "http://localhost:3003/home/savivaldybes/" + deleteData.id,
        authConfig()
      )
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [deleteData]);

  return (
    <SavContext.Provider
      value={{
        setCreateData,
        savivaldybes,
        setDeleteData,
        setEditData,
        editData,
        setModalData,
        modalData,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col col-lg-4 col-md-12">
            <CreateSav />
          </div>
          <div className="col col-lg-8 col-md-12 col-sm-12">
            <ListSav />
          </div>
        </div>
      </div>
      <EditSav />
    </SavContext.Provider>
  );
};

export default MainC;
