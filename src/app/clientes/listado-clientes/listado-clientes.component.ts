import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../servicios/clientes.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.css']
})
export class ListadoClientesComponent implements OnInit {

  buscador: FormControl;
  clientes:any;
  mensaje:boolean;

  constructor(private clientesService: ClientesService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.buscador = new FormControl();
    this.buscador.valueChanges
            .subscribe( nombre =>{
              if(nombre.length !== 0) {
                this.clientesService.getClientes(nombre)
                .subscribe((res:any)=>{
                  this.clientes = res.clientes;
                  if(this.clientes.length === 0){
                    this.mensaje = true;
                  } else {
                    this.mensaje = false;
                  }
                }, (error)=>{
                  console.log(error);
                })
              } else {
                this.clientes = [];
                this.mensaje = false;
              }
            })
  }

}

