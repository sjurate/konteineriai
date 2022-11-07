import React, { useContext } from "react";
import SavContext from "../../Contexts/SavContext";

const LineSav = ({ savivaldybe }) => {
  const { setDeleteData, setModalData } = useContext(SavContext);

  return (
    <li className="list-group-item">
      <div className="line__content">
        <div className="line__content__savivaldybe">
          <div className="line__image">
            {savivaldybe.image ? (
              <img
                className="line__image"
                src={savivaldybe.image}
                alt={savivaldybe.title}
              ></img>
            ) : (
              <span className="red-image">No image</span>
            )}
          </div>
          <div className="line__content__info">
            <h3 className="line__content__title">{savivaldybe.title}</h3>
            <div className="btn__box">
              <button
                type="button"
                className="btn btn-outline-success"
                onClick={() => setModalData(savivaldybe)}
              >
                Koreguoti
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => setDeleteData(savivaldybe)}
              >
                Ištrinti
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default LineSav;
