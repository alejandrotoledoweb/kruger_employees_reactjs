import { observer } from "mobx-react";
import React, { useState, useEffect } from "react";
import store from "../../store";
import { Employee } from "../../store/interfaces/EmployeeDetail.interface";
import { useNavigate } from "react-router-dom";

const CreateEmployee = observer(() => {
  const { username, password, createEmployee, isLoggedIn } = store;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  const [formData, setFormData] = useState<Employee>({
    cedula: "",
    names: "",
    lastNames: "",
    email: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createEmployee(formData);
    setFormData({
      cedula: "",
      names: "",
      lastNames: "",
      email: "",
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="cedula">Cédula:</label>
          <input
            type="text"
            id="cedula"
            name="cedula"
            pattern="\d{10}"
            title="La cédula debe contener exactamente 10 dígitos numéricos."
            value={formData.cedula}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="names">Nombres:</label>
          <input
            type="text"
            id="names"
            name="names"
            value={formData.names}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lastNames">Apellidos:</label>
          <input
            type="text"
            id="lastNames"
            name="lastNames"
            value={formData.lastNames}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Crear Empleado</button>
      </form>
      {username && (
        <>
          <p>Username: {username}</p>
          <p>Password: {password}</p>
        </>
      )}
    </>
  );
});

export default CreateEmployee;
