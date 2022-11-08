import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.scss";
import Nav from "./Components/Nav";
import Home from "./Components/home/MainH";
import Containers from "./Components/containers/MainC";
import Boxes from "./Components/boxes/MainB";
import LoginPage from "./Components/loging/LoginPage";
import LogoutPage from "./Components/loging/LogoutPage";
import Messages from "./Components/Messages";
import { authConfig } from "./Functions/auth";
import MessagesContext from "./Contexts/MessagesContext";

function App() {
  const [roleChange, setRoleChange] = useState(Date.now());
  const [messages, setMessages] = useState([]);
  const [showLinks, setShowLinks] = useState(false);

  const setMsg = useCallback((text) => {
    const message = {
      id: uuidv4(),
      text,
    };
    setMessages((prevMessages) => [...prevMessages, message]);
    setTimeout(() => {
      setMessages((prevMessages) =>
        prevMessages.filter((m) => m.id !== message.id)
      );
    }, 5000);
  }, []);

  return (
    <BrowserRouter>
      <MessagesContext.Provider
        value={{ messages, setMessages, setMsg, showLinks, setShowLinks }}
      >
        <ShowNav roleChange={roleChange} />
        <Messages />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/containers"
            element={
              <RequireAuth role="admin">
                <Containers />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/boxes"
            element={
              <RequireAuth role="admin">
                <Boxes />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/login"
            element={<LoginPage setRoleChange={setRoleChange} />}
          />
          <Route
            path="/logout"
            element={<LogoutPage setRoleChange={setRoleChange} />}
          />
        </Routes>
      </MessagesContext.Provider>
    </BrowserRouter>
  );
}

function ShowNav({ roleChange }) {
  const [status, setStatus] = useState(1);

  useEffect(() => {
    axios
      .get("http://localhost:3003/login-check?role=admin", authConfig())
      .then((res) => {
        setStatus(res.data.status);
      });
  }, [roleChange]);
  return <Nav status={status} />;
}

function RequireAuth({ children, role }) {
  const [view, setView] = useState(<h2>Please wait...</h2>);

  useEffect(() => {
    axios
      .get("http://localhost:3003/login-check?role=" + role, authConfig())
      .then((res) => {
        if ("ok" === res.data.msg) {
          setView(children);
        } else if (res.data.status === 2) {
          setView(<h2>Unauthorize...</h2>);
        } else {
          setView(<Navigate to="/login" replace />);
        }
      });
  }, [children, role]);

  return view;
}

export default App;
