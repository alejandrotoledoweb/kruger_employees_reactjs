import React from "react";
import "./ThankYou.style.css";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import store from "../../store";

const ThankYou: React.FC = observer(() => {
  const { logout } = store;
  const handleHome = () => {
    logout();
  };
  return (
    <section className="content-section">
      <h2>Gracias, eso es todo!</h2>
      <Link to="/" className="link">
        <button onClick={handleHome}>Main page</button>
      </Link>
    </section>
  );
});

export default ThankYou;
