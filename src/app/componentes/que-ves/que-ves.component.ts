import { Component, OnInit } from '@angular/core';
import { JuegoQueVes } from '../../clases/juego-que-ves';

@Component({
  selector: 'app-que-ves',
  templateUrl: './que-ves.component.html',
  styleUrls: ['./que-ves.component.css']
})
export class QueVesComponent implements OnInit {
  mostrarJuego : boolean;
  nuevoJuego : JuegoQueVes;
  miImagen : any;
  respuestaIngresada : string;
  ganoperdio : boolean = false;
  msjAcerto : string;
  Mensajes : string;
  ocultarVerificar:boolean;

  constructor() {
    this.nuevoJuego = new JuegoQueVes();//ya puedo mostrar el nombre
    this.mostrarJuego = false;
    console.info("Inicio Que Ves");
    this.miImagen = '1';
  }

  ComenzarJuego(){
    this.nuevoJuego.comenzar();
    this.mostrarJuego = !this.mostrarJuego;
    this.miImagen = this.nuevoJuego.imgMostrar;
    this.nuevoJuego.respuesta;
    //this.miImagen.jugar();
  }

  verificar(){
    if(this.nuevoJuego.verificar()){      
      this.ganoperdio = true;
      this.msjAcerto = "Acertaste!";
      this.MostarMensaje("Sos un Genio!!!",true);
      console.log(this.msjAcerto);
    }
    else{      
      this.ganoperdio = false;
      this.msjAcerto = "Perdiste!";
      this.MostarMensaje("Ooops, casi lo lograste!",false);  
      console.log(this.msjAcerto);    
      //this.mostrarJuego = false;
    } 
    this.nuevoJuego.gano = false;   
  }
/*  verificar()
  {
    this.contador++;
    this.ocultarVerificar=true;
    if (this.nuevoJuego.verificar()){
      this.MostarMensaje("Sos un Genio!!!",true);
    }else{
      this.mensaje = "Ooops, casi lo lograste!";
      this.MostarMensaje(this.mensaje); 
    }
    console.info("Gano: ",this.nuevoJuego.gano);  
  }  */
  asignarImagen(){
    //llama a la funcion que va a cargar la img desde la clase JuegoQueVes
    this.miImagen.comenzar();//'';//lo que me retorne
  }

  ngOnInit() {
  }

  MostarMensaje(mensaje:string,gano:boolean=false) {
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
      modelo.ocultarVerificar=false;
     }, 3000);
    console.info("objeto",x);
  
   } 
}
