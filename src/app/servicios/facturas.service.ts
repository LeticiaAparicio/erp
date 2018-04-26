import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class FacturasService {

  constructor(private http: HttpClient) { }

  getFacturas(){

    let url = 'http://localhost:3000/facturas'; 
    return this.http.get(url) 
                  .map( (resp:any) => { 
                    return resp; 
                  });
  }

  getFacturasId(id){  
    let url = 'http://localhost:3000/facturas/'; 
    return this.http.get(url + id) 
                  .map( (resp:any) => { 
                  return resp; 
    });
  }

  postFacturas(factura){ 
    let url =  'http://localhost:3000/facturas';
    return this.http.post(url, factura)  
                    .map( (resp:any) => { 
                      console.log(resp);
                      return resp; 
                    });
} 

putFacturas(id, factura){
  let url = 'http://localhost:3000/facturas/';
  return this.http.put(url+id, factura) //le mandamos la ruta que lleva su propio id y el proveedor que vamos a actualizar
                .map( (resp:any) => { 
                  return resp; 
                });
}

deleteFacturas(id){
  let url = 'http://localhost:3000/facturas/';
  return this.http.delete(url+id)
                .map( (resp:any) => { 
                  return resp; 
                });
}

}
