<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;


require '../composer/vendor/autoload.php';
require_once 'clases/AccesoDatos.php';
//require_once 'clases/PersonasApi.php';
require_once 'clases/UsuarioApi.php';
require_once 'clases/JuegoApi.php';
//require_once 'clases/PizzaApi.php';
//require_once 'clases/AutentificadorJWT.php';
require_once 'clases/MWparaCORS.php';
//require_once 'clases/MWparaAutentificar.php';

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

/*

¡La primera línea es la más importante! A su vez en el modo de 
desarrollo para obtener información sobre los errores
 (sin él, Slim por lo menos registrar los errores por lo que si está utilizando
  el construido en PHP webserver, entonces usted verá en la salida de la consola 
  que es útil).

  La segunda línea permite al servidor web establecer el encabezado Content-Length, 
  lo que hace que Slim se comporte de manera más predecible.
*/

$app = new \Slim\App(["settings" => $config]);

//Evitar Problema con CORS
$app->options('/{routes:.+}', function ($request, $response, $args) {
  return $response;
});
$app->add(function ($request, $response, $next) {
  try
  { 
      $response = $next($request, $response);
      return $response;
  }
  catch(Exception $e)
  {
      $resultado = new stdClass();
      $resultado->exito = false;
      $resultado->error = $e->getMessage();
      $response = $response->withJson($resultado);
      return $response->withHeader('Content-type', 'application/json');
  }
});
$app->add(function ($req, $res, $next) {
  $response = $next($req, $res);
  return $response
          ->withHeader('Access-Control-Allow-Origin', '*') //La pagina donde este alojado.
          ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
          ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});
//Fin Evitar Problemas Con CORS


//LLAMADA A METODOS DE INSTANCIA DE UNA CLASE

$app->group('/usuario', function () {
 
  $this->get('/', \UsuarioApi::class . ':traerTodos')->add(\MWparaCORS::class . ':HabilitarCORS8080');

  $this->post('/traer',\UsuarioApi::class . ':traerUno')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
  
  $this->post('/', \UsuarioApi::class . ':CargarUno')->add(\MWparaCORS::class . ':HabilitarCORSTodos');

  $this->post('/cargarJuego', \JuegoApi::class . ':CargarJuego')->add(\MWparaCORS::class . ':HabilitarCORSTodos');

  $this->post('/traerJuegos',\JuegoApi::class . ':TraerJuegos')->add(\MWparaCORS::class . ':HabilitarCORSTodos');

  //$this->get('/borrar/{id}', \UsuarioApi::class . ':BorrarUno')->add(\MWparaCORS::class . ':HabilitarCORS8080');;   

})->add(\MWparaCORS::class . ':HabilitarCORSTodos');


/*$app->group('/persona', function () {
 
  $this->get('/', \PersonaApi::class . ':traerTodos')->add(\MWparaCORS::class . ':HabilitarCORS8080');
 
  $this->get('/{id}', \PersonaApi::class . ':traerUno')->add(\MWparaCORS::class . ':HabilitarCORS8080');

  $this->post('/', \PersonaApi::class . ':CargarUno')->add(\MWparaCORS::class . ':HabilitarCORSTodos');

  //$this->delete('/', \PersonaApi::class . ':BorrarUno');
  $this->get('/borrar/{id}', \PersonaApi::class . ':BorrarUno');

  $this->put('/', \PersonaApi::class . ':ModificarUno');
   
})->add(\MWparaCORS::class . ':HabilitarCORSTodos');*/




$app->run();