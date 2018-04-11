//export class JuegoAgilidad {
//}
export class JuegoAgilidad {
    Nombre:string;
    Numero1:number;
    Numero2:number;
    Operador:string;
    Gano:number;
    Jugador:string;
    Resultado:number;
    Timer:number;

    constructor(nombre:string)
    {
        this.Nombre = nombre;
        this.Gano = 0;
    }

    GenerarJuego = function():void
    {
        this.Numero1 = Math.floor((Math.random() * 100) + 1);
        this.Numero2 = Math.floor((Math.random() * 100) + 1);
        var operador = Math.floor((Math.random()*4)+1);
        switch(operador)
        {
            case 1:
            this.Operador = '+';
            break;
            case 2:
            this.Operador = '-';
            break;
            case 3:
            this.Operador = '/';
            break;
            case 4:
            this.Operador = '*';
            break;
        }
        this.Gano = 0;
        var f=new Date();
        this.Timer = f.getHours()*60*60+f.getMinutes()*60+f.getSeconds();
        console.log(this.Timer);
     }
    
    Verificar = function():void
    {   
        var resultado;
        if(this.Gano == 0)
        {
            switch(this.Operador)
            {
                case"+":
                resultado = this.Numero1 + this.Numero2;
                break;
                case"-":
                resultado = this.Numero1 - this.Numero2;
                break;
                case"/":
                resultado = Math.round(this.Numero1 / this.Numero2);
                break;
                case"*":
                resultado = this.Numero1 * this.Numero2;
                break;
            }
            if(Math.round(this.Resultado) == resultado)
            {
                this.Gano = 1;
                var f=new Date();
                var actual = f.getHours()*60*60+f.getMinutes()*60+f.getSeconds();
                actual = actual - this.Timer;
                alert("Usted Gano en "+actual+" segundos.");
            }
            else
            {
                this.Gano = -1;
                alert("Usted Perdio");
            }
            console.log(resultado);
        }
        else
        {
            console.log("Debe hacer click en nuevo para empezar");
        }
    }
}