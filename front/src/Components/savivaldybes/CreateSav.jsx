import React, { useState, useRef, useContext } from "react";
import SavContext from "../../Contexts/SavContext";
import MessagesContext from "../../Contexts/MessagesContext";
import getBase64 from "../../Functions/getBase64";

const CreateSav = () => {
  const [title, setTitle] = useState("");
  const [photoPrint, setPhotoPrint] = useState(null);
  const fileInput = useRef();

  const { setCreateData } = useContext(SavContext);
  const { setMsg } = useContext(MessagesContext);

  const handlePhoto = () => {
    getBase64(fileInput.current.files[0])
      .then((photo) => setPhotoPrint(photo))
      .catch((_) => {
        //tylim
      });
  };

  const addSavivaldybe = () => {
    if (title.length === 0 || title.length > 30) {
      setMsg("Neteisingai įvedėte pavadinimą");
      return;
    } else {
      setCreateData({
        title,
        image: photoPrint,
      });
      setTitle("");
      setPhotoPrint(null);
      fileInput.current.value = null;
    }
  };

  return (
    <div className="card m-4">
      <h5 className="card-header">Pridėti savivaldybę</h5>
      <div className="card-body">
        <div className="mb-3">
          <label className="form-label">Savivaldybės pavadinimas</label>
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
            <img src={photoPrint} alt="upload"></img>
          </div>
        ) : null}
        <button
          onClick={addSavivaldybe}
          type="button"
          className="btn btn-outline-success"
        >
          Pridėti
        </button>
      </div>
    </div>
  );
};

export default CreateSav;
