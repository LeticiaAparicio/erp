import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { PresupuestosService } from '../../servicios/presupuestos.service';
import { ClientesService } from '../../servicios/clientes.service';
import { ArticulosService } from '../../servicios/articulos.service';

@Component({
  selector: 'app-crear-presupuesto',
  templateUrl: './crear-presupuesto.component.html',
  styleUrls: ['./crear-presupuesto.component.css']
})
export class CrearPresupuestoComponent implements OnInit {

  formPre: FormGroup;
  presupuesto:any;
  clientes:any;
  articulos:any;

  constructor(private fp: FormBuilder,
              private presupuestosService: PresupuestosService,
              private clientesService: ClientesService,
              private articulosService: ArticulosService) { }

  ngOnInit() {
    this.cargarDatos();
    this.formPre = this.fp.group({
      cliente: null,
      fecha: null,
      items: this.fp.array([
        this.initItem() 
      ]),
      suma: null
    })
    this.detectarCambios();
  }

  initItem(){
    return this.fp.group({
      articulo: null,
      cantidad: null,
      precio: null,
      importe: null
    })
  }

  addItem(){
    const control = <FormArray>this.formPre.controls['items'];
    control.push(this.initItem());
  }

  removeItem(i){
    const control = <FormArray>this.formPre.controls['items'];
    control.removeAt(i);
  }

  cargarDatos(){
    this.clientesService.getTodosClientes()
                .subscribe((resp:any)=>{
                  this.clientes = resp.clientes;
                },(error)=>{
                  console.log(error);
                })
    this.articulosService.getArticulo()
                .subscribe((resp:any)=>{
                  this.articulos = resp.articulos;
                },(error)=>{
                  console.log(error);
                })
  }

  detectarCambios(){
    this.formPre.valueChanges
              .subscribe(valor =>{
                var importe = 0;
                var j;
                for(j=0; j < valor.items.length; j++){
                  var cantidad = valor.items[j].cantidad;
                  var precio = valor.items[j].precio;
                  this.formPre.value.items[j].importe = cantidad * precio;
                }
                var suma = 0;
                var i;
                for(i=0; i < valor.items.length; i++){
                  suma = suma + valor.items[i].importe;
                }
                this.formPre.value.suma = suma; //el primer suma es el nombre del HTML y el segundo es el de la variable
              })
  }

}
