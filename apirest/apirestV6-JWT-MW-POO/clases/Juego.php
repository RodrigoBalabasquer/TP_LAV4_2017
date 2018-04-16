<?php
class Juego
{
	public $id;
    public $jugador;
 	public $juego;
  	public $resultado;
    
    /*public static function TraerTodoLosUsuarios()
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
	}*/
	public function InsertarJuegoParametros()
	{			
			   $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			   $consulta =$objetoAccesoDato->RetornarConsulta("INSERT into listajuegos(id,juego,jugador,resultado)values(null,:juego,:jugador,:resultado)");
			   $consulta->bindParam(':jugador',$this->jugador);
			   $consulta->bindParam(':juego', $this->juego);
			   $consulta->bindParam(':resultado',$this->resultado);
			   $consulta->execute();		
			   return $objetoAccesoDato->RetornarUltimoIdInsertado();
	}
	public static function TraerJuegosLista($juego,$jugador,$resultado)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		//$consultaString = "select * from listajuegos Where ";

		if($juego == null && $jugador == null  && $resultado == null)
			$consultaString = "1";
		else{
			if($juego != null)
			{
				$consultaString = "juego = '$juego'";
				if($jugador != null)
				{
					$consultaString = "$consultaString AND jugador = '$jugador'";
				}
				if($resultado != null){
					if($resultado == 1)
						$consultaString = "$consultaString AND resultado = true";
					if($resultado == 2)
						$consultaString = "$consultaString AND resultado = 0";
				}
			}
			else
			{	
				if($jugador != null){
					$consultaString = "jugador = '$jugador'";
					if($resultado != null){
						if($resultado == 1)
							$consultaString = "$consultaString AND resultado = true";
						if($resultado == 2)
							$consultaString = "$consultaString AND resultado = 0";
					}
				}
				else
				{
					if($resultado == 1)
						$consultaString = "resultado = true";
					if($resultado == 2)
						$consultaString = "resultado = 0";
				}
			}
		}
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from listajuegos Where $consultaString");
		$consulta->execute();			
		return $consulta->fetchAll(PDO::FETCH_CLASS, "Juego");		
	}
}
?>