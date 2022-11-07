import React, { useContext } from "react";
import KomentaraiContext from "../../Contexts/KomentaraiContext";

const LineKom = ({ komentaras }) => {
  const { setKomentaras, setDeleteData } = useContext(KomentaraiContext);

  const approve = (id) => {
    setKomentaras({
      id,
      status: 1,
    });
  };

  const remove = (id) => {
    setDeleteData({ id });
  };

  return (
    <li key={komentaras.id} className="list-group-item">
      <div className="comment-id">Komentaras # {komentaras.id}</div>

      <div className="comment-details">
        <div>{komentaras.savivaldybeTitle}</div>
        <div>{komentaras.sritisTitle}</div>
      </div>
      <div className="comment-post">
        <div>{komentaras.post}</div>
      </div>
      <div className="comment-status">
        {komentaras.status === 0 ? (
          <div style={{ color: "crimson" }}>Nepatvirtintas</div>
        ) : (
          <div style={{ color: "green" }}>Patvirtintas</div>
        )}
      </div>
      {komentaras.status === 0 ? (
        <div className="btn__box">
          <button
            onClick={() => approve(komentaras.id)}
            type="button"
            className="btn btn-outline-success"
          >
            Patvirtinti
          </button>
          <button
            onClick={() => remove(komentaras.id)}
            type="button"
            className="btn btn-outline-danger"
          >
            Ištrinti
          </button>
        </div>
      ) : null}
    </li>
  );
};

export default LineKom;
