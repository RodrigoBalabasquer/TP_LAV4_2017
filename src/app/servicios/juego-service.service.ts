import { Injectable } from '@angular/core';
import { Juego } from '../clases/Juego';
import { JuegoAdivina } from '../clases/juego-adivina';
import { JuegoAgilidad} from '../clases/juego-agilidad';
import { JuegoAgilidadVisual} from '../clases/juego-agilidad-visual';
import { JuegoAnagrama} from '../clases/juego-anagrama';
import { JuegoPiedraPapelTijera} from '../clases/juego-piedra-papel-tijera';
import { Tateti} from '../clases/tateti';
import { MiHttpService } from './mi-http/mi-http.service';
import { ArchivosJugadoresService } from './archivos-jugadores.service'

@Injectable()
export class JuegoServiceService {

  peticion: any;
  constructor(public miGame: ArchivosJugadoresService) {
    //this.peticion = this.miHttp.httpGetO("http://localhost:3003");
    //    this.peticion = this.miHttp.httpGetO("https://restcountries.eu/rest/v2/all");
  }

  /*public listar(): Array<Juego> {
   this.miGame.miHttp.httpGetP("https://restcountries.eu/rest/v2/all")
    .then( data => {
      console.log( data );
    })
    .catch( err => {
      console.log( err );
    });
   
  
    this.peticion
    .subscribe( data => {
      console.log("En listar");
      console.log( data );
    }, err => {
      console.info("error: " ,err );
    })

    let miArray: Array<Juego> = new Array<Juego>();

    miArray.push(new JuegoAdivina("Juego 1", false));
    miArray.push(new JuegoAdivina("Pepe", true));
    miArray.push(new JuegoAdivina("Juego 3", false));
    miArray.push(new JuegoAdivina("Juego 4", false));
    miArray.push(new JuegoAdivina("Juego 5", false));
    miArray.push(new JuegoAdivina("Juego 6", false));
    return miArray;
  }

  public listarPromesa(): Promise<Array<Juego>> {
    this.peticion
    .subscribe( data => {
      console.log("En listarPromesa");
      console.log( data );
    }, err => {
      console.log( err );
    })
    let promesa: Promise<Array<Juego>> = new Promise((resolve, reject) => {
      let miArray: Array<Juego> = new Array<Juego>();
      miArray.push(new JuegoAdivina("JuegoPromesa 1", false,"promesa"));
      miArray.push(new JuegoAdivina("PepePromesa", true));
      miArray.push(new JuegoAdivina("JuegoPromesa 3", false));
      miArray.push(new JuegoAdivina("JuegoPromesa 4", false));
      miArray.push(new JuegoAdivina("JuegoPromesa 5", false));
      miArray.push(new JuegoAdivina("JuegoPromesa 6", false));
      resolve(miArray);
    });

    return promesa;
  }*/

  guardarJuego(juego: Juego) {
    this.miGame.miHttp.entregarUnJuego("usuario/cargarJuego", juego)
      .then(datos => {
        console.log(datos);
      })
      .catch(error => { console.log(error) });
  }
  TraerJuego(juego: string, jugador: string, resultado: number): Promise<Array<Juego>> {
    let promesa: Promise<Array<Juego>> = new Promise((resolve, reject) => {
      this.miGame.miHttp.buscarJuegos("usuario/traerJuegos", juego, jugador, resultado)
        .then(datos => {
          if (datos.length > 0) {
            let juegos: Array<Juego> = [];
            for(let i=0;i<datos.length;i++)
            {
              switch(datos[i].juego)
              {
                case "Agilidad Visual":
                  juegos.push(new JuegoAgilidadVisual(datos[i].juego,datos[i].resultado,datos[i].jugador))
                  break;
                case "Agilidad aritmética":
                  juegos.push(new JuegoAgilidad(datos[i].juego,datos[i].resultado,datos[i].jugador))
                  break;
                case "Piedra Papel o Tijera":
                  juegos.push(new JuegoPiedraPapelTijera(datos[i].juego,datos[i].resultado,datos[i].jugador))
                  break;
                case "Anagrama":
                  juegos.push(new JuegoAnagrama(datos[i].juego,datos[i].resultado,datos[i].jugador))
                  break;
                case "Adivina el número":
                  juegos.push(new JuegoAdivina(datos[i].juego,datos[i].resultado,datos[i].jugador))
                  break;
                case "TA-TE-TI":
                  juegos.push(new Tateti(datos[i].juego,datos[i].resultado,datos[i].jugador))
                  break;
              }
              //juegos.push(new Juego(datos[i].juego,datos[i].jugador,datos[i].resultado))
            }
            //let juegos: Juego = new Juego(datos[0].id,datos[0].usuario,datos[0].nombre,datos[0].apellido,datos[0].contrasenia,datos[0].email);
            resolve(juegos);
          }
          else {
            resolve(null);
          }
        })
        .catch(error => { console.log(error) });
    });
    return promesa;
  }
}
