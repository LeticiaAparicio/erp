import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FacturasService } from '../../servicios/facturas.service';
import { Router, ActivatedRoute } from '@angular/router' //Para navegación programática


@Component({
  selector: 'app-editar-fact',
  templateUrl: './editar-fact.component.html',
  styleUrls: ['./editar-fact.component.css']
})
export class EditarFactComponent implements OnInit {

  facturaForm: FormGroup;
  factura:any;
  proveedor:string;
  base:number;
  concepto:string;
  retencion:boolean=false;
  tipo:number;
  importe:number;
  total:number;
  irpf:number;
  cif;

  id:string;

  constructor(private ff: FormBuilder,
    private facturasService: FacturasService,
    private router: Router,
    private route: ActivatedRoute) {
      if(!this.factura){
        this.factura = {};
      }
     }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.cargarFacturas(this.id);
    this.facturaForm = this.ff.group({
      proveedor: null,
      cif: null,
      fecha: null,
      concepto: null,
      base: null,
      retencion: null,
      tipo: null, 
      irpf: null,
      importe: null,
      total: null
    });
    this.detectarCambios();
  }

  cargarFacturas(id){ 
    this.facturasService.getFacturasId(id)
                        .subscribe((res:any)=>{
                          this.factura = res.factura;
                          console.log(this.factura);
                        })
  }

  editarFactura(){
    this.factura = this.guardarFra();
    this.facturasService.putFacturas(this.id, this.factura)
                          .subscribe((res:any)=>{
                            this.router.navigate(['/listado-facturas']);
                          })
  }

  redondear(valor){
    var valor;
    if (valor < 0){
      var resultado = Math.round(-valor*100)/100 * -1; 
      } else {
          var resultado = Math.round(valor*100)/100;
      }
      return resultado;
  }

  formatearMoneda(valor){
    var resultado = new Intl.NumberFormat("es-ES",{style: "currency", currency: "EUR"}).format(valor);

    return resultado;
  }

  detectarCambios(){
    this.facturaForm.valueChanges.subscribe(valoresForm =>{
      this.base = this.redondear(valoresForm.base); 
      this.tipo = valoresForm.tipo;
      this.retencion = valoresForm.retencion;
      if(this.retencion){
        this.irpf = this.redondear(this.base * -0.15);
      } else {
        this.irpf = 0;
      }
      this.importe = this.redondear(this.base * this.tipo);
      this.total = this.redondear(this.base + this.irpf + this.importe);
      this.facturaForm.value.irpf = this.formatearMoneda(this.irpf);
      this.facturaForm.value.importe = this.formatearMoneda(this.importe);
      this.facturaForm.value.total =  this.formatearMoneda(this.total);
    });
  }

  guardarFra(){
    const guardarFra = {
      proveedor: this.facturaForm.get('proveedor').value,
      cif: this.facturaForm.get('cif').value,
      fecha: this.facturaForm.get('fecha').value,
      concepto: this.facturaForm.get('concepto').value,
      base: this.facturaForm.get('base').value,
      retencion: this.facturaForm.get('retencion').value,
      tipo: this.facturaForm.get('tipo').value,
      irpf: this.facturaForm.get('irpf').value,
      importe: this.facturaForm.get('importe').value,
      total: this.facturaForm.get('total').value,
      fechaRegistro: new Date()    
    }
    return guardarFra;
  }
}
