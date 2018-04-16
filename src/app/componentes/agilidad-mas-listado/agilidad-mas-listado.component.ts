import { Component, OnInit } from '@angular/core';
import { Juego } from '../../clases/juego';
import { JuegoAgilidad} from '../../clases/juego-agilidad';
@Component({
  selector: 'app-agilidad-mas-listado',
  templateUrl: './agilidad-mas-listado.component.html',
  styleUrls: ['./agilidad-mas-listado.component.css']
})
export class AgilidadMasListadoComponent implements OnInit {
  public listadoParaCompartir: Array<any>;
  constructor() { this.listadoParaCompartir = new Array<any>()}

  ngOnInit() {
  }

  tomarJuegoTerminado(juego: Juego)
  {
    var nuevoJuego: JuegoAgilidad = new JuegoAgilidad(juego.nombre,juego.gano,juego.jugador);
    this.listadoParaCompartir.push(nuevoJuego);
  }
}
