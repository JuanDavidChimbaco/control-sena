import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { faPlus, faSearch, faEdit, faTrash, faEraser, faSignIn, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { IngresoService } from '../../servicios/ingreso.service';
import { Ingreso } from 'src/app/modelos/ingreso.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { Location} from '@angular/common'

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css'],
})
export class IngresoComponent implements OnInit {

  public frmIngreso!: FormGroup; 
  public ingreso!: Ingreso;
  public idIngreso!: string; // Variable para el id que se consulta
  public fechaIncial!: any; // Variable para la fecha inicial que se registra
  public estado!: any; // Variable para guardar el estado en el que se encuentra el ingreso
  public id!: any; // Variable para guardar la identificacion que se consulta

  /**
   * Iconos importados del Fontawaitsome
   */
  faSearch = faSearch
  faPlus = faPlus
  faEdit = faEdit
  faTrash = faTrash
  faEraser = faEraser
  faSignIn = faSignIn
  faSignOut = faSignOut

  constructor(private IngresoService: IngresoService) { }

  /**
   * Registar un ingreso de una persona
   * a las instalaciones del SENA
   * @param frmIngresoValue
   */
  async registrar(frmIngresoValue: any) {
    const identificacion = this.frmIngreso.get('txtId')?.value;
    if (this.estado == "Ingreso" && this.id == identificacion) {
      Swal.fire(
        'Registrar Ingreso',
        'Ya hay un ingreso con esta identificacion.',
        'warning'
      );
    } else {
      if (this.frmIngreso.valid) {
        this.ingreso = {
          identificacion: frmIngresoValue.txtId,
          nombre: frmIngresoValue.txtNombre,
          tipo: frmIngresoValue.cbTipo,
          fechaHoraIngreso: new Date(),
          marcaComputador: frmIngresoValue.cbMarca,
          serialComputador: frmIngresoValue.txtSerial,
          fechaHoraSalida: null,
          estado: 'Ingreso',
        };
        this.IngresoService.registrar(this.ingreso).then(
          (resultado) => {
            Swal.fire(
              'Registrar Ingreso',
              'Se ha resgistrado el ingreso correctamente.',
              'success'
            );
            this.fechaIncial = new Date();
            this.frmIngreso.reset();
          },
          (error) => {
            console.log(error);
            Swal.fire(
              'Registrar Ingreso',
              'Problemas al registrar el ingreso ' + error,
              'error'
            );
          }
        );
      }
    }
  }

  /**
   * consulta un ingreso
   * por identificacion
  */
  consultarPorIdentificacion() {
    const identificacion = this.frmIngreso.get('txtId')?.value;
    this.IngresoService.obtenerIngreso(identificacion).get().then(
      resultado => {
        if (!resultado.empty) {
          resultado.forEach((ingreso) => {
            console.log(ingreso.id, "=>", ingreso.data());
            // Asignar datos a las varibles que serviran para validar.
            this.fechaIncial = ingreso.get("fechaHoraIngreso");
            this.estado = ingreso.get("estado");
            this.idIngreso = ingreso.id
            this.id = ingreso.get("identificacion");
            // Rellenar formulario con los datos.
            this.frmIngreso.get('txtNombre')?.setValue(ingreso.get("nombre"));
            this.frmIngreso.get('cbTipo')?.setValue(ingreso.get("tipo"));
            this.frmIngreso.get('cbMarca')?.setValue(ingreso.get("marcaComputador"));
            this.frmIngreso.get('txtSerial')?.setValue(ingreso.get("serialComputador"));
          });
        } else {
          Swal.fire('Consultar Ingreso', "No hay registro para esa identificacion", 'warning');
        }
      },
      error => {
        console.error(error);
      }
    )
  }

  /**
   * elimina el ingreso consultado
   */
  eliminar() {
    console.log(this.idIngreso);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.IngresoService.eliminar(this.idIngreso)
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this.frmIngreso.reset();
      }
    })
  }

  /**
   *modifica el ingreso consultado
   * @param frmIngresoValue
   */
  modificar(frmIngresoValue: any) {
    const identificacion = this.frmIngreso.get('txtId')?.value;
    if (this.estado == "Salida" && this.id == identificacion) {
      Swal.fire(
        'Registrar salida',
        'Ya hay una salida con esta identificacion. (Ingrese para poder salir :V )',
        'warning'
      );
    } else {
      if (this.frmIngreso.valid) {
        this.ingreso = {
          _id: this.idIngreso,
          identificacion: frmIngresoValue.txtId,
          nombre: frmIngresoValue.txtNombre,
          tipo: frmIngresoValue.cbTipo,
          fechaHoraIngreso: this.fechaIncial, // Asignar la fecha original
          marcaComputador: frmIngresoValue.cbMarca,
          serialComputador: frmIngresoValue.txtSerial,
          fechaHoraSalida: new Date(),
          estado: 'Salida',
        }
        this.IngresoService.actualiar(this.ingreso)
        Swal.fire(
          'Registrar Salida',
          'Se ha registrado la salida correctamente.',
          'success'
        );
        this.frmIngreso.reset();
      } else {
        Swal.fire(
          'Registro Salida',
          'Primero consulte por Identificacion',
          'error'
        );

      }
    }
  }

  /**
   * limpia el fomrularrio
   */
  limpiarIngreso() {
    this.frmIngreso.reset();
  }

/**
 * inicializar y valida los campos
 * el formulario
 */
  ngOnInit(): void {
    this.frmIngreso = new FormGroup({
      txtId: new FormControl('', [
        Validators.required,
        Validators.maxLength(45),
      ]),
      txtNombre: new FormControl('', [
        Validators.required,
        Validators.maxLength(60),
      ]),
      cbTipo: new FormControl('', [Validators.required]),
      cbMarca: new FormControl('', [Validators.required]),
      txtSerial: new FormControl('', [
        Validators.required,
        Validators.maxLength(45),
      ]),
    });
  }
}
