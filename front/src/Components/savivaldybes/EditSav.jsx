import React, { useState, useContext, useEffect, useRef } from "react";
import getBase64 from "../../Functions/getBase64";
import SavContext from "../../Contexts/SavContext";
import MessagesContext from "../../Contexts/MessagesContext";

const EditSav = () => {
  const [title, setTitle] = useState("");
  const [photoPrint, setPhotoPrint] = useState(null);
  const [deletePhoto, setDeletePhoto] = useState(false);
  const fileInput = useRef();

  const { setEditData, setModalData, modalData } = useContext(SavContext);
  const { setMsg } = useContext(MessagesContext);

  const handlePhoto = () => {
    getBase64(fileInput.current.files[0])
      .then((photo) => setPhotoPrint(photo))
      .catch((_) => {
        //tylim
      });
  };

  const editSavivaldybe = () => {
    if (title.length === 0 || title.length > 50) {
      setMsg("Invalid title");
      return;
    }
    setEditData({
      id: modalData.id,
      title,
      deletePhoto: deletePhoto ? 1 : 0,
      image: photoPrint,
    });
    setModalData(null);
    setDeletePhoto(false);
  };

  useEffect(() => {
    if (modalData === null) {
      return;
    }
    setTitle(modalData.title);
    setPhotoPrint(modalData.image);
    setDeletePhoto(false);
  }, [modalData]);

  if (modalData === null) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Koreguoti savivaldybę</h5>
            <button
              onClick={() => setModalData(null)}
              type="button"
              className="btn-close"
            ></button>
          </div>
          <div className="card m-4">
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Pavadinimas</label>
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Herbo nuotrauka</label>
                <input
                  ref={fileInput}
                  type="file"
                  className="form-control"
                  onChange={handlePhoto}
                />
              </div>
              {photoPrint ? (
                <div className="img-bin">
                  <label htmlFor="image-delete">Ištrinti nuotrauką</label>
                  <input
                    id="image-delete"
                    type="checkbox"
                    checked={deletePhoto}
                    onChange={() => setDeletePhoto((d) => !d)}
                  ></input>
                  <img src={photoPrint} alt="upload"></img>
                </div>
              ) : null}
              <button
                onClick={editSavivaldybe}
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

export default EditSav;
