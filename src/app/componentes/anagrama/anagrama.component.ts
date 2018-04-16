import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { JuegoAnagrama } from '../../clases/juego-anagrama';
import { JuegoServiceService } from "../../servicios/juego-service.service";

@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.css']
})
export class AnagramaComponent implements OnInit {
@Output() enviarJuego: EventEmitter<any>= new EventEmitter<any>();


  nuevoJuego: JuegoAnagrama;
  Mensajes:string;
  contador:number;
  ocultarVerificar:boolean;
  mensaje : string;
  ocultarComenzar : boolean = true;
  miServicioJuego:JuegoServiceService;

  constructor(ServicioJuego: JuegoServiceService) {
    this.nuevoJuego = new JuegoAnagrama(); 
    this.ocultarVerificar=true;
    this.miServicioJuego = ServicioJuego;
    let userjs = localStorage.getItem("Usuario");
    let user:any = userjs!=null?JSON.parse(userjs):null;
    this.nuevoJuego.jugador = user.usuario;
   }

   generarPalabra() {
    this.nuevoJuego.asignarPalabra();
    this.contador=0;
    this.ocultarVerificar = false;
    this.nuevoJuego.gano = false;
    this.Mensajes = "";
    this.ocultarComenzar = false;
  }

  verificar()
  {
    this.ocultarVerificar=true;
    if (this.nuevoJuego.verificar()){
      this.MostarMensaje("Sos un Genio!!!",true,10);
      this.enviarJuego.emit(this.nuevoJuego);
      this.ocultarComenzar = true;
      this.miServicioJuego.guardarJuego(this.nuevoJuego);
    
    }else{
      this.contador++;
      if(this.contador == 10)
      { 
        this.enviarJuego.emit(this.nuevoJuego);
        this.mensaje = "Ooops, se te acabaron los intentos!";
        this.MostarMensaje(this.mensaje,false,this.contador);
        this.nuevoJuego.palabraDesordenada = "";
        this.nuevoJuego.palabraIngresada ="";
        this.ocultarComenzar = true;
        this.miServicioJuego.guardarJuego(this.nuevoJuego);
    
      }
      else
      {
        this.mensaje = "Ooops, casi lo lograste!";
        this.MostarMensaje(this.mensaje,false,this.contador); 
        this.nuevoJuego.palabraIngresada ="";
    }
    }
    console.info("Gano: ",this.nuevoJuego.gano);  
  }  

  MostarMensaje(mensaje:string,gano:boolean=false,cont:number) {
    this.Mensajes = mensaje;    
    var x = document.getElementById("snackbar");
    if(gano)
      {
        x.className = "show Ganador";
      }else{
        x.className = "show Perdedor";
      }

    var modelo = this;
    setTimeout(function(){ 
      x.className = x.className.replace("show", "");
      if(cont < 10)
        modelo.ocultarVerificar=false;
     }, 1500);
    console.info("objeto",x);
  
   }  



  ngOnInit() {
  }
}