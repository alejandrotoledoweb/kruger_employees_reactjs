import React, { useEffect, useState } from "react";
import "./UpdateForm.style.css";
import { observer } from "mobx-react";
import store from "../../store";
import { EmployeeDetail } from "../../store/interfaces/EmployeeDetail.interface";
import { useNavigate } from "react-router-dom";

const UpdateForm: React.FC = observer(() => {
  const { updateEmployeeDetail, employeeDetail, updated, isLoggedIn, role } =
    store;
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const accessToken = localStorage.getItem("accessToken");
    console.log("userId", userId);
    console.log("accessToken", accessToken);
  }, []);

  useEffect(() => {
    if (updated) {
      navigate("/thank-you");
    }
  }, [updated]);

  useEffect(() => {
    if (role == "ADMIN") {
      navigate("/create-user");
    }
  }, [role]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  const [formData, setFormData] = useState<EmployeeDetail>({
    id: employeeDetail.id,
    fechaNacimiento: employeeDetail.fechaNacimiento,
    direccionDomicilio: employeeDetail.direccionDomicilio,
    telefonoMovil: employeeDetail.telefonoMovil,
    vacunado: employeeDetail.vacunado,
    tipoVacuna: employeeDetail.tipoVacuna,
    fechaVacunacion: employeeDetail.fechaVacunacion,
    numeroDosis: employeeDetail.numeroDosis,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const { checked } = e.target as HTMLInputElement;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    updateEmployeeDetail(formData);
  };

  return (
    <>
      <h2>Actualizar datos del empleado</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <label>
          Fecha de Nacimiento:
          <input
            type="date"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleChange}
          />
        </label>
        <label>
          Dirección Domicilio:
          <input
            type="text"
            name="direccionDomicilio"
            value={formData.direccionDomicilio}
            onChange={handleChange}
          />
        </label>
        <label>
          Teléfono Móvil:
          <input
            type="tel"
            name="telefonoMovil"
            value={formData.telefonoMovil}
            onChange={handleChange}
          />
        </label>
        <label>
          Vacunado:
          <input
            type="checkbox"
            name="vacunado"
            checked={formData.vacunado}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="tipoVacuna">Tipo de Vacuna:</label>
        <select
          name="tipoVacuna"
          id="tipoVacuna"
          value={formData.tipoVacuna}
          onChange={handleChange}
          disabled={!formData.vacunado}
          required={formData.vacunado}
        >
          <option value="">Seleccione un tipo</option>{" "}
          {/* Placeholder option */}
          <option value="Pfizer">Pfizer</option>
          <option value="AstraZeneca">AstraZeneca</option>
          <option value="Johnson&Johnson">Johnson & Johnson</option>
          <option value="Sinovac">Sinovac</option>
          <option value="Sputnik">Sputnik</option>
        </select>
        <label>
          Fecha de Vacunación:
          <input
            type="date"
            name="fechaVacunacion"
            value={formData.fechaVacunacion}
            onChange={handleChange}
            disabled={!formData.vacunado}
          />
        </label>
        <label>
          Número de Dosis:
          <input
            type="number"
            name="numeroDosis"
            value={formData.numeroDosis}
            onChange={handleChange}
            disabled={!formData.vacunado}
          />
        </label>
        <button type="submit">Update</button>
      </form>
    </>
  );
});

export default UpdateForm;
