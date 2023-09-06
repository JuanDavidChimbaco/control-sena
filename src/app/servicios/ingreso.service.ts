import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore'
import { Ingreso} from '../modelos/ingreso.model'

@Injectable({
  providedIn: 'root'
})
export class IngresoService {

  constructor( private firestore: AngularFirestore) { }

  // ---[create]---
  registrar(ingreso:Ingreso): Promise<any>{
    return this.firestore.collection('ingresos').add(ingreso);
  }

}
