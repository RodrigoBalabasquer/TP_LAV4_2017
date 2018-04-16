<?php
require_once 'Usuario.php';
require_once 'IApiUsable.php';

class UsuarioApi extends Usuario implements IApiUsable
{
    public function TraerTodos($request, $response, $args) 
    {
        $todosLosUsuario =Usuario::TraerTodoLosUsuarios();
        $newresponse = $response->withJson($todosLosUsuario, 200);  
        return $newresponse;
    }
    public function TraerUno($request, $response, $args) 
    {
        $objDelaRespuesta= new stdclass();
       
       $ArrayDeParametros = $request->getParsedBody();
       $usuario= $ArrayDeParametros["usuario"];
       $contrasenia = $ArrayDeParametros['contrasenia'];
       $pass = md5($contrasenia);

       $User = Usuario::TraerUnUsuario($usuario,$pass);
       //$User =Usuario::TraerTodoLosUsuarios();
        

       $newresponse = $response->withJson($User, 200);  
       return $newresponse;
       
       //$objDelaRespuesta->respuesta= $pass;
       //return $response->withJson($objDelaRespuesta, 200);
       
    }
    public function CargarUno($request, $response, $args) {
        
       $objDelaRespuesta= new stdclass();
       
       $ArrayDeParametros = $request->getParsedBody();

       $usuario= $ArrayDeParametros["usuario"];
       $nombre = $ArrayDeParametros['nombre'];
       $apellido = $ArrayDeParametros['apellido'];
       $email = $ArrayDeParametros['email'];
       $contrasenia = $ArrayDeParametros['contrasenia'];
       
       $miUsuario= new Usuario();
       $miUsuario->usuario=$usuario;
       $miUsuario->nombre=$nombre;
       $miUsuario->apellido=$apellido;

       $miUsuario->contrasenia= md5($contrasenia);
       //$miUsuario->contrasenia=$contrasenia;

       $miUsuario->email=$email;

       $miUsuario->InsertarUsuarioParametros();

       
       $objDelaRespuesta->respuesta="Se guardo la persona.";
       //$objDelaRespuesta->respuesta= $usuario;
       
       return $response->withJson($objDelaRespuesta, 200);
       
   }


   public function BorrarUno($request, $response, $args) {
     	//$ArrayDeParametros = $request->getParsedBody();
     	$id= $args['id'];
     	$Usuario= new Usuario();
     	$Usuario->id=$id;
     	$cantidadDeBorrados=$Usuario->BorrarUsuario($id);

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
}

?>