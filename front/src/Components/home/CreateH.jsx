import React, { useContext, useState } from "react";
import HomeContext from "../../Contexts/HomeContext";
import MessagesContext from "../../Contexts/MessagesContext";

const CreateH = () => {
  const [savivaldybe, setSavivaldybe] = useState(0);
  const [sritis, setSritis] = useState(0);
  const [post, setPost] = useState("");

  const { setCreateData, savivaldybes, sritys } = useContext(HomeContext);
  const { setMsg } = useContext(MessagesContext);

  const addKomentaras = () => {
    if (savivaldybe === 0) {
      setMsg("Pasirinkite savivaldybę");
      return;
    }
    if (sritis === 0) {
      setMsg("Pasirinkite sritį");
      return;
    }
    if (post.length === 0) {
      setMsg("Neįrašėte jokio komentaro / pasiūlymo");
      return;
    }
    setCreateData({
      savivaldybe_id: savivaldybe,
      sritis_id: sritis,
      post,
    });
    setSavivaldybe("");
    setSritis("");
    setPost("");
  };

  return (
    <div className="card m-4">
      <h5 className="card-header">Parašyk komentarą</h5>
      <div className="card-body">
        <div className="mb-3">
          <label className="form-label">Savivaldybė</label>
          <select
            className="form-select"
            value={savivaldybe}
            onChange={(e) => setSavivaldybe(e.target.value)}
          >
            <option value={0} disabled>
              Choose from list
            </option>

            {savivaldybes?.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Sritis</label>
          <select
            className="form-select"
            value={sritis}
            onChange={(e) => setSritis(e.target.value)}
          >
            <option value={0} disabled>
              Choose from list
            </option>

            {sritys?.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Komentaras</label>
          <input
            type="text"
            className="form-control"
            value={post}
            onChange={(e) => setPost(e.target.value)}
          />
        </div>
        <button
          onClick={addKomentaras}
          type="button"
          className="btn btn-outline-success"
        >
          Pridėti komentarą
        </button>
      </div>
    </div>
  );
};

export default CreateH;
