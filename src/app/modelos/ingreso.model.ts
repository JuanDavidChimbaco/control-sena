export class Ingreso {
  _id?: string;
  identificacion: string;
  nombre: string;
  tipo: string;
  fechaHoraIngreso: any;
  marcaComputador: string;
  serialComputador: string;
  fechaHoraSalida: any;
  estado: string;

  public constructor(identificacion: string, nombre: string, tipo: string, fechaHoraIngreso: any, marcaComputador: string, serialComputador: string, fechaHoraSalida: any, estado: string) {
    this.identificacion = identificacion;
    this.nombre = nombre;
    this.tipo = tipo;
    this.fechaHoraIngreso = fechaHoraIngreso;
    this.marcaComputador = marcaComputador;
    this.serialComputador = serialComputador;
    this.fechaHoraSalida = fechaHoraSalida;
    this.estado = estado;
  }
}

