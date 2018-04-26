import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css'],
  animations: [
    trigger('formulario', [ 
      state('show', style({
        opacity: 1,
        height: 80
      })), 
      state('hide', style({
        opacity: 0,
        height: 0
      })),
      transition('show => hide', animate('500ms ease-out')), 
      transition('hide => show', animate('500ms ease-in')) 
    ]),
    trigger('alerta', [ 
      state('show', style({opacity: 1})), 
      state('hide', style({opacity: 0})),
      transition('show => hide', animate('500ms ease-out')), 
      transition('hide => show', animate('500ms ease-in')) 
    ])
  ]
})
export class ListadoUsuariosComponent implements OnInit {

  usuarios:any;
  usuario:any;
  nuevoUsuario:any;
  crearUsuarioForm: FormGroup;
  editarUsuarioForm: FormGroup;
  mostrarFormulario:boolean = false;
  mostrarAlerta:boolean = false;
  enviando:boolean = false;
  mensaje:string = 'Error de conexión con el servidor';
  editarFila:string;
  id:string;

  constructor(private autenticacionService: AutenticacionService,
              private cuf: FormBuilder,
              private euf: FormBuilder) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.crearUsuarioForm = this.cuf.group({
      nombre: [null, Validators.required],
      email:[null, Validators.required],
      password:[null, Validators.required],
      rol: [null, Validators.required]
    })
    this.editarUsuarioForm = this.euf.group({
      nombre: [null, Validators.required],
      email:[null, Validators.required],
      rol: [null, Validators.required]
    })
  }

  get estadoFormulario(){
    return this.mostrarFormulario ? 'show' : 'hide';
  }

  get estadoAlerta(){
    return this.mostrarAlerta ? 'show' : 'hide';
  }

  verFormulario(){
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  cargarUsuarios(){
    this.autenticacionService.getUsuarios()
                    .subscribe((resp:any)=>{
                      this.usuarios = resp.usuarios;
                    }, (error)=>{
                      console.log(error);
                    })
  }

  crearUsuario(){
    this.enviando = true;
    this.nuevoUsuario = this.guardarNuevoUsuario();
    this.autenticacionService.postUsuario(this.nuevoUsuario)
                  .subscribe((res:any)=>{
                    this.enviando = false;
                    this.mostrarAlerta = true;
                    this.mensaje = 'Usuario creado correctamente';
                    this.crearUsuarioForm.reset(); //para resetear los input al rellenar y guardar un usuario nuevo
                    this.cargarUsuarios(); //para que nos aparezca el usuario en la lista ya
                    setTimeout(()=>{
                      this.mostrarAlerta = false;
                    }, 2500)
                    setTimeout(()=>{
                      this.mensaje = "Error de conexión con el servidor";
                    }, 5000)
                  },(error:any)=>{
                    this.mostrarAlerta = true;
                    this.enviando = false;
                    if (error.error.errores.errors.email.message){
                      this.mensaje = error.error.errores.errors.email.message;
                    }
                    setTimeout(()=>{
                      this.mostrarAlerta = false;
                    }, 2500)
                    setTimeout(()=>{
                      this.mensaje = "Error de conexión con el servidor";
                    }, 5000)
                  })
  }

  guardarNuevoUsuario(){
    const guardarNuevoUsuario = {
      nombre: this.crearUsuarioForm.get('nombre').value,
      email: this.crearUsuarioForm.get('email').value.toLowerCase(),
      password: this.crearUsuarioForm.get('password').value,
      rol: this.crearUsuarioForm.get('rol').value
    }
    return guardarNuevoUsuario;
  }

  modificarUsuario(id){
    this.editarFila = id;
  }

  cancelarEdicion(){
    this.editarFila = '';
    this.cargarUsuarios();
  }

  editarUsuario(id){
    this.enviando = true;
    this.usuario = this.guardarUsuarioEditado();
    this.autenticacionService.putUsuario(id, this.usuario)
                        .subscribe((res:any)=>{
                          this.enviando = false;
                          this.mostrarAlerta = true;
                          this.mensaje = 'Usuario actualizado correctamente';
                          this.cargarUsuarios(); //para que nos aparezca el usuario en la lista ya
                          setTimeout(()=>{
                            this.mostrarAlerta = false;
                          }, 2500)
                        },(error:any)=>{
                          this.mostrarAlerta = true;
                          this.enviando = false;
                          if (error.error.errores.errors.email.message){
                            this.mensaje = error.error.errores.errors.email.message;
                          }
                          setTimeout(()=>{
                            this.mostrarAlerta = false;
                          }, 2500)
                        })
      setTimeout(()=>{
        this.mensaje = "Error de conexión con el servidor";
      }, 3000)
    this.editarFila = '';                      
  }

  guardarUsuarioEditado(){
    const guardarUsuarioEditado = {
      nombre: this.editarUsuarioForm.get('nombre').value,
      email: this.editarUsuarioForm.get('email').value.toLowerCase(),
      rol: this.editarUsuarioForm.get('rol').value
    }
    return guardarUsuarioEditado;
  }

  getId(id){
    this.id = id;
  }


  borrarUsuario(id){
    this.enviando = true;
    this.autenticacionService.deleteUsuario(this.id)
                  .subscribe((res:any)=>{
                    this.enviando = false;
                    this.mostrarAlerta = true;
                    this.mensaje = 'Usuario eliminado correctamente';
                    this.cargarUsuarios(); //para que nos aparezca el usuario en la lista ya
                    setTimeout(()=>{
                      this.mostrarAlerta = false;
                    }, 2500)
                    setTimeout(()=>{
                      this.mensaje = "Error de conexión con el servidor";
                    }, 5000)
                  },(error:any)=>{
                    this.mostrarAlerta = true;
                    this.enviando = false;
                    setTimeout(()=>{
                      this.mostrarAlerta = false;
                    }, 2500)
                  })
  }
}
