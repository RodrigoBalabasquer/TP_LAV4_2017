import  { Juego } from '../clases/juego';

export class JuegoQueVes extends Juego {
    numImagen : number;
    nombreImagen : any;
    imgMostrar : any;
    respuestaIngresada : string;
    respCorrecta : string;
    respuesta : string;
    
    constructor(nombre?: string, gano?: boolean,jugador?:string){
        super(" ¿Qué ves? ",gano,jugador);
    }

    public comenzar(){
        this.numImagen = Math.floor( Math.random()*18)+1;
        //alert(this.numImagen);
        switch(this.numImagen){
            case 1 :
            this.nombreImagen = '1';
            this.respCorrecta = "alfajor";
            break;
            case 2 :
            this.nombreImagen = '2';
            this.respCorrecta = "barco";
            break;
            case 3 :
            this.nombreImagen = '3';
            this.respCorrecta = "bigama";
            break;
            case 4 :
            this.nombreImagen = '4';
            this.respCorrecta = "binocular";
            break;
            case 5 :
            this.nombreImagen = '5';
            this.respCorrecta = "casino";
            break;
            case 6 :
            this.nombreImagen = '6';
            this.respCorrecta = "desayuno";
            break;
            case 7 :
            this.nombreImagen = '7';
            this.respCorrecta = "desconocidos";
            break;
            case 8 :
            this.nombreImagen = '8';
            this.respCorrecta = "festeja";
            break;
            case 9 :
            this.nombreImagen = '9';
            this.respCorrecta = "gobierno";
            break;
            case 10 :
            this.nombreImagen = '10';
            this.respCorrecta = "matilde";
            break;
            case 11 :
            this.nombreImagen = '11';
            this.respCorrecta = "molestar";
            break;
            case 12 :
            this.nombreImagen = '12';
            this.respCorrecta = "nocivo";
            break;
            case 13 :
            this.nombreImagen = '13';
            this.respCorrecta = "parecidos";
            break;
            case 14 :
            this.nombreImagen = '14';
            this.respCorrecta = "secuestrados";
            break;
            case 15 :
            this.nombreImagen = '15';
            this.respCorrecta = "sobrevivir";
            break;
            case 16 :
            this.nombreImagen = '16';
            this.respCorrecta = "sobrevolar";
            break;
            case 17 :
            this.nombreImagen = '17';
            this.respCorrecta = "sobrevuela";
            break;
            case 18 :
            this.nombreImagen = '18';
            this.respCorrecta = "tripas";
            break;
        }
        this.imgMostrar = this.nombreImagen;
        this.respuesta = this.respCorrecta;
        //this.jugar();
    }

    public mostrarJugada(){
        alert( this.imgMostrar+ " " + this.respCorrecta);
      return this.imgMostrar;
        
    }

    public verificar() {
        //alert(" tu resp " +this.respuestaIngresada + " la correct " +this.respuesta);
        if (this.respuestaIngresada == this.respuesta) {
          this.gano = true;
        }
        if (this.gano) {
          return true;
        } else {
          return false;
        }
    }

}