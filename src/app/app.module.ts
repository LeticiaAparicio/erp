import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { ComprasComponent } from './compras/compras.component';
import { ListadoProvComponent } from './proveedores/listado-prov/listado-prov.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { ProveedoresService } from './servicios/proveedores.service';
import { CrearProvComponent } from './proveedores/crear-prov/crear-prov.component';
import { EditarProvComponent } from './proveedores/editar-prov/editar-prov.component';
import { ListadoFactComponent } from './facturas/listado-fact/listado-fact.component';
import { CrearFactComponent } from './facturas/crear-fact/crear-fact.component';
import { EditarFactComponent } from './facturas/editar-fact/editar-fact.component';
import { FacturasService } from './servicios/facturas.service';
import { RegistroComponent } from './auntetificacion/registro/registro.component';
import { AutenticacionService } from './servicios/autenticacion.service';
import { LoginComponent } from './autentificacion/login/login.component';
import { CrearClienteComponent } from './clientes/crear-cliente/crear-cliente.component';
import { VentasComponent } from './ventas/ventas.component';
import { ListadoClientesComponent } from './clientes/listado-clientes/listado-clientes.component';
import { ClientesService } from './servicios/clientes.service';
import { AutenticacionGuard } from './servicios/autenticacion.guard';
import { ListadoUsuariosComponent } from './autentificacion/listado-usuarios/listado-usuarios.component';
import { ListadoSesionesComponent } from './sesiones/listado-sesiones/listado-sesiones.component';
import { SesionesService } from './servicios/sesiones.service';
import { EditarClientesComponent } from './clientes/editar-cliente/editar-cliente.component';
import { CrearPresupuestoComponent } from './presupuestos/crear-presupuesto/crear-presupuesto.component';
import { EditarPresupuestoComponent } from './presupuestos/editar-presupuesto/editar-presupuesto.component';
import { ListadoPresupuestoComponent } from './presupuestos/listado-presupuesto/listado-presupuesto.component';
import { PresupuestosService } from './servicios/presupuestos.service';
import { CrearArticuloComponent } from './articulos/crear-articulo/crear-articulo.component';
import { ListadoArticulosComponent } from './articulos/listado-articulos/listado-articulos.component';
import { ArticulosService } from './servicios/articulos.service';


const rutas:Routes = [
  {path:'', component: InicioComponent}, 
  {path:'registro' , component: RegistroComponent},
  {path:'inicio-sesion' , component: LoginComponent},
  {path:'compras', component: ComprasComponent, canActivate: [AutenticacionGuard]},
  {path:'listado-usuarios', component: ListadoUsuariosComponent, canActivate: [AutenticacionGuard]},
  {path:'listado-sesiones/:nombre', component: ListadoSesionesComponent, canActivate: [AutenticacionGuard]},
  {path:'ventas', component: VentasComponent, canActivate: [AutenticacionGuard]},
  {path:'proveedores', component: ListadoProvComponent, canActivate: [AutenticacionGuard]},
  {path:'crear-proveedor', component: CrearProvComponent, canActivate: [AutenticacionGuard]},
  {path:'editar-proveedor/:id', component: EditarProvComponent, canActivate: [AutenticacionGuard]},
  {path:'listado-facturas', component: ListadoFactComponent, canActivate: [AutenticacionGuard]},
  {path:'crear-factura', component: CrearFactComponent, canActivate: [AutenticacionGuard]},
  {path:'editar-factura/:id', component: EditarFactComponent, canActivate: [AutenticacionGuard]},
  {path:'listado-clientes', component: ListadoClientesComponent, canActivate: [AutenticacionGuard]},
  {path:'crear-cliente', component: CrearClienteComponent, canActivate: [AutenticacionGuard]},
  {path:'editar-cliente/:id', component: EditarClientesComponent, canActivate: [AutenticacionGuard]},
  {path: 'listado-presupuestos', component: ListadoPresupuestoComponent, canActivate: [AutenticacionGuard]},
  {path: 'crear-presupuesto', component: CrearPresupuestoComponent, canActivate: [AutenticacionGuard]},
  {path: 'editar-presupuesto/:id', component: EditarPresupuestoComponent, canActivate: [AutenticacionGuard]},
  {path: 'listado-articulos', component: ListadoArticulosComponent, canActivate: [AutenticacionGuard]},
  {path: 'crear-articulo', component: CrearArticuloComponent, canActivate: [AutenticacionGuard]},
  {path:'**', component: InicioComponent},

]

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ComprasComponent,
    ListadoProvComponent,
    CabeceraComponent,
    CrearProvComponent,
    EditarProvComponent,
    ListadoFactComponent,
    CrearFactComponent,
    EditarFactComponent,
    RegistroComponent,
    LoginComponent,
    CrearClienteComponent,
    VentasComponent,
    ListadoClientesComponent,
    ListadoUsuariosComponent,
    ListadoSesionesComponent,
    EditarClientesComponent,
    CrearPresupuestoComponent,
    EditarPresupuestoComponent,
    ListadoPresupuestoComponent,
    CrearArticuloComponent,
    ListadoArticulosComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(rutas),
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ChartsModule
  ],
  providers: [ProveedoresService, 
              FacturasService, 
              ClientesService, 
              PresupuestosService,
              AutenticacionService, 
              SesionesService, 
              AutenticacionGuard, ArticulosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
