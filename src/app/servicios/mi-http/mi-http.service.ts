import { log } from 'util';
import { Injectable } from '@angular/core';

import { Http, Response,RequestOptions,Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MiHttpService {

  URl = "http://localhost:8080/apirest/apirestV6-JWT-MW-POO/";
  //URl = "http://rodrigobalabasquer.esy.es/apirest/apirestV6-JWT-MW-POO/";
  constructor( public http: Http ) { }

  public httpGetP ( url: string)
  {
    return this.http
    .get( url )
    .toPromise()
    .then( this.extractData )
    .catch( this.handleError );
  }

  public httpPostP( url: string, objeto: any )
  {
    return this.http
    .get( url )
    .subscribe( data => {
      console.log( data );
      return data;
    });
  }

  public httpGetO ( url: string): Observable<Response>
  {
    return this.http.get( url )
      .map( ( res: Response ) => res.json())
      .catch( ( err: any ) => Observable.throw(err.json().error || 'Server error'));
  }


  private extractData ( res: Response )
  {
    return res.json() || {};
  }

  private handleError ( error: Response | any )
  {
    return error;
  }
  entregarUnJugador(url:string,player:any)
  {
    console.log(url);
    var param = {usuario:player.usuario,nombre:player.nombre,apellido:player.apellido,contrasenia:player.contrasenia,email:player.email};
    var paramString = JSON.stringify(param);
    let header = new Headers();
    header.append('Content-Type','application/json');
    console.log(param);
    //var paramString= "usuario="+player.usuario+"&nombre="+player.nombre+"&apellido="+player.apellido+"&contrasenia="+player.contrasenia+"&email="+player.email;
    console.log(paramString);
    
    //return this.http.post(url,paramString).toPromise().then(this.extractData).catch(this.handleError);
    return this.http.post(this.URl+url,paramString,{headers:header}).toPromise().then(this.extractData).catch(this.handleError);
  }
  buscarJugador(url:string,usuario:string,clave:string)
  {
    var param = {usuario:usuario,contrasenia:clave};
    var paramString = JSON.stringify(param);
    let header = new Headers();
    header.append('Content-Type','application/json');
    //return this.http.post(url,paramString).toPromise().then(this.extractData).catch(this.handleError);
    return this.http.post(this.URl+url,paramString,{headers:header}).toPromise().then(this.extractData).catch(this.handleError);
  }
  buscarJuegos(url:string,juego:string,jugador:string,resultado:number)
  { 
    var param = {juego:juego,jugador:jugador,resultado:resultado};
    var paramString = JSON.stringify(param);
    let header = new Headers();
    header.append('Content-Type','application/json');
    //return this.http.post(url,paramString).toPromise().then(this.extractData).catch(this.handleError);
    return this.http.post(this.URl+url,paramString,{headers:header}).toPromise().then(this.extractData).catch(this.handleError);
  }
  entregarUnJuego(url:string,game:any)
  {
    console.log(url);
    var param = {jugador:game.jugador,juego:game.nombre,resultado:game.gano};
    var paramString = JSON.stringify(param);
    let header = new Headers();
    header.append('Content-Type','application/json');
    console.log(param);
    //var paramString= "usuario="+player.usuario+"&nombre="+player.nombre+"&apellido="+player.apellido+"&contrasenia="+player.contrasenia+"&email="+player.email;
    console.log(paramString);
    
    //return this.http.post(url,paramString).toPromise().then(this.extractData).catch(this.handleError);
    return this.http.post(this.URl+url,paramString,{headers:header}).toPromise().then(this.extractData).catch(this.handleError);
  }
}
