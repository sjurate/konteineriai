import React from "react";

const LineH = ({ container }) => {
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
            <div>{container[1][0].size}</div>
            <div className="comments">
              <ul className="list-group">
                {container[1]?.map((b) =>
                  b.bid !== null ? (
                    <li key={b.bid} className="list-group-item">
                      <div className="line_content_info">
                        <div>{b.item_title}</div>
                        <div>{b.weight}</div>
                        <div>{b.flammable ? "True" : "False"}</div>
                        <div>{b.short_term ? "True" : "False"}</div>
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
