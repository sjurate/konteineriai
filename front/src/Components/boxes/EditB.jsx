import React, { useState, useContext, useEffect, useRef } from "react";
import getBase64 from "../../Functions/getBase64";
import BoxesContext from "../../Contexts/BoxesContext";
import MessagesContext from "../../Contexts/MessagesContext";

const EditB = () => {
  const [item_title, setItem_title] = useState("");
  const [weight, setWeight] = useState("");
  const [flammable, setFlammable] = useState("");
  const [short_term, setShort_term] = useState("");
  const [container_id, setContainer_id] = useState("");
  const [photoPrint, setPhotoPrint] = useState(null);
  const [deletePhoto, setDeletePhoto] = useState(false);
  const fileInput = useRef();

  const { setEditData, setModalData, modalData, containers } =
    useContext(BoxesContext);
  const { setMsg } = useContext(MessagesContext);

  const handlePhoto = () => {
    getBase64(fileInput.current.files[0])
      .then((photo) => setPhotoPrint(photo))
      .catch((_) => {
        //tylim
      });
  };

  const editBox = () => {
    if (item_title.length === 0 || item_title.length > 50) {
      setMsg("Invalid title");
      return;
    }
    setEditData({
      id: modalData.id,
      weight,
      item_title,
      flammable,
      short_term,
      image: photoPrint,
      container_id,
      deletePhoto: deletePhoto ? 1 : 0,
    });
    setModalData(null);
    setDeletePhoto(false);
  };

  useEffect(() => {
    if (modalData === null) {
      return;
    }
    setItem_title(modalData.item_title);
    setWeight(modalData.weight);
    setFlammable(modalData.flammable);
    setShort_term(modalData.short_term);
    setContainer_id(modalData.container_id);
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
            <h5 className="modal-title">Edit box</h5>
            <button
              onClick={() => setModalData(null)}
              type="button"
              className="btn-close"
            ></button>
          </div>
          <div className="card m-4">
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Item title</label>
                <input
                  type="text"
                  className="form-control"
                  value={item_title}
                  onChange={(e) => setItem_title(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Weight</label>
                <input
                  type="text"
                  className="form-control"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>{" "}
              <div className="mb-3">
                <label className="form-label">Is item FLAMMABLE?</label>
                <select
                  value={flammable}
                  onChange={(e) => setFlammable(e.target.value)}
                >
                  <option value={0}>No</option>
                  <option value={1}>Yes</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Is item short term?</label>
                <select
                  value={short_term}
                  onChange={(e) => setShort_term(e.target.value)}
                >
                  <option value={0}>No</option>
                  <option value={1}>Yes</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Choose container:</label>
                <select
                  value={container_id}
                  onChange={(e) => setContainer_id(e.target.value)}
                >
                  {containers.map((c, i) => (
                    <option key={i} value={c.container_id}>
                      {c.number}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Image of on item</label>
                <input
                  ref={fileInput}
                  type="file"
                  className="form-control"
                  onChange={handlePhoto}
                />
              </div>
              {photoPrint ? (
                <div className="img-bin">
                  <label htmlFor="image-delete">Delete image ?</label>
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
                onClick={editBox}
                type="button"
                className="btn btn-outline-success"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditB;
