import { makeAutoObservable, observable, runInAction } from "mobx";
import axiosInstance from "../constants/axiosInstance";
import {
  Employee,
  EmployeeDetail,
} from "./interfaces/EmployeeDetail.interface";
import axios from "axios";

class Store {
  isLoggedIn: boolean = false;
  role: string = "";
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
  password: string = "";
  userId: number | null = null;
  updated: boolean = false;

  constructor() {
    makeAutoObservable(this, {
      isLoggedIn: observable,
      userId: observable,
      username: observable,
      updated: observable,
      employeeDetail: observable,
      role: observable,
      password: observable,
    });
  }

  getEmployeeDetail = async (userId: string | null) => {
    const response = await axiosInstance.get("/employee-detail", {
      params: { userId: parseInt(userId!) },
    });

    const { data } = response;
    runInAction(() => {
      this.employeeDetail = data;
    });
  };

  updateEmployeeDetail = async (employeeDetail: EmployeeDetail) => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("accessToken");
    const detailsId = localStorage.getItem("detailsId");
    const {
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
      id: detailsId,
      fechaNacimiento,
      direccionDomicilio,
      telefonoMovil,
      vacunado,
      tipoVacuna,
      fechaVacunacion,
      numeroDosis,
    };

    try {
      const response = await axios.put(
        "http://localhost:8080/api/employee-detail/update",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      this.updated = true;
      console.log("Update success:", response.data);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  loginUser = async (username: string, password: string) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          username,
          password,
        }
      );

      const { data } = response;

      if (response.status === 200) {
        runInAction(() => {
          this.isLoggedIn = true;
          this.userId = data.userId;
          this.role = data.role;
        });
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("userId", String(data.userId));
        localStorage.setItem("detailsId", String(data.employeeDetailId));
        localStorage.setItem("role", data.role);
      } else {
        throw new Error("Network response was not ok.");
      }
    } catch (err) {
      console.warn("Error:", err);
    }
  };

  logout = () => {
    console.log("logout", this.isLoggedIn);
    this.isLoggedIn = false;
    this.role = "";
    this.username = "";
    this.password = "";
  };

  setLoggedIn = (value: boolean) => {
    this.isLoggedIn = value;
    localStorage.setItem("loggedIn", "false");
    console.log(this.isLoggedIn);
  };

  createEmployee = async (employee: Employee) => {
    const { names, lastNames, email, cedula } = employee;

    // const requestBody = {
    //   names: names.trim(),
    //   lastNames: lastNames.trim(),
    //   email: email.trim(),
    //   cedula: cedula.trim(),
    // };

    console.log( typeof names)
    console.log( typeof lastNames)
    console.log( typeof cedula)
    console.log( typeof email)

    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.post(
        "http://localhost:8080/api/employee",
        {
          names,
          lastNames ,
          email,
          cedula: Number(cedula),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const { username, password } = response.data;
        runInAction(() => {
          this.username = username;
          this.password = password;
        });
      }

      console.log("Create success:", response.data);
    } catch (err) {
      console.warn("Error:", err.message);
    }
  };
}

const store = new Store();
export default store;
