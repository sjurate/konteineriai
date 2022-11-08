import React, { useContext } from "react";
import ContainersContext from "../../Contexts/ContainersContext";

const LineC = ({ container }) => {
  const { setDeleteData, setDeleteBox } = useContext(ContainersContext);

  let n = 0;
  if (container[1][0].bid === null) {
    n = 0;
  } else {
    n = container[1].length;
  }

  return (
    <li className="list-group-item">
      <div className="line">
        <div className="line__content">
          <div className="line__content__info">
            <h3>{container[1][0].number}</h3>
            <small>Items in the container: {n}</small>
            <div>Container size: {container[1][0].size}</div>
            <div className="comments">
              <ul className="list-group">
                {container[1]?.map((b) =>
                  b.bid !== null ? (
                    <li key={b.bid} className="list-group-item">
                      <div className="line_content_info">
                        <div>Item title: {b.item_title}</div>
                        <div>Item weight: {b.weight} kg</div>
                        <div>Flammable? {b.flammable ? "Yes" : "No"}</div>
                        <div>Short term? {b.short_term ? "Yes" : "No"}</div>
                        <div>
                          Delete item:{" "}
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={() => setDeleteBox({ ...b, num: -1 })}
                          >
                            Yes
                          </button>
                        </div>
                      </div>
                    </li>
                  ) : null
                )}
              </ul>
            </div>
            <div className="btn__box">
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => setDeleteData(container[1][0])}
              >
                Delete container
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default LineC;
