import { log } from 'util';
import { Injectable } from '@angular/core';

import { Http, Response,RequestOptions,Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MiHttpService {

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
    return this.http.post(url,paramString,{headers:header}).toPromise().then(this.extractData).catch(this.handleError);
  }
  
}
