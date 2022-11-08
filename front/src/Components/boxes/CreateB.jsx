import React, { useState, useRef, useContext } from "react";
import BoxesContext from "../../Contexts/BoxesContext";
import MessagesContext from "../../Contexts/MessagesContext";
import getBase64 from "../../Functions/getBase64";

const CreateB = () => {
  const [item_title, setItem_title] = useState("");
  const [weight, setWeight] = useState("");
  const [flammable, setFlammable] = useState("");
  const [short_term, setShort_term] = useState("");
  const [container_id, setContainer_id] = useState("");
  const [photoPrint, setPhotoPrint] = useState(null);
  const fileInput = useRef();

  const { setCreateData, containers, setIncreaseData } =
    useContext(BoxesContext);
  const { setMsg } = useContext(MessagesContext);

  const handlePhoto = () => {
    getBase64(fileInput.current.files[0])
      .then((photo) => setPhotoPrint(photo))
      .catch((_) => {
        //tylim
      });
  };

  const addBox = () => {
    console.log(flammable);
    console.log(short_term);
    console.log(container_id);
    if (item_title.length === 0 || item_title.length > 30) {
      setMsg("Incorrect title of the item in the box");
      return;
    } else if (container_id === "" || short_term === "" || flammable === "") {
      setMsg("You must choose all properties from selections");
      return;
    }
    if (weight > 500 || weight < 1) {
      setMsg("Invalid weight. Allowed items from 1 kg to 500 kg");
      return;
    } else {
      setCreateData({
        weight,
        item_title,
        flammable: Number(flammable),
        short_term: Number(short_term),
        image: photoPrint,
        container_id,
      });
      setIncreaseData({
        id: container_id,
        num: 1,
      });
      setItem_title("");
      setWeight("");
      setFlammable("");
      setShort_term("");
      setContainer_id("");
      setPhotoPrint(null);
      fileInput.current.value = null;
    }
  };

  return (
    <div className="card m-4">
      <h5 className="card-header">Add a box</h5>
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
            type="number"
            className="form-control"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Is item FLAMMABLE?</label>
          <select
            value={flammable}
            onChange={(e) => setFlammable(e.target.value)}
          >
            <option>Choose from list</option>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Is item short term?</label>
          <select
            value={short_term}
            onChange={(e) => setShort_term(e.target.value)}
          >
            <option>Choose from list</option>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Choose container:</label>
          <select
            value={container_id}
            onChange={(e) => setContainer_id(e.target.value)}
          >
            <option>Choose from list</option>

            {containers?.map((c, i) => (
              <option key={i} value={c.id}>
                {c.id}
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
            <img src={photoPrint} alt="upload"></img>
          </div>
        ) : null}
        <button
          onClick={addBox}
          type="button"
          className="btn btn-outline-success"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default CreateB;
