import React, { useContext, useEffect, useState } from "react";
import HomeContext from "../../Contexts/HomeContext";
import LineH from "./LineH";

const ListH = () => {
  const { containers, filterOn, filterWhat } = useContext(HomeContext);

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

  // const resetFilter = () => {
  //   setKomentarai((prevKom) => prevKom.map((c) => ({ ...c, show: true })));
  //   filterOn.current = false;
  //   filterWhat.current = null;
  // };

  return (
    <>
      <div className="card m-4">
        <h5 className="card-header">Containers:</h5>
        <div className="card-body">
          <ul className="list-group">
            {containers?.map((c) => (
              <LineH key={c[1][0].id} container={c} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ListH;
