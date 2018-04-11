import { Injectable } from '@angular/core';
import { MiHttpService } from './mi-http.service';
import { Jugador } from '../clases/jugador';
import { ArchivosJugadoresService}from './archivos-jugadores.service'
@Injectable()
export class JugadoresService {

  //peticion:any;
  constructor(
    public miPlayerArchive: ArchivosJugadoresService
  ) {
   // this.peticion = this.miHttp.traerJugadores();
//    this.peticion = this.miHttp.httpGetO("https://restcountries.eu/rest/v2/all");
  }


filtrado:any;

  traertodos(ruta : string,filtro: string) 
  {
    return this.miPlayerArchive.traerJugadores(ruta).then(data=>{
      console.info("jugadores service",data);

      this.filtrado=data;

     let  ganador: boolean;
      if(filtro=="ganadores")
      {
        ganador= true;
      }
      else
      {
        ganador= false;
      }

      this.filtrado =this.filtrado.filter(
        data => data.gano === ganador  || filtro=="todos" ); return this.filtrado}
      )
      .catch(errror=>{console.log("error")
      


    return this.filtrado;
      
    });
  }

  guardarJugador(jugador:Jugador)
  {
    this.miPlayerArchive.miHttp.entregarUnJugador("http://localhost:8080/apirest/apirestV6-JWT-MW-POO/usuario/",jugador)
    .then(datos=> {
      console.log(datos);
    })
    .catch(error => {console.log(error)});
  }

}
