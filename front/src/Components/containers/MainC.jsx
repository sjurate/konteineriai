import React, { useState, useEffect } from "react";
import axios from "axios";
import ContainersContext from "../../Contexts/ContainersContext";
import CreateC from "./CreateC";
import ListC from "./ListC";
import EditC from "./EditC";
import { authConfig } from "../../Functions/auth";

const MainC = () => {
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
      .post("http://localhost:3003/home/containers", createData, authConfig())
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [createData]);

  // READ ITEMS

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
        "http://localhost:3003/home/containers/" + editData.id,
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
        "http://localhost:3003/home/containers/" + deleteData.id,
        authConfig()
      )
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [deleteData]);

  return (
    <ContainersContext.Provider
      value={{
        setCreateData,
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
            <CreateC />
          </div>
          <div className="col col-lg-8 col-md-12 col-sm-12">
            <ListC />
          </div>
        </div>
      </div>
      <EditC />
    </ContainersContext.Provider>
  );
};

export default MainC;
