import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
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
  public mensaje: string = '';
  public idIngreso!: string;
  public fechaIncial!: Date;
  public identificacionIngreso = "";

  constructor(private IngresoService: IngresoService) { }
  /**
   * Registar un ingreso de una persona
   * a las instalaciones del SENA
   * @param frmIngresoValue
   */
  registrar(frmIngresoValue: any) {
    this.identificacionIngreso = this.frmIngreso.get('txtId')?.value;
    if (!this.consultar(this.identificacionIngreso)) {
      console.log('Ya existe');
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
        this.fechaIncial = new Date();
        console.log(frmIngresoValue);
        this.IngresoService.registrar(this.ingreso).then(
          (resultado) => {
            console.log(resultado);
            Swal.fire(
              'Registrar Ingreso',
              'Se ha resgistrado el ingreso correctamente.',
              'success'
            );
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

  consultar(identificacion: string) {
    let existe: any;
    this.IngresoService.obtenerIngreso(identificacion).get().then((value) => {
      value.forEach(registro => {
        if (registro.get('identificacion') == identificacion) {
          existe = true
        } else {
          console.log('Registrando');
          existe = false
        }
      })
    })
    return existe
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
            this.idIngreso = ingreso.id
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
    if (this.frmIngreso.valid && this.idIngreso) {
      this.ingreso = {
        _id: this.idIngreso,
        identificacion: frmIngresoValue.txtId,
        nombre: frmIngresoValue.txtNombre,
        tipo: frmIngresoValue.cbTipo,
        fechaHoraIngreso: this.fechaIncial,
        marcaComputador: frmIngresoValue.cbMarca,
        serialComputador: frmIngresoValue.txtSerial,
        fechaHoraSalida: new Date(),
        estado: 'Salida',
      }
      console.log(this.ingreso._id);
      this.IngresoService.actualiar(this.ingreso)
      Swal.fire(
        'Modificar Ingreso',
        'Se ha modificado el ingreso correctamente.',
        'success'
      );
      this.frmIngreso.reset();
    } else {
      Swal.fire(
        'Modificar Ingreso',
        'Hay campos vacios en su formulario',
        'error'
      );
    }
  }

  ingresar() {

  }

  limpiarIngreso() {
    this.frmIngreso.reset
  }

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
