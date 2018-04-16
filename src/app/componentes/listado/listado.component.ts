import { Component, OnInit } from '@angular/core';
import { JuegoServiceService } from '../../servicios/juego-service.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  
  juego:string= "";
  jugador:boolean = false;
  resultado: string = "2";
  public listadoParaCompartir: Array<any> = [];
   miServicioJuego:JuegoServiceService

  constructor(servicioJuego:JuegoServiceService) {
    this.miServicioJuego = servicioJuego;
    this.listar(null,null,null);
    
  }
  
  ngOnInit() {
    
  }

  listar(juego?:string,jugador?:string,resultado?:number)
  { 
    /*juego = "Agilidad Visual";
    jugador = "Rodrix14";
    resultado = false;*/
    this.miServicioJuego.TraerJuego(juego,jugador,resultado)
      .then((datos)=> {
        if(datos != null){
          this.listadoParaCompartir = datos;
        }
        else
          this.listadoParaCompartir = [];
      })
      .catch( 
        (noSeEncontroUsuario) => {alert("Datos incorrectos");}
      );
  }
  buscar()
  {
    //alert(this.juego);
    let player: string = null;
    let result: number = null;
    if(this.jugador)
    {
      let userjs = localStorage.getItem("Usuario");
      let user:any = userjs!=null?JSON.parse(userjs):null;
      player = user.usuario;
    }
    if(this.juego == "")
      this.juego = null;
    switch(this.resultado)
    {
      case "1":
        result = 1;
        break;
      case "2":
        result = 2;
        break;
      case "3":
        result = null;
        break;
    }

    this.miServicioJuego.TraerJuego(this.juego,player,result)
      .then((datos)=> {
        if(datos != null){
          this.listadoParaCompartir = datos;
        }
        else
          this.listadoParaCompartir = [];
      })
      .catch( 
        (noSeEncontroUsuario) => {alert("Datos incorrectos");}
      );

      if(this.juego == null)
        this.juego = "";
  }
  /*llamaService(){
    console.log("llamaService");
    this.listadoParaCompartir= this.miServicioJuego.listar();
  }

  llamaServicePromesa(){
    console.log("llamaServicePromesa");
    this.miServicioJuego.listarPromesa().then((listado) => {
        this.listadoParaCompartir = listado;
    });
  }*/
}
