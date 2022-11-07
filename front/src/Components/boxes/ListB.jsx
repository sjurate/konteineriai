import React, { useContext } from "react";
import BoxesContext from "../../Contexts/BoxesContext";
import LineB from "./LineB";

const ListB = () => {
  const { boxes } = useContext(BoxesContext);

  return (
    <div className="card m-4">
      <h5 className="card-header">Boxes:</h5>
      <div className="card-body">
        <ul className="list-group">
          {boxes?.map((b) => (
            <LineB key={b.id} box={b} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ListB;
