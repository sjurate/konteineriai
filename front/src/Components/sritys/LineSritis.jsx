import React, { useContext } from "react";
import SritisContext from "../../Contexts/SritisContext";

const LineSritis = ({ sritis }) => {
  const { setDeleteData, setModalData } = useContext(SritisContext);

  return (
    <li className="list-group-item">
      <div className="line">
        <div className="line__content">
          <div className="line__content__info">
            <h3 className="line__content__title">{sritis.title}</h3>
            <div className="btn__box">
              <button
                type="button"
                className="btn btn-outline-success"
                onClick={() => setModalData(sritis)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => setDeleteData(sritis)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default LineSritis;
