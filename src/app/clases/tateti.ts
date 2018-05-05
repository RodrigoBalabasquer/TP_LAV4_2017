import  { Juego } from '../clases/juego';
export class Tateti extends Juego{
    constructor(nombre?: string, gano?: boolean,jugador?:string){
        super("TA-TE-TI",gano,jugador);
    }
    public verificar() {
        return true;
    }
}
