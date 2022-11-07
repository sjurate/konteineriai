import React, { useContext } from "react";
import SritisContext from "../../Contexts/SritisContext";
import LineSritis from "./LineSritis";

const ListC = () => {
  const { sritys } = useContext(SritisContext);

  return (
    <div className="card m-4">
      <h5 className="card-header">Sritys:</h5>
      <div className="card-body">
        <ul className="list-group">
          {sritys?.map((s) => (
            <LineSritis key={s.id} sritis={s} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ListC;
