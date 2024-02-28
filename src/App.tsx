import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import { observer } from "mobx-react";
import NotFoundPage from "./components/NotFound/NotFoundPage";
import store from "./store";
import UpdateForm from "./components/update/UpdateForm";

const App: React.FC = observer(() => {
  const { isLoggedIn } = store;
  return (
    <BrowserRouter>
      <Routes>
        {!isLoggedIn && <Route path="/" element={<Login />} />}
        {isLoggedIn && <Route path="/" element={<UpdateForm />} />}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
});

export default App;
