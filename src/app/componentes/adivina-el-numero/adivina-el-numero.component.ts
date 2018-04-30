
import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { JuegoAdivina } from '../../clases/juego-adivina';
import { JuegoServiceService } from "../../servicios/juego-service.service";

@Component({
  selector: 'app-adivina-el-numero',
  templateUrl: './adivina-el-numero.component.html',
  styleUrls: ['./adivina-el-numero.component.css']
})
export class AdivinaElNumeroComponent implements OnInit {
 @Output() enviarJuego: EventEmitter<any>= new EventEmitter<any>();

  nuevoJuego: JuegoAdivina;
  Mensajes:string;
  contador:number;
  ocultarVerificar:boolean;
  miServicioJuego:JuegoServiceService;
  numerosIntentados: string = "";
 
  constructor(ServicioJuego: JuegoServiceService) { 
    this.nuevoJuego = new JuegoAdivina();
    //console.info("numero Secreto:",this.nuevoJuego.numeroSecreto);  
    let userjs = localStorage.getItem("Usuario");
    let user:any = userjs!=null?JSON.parse(userjs):null;
    this.nuevoJuego.jugador = user.usuario;
    this.ocultarVerificar=false;
    this.miServicioJuego = ServicioJuego;
  }
  generarnumero() {
    this.nuevoJuego.generarnumero();
    this.contador=0;
    this.numerosIntentados = "";
  }
  verificar()
  {
    this.ocultarVerificar=true;
    console.info("numero Secreto:",this.nuevoJuego.gano);  
    if (this.nuevoJuego.verificar()){
      
      this.enviarJuego.emit(this.nuevoJuego);
      this.MostarMensaje("Sos un Genio!!!",true);
      this.nuevoJuego.numeroSecreto=0;
      this.miServicioJuego.guardarJuego(this.nuevoJuego);
    }else{
      this.contador++;
      if(this.contador == 1)
        this.numerosIntentados = this.nuevoJuego.numeroIngresado.toString();
      else
        this.numerosIntentados = this.numerosIntentados +", "+ this.nuevoJuego.numeroIngresado;
      let mensaje:string;
      switch (this.contador) {
        case 1:
          mensaje="No, Intento fallido, ánimo";
          break;
          case 2:
          mensaje="No,Te estaras Acercando???";
          break;
          case 3:
          mensaje="No es, Yo crei que la tercera era la vencida.";
          break;
          case 4:
          mensaje="No era el  "+this.nuevoJuego.numeroIngresado;
          break;
          case 5:
          mensaje=" intentos y nada.";
          break;
          case 6:
          mensaje="Afortunado en el amor";
          break;
          case 10:
          mensaje="UHH mala suerte, perdiste";
          break;
        default:
            mensaje="Ya le erraste "+ this.contador+" veces";
          break;
      }
      this.MostarMensaje("#"+this.contador+" "+mensaje+" ayuda :"+this.nuevoJuego.retornarAyuda());
      if(this.contador == 10)
      {
        this.enviarJuego.emit(this.nuevoJuego);
        this.nuevoJuego.numeroSecreto=0;
        this.miServicioJuego.guardarJuego(this.nuevoJuego);
      }
    }
    console.info("numero Secreto:",this.nuevoJuego.gano);  
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
      modelo.ocultarVerificar=false;
     }, 1500);
    console.info("objeto",x);
  
   }  
  ngOnInit() {
  }

}
