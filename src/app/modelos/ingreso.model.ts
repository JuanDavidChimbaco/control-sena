export class Ingreso {
  _id?: string;
  identificacion:string;
  nombre:string;
  tipo:string;
  fechaHoraIngreso:Date;
  marcaComputador:string;
  serialComputador:string;
  fechaHoraSalida:Date;
  estado:string;

  constructor(identificacion:string, nombre:string, tipo:string,
    fechaHoraIngreso:Date, marcaComputador:string, serialComputador:string,fechaHoraSalida:Date,
    estado:string){
      this.identificacion=identificacion;
      this.nombre=nombre;
      this.tipo=tipo;
      this.fechaHoraIngreso=fechaHoraIngreso
      this.fechaHoraSalida=fechaHoraSalida
      this.marcaComputador=marcaComputador
      this.serialComputador=serialComputador
      this.estado=estado
    }
}
