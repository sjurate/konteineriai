import React, { useContext } from "react";
import BoxesContext from "../../Contexts/BoxesContext";

const LineB = ({ box }) => {
  const { setDeleteData, setModalData, setCountData } =
    useContext(BoxesContext);

  const deleteBox = () => {
    setDeleteData(box);
    setCountData({ id: box.container_id, num: Number(-1) });
  };

  return (
    <li className="list-group-item">
      <div className="line__content">
        <div className="line__content__savivaldybe">
          <div className="line__image">
            {box.image ? (
              <img
                className="line__image"
                src={box.image}
                alt={box.item_title}
              ></img>
            ) : (
              <span className="red-image">No image</span>
            )}
          </div>
          <div className="line__content__info">
            <h3 className="line__content__title">{box.item_title}</h3>
            <div>Weight {box.weight} kg</div>
            <div>Flammable? {box.flammable ? "True" : "False"}</div>
            <div>Short term? {box.short_term ? "True" : "False"}</div>
            <div>Container: {box.container_id}</div>
          </div>
          <div className="btn__box">
            <button
              type="button"
              className="btn btn-outline-success"
              onClick={() => setModalData(box)}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={deleteBox}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default LineB;
