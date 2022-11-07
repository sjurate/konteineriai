import React, { useContext } from "react";
import ContainersContext from "../../Contexts/ContainersContext";

const LineC = ({ container }) => {
  const { setDeleteData, setModalData } = useContext(ContainersContext);

  return (
    <li className="list-group-item">
      <div className="line">
        <div className="line__content">
          <div className="line__content__info">
            <h3 className="line__content__title">{container.number}</h3>
            <div className="btn__box">
              <button
                type="button"
                className="btn btn-outline-success"
                onClick={() => setModalData(container)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => setDeleteData(container)}
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

export default LineC;
