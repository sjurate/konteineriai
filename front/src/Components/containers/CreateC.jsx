import React, { useState, useContext } from "react";
import { useEffect } from "react";
import ContainersContext from "../../Contexts/ContainersContext";
import MessagesContext from "../../Contexts/MessagesContext";
import sizes from "../../data/sizes";
import rand from "../../Functions/rand";

const CreateC = () => {
  const [number, setNumber] = useState("");
  const [size, setSize] = useState("");

  const { setCreateData } = useContext(ContainersContext);
  const { setMsg } = useContext(MessagesContext);

  const addContainer = () => {
    if (number === "") {
      setMsg("Container number required");
      return;
    } else {
      setCreateData({
        number,
        size,
      });
      setNumber("");
      setSize("");
    }
  };

  useEffect(() => {
    let n = rand(100000, 999999);
    setNumber(n);
  }, []);

  return (
    <div className="card m-4">
      <h5 className="card-header">Add new container</h5>
      <div className="card-body">
        <div className="mb-3">
          <label className="form-label">Number</label>
          <div>{number ? number : "###"}</div>
        </div>
        <div className="mb-3 size-select">
          <label className="form-label">Size</label>
          <select value={size} onChange={(e) => setSize(e.target.value)}>
            <option>Choose size</option>
            {sizes.map((size, i) => (
              <option key={i} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={addContainer}
          type="button"
          className="btn btn-outline-success"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default CreateC;
