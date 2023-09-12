import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Ingreso } from '../modelos/ingreso.model'

@Injectable({
  providedIn: 'root'
})
export class IngresoService {

  constructor(private firestore: AngularFirestore) { }

  // ---[create]---
  registrar(ingreso: Ingreso): Promise<any> {
    return this.firestore.collection('ingresos').add(ingreso);
  }

  //---[read]---
  listar() {
    return this.firestore.collection('ingresos').snapshotChanges();
  }

  obtenerIngreso(identificacion: string) {
    return this.firestore.collection('ingresos').ref.where('identificacion', '==', identificacion);
  }

  actualizarEstado(id :string, estado:string){
    this.firestore.doc('ingresos/'+ id).update({estado:estado});
  }

  //---[update]---
  actualiar(ingreso: Ingreso) {
    // delete ingreso._id;
    this.firestore.doc('ingresos/' + ingreso._id).update(ingreso);
  }

  //---[delete]---
  eliminar(id: string) {
    this.firestore.doc('ingresos/' + id).delete();
  }
}
