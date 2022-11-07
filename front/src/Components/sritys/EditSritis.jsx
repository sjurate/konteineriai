import React, { useState, useContext, useEffect } from "react";
import SritisContext from "../../Contexts/SritisContext";
import MessagesContext from "../../Contexts/MessagesContext";

const EditC = () => {
  const [title, setTitle] = useState("");

  const { setEditData, setModalData, modalData } = useContext(SritisContext);
  const { setMsg } = useContext(MessagesContext);

  const editSritis = () => {
    if (title.length === 0 || title.length > 50) {
      setMsg("Invalid title");
      return;
    }

    setEditData({
      id: modalData.id,
      title,
    });
    setModalData(null);
  };

  useEffect(() => {
    if (modalData === null) {
      return;
    }
    setTitle(modalData.title);
  }, [modalData]);

  if (modalData === null) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Koreguoti sritį</h5>
            <button
              onClick={() => setModalData(null)}
              type="button"
              className="btn-close"
            ></button>
          </div>
          <div className="card m-4">
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
                onClick={editSritis}
                type="button"
                className="btn btn-outline-success"
              >
                Išsaugoti
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditC;
