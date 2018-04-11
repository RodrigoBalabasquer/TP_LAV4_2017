import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class ArchivosjugadoresService {

  constructor(private http : Http) { }
  
    public httpGetPromise(url: string){
      return this.http
      .get("/TP_LAV4_2017/assets/archivos/usuarios.json")
      .toPromise()
      .then(this.extraerDatos)
      .catch(this.handleError);
    }
  
    private extraerDatos(resp:Response) 
    {
        return resp.json() || {};    
    }
    private handleError(error:Response | any) 
    {
        return error;
    }

    

    getUsers() {        
        return this.http.get("/TP_LAV4_2017/assets/archivos/usuarios.json")        
        .map(response => response.json());        
    }
        
    
    
}
