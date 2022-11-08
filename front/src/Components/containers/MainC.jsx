import React, { useState, useEffect } from "react";
import axios from "axios";
import ContainersContext from "../../Contexts/ContainersContext";
import CreateC from "./CreateC";
import ListC from "./ListC";
import { authConfig } from "../../Functions/auth";

const MainC = () => {
  const [containers, setContainers] = useState(null);
  const [createData, setCreateData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [deleteBox, setDeleteBox] = useState(null);
  const [increaseData, setIncreaseData] = useState(null);

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

  // READ for list of containers and boxes in them

  useEffect(() => {
    axios.get("http://localhost:3003/home/joined", authConfig()).then((res) => {
      setContainers(reList(res.data));
    });
  }, [lastUpdate]);

  // DELETE CONTAINER

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

  // DELETE BOX

  useEffect(() => {
    if (deleteBox === null) {
      return;
    }
    console.log(deleteBox);
    axios
      .delete("http://localhost:3003/home/boxes/" + deleteBox.bid, authConfig())
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [deleteBox]);

  // UPDATE item_count in container

  useEffect(() => {
    if (deleteBox === null) {
      return;
    }
    axios
      .put(
        "http://localhost:3003/home/containers/" + deleteBox.id,
        deleteBox,
        authConfig()
      )
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [deleteBox]);

  return (
    <ContainersContext.Provider
      value={{
        setCreateData,
        containers,
        setDeleteData,
        setEditData,
        editData,
        deleteBox,
        setDeleteBox,
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
    </ContainersContext.Provider>
  );
};

export default MainC;
