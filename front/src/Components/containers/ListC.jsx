import React, { useContext } from "react";
import ContainersContext from "../../Contexts/ContainersContext";
import LineC from "./LineC";

const ListC = () => {
  const { containers } = useContext(ContainersContext);

  return (
    <div className="card m-4">
      <h5 className="card-header">Containers:</h5>
      <div className="card-body">
        <ul className="list-group">
          {containers?.map((c) => (
            <LineC key={c[1][0].id} container={c} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ListC;
