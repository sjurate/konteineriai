import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import MessagesContext from "../Contexts/MessagesContext";

function Nav({ status }) {
  const navigate = useNavigate();
  const { showLinks, setShowLinks } = useContext(MessagesContext);

  const goHome = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark col-12">
            <div className="container-fluid">
              <span className="navbar-brand" onClick={goHome}>
                Ship with us
              </span>
              <div>
                <div className="navbar-nav" id={showLinks ? "hidden" : ""}>
                  {status === 1 || status === 3 ? (
                    <NavLink
                      to="/"
                      end
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      Home
                    </NavLink>
                  ) : null}
                  {status === 3 ? (
                    <NavLink
                      to="/containers"
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      Containers
                    </NavLink>
                  ) : null}
                  {status === 3 ? (
                    <NavLink
                      to="/boxes"
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      Boxes
                    </NavLink>
                  ) : null}
                  {status === 3 ? (
                    <NavLink to="/logout" className="nav-link">
                      Logout
                    </NavLink>
                  ) : null}
                  {status === 1 ? (
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  ) : null}
                </div>
                <button
                  className="menu-btn"
                  onClick={() => setShowLinks(!showLinks)}
                >
                  Menu
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Nav;
