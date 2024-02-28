import { makeAutoObservable, runInAction } from "mobx";
import axiosInstance from "../constants/axiosInstance";
import { EmployeeDetail } from "./interfaces/EmployeeDetail.interface";

class Store {
  isLoggedIn: boolean = true;
  employeeDetail: EmployeeDetail = {
    id: 0,
    fechaNacimiento: "",
    direccionDomicilio: "",
    telefonoMovil: "",
    vacunado: false,
    tipoVacuna: "",
    fechaVacunacion: "",
    numeroDosis: 0,
  };
  username: string = "";
  userId: number | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async getEmployeeDetail(userId: number) {
    const response = await axiosInstance.get("/employee-detail", {
      params: { userId },
    });

    const { data } = response;
    runInAction(() => {
      this.employeeDetail = data;
    });
  }

  async updateEmployeeDetail(employeeDetail: EmployeeDetail) {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const {
      id,
      fechaNacimiento,
      direccionDomicilio,
      telefonoMovil,
      vacunado,
      tipoVacuna,
      fechaVacunacion,
      numeroDosis,
    } = employeeDetail;

    const requestBody = {
      userId: Number(userId),
      id,
      fechaNacimiento,
      direccionDomicilio,
      telefonoMovil,
      vacunado,
      tipoVacuna,
      fechaVacunacion,
      numeroDosis,
    };

    try {
      const response = await fetch("your_api_endpoint_here", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Update success:", data);
    } catch (error) {
      console.error("Update failed:", error);
    }
  }

  async loginUser(username: string, password: string) {
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      console.log("Response", response);

      if (response.ok) {
        const data = await response.json();
        console.log({ data });
        this.isLoggedIn = true;
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        this.userId = data.userId;
      } else {
        throw new Error("Network response was not ok.");
      }
    } catch (err) {
      console.warn("Error:", err);
    }
  }
}

const store = new Store();
export default store;
