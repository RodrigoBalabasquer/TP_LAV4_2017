<?php
class Persona
{
	public $id;
 	public $nombre;
  	public $mail;
    public $sexo;
    public $password;
    public $foto;
    public $habilitado;


  	public function BorrarPersona($id)
	 {
	 		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			
			$consulta =$objetoAccesoDato->RetornarConsulta("
				DELETE FROM persona  
				WHERE id= $id");	
				//$consulta->bindValue(':id',$this->id, PDO::PARAM_INT);		
				$consulta->execute();
				return $consulta->rowCount();
	 }

	
	
  	public function ModificarPersonaParametros()
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("
				update persona 
				set nombre=:nombre,
                mail=:mail,
                sexo=:sexo,
                password=:password,
                foto=:foto,
				habilitado=:habilitado
				WHERE id=:id");
			$consulta->bindValue(':id',$this->id);
			$consulta->bindValue(':nombre',$this->nombre);
			$consulta->bindValue(':mail', $this->mail);
            $consulta->bindValue(':sexo',$this->sexo);
            $consulta->bindValue(':password', $this->password);
            $consulta->bindValue(':foto',$this->foto);
			$consulta->bindValue(':habilitado', $this->habilitado);
			$consulta->execute();
			return $this->id;
	 }

	 
	 public function InsertarLaPersonaParametros()
	 {
				$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
				$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into persona(id,nombre,mail,sexo,password,foto,habilitado)values(null,:nombre,:mail,:sexo,:password,:foto,1)");
				$consulta->bindValue(':nombre',$this->nombre);
                $consulta->bindValue(':mail', $this->mail);
                $consulta->bindValue(':sexo',$this->sexo);
                $consulta->bindValue(':password', $this->password);
                $consulta->bindValue(':foto',$this->foto);
				$consulta->execute();		
				return $objetoAccesoDato->RetornarUltimoIdInsertado();
	 }

	public static function TraerTodoLasPersonas()
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("select * from persona");
			$consulta->execute();			
			return $consulta->fetchAll(PDO::FETCH_CLASS, "Persona");		
	}

	public static function TraerUnaPersona($id) 
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("select * from persona where id = $id");
			$consulta->execute();
			$cdBuscado= $consulta->fetchObject('Persona');
			return $cdBuscado;				
    }
}