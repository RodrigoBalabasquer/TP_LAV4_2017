import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Jugador } from "../../clases/jugador";
import { JugadoresService } from "../../servicios/jugadores.service";
//para poder hacer las validaciones
//import { Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

 /* constructor( private miConstructor:FormBuilder) { }
  email=new FormControl('',[Validators.email]);
  formRegistro:FormGroup=this.miConstructor.group({
    usuario:this.email
  });*/
  public jugador: Jugador;
  miServicioJugador:JugadoresService
  public claveCopia: string;
  

  constructor(private router: Router,ServicioJugador: JugadoresService ) {
    this.jugador = new Jugador(null,null,null,null,null,null);
    this.miServicioJugador = ServicioJugador;
   }

  ngOnInit() {
  }


  cancelar()
  {
    this.router.navigate(['/Login']);
  }
  registrar()
  { 
    if(this.jugador.usuario ==  " " || this.jugador.nombre == " " || this.jugador.apellido == " " || this.jugador.email == " " ||
    this.jugador.contrasenia == " " || this.claveCopia == " ")
    {
      alert("Complete todos los campos");
    }
    console.log(this.jugador);
    this.miServicioJugador.guardarJugador(this.jugador);
  }
}
