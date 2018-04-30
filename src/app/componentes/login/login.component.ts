import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import { JugadoresService } from "../../servicios/jugadores.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private subscription: Subscription;
  miServicioJugador:JugadoresService;
  usuario = '';
  clave= '';
  logeando=true;
  mensaje = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    ServicioJugador: JugadoresService) {
      this.miServicioJugador = ServicioJugador;
      localStorage.clear();

  }

  ngOnInit() {
  }

  Entrar() {
    
    //if (this.usuario === 'admin' && this.clave === 'admin') {
    //  this.router.navigate(['/Principal']);
    //}
    this.miServicioJugador.BuscarUsuario(this.usuario,this.clave)
    .then((datos)=> {
      if(datos != null){
      localStorage.setItem("Usuario",JSON.stringify(datos));
      this.router.navigate(['/Principal']);
      }
      else{
        this.mensaje = "Problema al iniciar sesión, el usuario o la contraseña son incorrectos";
      }
    })
    .catch( 
      (noSeEncontroUsuario) => {alert("Datos incorrectos");}
    );
  }
  Cargar()
  {
    this.usuario = "Invitado";
    this.clave = "12345";
  }

}
