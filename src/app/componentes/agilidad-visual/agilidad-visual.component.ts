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
  

  constructor(ServicioJuego: JuegoServiceService) {
    this.miJuego = new JuegoAgilidadVisual("Agilidad Visual");
    let userjs = localStorage.getItem("Usuario");
    let user:any = userjs!=null?JSON.parse(userjs):null;
    this.miJuego.jugador = user.usuario;
    this.miServicioJuego = ServicioJuego;
    this.Tiempo = 25;
   }

  Verificar(num:number)
  {
    if(num == this.miJuego.numeroActual)
        {
            if(num == 1)
            {   
                clearInterval(this.repetidor);
                alert("Usted Gano!!!");
                this.miJuego.generado = false;
                this.miJuego.numeroActual = 20;
                this.miJuego.gano = true;
                this.enviarJuego.emit(this.miJuego);
                this.miServicioJuego.guardarJuego(this.miJuego);
          
            }
            else
            {
                let index = this.miJuego.numeros.indexOf(num);
                this.miJuego.numeros.splice(index,1);
                this.miJuego.numeroActual--;
            }
        }
        else
        {   
            clearInterval(this.repetidor);
            alert("Usted Perdio!!!");
            this.miJuego.generado = false;
            this.miJuego.numeroActual = 20;
            this.miJuego.gano = false;
            this.enviarJuego.emit(this.miJuego);
            this.miServicioJuego.guardarJuego(this.miJuego);
        }
  }

  GenerarJuego= function():void
  {
      this.miJuego.numeros = [];
      var Num: number = 0;
      var numerosDisponibles: Array<number> = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
      for(let i=0;i<20;i++)
      {
          Num = Math.floor((Math.random() * numerosDisponibles.length) + 1);
          this.miJuego.numeros.push(numerosDisponibles[Num - 1]);
          numerosDisponibles.splice(Num - 1,1);
      }
      this.miJuego.generado = true;
      this.miJuego.numeroActual = 20;
      
      this.repetidor = setInterval(()=>{ 
      this.Tiempo--;
        if(this.Tiempo==0 ) {
          clearInterval(this.repetidor);
          //this.Verificar();
          this.Tiempo=25;
          this.miJuego.gano=false;
          this.miJuego.generado = false;
          this.enviarJuego.emit(this.miJuego);
          this.miServicioJuego.guardarJuego(this.miJuego);
          alert("Se acabo el tiempo");
        }
      }, 900);
  }

  ngOnInit() {
  }

}
