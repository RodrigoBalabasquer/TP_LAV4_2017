export class Jugador {
    
    /*public id: number; 
    public usuario: string;
    public nombre:string;
    public apellido: string;        
    public contrasenia: string;
    public email: string;*/
    constructor(public id: number, 
    public usuario: string,
    public nombre:string,
    public apellido: string,        
    public contrasenia: string,
    public email: string
    ) { 
        this.id = id;
        this.usuario = usuario;
        this.nombre = nombre;
        this.contrasenia = contrasenia;
        this.email = email;
    }
}
