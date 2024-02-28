import React, { useEffect } from "react";
import "./NotFound.style.css";
import { observer } from "mobx-react";
import store from "../../store";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = observer(() => {
  const { isLoggedIn } = store;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);
  return (
    <section className="content-section">
      <h2>Page not Found</h2>
      <p>
        We're sorry, the page you requested could not be found. Please go back
        to the homepage or contact us for further information.
      </p>
    </section>
  );
});

export default NotFoundPage;
