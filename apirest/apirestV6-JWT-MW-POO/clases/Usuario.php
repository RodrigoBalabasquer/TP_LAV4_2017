<?php
class Usuario
{
	public $id;
    public $usuario;
 	public $nombre;
  	public $apellido;
    public $email;
    public $contrasenia;

    
    public static function TraerTodoLosUsuarios()
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("select * from usuarios");
			$consulta->execute();			
			return $consulta->fetchAll(PDO::FETCH_CLASS, "Usuario");		
	}

	public static function TraerUnUsuario($usuario,$pass)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("select * from usuarios
			Where usuario = :usuario AND contrasenia = :pass");
			$consulta->bindParam(':usuario',$usuario);
			$consulta->bindParam(':pass',$pass);
			$consulta->execute();			
			return $consulta->fetchAll(PDO::FETCH_CLASS, "Usuario");		
	}
	public function InsertarUsuarioParametros()
	{			
			   $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			   $consulta =$objetoAccesoDato->RetornarConsulta("INSERT into usuarios(id,usuario,nombre,apellido,contrasenia,email)values(null,:usuario,:nombre,:apellido,:contrasenia,:email)");
			   $consulta->bindParam(':usuario',$this->usuario);
			   $consulta->bindParam(':nombre', $this->nombre);
			   $consulta->bindParam(':apellido',$this->apellido);
			   $consulta->bindParam(':contrasenia',$this->contrasenia);
			   $consulta->bindParam(':email',$this->email);
               $consulta->execute();		
			   return $objetoAccesoDato->RetornarUltimoIdInsertado();
	}
	public function BorrarUsuario($id)
	 {
	 		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			
			$consulta =$objetoAccesoDato->RetornarConsulta("
				DELETE FROM usuarios  
				WHERE id= $id");	
				//$consulta->bindValue(':id',$this->id, PDO::PARAM_INT);		
				$consulta->execute();
				return $consulta->rowCount();
	 }
}
?>