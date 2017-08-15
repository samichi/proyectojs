/* solucion Diego Carrera*/

//Utilizar el siguiente [ String ]
//var strDatos = '{"markers":[{"point":{"Lat":40.266044,"Lng":-74.718479},"homeTeam":"Lawrence Library","awayTeam":"LUGip","markerImage":"images/Red_Team_2048x2048.jpg","information":"Linux users group meets second Wednesday of each month.","fixture":"Wednesday 7pm","capacity":"20 users","url":{"link":"https://www.youtube.com/watch?v=hSwg4fIgthU","title":"Red Team"}},{"point":{"Lat":40.2116,"Lng":-74.695702},"homeTeam":"Hamilton Library","awayTeam":"LUGip HW SIG","markerImage":"images/Team-White.png","information":"Linux users can meet the first Tuesday of the month to work out harward and configuration issues.","fixture":"Tuesday 7pm","capacity":"45 Persons","url":{"link":"https://www.youtube.com/watch?v=hSwg4fIgthU","title":"White Team"}},{"point":{"Lat":40.294535,"Lng":-74.682012},"homeTeam":"Applebees","awayTeam":"After LUPip Mtg Spot","markerImage":"images/newcastle.jpg","information":"Some of us go there after the main LUGip meeting, drink brews, and talk.","fixture":"Wednesday whenever","capacity":"10 usuarios","url":{"link":"https://www.youtube.com/watch?v=hSwg4fIgthU","title":"Newcastle Team"}}]}';
var marketsJParse;
var marketsStr;
var fs=null;

//1. Crear las clases Marker, Point, Link. 1Pt
class Marker {

  constructor(obj) {
    this.homeTeam = obj.homeTeam
    this.awayTeam = obj.awayTeam;
    this.markerImage = obj.markerImage;
    this.information = obj.information;
    this.fixture = obj.fixture
    this.capacity = obj.capacity;
    this.url = new Link(obj.url);
    this.point = new Point(obj.point)
  }
}

class Point {
  constructor(obj) {
    this.Lat = obj.Lat;
    this.Lng = obj.Lng;
  }
}

class Link {
  constructor(obj) {
    this.link = obj.link;
    this.title = obj.title;
  }
}


/* 2. Crear un función para crear un arreglo de objetos Marker, utilice el String strDatos para cargar los datos en esos objetos mediante constructores. 2Pt */
function jsonToArray() {
  var arr = [];
  for (var marker of marketsJParse.markers) {
    arr.push(new Marker(marker))
  }
  //console.log(arr);
  return arr;
}


//3. Cargar la data de JSON y mostrar en la página web. 1 Pt.
window.onload = function () {
  //this.marketsJParse = JSON.parse(strDatos);
  fs= require('fs');
  fs.readFile('/home/isabel-pc/Downloads/isa.json', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        marketsJParse = JSON.parse(data);
        
        }});
  this.marketsStr = JSON.stringify(marketsJParse); //convierte el JSON en texto 
  //document.getElementById('Market').innerHTML = this.marketsStr;

  //carga los objetos en un arreglo
  jsonToArray();

  //crea tabla con datos
  createTableData()

  //muestra data en formulario
  readMarker(0);


}




/*
4. Crear en HTML un formulario que luego será utilizado para insertar nuevos objetos Marker al JSON. Considerar los objetos internos. 1Pt
*/
// respuesta en archivo index.htm
function newMarket() {
  var mark = [];
  mark.homeTeam = document.getElementById('newHomeTeamTxt').value;
  mark.awayTeam = document.getElementById('newAwayTeamTxt').value;
  mark.information = document.getElementById('newInformationTxt').value;
  mark.fixture = document.getElementById('newFixtureTxt').value;
  mark.capacity = document.getElementById('newCapacityTxt').value;
  var pointx = [];
  pointx.Lat = document.getElementById('newLatTxt').value;
  pointx.Lng = document.getElementById('newLngTxt').value;
  mark.point = new Point(pointx);
  var url = document.getElementById('newLink').value;
  mark.url = new Link(url);
  mark.url.link = url;

  var marka = new Marker(mark)
  marketsJParse.markers.push(marka);

  removeTableData('data');
  createTableData();

}




/*
5.  Construir opciones para que objeto Market tenga las opciones de CRUD clases: create, update, read, detele. Se debe utilizar el evento onclick de un boton para guardar (update) la información del formulario en el Market correspondiente.
5pto. - Crear 1Pt, Update 2pt, Read 1 pto. Delete 1 pt.
*/

function readMarker(value) {
  var marker = marketsJParse.markers[value];
  document.getElementById('homeTeamTxt').value = marker.homeTeam;
  document.getElementById('awayTeamTxt').value = marker.awayTeam;
  document.getElementById('markerImage').setAttribute('src', marker.markerImage);
  document.getElementById('informationTxt').value = marker.information;
  document.getElementById('fixtureTxt').value = marker.fixture;
  document.getElementById('capacityTxt').value = marker.capacity;
  document.getElementById('LatTxt').value = marker.point.Lat;
  document.getElementById('LngTxt').value = marker.point.Lng;
  document.getElementById('link').setAttribute('href', marker.url.link);
  document.getElementById('link').innerHTML = marker.url.title;
  document.getElementById('valor').value = value;
}

