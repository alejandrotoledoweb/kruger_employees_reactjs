import React from "react";
import "./ThankYou.style.css";
import { Link } from "react-router-dom";

const ThankYou: React.FC = () => {
  return (
    <section className="content-section">
      <h2>Gracias, eso es todo!</h2>
      <Link to="/" className="link">
        Main page
      </Link>
    </section>
  );
};

export default ThankYou;
