import { Component, OnInit } from '@angular/core';
import { PresupuestosService } from '../servicios/presupuestos.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  chartOptions = {
    responsive: true
  }

  presupuestos:any;
  totalPorCliente:any;
  ptosPrMes:any;
  ptosSgMes:any;
  ptosTrMes:any;
  diaPrMes: any = new Date("2018-04-01").valueOf();
  diaSgMes: any = new Date("2018-05-01").valueOf();
  diaTrMes: any = new Date("2018-06-01").valueOf();
  diaCtMes: any = new Date("2018-07-01").valueOf();
  totalPrMes:number = 0;
  totalSgMes:number = 0;
  totalTrMes:number = 0;
  prMes:string = 'Abril';
  sgMes:string = 'Mayo';
  trMes:string = 'Junio';
  labelTrimestre:string = 'Presupuestos2T';
  chartPtosTrimestre:any = [];
  chartTotalesCliente:any = [];

  constructor( private presupuestosService: PresupuestosService) { }

  ngOnInit() {
    this.cargarGraficoPresupuestos();
    this.cargarGraficoCliente();
  }

  cargarGraficoPresupuestos(){
    this.presupuestosService.getPresupuestos()
                    .subscribe((resp:any)=>{
                      this.presupuestos = resp.presupuestos;
                      this.ptosPrMes = this.presupuestos.filter(element => new Date(element.fecha).valueOf() >= this.diaPrMes &&  new Date(element.fecha).valueOf() < this.diaSgMes) //el método filter es para arrays
                      this.ptosPrMes.forEach(ptosPrMes=>{
                        this.totalPrMes += ptosPrMes.total; //este total viene del TS de editar
                      })
                      this.ptosSgMes = this.presupuestos.filter(element => new Date(element.fecha).valueOf() >= this.diaSgMes &&  new Date(element.fecha).valueOf() < this.diaTrMes) //el método filter es para arrays
                      this.ptosSgMes.forEach(ptosSgMes=>{
                        this.totalSgMes += ptosSgMes.total; //este total viene del TS de editar
                      })
                      this.ptosTrMes = this.presupuestos.filter(element => new Date(element.fecha).valueOf() >= this.diaTrMes &&  new Date(element.fecha).valueOf() < this.diaCtMes) //el método filter es para arrays
                      this.ptosTrMes.forEach(ptosTrMes=>{
                        this.totalTrMes += ptosTrMes.total; //este total viene del TS de editar
                      })
                      this.chartPtosTrimestre = new Chart('grafico1', {
                        type: 'line',
                        data: {
                          labels: [this.prMes,this.sgMes,this.trMes], //es lo que nos aparecerá en el eje de las X 
                          datasets: [ //dentro de este array hay un objeto, y dentro del objeto estarán las propiedades
                            {
                              data: [this.totalPrMes,this.totalSgMes,this.totalTrMes], //ponemos los datos del eje Y
                              label: this.labelTrimestre,
                              borderColor: "#dc143c",
                              fill: true
                            }
                          ]
                        }
                      })
                    },(error)=>{
                      console.log(error);
                    })
  }

  cargarGraficoCliente(){
    this.presupuestosService.getTotalesPorCliente()
                      .subscribe((resp:any)=>{
                        this.totalPorCliente = resp.datos; //estos datos vienen del BACKEND, del GET que hemos hecho
                        let clientes = [];
                        let totales = [];
                        this.totalPorCliente.forEach(element => {
                          clientes.push(element._id.cliente);
                          totales.push(element.total);
                        })
                        this.chartTotalesCliente = new Chart('grafico2',{
                          type: 'pie',
                          data: {
                            labels: clientes,
                            datasets: [
                              {
                                backgroundColor: ['crimson','purple','lightseagreen','coral'],
                                data: totales
                              }
                            ]
                          }
                        })
                      },(error)=>{
                        console.log(error)
                      })
  }

  primerTrimestre(){
    this.diaPrMes = new Date("2018-01-01").valueOf();
    this.diaSgMes = new Date("2018-02-01").valueOf();
    this.diaTrMes = new Date("2018-03-01").valueOf();
    this.diaCtMes = new Date("2018-04-01").valueOf();
    this.totalPrMes = 0;
    this.totalSgMes = 0;
    this.totalTrMes = 0;
    this.prMes= 'Enero';
    this.sgMes= 'Febrero';
    this.trMes= 'Marzo';
    this.labelTrimestre= 'Presupuestos1T';
    this.chartPtosTrimestre.destroy(); //para que no se queden datos antiguos
    this.cargarGraficoPresupuestos();
  }

  segundoTrimestre(){
    this.diaPrMes = new Date("2018-04-01").valueOf();
    this.diaSgMes = new Date("2018-05-01").valueOf();
    this.diaTrMes = new Date("2018-06-01").valueOf();
    this.diaCtMes = new Date("2018-07-01").valueOf();
    this.totalPrMes = 0;
    this.totalSgMes = 0;
    this.totalTrMes = 0;
    this.prMes= 'Abril';
    this.sgMes= 'Mayo';
    this.trMes= 'Junio';
    this.labelTrimestre= 'Presupuestos2T';
    this.cargarGraficoPresupuestos();
  }

}
