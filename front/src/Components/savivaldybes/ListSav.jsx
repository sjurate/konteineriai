import React, { useContext } from "react";
import SavContext from "../../Contexts/SavContext";
import LineSav from "./LineSav";

const ListSav = () => {
  const { savivaldybes } = useContext(SavContext);

  return (
    <div className="card m-4">
      <h5 className="card-header">Savivaldybės:</h5>
      <div className="card-body">
        <ul className="list-group">
          {savivaldybes?.map((s) => (
            <LineSav key={s.id} savivaldybe={s} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ListSav;
