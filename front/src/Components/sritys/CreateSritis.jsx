import React, { useState, useRef, useContext } from "react";
import SritisContext from "../../Contexts/SritisContext";
import MessagesContext from "../../Contexts/MessagesContext";

const CreateSritis = () => {
  const [title, setTitle] = useState("");

  const { setCreateData } = useContext(SritisContext);
  const { setMsg } = useContext(MessagesContext);

  const addSritis = () => {
    if (title.length === 0 || title.length > 30) {
      setMsg("Neteisingai įvedėte sritį");
      return;
    } else {
      setCreateData({
        title,
      });
      setTitle("");
    }
  };

  return (
    <div className="card m-4">
      <h5 className="card-header">Pridėti naują sritį</h5>
      <div className="card-body">
        <div className="mb-3">
          <label className="form-label">Srities pavadinimas</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <button
          onClick={addSritis}
          type="button"
          className="btn btn-outline-success"
        >
          Pridėti
        </button>
      </div>
    </div>
  );
};

export default CreateSritis;
