import React, { useState, useEffect } from "react";
import axios from "axios";
import BoxesContext from "../../Contexts/BoxesContext";
import CreateB from "./CreateB";
import ListB from "./ListB";
import EditB from "./EditB";
import { authConfig } from "../../Functions/auth";

const MainB = () => {
  const [boxes, setBoxes] = useState(null);
  const [containers, setContainers] = useState(null);
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
      .post("http://localhost:3003/home/boxes", createData, authConfig())
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [createData]);

  // READ ITEMS

  useEffect(() => {
    axios.get("http://localhost:3003/home/boxes", authConfig()).then((res) => {
      setBoxes(res.data);
    });
  }, [lastUpdate]);

  // READ CONTAINERS

  useEffect(() => {
    axios
      .get("http://localhost:3003/home/containers", authConfig())
      .then((res) => {
        setContainers(res.data);
      });
  }, [lastUpdate]);

  // UPDATE ITEM

  useEffect(() => {
    if (editData === null) {
      return;
    }
    axios
      .put(
        "http://localhost:3003/home/boxes/" + editData.id,
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
      .delete("http://localhost:3003/home/boxes/" + deleteData.id, authConfig())
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [deleteData]);

  return (
    <BoxesContext.Provider
      value={{
        setCreateData,
        boxes,
        containers,
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
            <CreateB />
          </div>
          <div className="col col-lg-8 col-md-12 col-sm-12">
            <ListB />
          </div>
        </div>
      </div>
      <EditB />
    </BoxesContext.Provider>
  );
};

export default MainB;
