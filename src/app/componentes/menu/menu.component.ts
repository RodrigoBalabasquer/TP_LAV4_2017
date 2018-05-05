import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MenuItem } from 'primeng/primeng';
import swal from 'sweetalert'
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  items: MenuItem[];
  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  this.items = [
      {
        label: 'Menu Principal',
        command: e => {
          this.router.navigateByUrl('/Principal');
        }
      },
      {
        label: 'Menu de juegos',
        routerLink: ['/Juegos']
        
      },
      {
        label: 'Juegos',
        items: [{
                  label: 'Adivina el número',
                  command: e => {
                    this.router.navigateByUrl('/Juegos/Adivina');
                  }
                },
                {
                  label: 'Agilidad aritmética',
                  command: e => {
                    this.router.navigateByUrl('/Juegos/Agilidad');
                  }
                },
                {
                  label: 'Anagrama',
                  command: e => {
                    this.router.navigateByUrl('/Juegos/Anagrama');
                  }
                },
                {
                  label: 'Piedra papel o tijeras',
                  command: e => {
                    this.router.navigateByUrl('/Juegos/PPT');
                  }
                },
                {
                  label: 'Agilidad visual',
                  command: e => {
                    this.router.navigateByUrl('/Juegos/Visual');
                  }
                },
                {
                  label: 'Tateti',
                  command: e => {
                    this.router.navigateByUrl('/Juegos/Tateti');
                  }
                }
        ]
      },
      {
          label: 'Listas de resultados',
          icon: 'fa-edit',
          items: [
              {label: 'Lista generica', 
              command: e => {
                    this.router.navigateByUrl('/Listado');
                  }  
              },
              {label: 'Lista adivina el número', 
              command: e => {
                    this.router.navigateByUrl('/Juegos/AdivinaMasListado');
                  } 
              },
              {label: 'Lista agilidad aritmética', 
              command: e => {
                    this.router.navigateByUrl('/Juegos/AgilidadaMasListado');
                  } 
              }
          ]
      }
    ];
  }
  LogOut()
  {
    swal({
      title: "Está seguro que desea salir?",
      icon: "warning",
      buttons: ['Cancelar',true],
      })
    .then((willDelete) => {
      if (willDelete) {
          this.router.navigate(['/Login']);
    }});
    
  }
  Juego(tipo: string) {
    switch (tipo) {
      case 'Adivina':
          this.router.navigate(['/Juegos/Adivina']);
        break;
      case 'Agilidad':
          this.router.navigate(['/Juegos/Agilidad']);
        break;
      case 'AdivinaMasListado':
          this.router.navigate(['/Juegos/AdivinaMasListado']);
        break;
      case 'AgilidadaMasListado':
          this.router.navigate(['/Juegos/AgilidadaMasListado']);
        break;
      case 'Visual':
          this.router.navigate(['/Juegos/Visual']);
        break;
      case 'PPT':
          this.router.navigate(['/Juegos/PPT']);
        break;
      case 'Anagrama':
          this.router.navigate(['Juegos/Anagrama']);
    }
  }

}
