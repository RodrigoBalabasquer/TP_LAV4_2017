<?php
class Pizza
{
	public $id;
 	public $sabor;
  	public $cantidad;
    public $tipo;
    public $foto;
    
    public static function TraerTodoLasPizzas()
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("select * from pizza");
			$consulta->execute();			
			return $consulta->fetchAll(PDO::FETCH_CLASS, "Pizza");		
	}
	public function InsertarLaPizzaParametros()
	{			
			   $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			   $consulta =$objetoAccesoDato->RetornarConsulta("INSERT into pizza(id,sabor,tipo,cantidad,foto)values(null,:sabor,:tipo,:cantidad,:foto)");
			   $consulta->bindParam(':sabor',$this->sabor);
			   $consulta->bindParam(':tipo', $this->tipo);
			   $consulta->bindParam(':cantidad',$this->cantidad);
			   $consulta->bindParam(':foto',$this->foto);
			   $consulta->execute();		
			   return $objetoAccesoDato->RetornarUltimoIdInsertado();
	}
	public function BorrarPizza($id)
	 {
	 		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			
			$consulta =$objetoAccesoDato->RetornarConsulta("
				DELETE FROM pizza  
				WHERE id= $id");	
				//$consulta->bindValue(':id',$this->id, PDO::PARAM_INT);		
				$consulta->execute();
				return $consulta->rowCount();
	 }
}
?>