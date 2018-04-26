import { Component, OnInit } from '@angular/core';
import { FacturasService } from '../../servicios/facturas.service';
import { trigger, state, style, animate, transition } from '@angular/animations'; //Animaciones


@Component({
  selector: 'app-listado-fact',
  templateUrl: './listado-fact.component.html',
  styleUrls: ['./listado-fact.component.css'],
  animations: [
    trigger('alerta', [ 
      state('show', style({opacity: 1})), 
      state('hide', style({opacity: 0})),
      transition('show => hide', animate('500ms ease-out')), 
      transition('hide => show', animate('500ms ease-in')) 
    ])
  ] 
})
export class ListadoFactComponent implements OnInit {

  facturas:any;
  mensaje: string;
  mostrarAlerta:boolean = false;
  id:string;

  constructor(private facturasService: FacturasService) { }

  ngOnInit() {
    this.cargarFacturas();
  }

  cargarFacturas(){
    this.facturasService.getFacturas()
                  .subscribe((resp:any)=>{
                    this.facturas = resp.facturas;
                  }, error => {
                    console.log(error);
                  })
  }

  obtenerId(id){
    this.id = id;
  }

  borrarFacturas(){
    this.facturasService.deleteFacturas(this.id)
                  .subscribe((resp:any)=>{
                    this.mensaje = "La factura ha sido eliminada correctamente";
                    this.mostrarAlerta = true;
                    this.cargarFacturas();
                    setTimeout(()=>{
                      this.mostrarAlerta = false;
                    }, 2500);
                    //Ponemos lo siguiente para gestionar el error
                  },(error:any)=>{
                    this.mensaje = 'Error de conexión con el servidor';
                    this.mostrarAlerta = true;
                    setTimeout(()=>{
                      this.mostrarAlerta = false;
                    }, 2500);
                  })
  }

}
