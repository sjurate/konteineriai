import React, { useState, useEffect } from "react";
import axios from "axios";
import SritisContext from "../../Contexts/SritisContext";
import CreateSritis from "./CreateSritis";
import ListSritis from "./ListSritis";
import EditSritis from "./EditSritis";
import { authConfig } from "../../Functions/auth";

const MainSritis = () => {
  const [sritys, setSritys] = useState(null);
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
      .post("http://localhost:3003/home/sritys", createData, authConfig())
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [createData]);

  // READ ITEMS

  useEffect(() => {
    axios.get("http://localhost:3003/home/sritys", authConfig()).then((res) => {
      setSritys(res.data);
    });
  }, [lastUpdate]);

  // UPDATE ITEM

  useEffect(() => {
    if (editData === null) {
      return;
    }
    axios
      .put(
        "http://localhost:3003/home/sritys/" + editData.id,
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
        "http://localhost:3003/home/sritys/" + deleteData.id,
        authConfig()
      )
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [deleteData]);

  return (
    <SritisContext.Provider
      value={{
        setCreateData,
        sritys,
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
            <CreateSritis />
          </div>
          <div className="col col-lg-8 col-md-12 col-sm-12">
            <ListSritis />
          </div>
        </div>
      </div>
      <EditSritis />
    </SritisContext.Provider>
  );
};

export default MainSritis;
