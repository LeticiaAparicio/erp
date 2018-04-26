import { Component, OnInit } from '@angular/core';
import { SesionesService } from '../../servicios/sesiones.service';
import { AutenticacionService } from '../../servicios/autenticacion.service';

@Component({
  selector: 'app-listado-sesiones',
  templateUrl: './listado-sesiones.component.html',
  styleUrls: ['./listado-sesiones.component.css']
})
export class ListadoSesionesComponent implements OnInit {

  sesiones:any;

  constructor(private sesionesService: SesionesService,
              private autenticacionService: AutenticacionService) { }

  ngOnInit() {
    this.cargarSesiones();
  }

  cargarSesiones(){
    this.sesionesService.getSesiones()
                    .subscribe((resp:any)=>{
                      this.sesiones = resp.sesiones;
                    }, (error)=>{
                      console.log(error);
                    })
  }
}
