import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import { observer } from "mobx-react";
import NotFoundPage from "./components/NotFound/NotFoundPage";
import store from "./store";
import UpdateForm from "./components/update/UpdateForm";
import ThankYou from "./components/ThankYou/ThankYou";
import { useEffect } from "react";
import CreateEmployee from "./components/CreateEmployee/CreateEmployee";

const App: React.FC = observer(() => {
  const { isLoggedIn, logout, setLoggedIn, setRole, role } = store;
  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    const role = localStorage.getItem("role");
    setLoggedIn(loggedIn == "true" ? true : false);
    setRole(role);
  }, []);
  const handleLogOut = () => {
    logout();
  };
  return (
    <>
      <button onClick={handleLogOut}>Log Out</button>
      {role && <p>{role}</p>}
      <BrowserRouter>
        <Routes>
          {!isLoggedIn && <Route path="/" element={<Login />} />}
          {isLoggedIn && role == "ADMIN" && (
            <Route path="/create-user" element={<CreateEmployee />} />
          )}
          {isLoggedIn && <Route path="/" element={<UpdateForm />} />}
          {isLoggedIn && <Route path="/thank-you" element={<ThankYou />} />}

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
});

export default App;
