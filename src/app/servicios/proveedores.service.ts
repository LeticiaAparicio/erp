import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ProveedoresService {

  constructor(private http: HttpClient) { }

  getProveedores(){

    let url = 'http://localhost:3000/proveedor'; //aquí ponemos la ruta que poníamos el otro día en postman o en el navegador
    return this.http.get(url) //el método get solo hace una petición
                  .map( (resp:any) => { 
                    return resp; //esto lo hacemos para poder consumirlo donde queramos porque los servicios canalizan la información, no nos aparece en ningún sitio
                  });
  }

  getProveedorId(id){  //Ponemos id aquí porque nos protesta el de la línea 25, y este id viene del componente
    let url = 'http://localhost:3000/proveedor/'; //le ponemos la barra final para que le mandemos el protocolo/dominio/ruta/id
    return this.http.get(url + id)  //entre paréntesis le mandamos la url, pero en la url va a recibir el id que tenemos en proveedor.js Esta url tiene que llevar el protocolo, el dominio y la ruta, hay que añadirle ese id
                  .map( (resp:any) => { 
                  return resp; 
    });
  }

  postProveedor(proveedor){ //ponemos el proveedor aquí porque de esta manera se que cuando llame a este método de un componente me va a dar un proveedor
    let url =  'http://localhost:3000/proveedor';//esta es la url donde lo tenemos que mandar, y es la misma que tenemos arriba
    //Le decimos que cuando llamemos a este proveedor tiene que hacer:
    return this.http.post(url, proveedor)  //el primer parámetro define la url donde lo vamos a mandar, el segundo el argumento es el objeto que vamos a enviar (le ponemos el nombre que queramos) 
                    .map( (resp:any) => { 
                      console.log(resp);
                      return resp; 
                    });
}          

putProveedor(id, proveedor){
  let url = 'http://localhost:3000/proveedor/';
  return this.http.put(url+id, proveedor) //le mandamos la ruta que lleva su propio id y el proveedor que vamos a actualizar
                .map( (resp:any) => { 
                  return resp; 
                });
}

deleteProveedor(id){
  let url = 'http://localhost:3000/proveedor/';
  return this.http.delete(url+id)
                .map( (resp:any) => { 
                  return resp; 
                });
}

}

