<?php
require_once 'Pizza.php';
require_once 'IApiUsable.php';

class PizzaApi extends Pizza implements IApiUsable
{
    public function TraerTodos($request, $response, $args) 
    {
        $todosLasPizzas=Pizza::TraerTodoLasPizzas();
        $newresponse = $response->withJson($todosLasPizzas, 200);  
        return $newresponse;
    }
    public function TraerUno($request, $response, $args) 
    {
        $todosLasPizzas=Pizza::TraerTodoLasPizzas();
        $sabor = $args['sabor'];
        $objDelaRespuesta= new stdclass();
        $objDelaRespuesta->respuesta = "No existe el sabor";
        foreach($todosLasPizzas as $valor)
        {
            if($sabor == $valor->sabor)
            {
                if($valor->cantidad > 0)
                {
                    $objDelaRespuesta->respuesta = "Hay stock";
                }
                else
                {
                    $objDelaRespuesta->respuesta = "No hay stock";
                }
                break;
            }
        }
        $newresponse = $response->withJson($objDelaRespuesta, 200);  
       //$objDelaRespuesta->respuesta=$cantidad;
       return $newresponse;
    }
    public function CargarUno($request, $response, $args) {
        
       $objDelaRespuesta= new stdclass();
       
       $ArrayDeParametros = $request->getParsedBody();

       $sabor= $ArrayDeParametros["sabor"];
       $cantidad = $ArrayDeParametros['cantidad'];
       $tipo = $ArrayDeParametros['tipo'];
       $foto = $ArrayDeParametros['foto'];
       
       $miPizza= new Pizza();
       $miPizza->sabor=$sabor;
       $miPizza->tipo=$tipo;
       $miPizza->cantidad=$cantidad;
       $miPizza->foto=$foto;

       $miPizza->InsertarLaPizzaParametros();

       
       //$objDelaRespuesta->respuesta="Se guardo la persona.";
       $objDelaRespuesta->respuesta=$sabor;
       
       return $response->withJson($objDelaRespuesta, 200);
       
   }
   public function CargarUnoGet($request, $response, $args) {
       
       $objDelaRespuesta= new stdclass();
       
       $pizza = $args['pizza'];
       $pizzaArray = explode("-",$pizza);
       $sabor = $pizzaArray[0];
       $cantidad = $pizzaArray[1];
       $tipo = $pizzaArray[2];

       $miPizza= new Pizza();
       $miPizza->sabor=$sabor;
       $miPizza->tipo=$tipo;
       $miPizza->cantidad=$cantidad;
       $miPizza->foto="";

       $miPizza->InsertarLaPizzaParametros();

       $objDelaRespuesta->respuesta ="Se guardo la persona.";

       $newresponse = $response->withJson($objDelaRespuesta, 200);  
       //$objDelaRespuesta->respuesta=$cantidad;
       return $newresponse;
   }
   public function BorrarUno($request, $response, $args) {
     	//$ArrayDeParametros = $request->getParsedBody();
     	$id= $args['id'];
     	$Pizza= new Pizza();
     	$Pizza->id=$id;
     	$cantidadDeBorrados=$Pizza->BorrarPizza($id);

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