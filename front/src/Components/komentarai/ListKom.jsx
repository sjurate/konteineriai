import React, { useContext, useEffect, useState } from "react";
import KomentaraiContext from "../../Contexts/KomentaraiContext";
import LineKom from "./LineKom";

const ListKom = () => {
  const { komentarai, setKomentarai } = useContext(KomentaraiContext);

  const [status, setStatus] = useState("3");

  console.log(komentarai);

  useEffect(() => {
    if (Number(status) === 3) {
      setKomentarai((prevKom) => prevKom?.map((k) => ({ ...k, show: true })));
    } else {
      setKomentarai((prevKom) =>
        prevKom?.map((k) =>
          Number(k.status) === Number(status)
            ? { ...k, show: true }
            : { ...k, show: false }
        )
      );
    }
    console.log(status);
  }, [status, setKomentarai]);

  return (
    <>
      <div className="card m-4">
        <h5 className="card-header">Filtruoti</h5>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">
              Rūšiuoti pagal patvirtinimo statusą:
            </label>
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value={3} defaultValue>
                Visi
              </option>
              <option value={0}>Nepatvirtinti</option>
              <option value={1}>Patvirtinti</option>
            </select>
          </div>
        </div>
      </div>
      <div className="card m-4">
        <h5 className="card-header">Parašyti komentarai:</h5>

        <ul className="list-group">
          {komentarai?.map((k) =>
            k.show ? <LineKom key={k.id} komentaras={k} /> : null
          )}
        </ul>
      </div>
    </>
  );
};

export default ListKom;
