
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JuegoAgilidad } from '../../clases/juego-agilidad';
import { JuegoServiceService } from "../../servicios/juego-service.service";

@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.css']
})
export class AgilidadAritmeticaComponent implements OnInit {

  @Output()
  enviarJuego: EventEmitter<any> = new EventEmitter<any>();

  public miJuego: JuegoAgilidad;
  generar: boolean = true;
  verificar: boolean = false;
  miServicioJuego: JuegoServiceService;
  Timer: number;
  Tiempo: number;
  repetidor: any;
  Mensajes = "";
  
  constructor(ServicioJuego: JuegoServiceService) {
    this.miJuego = new JuegoAgilidad("Agilidad aritmética");
    let userjs = localStorage.getItem("Usuario");
    let user: any = userjs != null ? JSON.parse(userjs) : null;
    this.miJuego.jugador = user.usuario;
    this.Tiempo = 20;
    this.miServicioJuego = ServicioJuego;
  }

  Verificar() {
    clearInterval(this.repetidor);

    if (this.miJuego.verificar()) {
      var f = new Date();
      var actual = f.getHours() * 60 * 60 + f.getMinutes() * 60 + f.getSeconds();
      actual = actual - this.Timer;
      this.MostarMensaje("Usted Gano en " + actual + " segundos.",this.miJuego.gano);
      //alert("Usted Gano en " + actual + " segundos.");
    }
    else {
      this.MostarMensaje("Usted Perdio",this.miJuego.gano);
      //alert("Usted Perdio");
    }
    clearInterval(this.repetidor);
    this.Tiempo = 20;
    console.log(this.miJuego);
    this.enviarJuego.emit(this.miJuego);
    this.miServicioJuego.guardarJuego(this.miJuego);

    this.generar = true;
    this.verificar = false;
    this.miJuego.Numero1 = null;
    this.miJuego.Numero2 = null;
    this.miJuego.Operador = null;
    this.miJuego.Resultado = null;
  }

  GenerarJuego = function (): void {
    this.generar = false;
    this.verificar = true;
    this.miJuego.Numero1 = Math.floor((Math.random() * 100) + 1);
    this.miJuego.Numero2 = Math.floor((Math.random() * 100) + 1);
    var operador = Math.floor((Math.random() * 3) + 1);
    switch (operador) {
      case 1:
        this.miJuego.Operador = '+';
        break;
      case 2:
        this.miJuego.Operador = '-';
        break;
      case 3:
        this.miJuego.Operador = '*';
        break;
    }
    var f = new Date();
    this.Timer = f.getHours() * 60 * 60 + f.getMinutes() * 60 + f.getSeconds();
    console.log(this.Timer);

    this.repetidor = setInterval(() => {
      this.Tiempo--;
      if (this.Tiempo == 0) {
        clearInterval(this.repetidor);
        //this.Verificar();
        this.Tiempo = 20;
        this.miJuego.gano = false;
        this.enviarJuego.emit(this.miJuego);
        this.miServicioJuego.guardarJuego(this.miJuego);
        this.MostarMensaje("Se acabo el tiempo",this.miJuego.gano);
        //alert("Se acabo el tiempo");
        this.generar = true;
        this.verificar = false;
        this.miJuego.Numero1 = null;
        this.miJuego.Numero2 = null;
        this.miJuego.Operador = null;
        this.miJuego.Resultado = null;
      }
    }, 900);
  }
  MostarMensaje(mensaje: string = "este es el mensaje", ganador: boolean = false) {
    this.Mensajes = mensaje;
    var x = document.getElementById("snackbar");
    if (ganador) {
      x.className = "show Ganador";
    } else {
      x.className = "show Perdedor";
    }
    var modelo = this;
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 1500);
    console.info("objeto", x);

  }

  ngOnInit() {
  }

}
