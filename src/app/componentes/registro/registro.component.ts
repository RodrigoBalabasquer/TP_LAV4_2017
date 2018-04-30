import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Jugador } from "../../clases/jugador";
import { JugadoresService } from "../../servicios/jugadores.service";
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
//para poder hacer las validaciones
//import { Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';
function copiaClave(input: FormControl) {

      if (input.root.get('clave') == null) {
        return null;
      }

      const verificar = input.root.get('clave').value === input.value;
      return verificar ? null : { mismaClave : true };
  }

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  
  public jugador: Jugador;
  miServicioJugador:JugadoresService
  claveCopia: string;
  
  usuario = new FormControl('', [
    Validators.required,
    Validators.minLength(5)
  ]);

  nombre = new FormControl('', [
    Validators.required,
    Validators.minLength(5)
  ]);

  apellido = new FormControl('', [
    Validators.required,
    Validators.minLength(5)
  ]);

  email = new FormControl('', [
    Validators.required,
    Validators.minLength(5)
  ]);
  
  clave = new FormControl('', [
    Validators.required,
    Validators.minLength(5)
  ]);
  
  copiaClave = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    copiaClave
  ]);

  registroForm: FormGroup = this.builder.group({
    nombre: this.nombre,
    apellido: this.apellido,
    usuario: this.usuario,
    email: this.email,
    clave: this.clave,
    copiaClave: this.copiaClave,
  });

  constructor(private router: Router,ServicioJugador: JugadoresService,private builder: FormBuilder ) {
    this.jugador = new Jugador(null,null,null,null,null,null);
    this.miServicioJugador = ServicioJugador;
   }

  ngOnInit() {
  }


  cancelar()
  {
    this.router.navigate(['/Login']);
  }
  Registrar()
  { 
    this.miServicioJugador.guardarJugador(this.jugador)
    .then((datos)=> {
      if(datos == true){
      localStorage.setItem("Usuario",JSON.stringify(this.jugador));
      this.router.navigate(['/Principal']);
      }
    })
    .catch( 
      (noSeEncontroUsuario) => {alert("Error en el sistema");}
    );
  }
}
