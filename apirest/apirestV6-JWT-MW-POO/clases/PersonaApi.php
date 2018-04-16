<?php
require_once 'Persona.php';
require_once 'IApiUsable.php';
//require_once 'AutentificadorJWT.php';
//require_once '../composer/vendor/autoload.php';
//use Firebase\JWT\JWT;

class PersonaApi extends Persona implements IApiUsable
{   
    //private static $aud = null;
    //private static $clave = "ClaveSuperSecreta";

 	public function TraerUno($request, $response, $args) {
     	$id=$args['id'];
        $laPersona=Persona::TraerUnaPersona($id);
        //$elUsuario['pass'] = AutentificadorJWT::ObtenerData($elUsuario['pass']);
        if(!$laPersona)
        {
            $objDelaRespuesta= new stdclass();
            $objDelaRespuesta->error="No esta la persona";
            $NuevaRespuesta = $response->withJson($objDelaRespuesta, 500); 
        }else
        {
            $NuevaRespuesta = $response->withJson($laPersona, 200); 
        }     
        //$NuevaRespuesta = $response->withJson($elUsuario['pass'], 200); 
        return $NuevaRespuesta;

    }
     public function TraerTodos($request, $response, $args) {
      	$todosLasPersonas=Persona::TraerTodoLasPersonas();
     	$newresponse = $response->withJson($todosLasPersonas, 200);  
    	return $newresponse;
    }
      public function CargarUno($request, $response, $args) {
     	
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        //var_dump($ArrayDeParametros);


        $nombre= $ArrayDeParametros["nombre"];
        $mail = $ArrayDeParametros['mail'];
        $sexo = $ArrayDeParametros['sexo'];
        $foto = $ArrayDeParametros['foto'];
        $password = $ArrayDeParametros['password'];
        
        
        $miPersona = new Persona();
        $miPersona->nombre=$nombre;
        $miPersona->mail=$mail;
        $miPersona->sexo=$sexo;
        $miPersona->foto=$foto;

        $miPersona->password= $password;
        
        $miPersona->InsertarLaPersonaParametros();

        
        //$objDelaRespuesta->respuesta="Se guardo la persona.";
        $objDelaRespuesta->respuesta=$nombre;
        return $response->withJson($objDelaRespuesta, 200);
        
    }
      
      public function BorrarUno($request, $response, $args) {
     	//$ArrayDeParametros = $request->getParsedBody();
     	$id= $args['id'];
     	$Persona= new Persona();
     	$Persona->id=$id;
     	$cantidadDeBorrados=$Persona->BorrarPersona($id);

     	$objDelaRespuesta= new stdclass();
	    $objDelaRespuesta->cantidad=$cantidadDeBorrados;
	    if($cantidadDeBorrados>0)
	    	{
	    		 $objDelaRespuesta->resultado="algo borro!!!";
	    	}
	    	else
	    	{
	    		$objDelaRespuesta->resultado="no Borro nada!!!";
	    	}
        $newResponse = $response->withJson($objDelaRespuesta, 200);  
      	return $newResponse;
    }
     
     public function ModificarUno($request, $response, $args) {
     	//$response->getBody()->write("<h1>Modificar  uno</h1>");
     	$ArrayDeParametros = $request->getParsedBody();
	    //var_dump($ArrayDeParametros);    	
	    $miPersona = new Persona();
	    $miPersona->id=$ArrayDeParametros['id'];
	    $miPersona->nombre=$ArrayDeParametros['nombre'];
        $miPersona->mail=$ArrayDeParametros['mail'];
        $miPersona->sexo=$ArrayDeParametros['sexo'];
        $miPersona->foto=$ArrayDeParametros['foto'];
        $miPersona->password=$ArrayDeParametros['password'];
	    $miPersona->habilitado=$ArrayDeParametros['habilitado'];

	   	$resultado = $miPersona->ModificarPersonaParametros();
	   	$objDelaRespuesta= new stdclass();
		//var_dump($ArrayDeParametros);
		$objDelaRespuesta->resultado=$resultado;
        $objDelaRespuesta->tarea="modificar";
		return $response->withJson($objDelaRespuesta, 200);		
    }
}