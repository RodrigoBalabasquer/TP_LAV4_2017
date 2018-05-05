import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { JuegoPiedraPapelTijera } from '../../clases/juego-piedra-papel-tijera';
import { JuegoServiceService } from "../../servicios/juego-service.service";
@Component({
  selector: 'app-piedra-papel-tijera',
  templateUrl: './piedra-papel-tijera.component.html',
  styleUrls: ['./piedra-papel-tijera.component.css']
})
export class PiedraPapelTijeraComponent implements OnInit {

  @Output() enviarJuego: EventEmitter<any>= new EventEmitter<any>();

  eleccionUser : string;
  empezar : JuegoPiedraPapelTijera;
  nuevoJuego : JuegoPiedraPapelTijera;
  eleccionMaquina : any = "Piedra papel tijera!";
  resultado : any;
  estadisticas : any;
  mostrarBoton : boolean = false;
  Mensajes:string;
  miServicioJuego:JuegoServiceService;
  
  constructor(ServicioJuego: JuegoServiceService) {
    this.empezar = new JuegoPiedraPapelTijera();
    this.nuevoJuego = new JuegoPiedraPapelTijera();
    let userjs = localStorage.getItem("Usuario");
    let user:any = userjs!=null?JSON.parse(userjs):null;
    this.nuevoJuego.jugador = user.usuario;
    this.miServicioJuego = ServicioJuego;
  }
  

  elijePiedra(){
    this.empezar.comenzar();
    this.mostrarBoton = true;
    this.eleccionMaquina = this.nuevoJuego.piedra();
    this.resultado = this.nuevoJuego.mensaje;
    this.estadisticas = this.nuevoJuego.mostarResultado();
    this.enviarResultados(this.nuevoJuego.ContadorDeGanadas,this.nuevoJuego.ContadorDePerdidas)
  }

  elijePapel(){
    this.empezar.comenzar();
    this.mostrarBoton = true;
    this.eleccionMaquina = this.nuevoJuego.papel();
    this.resultado = this.nuevoJuego.mensaje;
    this.estadisticas = this.nuevoJuego.mostarResultado();
    this.enviarResultados(this.nuevoJuego.ContadorDeGanadas,this.nuevoJuego.ContadorDePerdidas)
  
  }

  elijeTijera(){
    this.empezar.comenzar();
    this.mostrarBoton = true;
    this.eleccionMaquina = this.nuevoJuego.tijera();
    this.resultado = this.nuevoJuego.mensaje;
    this.estadisticas = this.nuevoJuego.mostarResultado();
    this.enviarResultados(this.nuevoJuego.ContadorDeGanadas,this.nuevoJuego.ContadorDePerdidas)
  
  }

  enviarResultados(ganadas:number,perdidas:number)
  {
    if(ganadas == 3)
    { 
        this.nuevoJuego.gano = true;
        this.enviarJuego.emit(this.nuevoJuego);
        this.miServicioJuego.guardarJuego(this.nuevoJuego);
    
        this.MostarMensaje("Ganaste!!!",true);
        
        this.mostrarBoton = false;
        this.eleccionMaquina = "piedra-papel-tijera!";
        this.resultado = "";
        this.estadisticas = "";
        this.nuevoJuego.resetear();
    }
    else if(perdidas == 3)
    {   
        this.nuevoJuego.gano = false;
        this.enviarJuego.emit(this.nuevoJuego);
        this.miServicioJuego.guardarJuego(this.nuevoJuego);

        this.MostarMensaje("Perdiste!!!",false);
        this.mostrarBoton = false;
        this.eleccionMaquina = "piedra-papel-tijera!";
        this.resultado = "";
        this.estadisticas = "";
        this.nuevoJuego.resetear();
    }
  }

  limpiar(){
    this.mostrarBoton = false;
    this.eleccionMaquina = "piedra-papel-tijera!";
    this.resultado = "";
    this.estadisticas = "";
    this.nuevoJuego.resetear();
  }

  MostarMensaje(mensaje:string="este es el mensaje",ganador:boolean=false) {
    this.Mensajes=mensaje;    
    var x = document.getElementById("snackbar");
    if(ganador)
      {
        x.className = "show Ganador";
      }else{
        x.className = "show Perdedor";
      }
    var modelo=this;
    setTimeout(function(){ 
      x.className = x.className.replace("show", "");
     }, 1000);
    console.info("objeto",x);
  
   }  
  ngOnInit() {
  }

}