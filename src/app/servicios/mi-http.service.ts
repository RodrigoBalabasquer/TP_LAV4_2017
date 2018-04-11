import { Injectable } from '@angular/core';

import {Http ,Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class MiHttpService {
  
  constructor(public http:Http) { }
  
  public httpGetPromise(url: string, objeto:any){


    return this.http
    .get(url)
    .toPromise()
    .then(this.extraerDatos)
    .catch(this.handleError);
  }

  private extraerDatos(resp:Response) {

      return resp.json() || {};

  }
  private handleError(error:Response | any) {

      return error;
  }

  entregarUnJugador(url:string,player:any)
  {
    //console.log(person);
    var param = {"usuario":player.usuario,"nombre":player.nombre,"apellido":player.apellido,"contrasenia":player.contrasenia,"email":player.email};
    var paramString = JSON.stringify(param);
    console.log(param);
    //var paramString= "nombre="+person.nombre+"&sexo="+person.sexo+"&mail="+person.mail+"&password="+person.password+"&foto="+person.foto;
    console.log(paramString);
    return this.http.post(url,paramString).toPromise().then(this.extraerDatos).catch(this.manejadorDeError);
  }
  manejadorDeError(error:Response|any)
  {
    return error;
  }
}
