import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

// ----------[firebase]------------------
import {AngularFireModule} from '@angular/fire/compat';
import {environment} from '../environments/environment.development';
import {AngularFireDatabaseModule} from '@angular/fire/compat/database';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';

import { AppComponent } from './app.component';
import { IngresoComponent } from './componentes/ingreso/ingreso.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    IngresoComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp( environment.firebase ),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
