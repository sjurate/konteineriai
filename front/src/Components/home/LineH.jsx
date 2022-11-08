import React from "react";
import { useEffect, useState } from "react";

const LineH = ({ container }) => {
  const [totalWeight, setTotalWeight] = useState(0);

  let n = 0;
  if (container[1][0].bid === null) {
    n = 0;
  } else {
    n = container[1].length;
  }

  useEffect(() => {
    container[1]?.forEach((b) => {
      setTotalWeight((prevW) => prevW + b.weight);
    });
  }, [container]);

  return (
    <li className="list-group-item">
      <div className="line">
        <div className="line__content">
          <div className="line__content__info">
            <h3>Container: {container[1][0].number}</h3>
            <small>Items in the container: {n}</small>
            <div>Container size: {container[1][0].size}</div>
            <div>Total weight: {totalWeight} kg</div>
            <div className="comments">
              <ul className="list-group">
                {container[1]?.map((b) =>
                  b.bid !== null ? (
                    <li key={b.bid} className="list-group-item">
                      <div className="line_content_info">
                        <div>Item title: {b.item_title}</div>
                        <div>Item weight {b.weight} kg</div>
                        <div>Flammable? {b.flammable ? "Yes" : "No"}</div>
                        <div>Short term? {b.short_term ? "Yes" : "No"}</div>
                      </div>
                    </li>
                  ) : null
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default LineH;
