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

    Verificar = function(num:number):void
    {   
        debugger;
        if(num == this.numeroActual)
        {
            if(num == 1)
            {
                alert("Usted Gano!!!");
                this.generado = false;
                this.numeroActual = 20;
            }
            else
            {
                let index = this.numeros.indexOf(num);
                this.numeros.splice(index,1);
                this.numeroActual--;
            }
        }
        else
        {
            alert("Usted Perdio!!!");
            this.generado = false;
            this.numeroActual = 20;
        }
    }

    GenerarJuego= function():void
    {
        this.numeros = [];
        var Num: number = 0;
        var numerosDisponibles: Array<number> = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
        for(let i=0;i<20;i++)
        {
            Num = Math.floor((Math.random() * numerosDisponibles.length) + 1);
            this.numeros.push(numerosDisponibles[Num - 1]);
            numerosDisponibles.splice(Num - 1,1);
        }
        this.generado = true;
        this.numeroActual = 20;
    }
    
}
