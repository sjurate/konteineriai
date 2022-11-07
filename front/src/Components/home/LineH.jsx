import React, { useContext } from "react";
import HomeContext from "../../Contexts/HomeContext";

const LineH = ({ komentaras }) => {
  const { filterWhat, filterOn, setKomentarai } = useContext(HomeContext);

  const filterBySavivaldybe = () => {
    filterOn.current = !filterOn.current;
    if (!filterOn.current) {
      setKomentarai((prevKom) => prevKom.map((k) => ({ ...k, show: true })));
      filterWhat.current = null;
    } else {
      setKomentarai((prevKom) => [
        ...prevKom.map((k) =>
          k.savivaldybeTitle === komentaras.savivaldybeTitle
            ? { ...k, show: true }
            : { ...k, show: false }
        ),
      ]);
      filterWhat.current = komentaras.savivaldybeTitle;
    }
  };

  const filterBySritis = () => {
    if (!filterOn.current) {
      setKomentarai((prevKom) => prevKom.map((k) => ({ ...k, show: true })));
      filterWhat.current = null;
    } else {
      setKomentarai((prevKom) =>
        prevKom.map((k) =>
          k.sritisTitle === komentaras.sritisTitle
            ? { ...k, show: true }
            : { ...k, show: false }
        )
      );
      filterWhat.current = komentaras.sritisTitle;
    }
    filterOn.current = !filterOn.current;
  };

  return (
    <li className="list-group-item">
      <div className="line">
        <div className="line__content">
          <div className="line__content__info">
            <div
              className="line__content__savivaldybe click-link"
              onClick={filterBySavivaldybe}
            >
              <img
                className="line__image"
                src={komentaras.savivaldybeImage}
                alt={komentaras.savivaldybeTitle}
              ></img>
              <div className="savivaldybe_title">
                {komentaras.savivaldybeTitle}
              </div>
            </div>
            <div
              className="line__content__sritis click-link"
              onClick={filterBySritis}
            >
              {komentaras.sritisTitle}
            </div>
          </div>
          <div className="line__content__post">{komentaras.post}</div>
        </div>
      </div>
    </li>
  );
};

export default LineH;
