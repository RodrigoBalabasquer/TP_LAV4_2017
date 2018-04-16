//export class JuegoAgilidad {
//}
import  { Juego } from '../clases/juego';

export class JuegoAgilidad extends Juego {
    Numero1:number;
    Numero2:number;
    Operador:string;
    Jugador:string;
    Resultado:number;

    constructor(nombre?: string, gano?: boolean,jugador?:string)
    {   
        super(" Anagrama ",gano,jugador);
        this.nombre = nombre;
    }

    verificar()
    {   
        var resultado;
        switch(this.Operador)
        {
            case"+":
            resultado = this.Numero1 + this.Numero2;
            break;
            case"-":
            resultado = this.Numero1 - this.Numero2;
            break;
            case"*":
            resultado = this.Numero1 * this.Numero2;
            break;
        }
        if(Math.round(this.Resultado) == resultado)
        {
            this.gano = true;
        }
        else
        {
            this.gano = false;
        }
        console.log(resultado);
        return this.gano;
    }
}