function updateMarker() {
  //var marker = arrMarker[i];
  value = document.getElementById('valor').value;
  marketsJParse.markers[value].homeTeam = document.getElementById('homeTeamTxt').value;
  marketsJParse.markers[value].awayTeam = document.getElementById('awayTeamTxt').value;
  marketsJParse.markers[value].information = document.getElementById('informationTxt').value;
  marketsJParse.markers[value].fixture = document.getElementById('fixtureTxt').value;
  marketsJParse.markers[value].capacity = document.getElementById('capacityTxt').value;
  marketsJParse.markers[value].point.Lat = document.getElementById('LatTxt').value;
  marketsJParse.markers[value].point.Lng = document.getElementById('LngTxt').value;
  // alert("Update con exito...");

  removeTableData('data');
  createTableData();
}

function createTableData() {
  var t = AddTable('data');
  var body = t.getElementsByTagName("tbody")[0];
  //console.log(marketsStr);
  let cont = 0;
  for (var mark of marketsJParse.markers) {
    var row = AddRow(mark, cont);
    body.appendChild(row);
    cont++;
  }
}

function removeTableData(id) {
  var div = document.getElementById(id);
  console.log("valor div es:" + div);
  //div.removeChild(0);
  if (div.hasChildNodes()) {
    div.removeChild(div.firstElementChild);
  }

}

function AddTable(id) {
  var div = document.getElementById(id);
  var t = document.createElement('table');
  var head = document.createElement("thead");
  var foot = document.createElement('tfoot');
  var body = document.createElement("tbody");
  div.appendChild(t);
  t.appendChild(head);
  t.appendChild(foot);
  t.appendChild(body);

  var nombre = document.createElement("tr");
  var col1 = document.createElement('th');
  var col2 = document.createElement('th');
  var col3 = document.createElement('th');
  var col4 = document.createElement('th');
  var col5 = document.createElement('th');
  var col6 = document.createElement('th');
  var col7 = document.createElement('th');
  var col8 = document.createElement('th');
  var col9 = document.createElement('th');

  col1.innerHTML = "HomeTeam";
  col2.innerHTML = "AwayTeam";
  col3.innerHTML = "markerImage";
  col4.innerHTML = "information";
  col5.innerHTML = "fixture";
  col6.innerHTML = "capacity";
  col7.innerHTML = "url";
  col8.innerHTML = "point";
  col9.innerHTML = "options";

  nombre.appendChild(col9);
  nombre.appendChild(col1);
  nombre.appendChild(col2);
  nombre.appendChild(col3);
  nombre.appendChild(col4);
  nombre.appendChild(col5);
  nombre.appendChild(col6);
  nombre.appendChild(col7);
  nombre.appendChild(col8);


  head.appendChild(nombre);

  return t;
}


function AddRow(market, cont) {
  var col1 = document.createElement('td');
  col1.innerHTML = market.homeTeam;
  var col2 = document.createElement('td');
  col2.innerHTML = market.awayTeam;
  var col3 = document.createElement('td');
  col3.innerHTML = market.markerImage;
  var col4 = document.createElement('td');
  col4.innerHTML = market.information;
  var col5 = document.createElement('td');
  col5.innerHTML = market.fixture;
  var col6 = document.createElement('td');
  col6.innerHTML = market.capacity;
  var col7 = document.createElement('td');
  col7.innerHTML = market.url;
  var col8 = document.createElement('td');
  col8.innerHTML = market.point;
  var col9 = document.createElement('td');
  col9.innerHTML = "<a  id=\"" + cont + "\" onclick='removeMarket(this.id)'  href='#'>borrar</a> <a href = '#' onclick='readMarker(" + cont + ")' > editar </a>";

  var row = document.createElement('tr');
  row.appendChild(col9);
  row.appendChild(col1);
  row.appendChild(col2);
  row.appendChild(col3);
  row.appendChild(col4);
  row.appendChild(col5);
  row.appendChild(col6);
  row.appendChild(col7);
  row.appendChild(col8);

  return row;
}


function removeMarket(id) {

  marketsJParse.markers.splice(id, 1);
  removeTableData('data');
  createTableData();

}





/*
6. Crear y utilizar un método que permita exportar o mostrar la información de todo el JSON. 1pt
*/
function exportJSON() {
  let dataStr = JSON.stringify(this.marketsJParse);
  let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

  let exportFileDefaultName = 'andres.json';

  let linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);

  linkElement.click();
}

function actualizar(){
  var fs = require('fs');
//fs.writeFile('isa(2).json', marketsStr, 'utf8', callback);

    this.marketsStr = JSON.stringify(marketsJParse); //convert it back to json
    fs.writeFile('isa.json', marketsStr, 'utf8', callback); // write it back 
    exportJSON();

}