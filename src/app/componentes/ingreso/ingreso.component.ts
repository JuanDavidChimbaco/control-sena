import { Component,OnInit} from '@angular/core';

import Swal from 'sweetalert2';
import {IngresoService} from '../../servicios/ingreso.service'
import { Ingreso } from 'src/app/modelos/ingreso.model';
import { FormControl,FormGroup,Validators } from '@angular/forms';
// import { Location} from '@angular/common'

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})
export class IngresoComponent implements OnInit{
  public frmIngreso!:FormGroup
  public ingreso!:Ingreso
  public mensaje: string = "";

  constructor(private IngresoService:IngresoService){}
  /**
   * Registar un ingreso de una persona
   * a las instalaciones del SENA
   * @param frmIngresoValue
   */
  registrar(frmIngresoValue:any){
    if (this.frmIngreso.valid) {
      this.ingreso = {
        identificacion: frmIngresoValue.txtId,
        nombre: frmIngresoValue.txtNombre,
        tipo:frmIngresoValue.cbTipo,
        fechaHoraIngreso: new Date(),
        marcaComputador: frmIngresoValue.cbMarca,
        serialComputador:frmIngresoValue.txtSerial,
        fechaHoraSalida:new Date(),
        estado:'Ingreso'
      }
      this.IngresoService.registrar(this.ingreso).then(
        (resultado)=>{
          console.log(resultado);
          Swal.fire('Registrar Ingreso', "Se ha resgistrado el ingreso correctamente.", 'success');
          this.frmIngreso.reset()
        },error=>{
          console.log(error);
          Swal.fire('Registrar Ingreso', "Problemas al registrar el ingreso " + error, 'error');
        }
      )
    }
  }

  ngOnInit(): void {
    this.frmIngreso = new FormGroup({
      txtId: new FormControl('',[Validators.required, Validators.maxLength(45)]),
      txtNombre: new FormControl ('', [Validators.required, Validators.maxLength(60)]),
      cbTipo: new FormControl('', [Validators.required]),
      cbMarca: new FormControl('', [Validators.required]),
      txtSerial: new FormControl('', [Validators.required, Validators.maxLength(45)])
    })
  }
}
