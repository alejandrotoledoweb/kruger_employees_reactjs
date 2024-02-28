export interface EmployeeDetail {
  id: number;
  fechaNacimiento: string;
  direccionDomicilio: string;
  telefonoMovil: string;
  vacunado: boolean;
  tipoVacuna: string;
  fechaVacunacion: string;
  numeroDosis: number;
}

export interface Employee {
  names: string;
  lastNames: string;
  email: string;
  cedula: string;
}
