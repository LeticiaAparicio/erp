import { Component, OnInit } from '@angular/core';
import { PresupuestosService } from '../../servicios/presupuestos.service';


@Component({
  selector: 'app-listado-presupuesto',
  templateUrl: './listado-presupuesto.component.html',
  styleUrls: ['./listado-presupuesto.component.css']
})
export class ListadoPresupuestoComponent implements OnInit {

  presupuestos:any = [];
  id:string;

  constructor(private presupuestosService: PresupuestosService) { }

  ngOnInit() {
    this.cargarPresupuestos();
  }

  cargarPresupuestos(){
    this.presupuestosService.getPresupuestos()
               .subscribe((resp:any)=>{
                  var presupuestos = resp.presupuestos;
                  presupuestos.forEach(presupuesto => {
                    var num = '0000' + presupuesto.numero + '/18'; 
                    presupuesto.num = num.slice(-7);
                    this.presupuestos.push(presupuesto);
                  });
               }, error => {
                 console.log(error);
               })
  }


  obtenerId(id){
    this.id = id;
  }

  borrarPresupuesto(){
    this.presupuestosService.deletePresupuesto(this.id)
                .subscribe((resp:any)=>{
                  this.presupuestos = [];
                  this.cargarPresupuestos();
                },(error:any)=>{
                  console.log(error);
                })
  }


}
