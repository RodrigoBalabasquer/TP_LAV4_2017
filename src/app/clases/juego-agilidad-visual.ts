import { Juego } from '../clases/juego'

export class JuegoAgilidadVisual extends  Juego {
    
    numeros: Array<number> = [];
    generado: boolean = false;
    numeroActual: number; 
    constructor(nombre?: string, gano?: boolean, jugador?:string) {
        super(nombre,gano,jugador);
    }
    public verificar()
    {
        return true;
    }
}
