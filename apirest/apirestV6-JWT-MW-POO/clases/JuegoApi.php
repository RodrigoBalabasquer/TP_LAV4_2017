<?php
require_once 'Juego.php';
require_once 'IApiUsable2.php';

class JuegoApi extends Juego implements IApiUsable2
{
    public function CargarJuego($request, $response, $args) 
    {
        $objDelaRespuesta= new stdclass();
       
       $ArrayDeParametros = $request->getParsedBody();

       $jugador= $ArrayDeParametros["jugador"];
       $juego = $ArrayDeParametros['juego'];
       $resultado = $ArrayDeParametros['resultado'];
       
       $miJuego= new Juego();
       $miJuego->jugador=$jugador;
       $miJuego->juego=$juego;
       $miJuego->resultado=$resultado;

       $miJuego->InsertarJuegoParametros();

       
       $objDelaRespuesta->respuesta="Se guardo el juego.";
       //$objDelaRespuesta->respuesta= $usuario;
       
       return $response->withJson($objDelaRespuesta, 200);
    }
    public function TraerJuegos($request, $response, $args)
    {
       $objDelaRespuesta= new stdclass();
       
       $ArrayDeParametros = $request->getParsedBody();
       $jugador= $ArrayDeParametros["jugador"];
       $juego = $ArrayDeParametros['juego'];
       $resultado = $ArrayDeParametros['resultado'];

       $miJuego = Juego::TraerJuegosLista($juego,$jugador,$resultado);
       
       $newresponse = $response->withJson($miJuego, 200);  
       return $newresponse;

       //$objDelaRespuesta->respuesta=$jugador;
       //return $response->withJson($objDelaRespuesta, 200);
    }
}

?>