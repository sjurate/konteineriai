import React, { useContext, useEffect, useState } from "react";
import HomeContext from "../../Contexts/HomeContext";
import LineH from "./LineH";

const ListH = () => {
  const [savivaldybeId, setSavivaldybeId] = useState(0);
  const [sritisId, setSritisId] = useState(0);

  const {
    komentarai,
    setKomentarai,
    savivaldybes,
    sritys,
    filterOn,
    filterWhat,
  } = useContext(HomeContext);

  // useEffect(() => {
  //   setKomentarai((prevKom) =>
  //     prevKom?.map((k) =>
  //       Number(k.sid) === Number(savivaldybeId) &&
  //       (Number(k.srid) === Number(sritisId) || sritisId === 0)
  //         ? { ...k, show: true }
  //         : { ...k, show: false }
  //     )
  //   );
  // }, [savivaldybeId, sritisId, setKomentarai]);

  useEffect(() => {
    setKomentarai((prevKom) =>
      prevKom?.map((k) =>
        (Number(k.srid) === Number(sritisId) || Number(sritisId) === 0) &&
        (Number(k.sid) === Number(savivaldybeId) || Number(savivaldybeId) === 0)
          ? { ...k, show: true }
          : { ...k, show: false }
      )
    );
  }, [sritisId, savivaldybeId, setKomentarai]);

  // const filtruoti = () => {
  //   setKomentarai((prevKom) =>
  //     prevKom?.map((k) =>
  //       (Number(k.srid) === Number(sritisId) || sritisId === 0) &&
  //       (Number(k.sid) === Number(savivaldybeId) || savivaldybeId === 0)
  //         ? { ...k, show: true }
  //         : { ...k, show: false }
  //     )
  //   );
  // };

  const resetFilter = () => {
    setKomentarai((prevKom) => prevKom.map((c) => ({ ...c, show: true })));
    filterOn.current = false;
    filterWhat.current = null;
  };

  return (
    <>
      <div className="card m-4">
        <h5 className="card-header">Filtruoti</h5>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Pagal savivaldybę</label>
            <select
              className="form-select"
              value={savivaldybeId}
              onChange={(e) => setSavivaldybeId(e.target.value)}
            >
              <option value={0}>Visos savivaldybės</option>
              {savivaldybes?.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Pagal sritį</label>
            <select
              className="form-select"
              value={sritisId}
              onChange={(e) => setSritisId(e.target.value)}
            >
              <option value={0}>Visos sritys</option>
              {sritys?.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="card m-4">
        <h5 className="card-header">Komentarai:</h5>

        <small onClick={resetFilter} className="click-link reset-filter">
          rodyti visus komentarus
        </small>
        <div className="card-body">
          <ul className="list-group">
            {komentarai?.map((k) =>
              k.show ? <LineH key={k.id} komentaras={k} /> : null
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ListH;
