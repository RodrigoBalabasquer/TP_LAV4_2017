import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import{JuegoAgilidadVisual} from '../../clases/juego-agilidad-visual';
import { JuegoServiceService } from "../../servicios/juego-service.service";

@Component({
  selector: 'app-agilidad-visual',
  templateUrl: './agilidad-visual.component.html',
  styleUrls: ['./agilidad-visual.component.css']
})
export class AgilidadVisualComponent implements OnInit {

  @Output() enviarJuego: EventEmitter<any>= new EventEmitter<any>();
  public miJuego:JuegoAgilidadVisual;
  miServicioJuego:JuegoServiceService;
  Tiempo: number;
  repetidor:any;
  Mensajes = "";

  constructor(ServicioJuego: JuegoServiceService) {
    this.miJuego = new JuegoAgilidadVisual("Agilidad Visual");
    let userjs = localStorage.getItem("Usuario");
    let user:any = userjs!=null?JSON.parse(userjs):null;
    this.miJuego.jugador = user.usuario;
    this.miServicioJuego = ServicioJuego;
    this.Tiempo = 50;
   }

  Verificar(num:number)
  {
    if(num == this.miJuego.numeroActual)
        {
            if(num == 1)
            {   
                clearInterval(this.repetidor);
                this.miJuego.generado = false;
                this.miJuego.numeroActual = 24;
                this.miJuego.gano = true;
                this.MostarMensaje("Usted Gano!!!",this.miJuego.gano)
                this.enviarJuego.emit(this.miJuego);
                this.miServicioJuego.guardarJuego(this.miJuego);
          
            }
            else
            {
                let index = this.miJuego.numeros.findIndex(valor => valor.numero === num);
                this.miJuego.numeros[index].estado=false;
                //this.miJuego.numeros.splice(index,1);
                this.miJuego.numeroActual--;
            }
        }
        else
        {   
            clearInterval(this.repetidor);
            this.Tiempo=50;
            this.miJuego.generado = false;
            this.miJuego.numeroActual = 24;
            this.miJuego.gano = false;
            this.MostarMensaje("Usted Perdio!!!",this.miJuego.gano)
            this.enviarJuego.emit(this.miJuego);
            this.miServicioJuego.guardarJuego(this.miJuego);
        }
  }

  GenerarJuego= function():void
  {
      this.miJuego.numeros = [];
      var Num: number = 0;
      var numerosDisponibles: Array<number> = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
      for(let i=0;i<24;i++)
      {
          Num = Math.floor((Math.random() * numerosDisponibles.length) + 1);
          this.miJuego.numeros.push({numero:numerosDisponibles[Num - 1],estado:true});
          numerosDisponibles.splice(Num - 1,1);
      }
      this.miJuego.generado = true;
      this.miJuego.numeroActual = 24;
      console.log(this.miJuego.numeros);
      this.repetidor = setInterval(()=>{ 
      this.Tiempo--;
        if(this.Tiempo==0 ) {
          clearInterval(this.repetidor);
          //this.Verificar();
          this.Tiempo=50;
          this.miJuego.gano=false;
          this.miJuego.generado = false;
          this.enviarJuego.emit(this.miJuego);
          this.miServicioJuego.guardarJuego(this.miJuego);
          this.MostarMensaje("Se acabo el tiempo",this.miJuego.gano)
        }
      }, 900);
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
     }, 1500);
    console.info("objeto",x);
  
   }  
  ngOnInit() {
  }

}
