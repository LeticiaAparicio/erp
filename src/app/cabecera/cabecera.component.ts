import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../servicios/autenticacion.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  // nombre:string;

  constructor(private autenticacionService: AutenticacionService) { }

  ngOnInit() {
  }

  getLogged(){
    return this.autenticacionService.isLogged();
  }

  // getNombre(){
  //   this.nombre = this.autenticacionService.nombre;
  //   return this.nombre;
  // }

}
