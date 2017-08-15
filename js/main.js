var filePath;
var historiaJParse;

class Historia{

  constructor() {
    this.arraySeccion = [];
  }

  addSeccion(seccion){
  	this.arraySeccion.push(seccion);
  }
}

class Seccion{

  constructor(imagen, dialogo, objActividad) {
    this.imagen = imagen;
    this.dialogo = dialogo;
    this.objActividad = new Actividad (objActividad);
  }
}

class Actividad{

	constructor(pregunta, respuesta) {
    this.pregunta = pregunta;
    this.respuesta = respuesta;
  }

  constructor(objActividad) {
    this.pregunta = objActividad.pregunta;
    this.respuesta = objActividad.respuesta
  }
}

function exportJSON() {
  let dataStr = JSON.stringify(this.historiaJParse);
  let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

  let exportFileDefaultName = 'data.json';

  let linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}

$(document).onload(function(){

	$( "body #image01" ).submit(function( event ) {
  		event.defaultPrevented();
  		$("input[type=file]").change(function () {
  			console.dir(this.files[0])
         filePath=$("#search01").val(); 
     });
  		$("#search01").attr("src", "../images/stories/" + filePath);

	});

});
	

