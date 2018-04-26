import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms/src/model';
import { FormBuilder, Validators } from '@angular/forms'
import { FacturasService } from '../../servicios/facturas.service';
import { Router } from '@angular/router'
import { trigger, state, style, animate, transition } from '@angular/animations'; //Animaciones


@Component({
  selector: 'app-crear-fact',
  templateUrl: './crear-fact.component.html',
  styleUrls: ['./crear-fact.component.css'],
  animations: [
    trigger('alerta', [ 
      state('show', style({opacity: 1})), 
      state('hide', style({opacity: 0})),
      transition('show => hide', animate('500ms ease-out')), 
      transition('hide => show', animate('500ms ease-in')) 
    ])
  ]
})
export class CrearFactComponent implements OnInit {

  @ViewChild('factura') facturaRef: ElementRef;

  facturaForm: FormGroup;
  factura:any;
  base:number;
  retencion:boolean=false;
  tipo:number;
  importe:number;
  total:number;
  irpf:number;
  cif;

  mensaje: string = 'Error de conexión con el servidor';
  mostrarAlerta:boolean = false;


  constructor(private ff:FormBuilder,
              private facturasServices: FacturasService,
              private router: Router) { }

  ngOnInit() {
    this.iniciarFormulario();
  }

  iniciarFormulario(){
    this.facturaForm = this.ff.group({
      proveedor: [null, Validators.required],
      cif: ['', [Validators.required, Validators.minLength(9)]],
      fecha: null,
      concepto: null,
      base: null,
      retencion: false,
      tipo: 0.21, //para que nazca con el 21% ya escogido, porque es lo normal
      irpf: this.formatearMoneda(0),
      importe: this.formatearMoneda(0),
      total: this.formatearMoneda(0)
    });
    this.detectarCambios();
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
      this.cif = valoresForm.cif.startsWith('A') || valoresForm.cif.startsWith('B'); 
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

  get estadoAlerta(){ 
    return this.mostrarAlerta ? 'show' : 'hide' 
  }

  registrarFra(){
    // this.mostrarAlerta = false;
    this.factura = this.guardarFra();
    // this.iniciarFormulario();
    // this.facturaRef.nativeElement.focus();
    this.facturasServices.postFacturas(this.factura)
                      .subscribe((resp:any)=>{
                        this.router.navigate(['/listado-facturas']);
                      });
    this.iniciarFormulario();
    this.cif = '';
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
