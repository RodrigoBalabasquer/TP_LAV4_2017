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
  BuscarUsuario(usuario:string,clave:string):Promise<Jugador>
  {
    let promesa: Promise<Jugador> = new Promise((resolve, reject) =>
    {
      this.miPlayerArchive.miHttp.buscarJugador("http://localhost:8080/apirest/apirestV6-JWT-MW-POO/usuario/traer",usuario,clave)
      .then(datos=> {
        if(datos.length  > 0 ){
        let jugador: Jugador = new Jugador(datos[0].id,datos[0].usuario,datos[0].nombre,datos[0].apellido,datos[0].contrasenia,datos[0].email);
                          resolve(jugador);}
        else
        {
          //let jugadorFail: Jugador = new Jugador(0,null,null,null,null,null);
          resolve(null);
        }
      })
      .catch(error => {console.log(error)});
    });
    return promesa;
  }

}
