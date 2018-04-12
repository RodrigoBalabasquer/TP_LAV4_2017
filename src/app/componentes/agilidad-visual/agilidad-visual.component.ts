import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import{JuegoAgilidadVisual} from '../../clases/juego-agilidad-visual';

@Component({
  selector: 'app-agilidad-visual',
  templateUrl: './agilidad-visual.component.html',
  styleUrls: ['./agilidad-visual.component.css']
})
export class AgilidadVisualComponent implements OnInit {

  public miJuego:JuegoAgilidadVisual;

  constructor() {
    this.miJuego = new JuegoAgilidadVisual("Agilidad Visual");
   }

  ngOnInit() {
  }

}
