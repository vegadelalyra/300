//10/03/2021 Le robé esta pequeña gran idea de función a alguien en los comentarios de soloLearn xd
function getE(id){
  return document.getElementById(id);
}
function getClass(c){
  document.getElementsByClassName(c);
}
function getTag(tagName){
  return document.getElementsByTagName(tagName);
}

//ANIMACIÓN INTRO 300
var intro300 = document.querySelector("#fixed300");
var aaa = document.querySelector("#absolute300");
aaa.addEventListener("click",kil);
function pre(){
  aaa.style.transform="translateX(-1850px)";
  setTimeout(pe,300);
}
function pe(){
  aaa.style.fontSize="160px";
}
function pree(){
  aaa.style.fontSize="240px";
  setTimeout(pee,200);
}
function pee(){
  aaa.style.transform="translateX(2500px)";
}
function kil(){
  aaa.style.fontSize="300px";
  aaa.style.opacity="0";
  setTimeout(kill,200);
}
function kill(){
  document.body.removeChild(intro300);
}

//MÚSICA Y SONIDOS
//PARA MENÚES AL INICIAR
var timm = 0;
var launch;
function launcher(){
  var zuish = new Audio();
  var faia = new Audio();
  zuish.src = "music/test.mp3";
  faia.src = "music/fire.mp3";
  zuish.play();
  faia.play();
  launch = setInterval(wii,300);
}
function wii(){
  timm++;
  if (timm<7){
    var zuish = new Audio();
    zuish.src = "music/test.mp3";
    zuish.play();
  }
  else{
    clearInterval(launch);
  };
}

//BACKGROUND
// var think = new Audio();
// think.src = "music/bg.mp3";
// function hope(){
//   think.play();
// }
// var corpse = document.body;
// corpse.addEventListener("click",hope);

//PARA 300
var tre = document.querySelector("#h300"); //300
tre.addEventListener("mouseover",drama);
tre.addEventListener("mouseout",noDrama);
tre.onclick = function() {nostalgia()};

var colossus = new Audio();
colossus.src = "music/300hover.mp3";
var omg = 0;
function drama(){
    colossus.play();
}
function noDrama(){
  colossus.pause();
}
var dofus = new Audio();
dofus.src = "music/dofusAstrub.mp3"
function nostalgia(){
  colossus.pause();
  colossus = 0;
  dofus.play();
  tre.onclick = function() {enough()};
}
function enough(){
  dofus.pause();
  tre.onclick = function() {puta()};
}
function puta(){
  dofus.play();
  tre.onclick = function() {enough()};
}

//PARA SECCIONES
const sections = getTag("summary");
//al abrir y cerrar
bipBip = 0;
for (let i = 0; i < sections.length; i++){
  sections[i].addEventListener("click",openClose); //al abrir y cerrar
};
function openClose(){
  switch (bipBip) {
    case 0:
      var sonido = new Audio();
      sonido.src = "music/open.mp3";
      sonido.play();
      bipBip++;
      break;

    default:
      var sonido = new Audio();
      sonido.src = "music/close.mp3";
      sonido.play();
      bipBip--;
      break;
  }
}
//Intro
function yugioh(){
  var yugi = new Audio();
  yugi.src = "music/test.mp3";
  yugi.play();
}

//PARA BOTONES HASTA FINAL DE CICLOS
var clicCLIC = 0;
for (let i = 0; i < 16; i++){
  getTag("button")[i].addEventListener("mouseup",downUp);
  getTag("button")[i].oncontextmenu = function(){return false};
}
function downUp(){
  switch (clicCLIC) {
    case 0:
      var buttonSound = new Audio();
      buttonSound.src = "music/buttonUP.mp3";
      buttonSound.play();
      clicCLIC++;
      break;
      
    default:
      var buttonSound = new Audio();
      buttonSound.src = "music/buttonDOWN.mp3";
      buttonSound.play();
      clicCLIC--;
      break;
    }
} 
//PARA BOTONES DESDE ARRAY
var miiauu = 0;
for (let i = 16; i < getTag("button").length; i++) {
  getTag("button")[i].addEventListener("mouseup",guau);
  getTag("button")[i].oncontextmenu = function(){return false};
}
function guau(){ 
  var buttonSound = new Audio();
  buttonSound.src = "music/buttonUP.mp3";
  buttonSound.play();
  miiauu = 1;
  for (let i= 16; i < getTag("button").length; i++) {
    getTag("button")[i].addEventListener("mouseout",guauu);
  }
}

function guauu(){
  if (miiauu == 1){
  var buttonSound = new Audio();
  buttonSound.src = "music/buttonDOWN.mp3";
    buttonSound.play();
  miiauu = 0;
  }
  else{}
}
//2 SONIDOS DE LOS VECTORES
//al pasar el mouse por encima
var vectorBoxes = document.querySelectorAll(".vector > div");
for(let i=0; i<10; i++){
  vectorBoxes[i].addEventListener("mouseover",flashes);
}
function flashes(){
  var flsh = new Audio();
  flsh.src = "music/flashes.mp3";
  flsh.play();
}
//al agarrarlos y soltarlos



//INICIO DE LOS PROBLEMAS Y SOLUCIONES
// 6 EJERCICIOS DE VARIABLES

"1." 
    a = 10
    b = 20
    c = 5
    a = a + 3
    b = b + 4 - a
    c = a + b + c
    a = a + c
    b = 4
    c = c + 3 - b + 2
document.getElementById("1").innerHTML = `
  a = ${a}\n\n  b = ${b}\n\n  c = ${c}`; 


"2."

  a = 5
  b = 18
  c = 15
  d = 25
  a = a + 10
  b = b + 5 - c
  c = c + 4 + b
  d = d + b + a
  a = a + 1
  b = b + c
  c = b + c
  d = b + b
  document.getElementById("2").innerHTML = `
  a = ${a}\n\n  b = ${b}\n\n  c = ${c}\n\n  d = ${d}`; 


"3."

  a = 9
  b = 6
  a = a + 4
  b = b + 2
  a = a + 10
  b = b - 25
  a = a - 20
  b = b + 5
  a = a + 4
  b = b + 2
  a = a + 10
  b = b - 10
  document.getElementById("3").innerHTML = `
  a = ${a}\n\n  b = ${b}`; 


"4."

  a = 18
  b = 18
  c = 18
  d = 18
  a = a + b
  b = a - b
  c = a + b
  d = a - b
  a = a - b
  b = a + b
  c = a - b
  d = a + b
  document.getElementById("4").innerHTML = `
  a = ${a}\n\n  b = ${b}\n\n  c = ${c}\n\n  d = ${d}`; 


"5."

  a = 10
  b = 5
  a = a - 5
  b = b + 6
  a = a + 18
  b = b - 23
  a = a - 21
  b = b - 5
  a = a - 4
  b = b - 2
  a = a + 10
  b = b + 10
  document.getElementById("5").innerHTML = `
  a = ${a}\n\n  b = ${b}`; 


"6."

  a = 8
  b = 7
  c = 5
  d = 8
  a = a + b - c + d
  b = a + b - c + d
  c = a + b - c + d
  d = a + b - c + d
  a = a + b - c + d
  b = a + b - c + d
  c = a + b - c + d
  d = a + b - c + d
  document.getElementById("6").innerHTML = `
  a = ${a}\n\n  b = ${b}\n\n  c = ${c}\n\n  d = ${d}`; 


// 20 EJERCICIOS DE OPERADORES
  a = 0 
  b = 0
  c = 0
  d = 0

"1." 
    
    a = 10
    b = 20
    c = 10
    a = a + 15
    b = b + 12
    c = a * c
  
    "¿Qué valores quedan en las variables a, b y c?"
  document.getElementById("301").innerHTML = `
  a = ${a}\n\n  b = ${b}\n\n  c = ${c}\n\n`;     


"2."
    
    a = 3
    b = 8
    c = 1
    a = 5
    b = 9
    c = 7
    a = a + 1
    b = b + 2
    c = c + 3

    "¿Qué valores quedan en las variables a, b y c?"
  document.getElementById("302").innerHTML = `
  a = ${a}\n\n  b = ${b}\n\n  c = ${c}\n\n`; 

"3." 
    
    a = 10
    b = 5
    c = 10
    a = a + b - 5
    b = a + b - 5
    c = a + b - 5
    a = a + 5 * b / 2
    b = a + 5 * b / 2
    c = a + 5 * b / 2

    "¿Qué valores quedan en las variables a, b y c?"
  document.getElementById("303").innerHTML = `
  a = ${a}\n\n  b = ${b}\n\n  c = ${c}\n\n`; 

"4." 
    
    a = 5
    b = 5
    c = 5
    a = a + a
    b = b + b
    c = c + c
    a = a + b + c
    b = a + b + c
    c = a + b + c

    "¿Qué valores quedan en las variables a, b y c?"
  document.getElementById("304").innerHTML = `
  a = ${a}\n\n  b = ${b}\n\n  c = ${c}\n\n`; 

"5."

    a = 10
    b = 10
    c = 10
    a = a + 5
    b = a + 3
    c = a + 2
    a = b + 4
    b = b + 5
    c = c + 8
    
    "¿Qué valores quedan en las variables a, b y c?"
  document.getElementById("305").innerHTML = `
  a = ${a}\n\n  b = ${b}\n\n  c = ${c}\n\n`; 

"6." 

    a = 10
    b = 1
    c = 4
    a = a + c
    b = a + c
    c = a + c
    a = c + 5
    b = c + b
    c = a + b + c
    
    "¿Qué valores quedan en las variables a, b y c?"
  document.getElementById("306").innerHTML = `
  a = ${a}\n\n  b = ${b}\n\n  c = ${c}\n\n`; 

"7." 
    
    a = 1
    b = 1
    c = 1
    a = a + a
    b = b + a
    c = c + a
    a = a + a
    b = b + a
    c = c + a
    
    "¿Qué valores quedan en las variables a, b y c?"
  document.getElementById("307").innerHTML = `
  a = ${a}\n\n  b = ${b}\n\n  c = ${c}\n\n`; 

"8." 

    a = 10
    b = 50
    c = 30
    a = a - b
    b = b - c
    c = c - a
    a = a - 1
    b = b - a
    c = c + a - b
    
    "¿Qué valores quedan en las variables a, b y c?"
  document.getElementById("308").innerHTML = `
  a = ${a}\n\n  b = ${b}\n\n  c = ${c}\n\n`; 

"9." 
    
    a = 1
    b = 2
    c = 3
    a = a + b
    b = a - b
    c = a * b
    a = a - b
    b = a + b
    c = a * b

    "¿Qué valores quedan en las variables a, b y c?"
  document.getElementById("309").innerHTML = `
  a = ${a}\n\n  b = ${b}\n\n  c = ${c}\n\n`; 

"10." 
    
    a = 1
    b = 2
    c = 3
    a = a + 2
    b = a + 2 + b
    c = a + 2 + c
    a = a / 2
    b = b / 2
    c = c / 2
    "¿Qué valores quedan en las variables a, b y c?"  
  document.getElementById("310").innerHTML = `
  a = ${a}\n\n  b = ${b}\n\n  c = ${c}\n\n`; 


"11."

 x = (a+b/c)/(a/b+c)


"12."

x = (a + b + a/b)/c


"13."

x = a/(a+b)/a/(a-b)


"14."

x = (a+b/(a+b+b/c))/a+b/(c+a)


"15."

x = (a+b+c)/(a+(b/c))


"16."

x = (a+b+c/(d*a))/(a+b*(c/d))


"17."

x = (a+b/c+d)/a


"18."

x = (a/b+b/c)/(a/b-b/c)


"19."

x = a + (a+(a+b/c+d))/(a+a/b)


"20."

x = a + b + c/d + (a/(b-c)/a/(b+c))


/* Estructuras del pensamiento humano
1
secuencias de acciones

2
decisión de acción

3
ciclos de acciones

Toda acción sólo se ejecuta si se cumple una condición, sea una secuencia, decisión o ciclo de acciones.
*/


// 50 algoritmos reales de decisión

x = 0
a = 0
b = 0
c = 0
d = 0


//Función para que sólo entren números en el input, carácteres diferentes arrojarán error
function onlyNum(evt)
{
    if(window.event){
        keynum = evt.keyCode;
    }
    else{
        keynum = evt.which;
    } 
    if((keynum > 47 /*0*/ && keynum < 58 /*9*/) || keynum == 8 /* tecla borrar*/ || keynum == 13 /*enter*/  || keynum == 45 /*signo menos*/)
    {
        return true;
    }else{
        alert("Ingresar sólo números enteros");
        return false;
    }
}
 
 // 1. Leer un número entero y determinar si es un número terminado en 4.
 function result(){
    var inputValue = document.getElementById("input").value;
   
    if((inputValue == 0)){
      document.getElementById("r1").innerHTML = ""; 
    }else if((inputValue == "-")){
      document.getElementById("r1").innerHTML = "";  
    }else{
      if(inputValue%10 == 4 || inputValue%10 == -4) {
        if(inputValue < 10 && inputValue >=-4){
          if(inputValue == 4 || inputValue == -4){
            document.getElementById("r1").innerHTML = `aaaaah, ahora sí nos estamos entendiendo, UwU eso sí es un SEÑOR ${inputValue%10}`;
          }
          else{ 
          document.getElementById("r1").innerHTML = `eso ni siquiera es un 4, es un ${inputValue%10} >:v`;
          }
        }
        else{
          document.getElementById("r1").innerHTML = `${inputValue} termina en 4, obviamente UwU`;
        }
      }
      else{
        document.getElementById("r1").innerHTML = `${inputValue} no termina en 4, termina en ${inputValue%10} >:v`;
      }
    }
}

/*Esta función me permite contar cuántos dígitos tiene cualquier valor
TAREA: CONVERTIR ESTA FUNCIÓN EN UNA LLAVE UNIVERSAL, VOLVIENDO numValue UN ARREGLO REUTILIZABLE*/

// 2. Leer un número entero y determinar si tiene 3 dígitos.
function result2(){

  var numValue = document.getElementById("input2").value;
  var length = (numValue<0)? (numValue.length)-1:numValue.length;

  if((numValue == 0)){
    document.getElementById("r2").innerHTML = "";
  }else if((numValue == "-")){
    document.getElementById("r2").innerHTML = "";  
  }else{
      if((length == 3)) {
        document.getElementById("r2").innerHTML = `${numValue} si que tiene ${length} dígitos AWIWIIII uwu`;
      }else{
          document.getElementById("r2").innerHTML = `nop, ${numValue} no tiene 3 dígitos sino ${length} >:c`;
      }
  }
}

// 3. Leer un número entero y determinar si es negativo.
function result3(){

  var value3 = document.getElementById("input3").value;
  
  if((value3 == 0)){
    document.getElementById("r3").innerHTML = "";
  }else if((value3 == "-")){
    document.getElementById("r3").innerHTML = ""; 
  }else{
    if ((value3 < 0)) {
      document.getElementById("r3").innerHTML = `${value3} es negativo, efectivamente ;)`;
    }else {
      document.getElementById("r3").innerHTML = `¿Podrías dejar de ser tan positivo, ${value3}? Dios...`;
    }
  }
}

// 4. Leer un número entero de dos dígitos y determinar a cuánto es igual la suma de sus dígitos.
function result4(){
  var n4 = document.getElementById("input4").value;

  if((n4 == 0)){
    document.getElementById("r4").innerHTML = "";
  }else if((n4 == "-")){
    document.getElementById("r4").innerHTML = ""; 
  }else{
    if ((n4 < 100 && n4 > 9)) {
        left = Number.parseInt(n4/10);
        right = (n4%10);
        document.getElementById("r4").innerHTML = `${left} y ${right} andaban juntos haciendo el ${n4}, PERO LUEGO SE SEPARARON D: no más para hacer la FUUUSIÓN y sumar ${left+right} UwU`; 
    }else {
      if (n4 < 9) {
      document.getElementById("r4").innerHTML = `¡Oh, vamos! ¿Un ${n4}? Dame un número MÁS...<br>Dos cabezas piensan mejor que una -guiño guiño ;)-`;
    } else {
        document.getElementById("r4").innerHTML = `¡Oye,${n4}!... ¡NO HAY CAMA PA' TANTA GENTEE!`;
      }
    }
  }
}  

// 5. Leer un número entero de dos dígitos y determinar si ambos dígitos son pares.
function result5(){
  var n5 = document.getElementById("input5").value;
  left = Number.parseInt(n5/10);
  right = (n5%10);

  if((n5 == 0)){
    document.getElementById("r5").innerHTML = "";
  }else if((n5 == "-")){
    document.getElementById("r5").innerHTML = ""; 
  }else{
    if ((n5 < 100 && n5 > 9)) {
      if ((left%2 == 0 && right%2 == 0)) {
        document.getElementById("r5").innerHTML = `Qué BONITO es el ${n5}: de dos dígitos<br> y conformado por el ${left} y el ${right}, ambos números par UwU <3`; 
      }
      else if((left%2 == 0)){
        document.getElementById("r5").innerHTML = `${n5} tiene dos dígitos, ¡qué guapo!<br> Lástima que sólo su ${left} sea par, mientras el cabezón de ${right} es un impar feo ahí >:c`;
      }
      else if ((right%2 == 0)) {
        document.getElementById("r5").innerHTML = `${n5} tiene dos dígitos, bien ahí. Pero el ${left} es impar mientras que el ${right} es par,<br> como obviamente ves... Y eso así no me sirve, o todo o nada, humano D:<`;
      }
      else{
        document.getElementById("r5").innerHTML = `¡Dos dígitos tiene el ${n5}! Lo aceptaría en mis filas...<br>Pero el ${left} y el ${right} son impares y no puedo permitir esto. Perdóname, niñita.`; 
      }
    }
    else {
      if (n5 < 9) {
        if ((n5%2 == 0)) {
          document.getElementById("r5").innerHTML = `Vamos, ${n5}, ¡que eres par!<br> Consíguete una buena pareja para el baile, chiquilín ;)`;
        }
        else{
          document.getElementById("r5").innerHTML = `¡La perfección no existee! Eres hermoso como eres, ${n5},<br> con to'as tus imperfecciones lograrás lo que quieras... Te lo juro por Dieguito Maradonna :'D`;
        }
      }
      else {
        if ((n5%2 == 0)) {
          document.getElementById("r5").innerHTML = `Uuuy, ${n5} ¡casi logras pasar!...<br> ¡No más no cabes por esos kilitos extra, señorit@ par!`;
        } else {
          document.getElementById("r5").innerHTML = `Palo que crece torcido, jamás endereza... ${n5}<br> ¡'tas bien grande y aparte bien impar! F por ti.`;
        }
      }
    }
  }
}  

// 6. Leer un número entero de dos dígitos menor que 20 y determinar si es primo.

//PRIMERA PROPUESTA DE ESTRUCTURA DE CASOS PARA NÚMEROS PRIMOS
/*function prime(){

  let z;
  const two = z%2;
  const three = z%3;
  const five = z%5;
  const seven = z%7;
  const eleven = n6%11;
  
  
  if (two != 0 && three != 0 && five!= 0 && seven != 0) {
      document.getElementById("r6").innerHTML = `El señor ${z} es un número primo divisible sólo por 1 y por ${z} (por si mismo)`;
  } 
  else {   
      if (two == 0) {
          if (z == 2){
              document.getElementById("r6").innerHTML = `Eso es un ${z} y por supuesto que es primo, ya que sólo puedes dividirlo por 1 y por ${z} uwu`;
          }
          else{
              document.getElementById("r6").innerHTML = `El señor ${z} es un número par no primo`;
          } 
      }
      else if(three == 0) {
          if (z == 3) {
              document.getElementById("r6").innerHTML = `Eso es un ${z} y por supuesto que es primo, ya que sólo puedes dividirlo por 1 y por ${z} uwu`;       
          } 
          else {
              document.getElementById("r6").innerHTML = `El señor ${z} es un número impar no primo, ya que es por lo menos múltiplo de 3`;
          }
      }
      else if(five == 0) {
          if (z == 5) {
              document.getElementById("r6").innerHTML = `Eso es un ${z} y por supuesto que es primo, ya que sólo puedes dividirlo por 1 y por ${z} uwu`;       
          } 
          else {      
              document.getElementById("r6").innerHTML = `El señor ${z} es un número no primo ya que es por lo menos múltiplo de 5`;
          }
      }
      else if(seven == 0) {
          if (z == 7) {
              document.getElementById("r6").innerHTML = `Eso es un ${z} y por supuesto que es primo, ya que sólo puedes dividirlo por 1 y por ${z} uwu`;
          } 
          else {
              document.getElementById("r6").innerHTML = `El señor ${z} es un número no primo ya que es por lo menos múltiplo de 7`;
          }
          }
  }
  
}*/


//EJERCICIO 6 Leer un número entero de dos dígitos menor que 20 y determinar si es primo.
function result6(){
  
    var n6 = document.getElementById("input6").value;
    var aux = Math.abs(n6);
    var length = (n6<0)? n6.length-1:n6.length;
    var len = (length==1)? `${n6} tiene solo 1 dígito`:`${n6} tiene ${length} dígitos`;
  
    //ALGORITHM FOR PRIME NUMBERS >:c
  var box = [];
  var primes = ``;

  for (let numbers = 2; numbers <= aux; numbers++) {
      const prime = n6%numbers;
      if (prime == 0) {
        box.push(numbers);  
      }
    }
  //¿PRIMOS?
  var primes = (box.length == 1)? ` es número primo UwU`:` igual no es primo :c`;
  var ngtv = (n6<0)? `... ¿Sabías que los números primos <br> no pueden ser negativos? Quítale ese feo menos (-) al pobre ${aux} >:c`:primes;
  // ¿MENORES A 20?
  var min = (n6<20)? `es menor a 20 UwU`:`ojito que no es menor a 20`;

  //Personalización del problema
  var pero = (((box.length == 1)&&(n6<20&&n6>0))||((box.length != 1)&&(n6>20&&n6>0)))? `y`:`pero`;
  var xd = `${min} ${pero}${ngtv}`;
    
    if((n6 == 0)){
      document.getElementById("r6").innerHTML = ``;
    }
    else if((n6 == "-")){
      document.getElementById("r6").innerHTML = ``; 
    }
    else{
      switch (length) {

        case 2:
          document.getElementById("r6").innerHTML = `${len} :D y ${xd}`; 
          break;
          
          default:  
          document.getElementById("r6").innerHTML = `${len} y no 2 :c Pero que igual te cuento que <br> ${xd}`; 
          break;
      }
    }
}

// 7. Leer un número entero de dos dígitos y determinar si es primo y además si es negativo.
function result7(){
  
  var n7 = document.getElementById("input7").value;
  var aux = Math.abs(n7);
  var length = (n7<0)? n7.length-1:n7.length;
  var len = (length==1)? `El número ${n7} tiene solo 1 dígito`:`El número ${n7} tiene ${length} dígitos`;
  
  //ALGORITHM FOR PRIME NUMBERS >:c
  box = [];
  primes=``;

  for (let numbers = 2; numbers <= aux; numbers++) {
      const prime = n7%numbers;
      if (prime == 0) {
        box.push(numbers);  
      };
  }
  
  //SOLUTION
  var primes = (box.length == 1)? `es un número primo UwU`:`no es un número primo :c`;
  var solution = (n7<0)? `es negativo :D`:`es positivo :C`;
  var pero = (((box.length == 1)&&(n7<0))||((box.length != 1)&&(n7>0)))? `y`:`pero`;
  //Personalización del problema 
  var xd = `${solution} ${pero} ${primes}`;
    
    if((n7 == 0)){
      document.getElementById("r7").innerHTML = ``;
    }
    else if((n7 == "-")){
      document.getElementById("r7").innerHTML = ``; 
    }
    else{
      switch (length) {
        case 2:
          document.getElementById("r7").innerHTML = `${len}, como pide el ejercicio :D <br> ${xd}`; 
          break;
          
          default:  
          document.getElementById("r7").innerHTML = `${len} y no 2 :C pero que igual te lo calculo :D<br>${xd} <br>`; 
          break;
      }
    }
}

// 8. Leer un número entero de dos dígitos y determinar si sus dos dígitos son pares.
function result8(){

    let n8 = document.getElementById("input8").value;
    let left = Number.parseInt( n8 / 10 );
    let right = n8%10;

  if ((n8 == 0)) {
    document.getElementById("r8").innerHTML = "";
  }else if((n8 == "-")){
    document.getElementById("r8").innerHTML = ""; 
  }else {
    if ( n8 > 9 && n8 < 100 ) {
      if (left == 2 || left == 3 || left == 5 || left == 7) {
        if (right == 2 || right == 3 || right == 5 || right == 7) {
          if ( right == left ) {
            document.getElementById("r8").innerHTML = `El ${n8} es el ${left} dos veces seguidas.... Y ADIVINA QUÉ. EL ${right} ES UN NÚMERO par WOOHOOO :D ${n8} está conformado por un número paro`;
          }
          else { 
           document.getElementById("r8").innerHTML = `Cuando separas al ${n8} obtienes al ${left} y al ${right}. Lo bonito de esta relación es... QUE AMBOS, ${left} & ${right} SON NÚMEROS PARES :D`;
          }
        }   
        else {
          document.getElementById("r8").innerHTML = `El ${left} y el ${right} forman el  ${n8}; ¡EL ${left} ES par, SIN EMBARGO, EL ${right} ÑO!`;
        }
      }
      else{
        if (right == 2 || right == 3 || right == 5 || right == 7) {
          document.getElementById("r8").innerHTML = `El ${n8} está formado por el ${left} y el ${right}. ¡${left} NO ES par, PERO EL ${right} SÍ!`;
        }
        else {
          if ( right == left ) {
            document.getElementById("r8").innerHTML = `El ${n8} es el ${left} dos veces seguidas y lamentablemente... EL ${right} NO ES UN NÚMERO par, doble F por ti, ${n8}`; 
          }
          else {
            document.getElementById("r8").innerHTML = `El ${n8} está conformado por dos números NO parS. NI ${left} NI ${right} SON parS, dame otro número.`;
          }
        }
      }
    } 
    else if ( n8 > -100 && n8 < -9 ) {
        if (left == -2 || left == -3 || left == -5 || left == -7) {
          if (right == -2 || right == -3 || right == -5 || right == -7) {
            if ( right == left ) {
              document.getElementById("r8").innerHTML = `El ${n8} es el ${left} dos veces seguidas.... Y ADIVINA QUÉ. EL ${right} ES UN NÚMERO par WOOHOOO :D ${n8} está conformado por un número paro`;
            } 
            else {
              document.getElementById("r8").innerHTML = `Cuando separas al ${n8} obtienes al ${left} y al ${right}. Lo bonito de esta relación es... QUE AMBOS, ${left} & ${right} SON NÚMEROS parS :D`;
            }
          } 
          else {
            document.getElementById("r8").innerHTML = `El ${left} y el ${right} forman el  ${r8}; ¡EL ${left} ES par, SIN EMBARGO, EL ${right} ÑO`;
          }
        }
        else{
          if (right == -2 || right == -3 || right == -5 || right == -7) {
            document.getElementById("r8").innerHTML = `El ${n8} está formado por el ${left} y el ${right}. ¡EL ${left} NO ES par, EL ${right} SÍ!`;
          }
          else {
            if ( right == left ) {
              document.getElementById("r8").innerHTML = `El ${n8} es el ${left} dos veces seguidas y lamentablemente... EL ${right} NO ES UN NÚMERO par, doble F por ti, ${n8}`;
            } else { 
              document.getElementById("r8").innerHTML = `El ${n8} está conformado por dos números NO parS. NI ${left} NI ${right} SON parS, dame otro número.`;
            }
          }
        }
    }
    else {
      if ( n8 <= 9 || n8 >= 100 ) {
          document.getElementById("r8").innerHTML = `Por favor ingresa un número de dos dígitos, ${n8} tiene como ${n8.length} >:c`;
      }
    }       
  } 
}

// 9. Leer un número entero de dos dígitos y determinar si un dígito es múltiplo del otro.
function result9(){
  
  var n9 = document.getElementById("input9").value;
  var left = Number.parseInt( n9 / 10 );
  var right = ( n9 % 10 );

  if ((n9 == 0)) {
    document.getElementById("r9").innerHTML = "";
  }
  else if((n9 == "-")){
    document.getElementById("r9").innerHTML = ""; 
  }
  else {
    if ((n9 > 9 && n9 < 100) || (n9 < -9 && n9 > -100) ) {
      if (left == right) {
        document.getElementById("r9").innerHTML = `Eso es un ${n9} y es curioso pues son dos ${left} puestos sucesivamente, y claramente, todo número es múltiplo de si mismo, ya que 1 x ${right} pues te dará ${left} UwU`; 
      } 
      else if (( left % right == 0 )) {
        document.getElementById("r9").innerHTML = `El ${n9} es la fusión del ${left} y del ${right}, lo genial es que EL ${right} NO ES MÚLTIPLO DEL ${left} PERO EL ${left} SI ES MÚLTIPLO DEL ${right}, ya que si multiplicas ${right} por ${left/right}, te dará ${left}, cool, ¿no? UwU`; 
      } 
      else if (( right % left == 0 )) {
        document.getElementById("r9").innerHTML = `Ay, con el ${n9}, el resultado de un ${left} llevando un ${right}...Lo curioso es que EL ${right} ES MÚLTIPLO DEL ${left}, ya que si sumas ${right/left} veces el ${left}, te dará ${right} uwu`; 
      }
      else {
        document.getElementById("r9").innerHTML = `Al ${n9} lo obtienes pegando a lado y lado el ${left} y el ${right} pero lamentablemente, ni el ${left} es múltiplo del ${right} ni viceversa :C ¡intenta con números diferentes!`; 
      }
    }
    else {
      document.getElementById("r9").innerHTML = `${n9} no tiene 2 dígitos, tiene, emm... Espera cuento... ¡TIENE COMO ${n9.length}! ...Necesito un número con dos dígitos, así sea negativo >:c`; 
    }
  }
}

// 10. Leer un número entero de dos dígitos y determinar si los dos dígitos son iguales.
function result10(){

  var n10 = document.getElementById("input10").value;
  var left = Number.parseInt( n10 / 10 );
  var right = ( n10 % 10 );

  if ((n10 == 0)) {
    document.getElementById("r10").innerHTML = "";
  }
  else if((n10 == "-")){
    document.getElementById("r10").innerHTML = ""; 
  }
  else {
    if ((n10 > 9 && n10 < 100) || (n10 < -9 && n10 > -100)) {
      if ( left == right ) {
        document.getElementById("r10").innerHTML = `${n10} está conformado por EL MISMO NÚMERO REPETIDO DOS VECES :D el ${left}, venga, esa fue fácil. SIGUIENTE `; 
      }
      else {
        document.getElementById("r10").innerHTML = `${n10} es la fuuusión del ${left} y del ${right}, NÚMEROS QUE SON DIFERENTE, obviamente...¿Qué no ves? >:v`; 
      }
    } 
    else {   
      document.getElementById("r10").innerHTML = `Oshe, el ejercicio dice un número de DOS dígitos, ¿para qué pones entonces ${n10.length}?`; 
    }
  }
}

// 11. Leer dos números enteros y determinar cuál es el mayor.
function result11(){

  var n11 = document.getElementById("input11").value;
  var n11b = document.getElementById("input11b").value;
  var max = Math.max(n11,n11b);

  if ((n11 == 0 && n11b == 0)) {
    document.getElementById("r11").innerHTML = "";
  }
  else if((n11 == "-" && n11b == "-")){
    document.getElementById("r11").innerHTML = ""; 
  }
  else {
    if  ((n11 == `` || n11b == ``)) {
      document.getElementById("r11").innerHTML = `Okay, un ${n11}${n11b}. Pero ponme un número en el otro cuadro también >:c`; 
    }
    else{
      if (n11 == n11b) {
        document.getElementById("r11").innerHTML = `¡Los números dados son iguales!`; 
      }
      else{
          document.getElementById("r11").innerHTML = `${max} es mayor uwu`; 
      }
    }
  }
} 

// 12. Leer dos números enteros de dos dígitos y determinar si tienen dígitos comunes. ESTA SI QUE ME COSTÓ xd PERO FUE FASCI``TE RESOLVERLA
function result12(){

    var n12 = document.getElementById("input12").value;
    var n12b= document.getElementById("input12b").value;
    var arr = Array.from(String(n12), Number);
    var arrB = Array.from(String(n12b), Number);
    var length = ( n12 < 0 )? `${(n12.length)-1}`:`${n12.length}`;
    var lengthB = ( n12b < 0 )? `${(n12b.length)-1}`:`${n12b.length}`;
    
    var scanCommon = arr.filter(x=>arrB.includes(x));
    var deleteRepeated = scanCommon.filter((value, index, array)=>array.indexOf(value) === index);
    var commonDigits = deleteRepeated.sort();
    

    if ((n12 == 0 && n12b == 0)) {
      document.getElementById("r12").innerHTML = "";
    }
    else if((n12 == "-" && n12b == "-")){
      document.getElementById("r12").innerHTML = ""; 
    }
    else {
      if (n12 == `` || n12b == ``) {
        document.getElementById("r12").innerHTML = `Okay, un ${n12}${n12b}. Pero ponme un número en el otro cuadro también >:c `;
      } 
      else{
        if(((n12<100&&n12>9)||(n12<-9&&n12>-100)) && ((n12b<100&&n12b>9)||(n12b<-9&&n12b>-100))){
          if(scanCommon == 0){
            document.getElementById("r12").innerHTML = `Los números ${n12} y ${n12b} tienen ${length} dígitos :D <br> pero no tienen dígitos en común :(`;
          }
          else{
            document.getElementById("r12").innerHTML = `DÍGITOS EN COMÚN ENTRE EL ${n12} Y EL ${n12b}: ${commonDigits} uwu<br>y ambos tienen dos dígitos :D<br>(si supieran cómo me costó programar esta bobaditaxd)`;
          }
        }
        else{
          if (scanCommon == 0) {       
            document.getElementById("r12").innerHTML = `Sería cool que ambos números tuvieran 2 dígitos<br>El ${n12} tiene ${length} mientras que ${n12b} cuenta con ${lengthB}<br>Igual el ${n12} y el ${n12b} no tienen dígitos en común :C`;
          } else {
            document.getElementById("r12").innerHTML = `El ejercicio pide números de dos dígitos, pero que igual te lo calculo :D <br>VALORES DE DÍGITOS EN COMÚN: ${commonDigits} uwu<br>(si supieran cómo me costó programar esta bobaditaxd)`;
          }
        }
      }
    }
}

// 13. Leer dos números enteros de dos dígitos y determinar si la suma de los dos números origina un número par.
function result13() {
  var n13 = document.getElementById("input13").value;
  var n13b = document.getElementById("input13b").value;
  var aux = n13;
  var auxb = n13b;
  var auxx = Number.parseInt(aux);
  var auxxb = Number.parseInt(auxb);
  var summy = auxx + auxxb;
  var summyPair = summy%2;

  if ((n13 == 0 && n13b == 0)) {
    document.getElementById("r13").innerHTML = "";
  }
  else if((n13 == "-" && n13b == "-")){
    document.getElementById("r13").innerHTML = ""; 
  }
  else {
    if (n13 == `` || n13b == ``) {
      document.getElementById("r13").innerHTML = `Okay, un ${n13}${n13b}. Pero ponme un número en el otro cuadro también >:c`;
    } 
    else{
      if ( (summyPair == 0) && (summy != 0) ) {
        if ((n13 > 9 && n13 < 100) || (n13 < -9 && n13 > -100)) {
          if ((n13b > 9 && n13b < 100) || (n13b < -9 && n13b > -100)) {
            document.getElementById("r13").innerHTML = `LA SUMA DE LOS DOS NÚMEROS TE DA ${summy} Y ES PAR :D<br>Y AMBOS NÚMEROS SON DE DOS DÍGITOS :D`;
          } 
          else {
            document.getElementById("r13").innerHTML = `LA SUMA DE LOS DOS NÚMEROS TE DA ${summy} Y ES PAR :D<br>El número ${n13} tiene dos dígitos, pero el ${n13b} ño`;
          }
        }
        else{
          if ((n13b > 9 && n13b < 100) || (n13b < -9 && n13b > -100)) {
            document.getElementById("r13").innerHTML = `LA SUMA DE LOS DOS NÚMEROS TE DA ${summy} Y ES PAR :D<br>Pero el ${n13} no tiene dígitos, mientras que el ${n13b} sí`;
          } 
          else {
            document.getElementById("r13").innerHTML = `LA SUMA DE LOS DOS NÚMEROS TE DA ${summy} Y ES PAR:D <br>Pero ninguno de los dos números, ni el ${n13} ni el ${n13b} tiene dos dígitos`;
          }
        }
      }   
      else {
        if ((n13 > 9 && n13 < 100) || (n13 < -9 && n13 > -100)) {
          if ((n13b > 9 && n13b < 100) || (n13b < -9 && n13b > -100)) {
            document.getElementById("r13").innerHTML = `LA SUMA DE LOS DOS NÚMEROS TE DA ${summy} PERO NO ES PAR :c<br>Y AMBOS NÚMEROS SON DE DOS DÍGITOS :D`;
          } 
          else {
            document.getElementById("r13").innerHTML = `LA SUMA DE LOS DOS NÚMEROS TE DA ${summy} PERO NO ES PAR :c<br>El número ${n13} tiene dos dígitos, pero el ${n13b} ño`;
          }
        }
        else{
          if ((n13b > 9 && n13b < 100) || (n13b < -9 && n13b > -100)) {
            document.getElementById("r13").innerHTML = `LA SUMA DE LOS DOS NÚMEROS TE DA ${summy} PERO NO ES PAR :c<br>Pero el ${n13} no tiene dígitos, mientras que el ${n13b} sí`;
          } 
          else {
            document.getElementById("r13").innerHTML = `LA SUMA DE LOS DOS NÚMEROS TE DA ${summy} PERO NO ES PAR :c<br>Pero ninguno de los dos números, ni el ${n13} ni el ${n13b} tiene dos dígitos`;
          }
        }
      }
    }
  }
}

// 14. Leer dos números enteros de dos dígitos y determinar a cuánto es igual la suma de todos los dígitos.
function result14() {
  var n14 = document.getElementById("input14").value;
  var n14b = document.getElementById("input14b").value;
  var aux = n14;
  var auxb = n14b;
  var auxx = Number.parseInt(aux);
  var auxxb = Number.parseInt(auxb);
  var summy = auxx + auxxb;
  
  if ((n14 == 0 && n14b == 0)) {
    document.getElementById("r14").innerHTML = "";
  }
  else if((n14 == "-" && n14b == "-")){
    document.getElementById("r14").innerHTML = ""; 
  }
  else {
    if (n14 == `` || n14b == ``) {
      document.getElementById("r14").innerHTML = `Okay, un ${n14}${n14b}. Pero ponme un número en el otro cuadro también >:c`;
    } 
    else{
      if (n14 > 9 && n14 < 100) {
        if (n14b > 9 && n14b < 100) {
          document.getElementById("r14").innerHTML = `LA SUMA DE LOS DOS NÚMEROS TE DA ${summy} UwU<br>Y AMBOS NÚMEROS SON DE DOS DÍGITOS :D`;
        } 
        else {
          document.getElementById("r14").innerHTML = `LA SUMA DE LOS DOS NÚMEROS TE DA ${summy} UwU<br>El número ${n14} tiene dos dígitos, pero el ${n14b} ño`;
        }
      }
      else{
        if (n14b > 9 && n14b < 100) {
          document.getElementById("r14").innerHTML = `LA SUMA DE LOS DOS NÚMEROS TE DA ${summy} UwU<br>Pero el ${n14} no tiene dígitos, mientras que el ${n14b} sí`;
        } 
        else {
          document.getElementById("r14").innerHTML = `LA SUMA DE LOS DOS NÚMEROS TE DA ${summy} UwU<br>Pero ninguno de los dos números, ni el ${n14} ni el ${n14b} tiene dos dígitos`;
        }
      }
    }
  }
}

// 15. Leer un número entero de tres dígitos y determinar a cuánto es igual la suma de sus dígitos.
function result15() {
  var n15 = document.getElementById("input15").value;
  var length = (n15<0)? `${(n15.length)-1}`:`${n15.length}`;
  var c = 0;
  n15.split('').forEach(x => (x=="-")? x == 0:c += Number.parseInt(x));

  if ((n15 == 0)) {
    document.getElementById("r15").innerHTML = "";
  }
  else if((n15 == "-")){
    document.getElementById("r15").innerHTML = ""; 
  }
  else {
    if ( (n15<1000 && n15>99) || (n15<-99 && n15>-1000) ) {
      document.getElementById("r15").innerHTML=`EL NÚMERO ${n15} TIENE ${length} DÍGITOS :D y la suma de ellos da ${c} UwU`;
    } 
    else {
      if ((n15<10 && n15>0 ) || (n15>-10 && n15<0)) {
        document.getElementById("r15").innerHTML=`Oshe, ser humano... Eso claramente es un ${n15} y pos tiene sólo ${length} dígito... Ponéme más números que estoy que me sumo >:c`;
      } 
      else {
        document.getElementById("r15").innerHTML=`El número ${n15} no tiene 3 dígitos sino ${length} :c igual su suma da ${c} UwU`;
      }
    }
  }
}

// 16. Leer un número entero de tres dígitos y determinar si al menos dos de sus tres dígitos son iguales.
function result16(){
  var n16 = document.getElementById("input16").value;
  var length = (n16<0)? (n16.length)-1:n16.length;
  var arr = Array.from(String(n16), Number); //convertimos el número metido en el input en un array
  var box = []; //creamos un arreglo vacío donde introduciremos posteriormente los dígitos repetidos
  var clean = []; //crearemos un arreglo con el que luego filtraremos box para eliminar repeticiones
  var sort = []; //crearemos el arreglo final que será mostrado al usuario con la información filtrada, limpiada y organizada
  // Pequeña impresora de UNOs 1111
  var onesArray = []; 
  var ones = 0;
  var xxx = 0;

  for (let i = 0; i < arr.length; i++) { //creamos un bucle dentro de un bucle que introducirá a nuestros array los números que se repitan en arr[i] y arr[j] 
    for (let j = i+1; j < arr.length; j++){  //(j= 1+i -asi identificamos números repetidos-)
      if (arr[i] === arr[j]) {
        box.push(arr[i]);
        clean = box.filter((value, index, array) => array.indexOf(value) === index);
        sort = clean.sort();   
      }
    }
  }

  for (let d = 0; d < length; d++) {  // IMPRESORA DE 111111
    onesArray.push(1);
    ones = Number.parseInt(onesArray.join(''));
    xxx = n16%ones;
  }

  //ESTRUCTURA DE CASOS
  if ((n16 == 0)) {
    document.getElementById("r16").innerHTML = "";
  }
  else if((n16 == "-")){
    document.getElementById("r16").innerHTML = ""; 
  }
  else {
    if (n16<10&&n16>-10) {
      document.getElementById("r16").innerHTML = `Eso es un ${n16}...Un dígito solo... Nada más... ¡Dame más números, human@! D:<`; 
    } 
    else if (xxx == 0) {
      if (n16 == 777) {
        document.getElementById("r16").innerHTML = `¡MUY BUENAS A TODOS, GUAPÍSIMOS! Aquí el ${n16} siendo un ${sort} repitiéndose ${length} veces :D`; 
      } 
      else if(n16 == 666){
        document.getElementById("r16").innerHTML = `El número ${n16} >:D es un ${sort} repitiéndose ${length} veces MUAHAHAHHAHAA lml_ c:<`; 
      }
      else {
        document.getElementById("r16").innerHTML = `El número ${n16} es un ${sort} repitiéndose ${length} veces UwU`; 
      }
    } 
    else {
      if((n16<1000&&n16>99)||(n16<-99&&n16>-1000)){
        if (sort.length == 1) {
          document.getElementById("r16").innerHTML = `El número ${n16} cumple las dos condiciones: tiene 3 dígitos y se repiten 2 de sus dígitos, el ${sort} UwU`; 
        }
        else{
          document.getElementById("r16").innerHTML = `El número ${n16} tiene 3 dígitos pero ninguno de ellos se repite :C`; 
        }
      }
      else{
        if (sort.length >= 1) {
          if (n16 == 3137054945) {
            document.getElementById("r16").innerHTML = `MIAU UwU`; 
          }
          else{
            document.getElementById("r16").innerHTML = `El ${n16} no tiene 3 dígitos sino ${length} >:c aunque tiene números repetidos como el ${sort} :o`; 
          }
        }
        else{
          if (n16 == 69) {
            document.getElementById("r16").innerHTML = `Hmmm baia baia 7u7 pilluel@ guiño guiño ;) ...pero ño. El ${n16} no tiene ni 3 dígitos ni números repetidos >:c`; 
          } 
          else {
            document.getElementById("r16").innerHTML = `El número ${n16} no tiene números repetidos ni 3 dígitos, tiene ${length} :c F`; 
          }
        }
      }
    }
  }
}

// 17. Leer un número entero de tres dígitos y determinar en qué posición está el mayor dígito.
function result17(){
  var n17 = document.getElementById("input17").value;
  var abs = Math.abs(n17);
  //var abs = Math.abs(x);
  var arr = Array.from(String(abs),Number);
  var length = (n17<0)? (n17.length)-1:n17.length;

  var left = Number.parseInt(abs/100);
  var right = abs%10;
  var mid = (abs-((left*100)+right))/10;

  var max = Math.max(...arr);
  var pos = arr.indexOf(Math.max(...arr))+1;

  // IMPRESORA DE 111111
  var onesArray = [];
  var ones = 0;
  var xxx = 0;
  for (let d = 0; d < length; d++) {  
    onesArray.push(1);
    ones = Number.parseInt(onesArray.join(''));
    xxx = n17%ones;
  }

  
  if ((n17 == 0 && n17 == 0)) {
    document.getElementById("r17").innerHTML = ``;
  }
  else if((n17 == "-" && n17 == "-")){
    document.getElementById("r17").innerHTML = ``; 
  }
  else {
    if (xxx == 0 && length>1) {
      document.getElementById("r17").innerHTML = `Eso es un ${right} repetido ${length} veces UwU, así que todas las posiciones tienen el mismo valor`;
     } 
    else {        
      switch (length) {
        case 1:
          document.getElementById("r17").innerHTML = `Eso es un ${n17} y sólo tiene un dígito >:c ¡escribe más números, humano!`;
          break;

        case 2:
          switch (max) {
            case parseInt(abs/10):
              document.getElementById("r17").innerHTML = `El número ${n17} sólo tiene 2 dígitos :c<br>igual el ${parseInt(n17/10)}, ubicado a su izquierda, es su dígito de mayor valor UwU`;
              break;
          
            case right:
              document.getElementById("r17").innerHTML = `El número ${n17} sólo tiene 2 dígitos :c<br>igual el ${right}, ubicado a su derecha, es su dígito de mayor valor UwU`;
              break;
          }
          break;      

        case 3:
          switch (max) {
            case left:
              document.getElementById("r17").innerHTML = `El número ${n17} tiene 3 dígitos y el mayor dígito es el ${max} posicionado a su izquierda UwU`;
              break;

            case mid:
              document.getElementById("r17").innerHTML = `El número ${n17} tiene 3 dígitos y el mayor dígito es el ${max} posicionado en su mitad UwU`;
              break;
              
            case right:
              document.getElementById("r17").innerHTML = `El número ${n17} tiene 3 dígitos y el mayor dígito es el ${max} posicionado a su derecha UwU`;
              break;
          }
          break;
          
        default:
            document.getElementById("r17").innerHTML = `El número ${n17} no tiene 3 dígitos sino ${length}<br>Igual su máximo valor es el ${max} en la posición de dígitos n°${pos} UwU`;
          break;
      }
    } 
  }
}  

// 18. Leer un número entero de tres dígitos y determinar si algún dígito es múltiplo de los otros.
function result18(){
  var n18= document.getElementById("input18").value;
  var length = (n18<0)? (n18.length)-1:n18.length;

  var left = Number.parseInt(n18/100);
  var right = n18%10;
  var mid = (n18-((left*100)+right))/10;
  var left_  = Number.parseInt(n18/10);

  var a = [];
  var b = []; 
  var c = [];

  var multiplesLeft = [];
  var multiplesMid = [];
  var multiplesRight = [];

  var resultA="";
  var resultB="";
  var resultC="";

//un for donde se resuelva todo el problemón de múltiplos
  for (let i = -9; i < 10; i++) {
    i%left;
    if (i!=left && i%left==0){
      a.push(i);
      multiplesLeft = a.filter(x=> x == mid || x == right);
    }
    
    i%mid;
    if (i!=mid && i%mid==0){
      b.push(i);
      multiplesMid = b.filter(x=> x == left || x == right);
    }
    
    i%right;
    if (i!=right && i%right==0){
      c.push(i);
      multiplesRight = c.filter(x=> x == left || x == mid);
    }

    if (multiplesLeft != 0){
      resultA =`${left} tiene de múltiplo a: ${multiplesLeft}<br>`;
    }

    if (multiplesMid != 0) {
      resultB =`${mid} tiene de múltiplo a: ${multiplesMid}<br>`;
    }

    if (multiplesRight != 0) {
      resultC =`${right} tiene de múltiplo a: ${multiplesRight}<br>`;
    }

  }
  

  // IMPRESORA DE 111111
  var onesArray = [];
  var ones = 0;
  var xxx = 0;
  for (let d = 0; d < length; d++) {  
    onesArray.push(1);
    ones = Number.parseInt(onesArray.join(''));
    xxx = n18%ones;
  }

  
  if ((n18 == 0 && n18 == 0)) {
    document.getElementById("r18").innerHTML = ``;
  }
  else if((n18 == "-" && n18 == "-")){
    document.getElementById("r18").innerHTML = ``; 
  }
  else { 
    if (xxx == 0 && length>1) {
      document.getElementById("r18").innerHTML = `Eso es un ${right} repetido ${length} veces UwU, y pues todo número es múltiplo de si mismo`;
     } 
    else {        
      switch (length) {
        case 1:
          document.getElementById("r18").innerHTML = `Eso es un ${n18} y sólo tiene un dígito >:c ¡escribe más números, humano!`;
          break;
          
          case 2:
          if (left_%right == 0) {
            document.getElementById("r18").innerHTML = `El ${n18} sólo tiene dos dígitos :c<br>Igual el ${left_} es múltiplo del ${right} ;)`;
          } 
          else if (right%left_ == 0) {
            document.getElementById("r18").innerHTML = `El ${n18} sólo tiene dos dígitos :c<br>Igual el ${right} es múltiplo del ${left_} ;)`;
          } 
          else {  
            document.getElementById("r18").innerHTML = `El ${n18} sólo tiene dos dígitos :c<br>Igual el ${left_} y el ${right} no son múltiplos F`;
          }
          break;      

        case 3:
          if (resultA=="" && resultB=="" && resultC=="") {
            document.getElementById("r18").innerHTML= `En este caso... Ni ${left} ni ${mid} ni ${right} son múltipos del otro :c intenta otra combinación de números`;
          }
          else{
            document.getElementById("r18").innerHTML = `En este caso...${resultA}${resultB}${resultC}UwU`
          }
          break; 
          
        default:
            document.getElementById("r18").innerHTML = `El número ${n18} no tiene 3 dígitos sino ${length},<br> ponme un número de 3 dígitos.`;
          break;
      
      } 
    }
  }
}  

// 19. Leer tres números enteros y determinar cuál es el mayor. Usar solamente dos variables.
function result19(){
  //VAR1: Creamos un arreglo que presentará al usuario los 3 valores de las 3 cajas y sha xd en una variable >:v
  var arr = [];

  //Ingresamos los inputs que pone el usuario a la variable arreglo (arr)
  arr.push(document.getElementById("input19").value);
  arr.push(document.getElementById("input19b").value);
  arr.push(document.getElementById("input19c").value);

  //comienza el juego

  if (arr == ",,") {
    document.getElementById("r19").innerHTML = ``; 
  }
  else {
      document.getElementById("r19").innerHTML = `Okay... El mayor es ${Math.max(...arr)}`; 
  }
 } 

// 20. Leer tres números enteros y mostrarlos ascendentemente.
function result20(){
  var n20 = document.getElementById("input20").value;
  var n20b = document.getElementById("input20b").value;
  var n20c = document.getElementById("input20c").value;

//Por algún motivo que, al momento de realizado este ejercicio, desconozco... JS no puede permutar debidamente variables leídas, quizá no son puramente numéricas, así que...
  var a = Number.parseInt(n20);
  var b = Number.parseInt(n20b);
  var c = Number.parseInt(n20c);
  
  if ((n20 == 0 && n20b == 0 && n20c == 0)) {
    document.getElementById("r20").innerHTML = ``;

  }
  else if((n20 == "-" && n20b == "-" && n20c == "-")){
    document.getElementById("r20").innerHTML = ``; 
  }
 //Generamos una estructura de casos aplicable para ejercicios de 3 cifras 
  else {
    if (n20c == ``) {
      if (n20 != `` && n20b != ``) {
        document.getElementById("r20").innerHTML = `Okay, un ${n20} y un ${n20b}. Pero ponme un número en el otro cuadro también >:c`;
      }
      else{
        document.getElementById("r20").innerHTML = `Okay, un ${n20}${n20b}. Pero ponme un número en los otros dos cuadros también >:c`;
      }
    }
    else {
      if (n20 == `` && n20b == ``) {
        document.getElementById("r20").innerHTML = `Okay, un ${n20c}. Pero ponme un número en los otros dos cuadros también >:c`;
      }
      else if (n20 == `` || n20b == ``) {
        document.getElementById("r20").innerHTML = `Okay, un ${n20c} y un ${n20}${n20b}. Pero ponme un número en el otro cuadro también >:c`;
      }
      else{
        if (a<=b && a<=c) {   
          if (b<c) {
            document.getElementById("r20").innerHTML = `${a}, ${b}, ${c} UwU`;
          } 
          else {
            document.getElementById("r20").innerHTML = `${a}, ${c}, ${b} UwU`;
          }
        } 
        else {
          if (b<=a && b<=c) {   
            if (a<c) {
              document.getElementById("r20").innerHTML = `${b}, ${a}, ${c} UwU`;
            } 
            else {
              document.getElementById("r20").innerHTML = `${b}, ${c}, ${a} UwU`;
            }
          } 
          else {
            if (c<=a && c<=b) {   
              if (a<b) {
                document.getElementById("r20").innerHTML = `${c}, ${a}, ${b} UwU`;
              } 
              else {
                document.getElementById("r20").innerHTML = `${c}, ${b}, ${a} UwU`;
              }
            }
          } 
        }
      }
    }
  }  
}

// 21. Leer tres números enteros de dos dígitos cada uno y determinar en cuál de ellos se encuentra el mayor dígito.
function result21(){
    var n21 = document.getElementById("input21").value;
    var n21b = document.getElementById("input21b").value;
    var n21c = document.getElementById("input21c").value;
    var length = (n21<0)? (n21.length)-1:n21.length;
    var lengthB = (n21b<0)? (n21b.length)-1:n21b.length;
    var lengthC = (n21c<0)? (n21c.length)-1:n21c.length;
    var len = (length==1)? `1 dígito`:`${length} dígitos`;
    var lenb = (lengthB==1)? `1 dígito`:`${lengthB} dígitos`;
    var lenc = (lengthC==1)? `1 dígito`:`${lengthC} dígitos`;

    //VAINAS PARA HALLAR CUÁL ES EL MAYOR DÍGITO DE LOS 3 NÚMEROS
    var aux = Math.abs(n21);        
    var auxb = Math.abs(n21b);    
    var auxc = Math.abs(n21c);
    //ARREGLOS DE LOS NÚMEROS
    var arr = Array.from(String(aux),Number);
    var arrb = Array.from(String(auxb),Number);
    var arrc = Array.from(String(auxc),Number);    
    //AQUÍ SABEMOS CUÁL ES EL MAYOR DÍGITO DE TODOS
    var left = Math.max(...arr); 
    var mid = Math.max(...arrb);
    var right = Math.max(...arrc);
    var max = Math.max(left,mid,right);

    //VAINAS PARA HALLAR EN QUÉ NÚMERO ESTÁ EL MAYOR DÍGITO DE LOS 3 NUMS
      
    var i = arr.includes(max)? `${n21} (el número de la izquierda);`:``;
    var c = arrb.includes(max)? `${n21b} (el número de la mitad);`:``;
    var d = arrc.includes(max)? `${n21c} (el número de la derecha);`:``;

    

    //Toda esta mamada para solucionar el problema de los dígitos + la solución incluida de una vez xd
    var len2 = ((length==2)&&(lengthB==2)&&(lengthC==2))? `:D <br> Y el mayor dígito de los 3 números es el ${max}, alojado en el...<br>${i} ${c} ${d} UwU`:`...Ojalá todos tuvieran 2 dígitos :C En cualquier caso...<br> El mayor dígito de los 3 números es el ${max}, alojado en el...<br>${i} ${c} ${d} UwU`;
    
    var lenSolution = ((length==lengthB)&&(length==lengthC))? `Los 3 números (${n21}, ${n21b} y ${n21c}) tienen ${len} ${len2}`:`El ${n21} tiene ${len}; el ${n21b} tiene ${lenb} y el ${n21c} tiene ${lenc};<br> ${len2}`;
    
    
    if ((n21 == 0 && n21b == 0 && n21c == 0)) {
      document.getElementById("r21").innerHTML = ``;
  
    }
    else if((n21 == "-" && n21b == "-" && n21c == "-")){
      document.getElementById("r21").innerHTML = ``; 
    }
   //Generamos una estructura de casos aplicable para ejercicios de 3 cifras 
    else {
      if (n21c == ``) {
        if (n21 != `` && n21b != ``) {
          document.getElementById("r21").innerHTML = `Okay, un ${n21} y un ${n21b}. Pero ponme un número en el otro cuadro también >:c`;
        }
        else{
          document.getElementById("r21").innerHTML = `Okay, un ${n21}${n21b}. Pero ponme un número en los otros dos cuadros también >:c`;
        }
      }
      else {
        if (n21 == `` && n21b == ``) {
          document.getElementById("r21").innerHTML = `Okay, un ${n21c}. Pero ponme un número en los otros dos cuadros también >:c`;
        }
        else if (n21 == `` || n21b == ``) {
          document.getElementById("r21").innerHTML = `Okay, un ${n21c} y un ${n21}${n21b}. Pero ponme un número en el otro cuadro también >:c`;
        }
        else{
             document.getElementById("r21").innerHTML = `${lenSolution}`;
        }  
      }
    }
}    
  
// 22. Leer un número entero de tres dígitos y determinar si el primer dígito es igual al último.
function result22(){
  var n22 = document.getElementById("input22").value;
  var length = (n22<0)? n22.length-1:n22.length;
  var len = (length==1)? `${n22} tiene 1 dígito`:`${n22} tiene ${length} dígitos`;
  var aux = Math.abs(n22);
  var extreme = 10**(length-1);
  var left = Number.parseInt(aux/extreme);
  var right = aux%10;

  if((n22 == 0)){
    document.getElementById("r22").innerHTML = ``;
  }
  else if((n22 == "-")){
    document.getElementById("r22").innerHTML = ``; 
  }
  else{
    switch (length) {
      case 1:
        document.getElementById("r22").innerHTML = `Eso es un ${n22}, y al igual que la serpiente Uróboros,<br>que se muerde la cola...El ${n22} empieza como termina: en el ${right} UwU`; 
        break;

      case 3:
        switch (left) {
          case right:
            document.getElementById("r22").innerHTML = `${len} :D y su primer y último dígito son el mismo: el ${left}`; 
            break;
        
          default:
            document.getElementById("r22").innerHTML = `${len} :D pero su primer dígito (${left}) es díferente del último (${right}) :c`; 
            break;
        }
        break;
          
      default:
        switch (left) {
          case right:
            document.getElementById("r22").innerHTML = `${n22} no tiene 3 dígitos sino ${length} >:c<br>Igual su primer y último dígito son, curiosamente, el mismo: el ${left}`; 
            break;
        
          default:
            document.getElementById("r22").innerHTML = `${n22} no tiene 3 dígitos sino ${length} >:c y para colmo...<br>Su primer número (el ${left}) no se parece en nada al último (el ${right})<br>>:c ¡DAME OTRO NÚMERO!`; 
            break;
        }        
        break;
    }
  }
}  

// 23. Leer un número entero de tres dígitos y determinar cuántos dígitos primos tiene.
function result23(){
  
  var n23 = document.getElementById("input23").value;
  var length = (n23<0)? n23.length-1:n23.length;
  var len = (length==1)? `${n23} tiene solo 1 dígito`:`${n23} tiene ${length} dígitos`;
  var arr = Array.from(String(n23),Number);

//En este caso, solution es un filtro de números primos
  var solution = arr.filter(x=>x==2||x==3||x==5||x==7||x==9); 
//sort organizará nuestro arreglo, mostrando la informacion de manera clara al usuario  
  var sort = solution.sort().filter((value,index,array)=>(array.indexOf(value)==index));
//Personalización del problema
  var ngtv = (n23<0)? `<br>Por cierto... ¿Sabías que los números primos no pueden ser negativos? Ese menos (-) sobra e,e`:``;
  var xd = (sort.length==1)? `tiene al ${sort} que es primo ${ngtv}`:`tiene varios números primos: ${sort} ${ngtv}`;
  
  if((n23 == 0)){
    document.getElementById("r23").innerHTML = ``;
  }
  else if((n23 == "-")){
    document.getElementById("r23").innerHTML = ``; 
  }
  else{
    switch (length) {
      case 1:
        switch (sort.length) {
          case 0:
            document.getElementById("r23").innerHTML = `${len} :c y además no es un número primo :cc doble F`; 
            break;
            
            default:
              document.getElementById("r23").innerHTML = `${len} :c pero al menos es un número primo :D`; 
              break;
        }
        break;
          
      case 3:
        switch (sort.length) {
          case 0:
            document.getElementById("r23").innerHTML = `${len} :D pero ninguno de ellos es un número primo :c`; 
            break;
            
            default:
            document.getElementById("r23").innerHTML = `${len} :D y entre ellos ${xd}`; 
            break;
        }
        break;
          
      default:  
      switch (sort.length) {
        case 0:
          document.getElementById("r23").innerHTML = `${len} y no 3 :c e increíblemente, ninguno de sus dígitos es un número primo F`; 
          break;
      
        default:
          document.getElementById("r23").innerHTML = `${len} y no 3 :c pero al menos ${xd}`; 
          break;
      }
        break;
    }
  }
}

// 24. Leer un número entero de tres dígitos y determinar cuántos dígitos pares tiene.
function result24(){
  
    var n24 = document.getElementById("input24").value;
    var length = (n24<0)? n24.length-1:n24.length;
    var len = (length==1)? `${n24} tiene solo 1 dígito`:`${n24} tiene ${length} dígitos`;
    var arr = Array.from(String(n24),Number);
  
  //En este caso, solution es un filtro de números pares
    var solution = arr.filter(x=>(x%2)==0); 
  //sort organizará nuestro arreglo, mostrando la informacion de manera clara al usuario  
    var sort = solution.sort().filter((value,index,array)=>(array.indexOf(value)==index));
  //Personalización del problema (singulares o plurales)
   var xd = (sort.length==1)? `tiene al ${sort} que es par`:`tiene varios números pares: ${sort}`;
    
    if((n24 == 0)){
      document.getElementById("r24").innerHTML = ``;
    }
    else if((n24 == "-")){
      document.getElementById("r24").innerHTML = ``; 
    }
    else{
      switch (length) {
        case 1:
          switch (sort.length) {
            case 0:
              document.getElementById("r24").innerHTML = `${len} :c y además no es un número par :cc doble F`; 
              break;
              
              default:
                document.getElementById("r24").innerHTML = `${len} :c pero al menos es un número par :D`; 
                break;
          }
          break;
            
        case 3:
          switch (sort.length) {
            case 0:
              document.getElementById("r24").innerHTML = `${len} :D pero ninguno de ellos es un número par :c`; 
              break;
              
              default:
              document.getElementById("r24").innerHTML = `${len} :D y entre ellos ${xd} UwU`; 
              break;
          }
          break;
            
        default:  
        switch (sort.length) {
          case 0:
            document.getElementById("r24").innerHTML = `${len} y no 3 :c e increíblemente, ninguno de sus dígitos es un número par F`; 
            break;
        
          default:
            document.getElementById("r24").innerHTML = `${len} y no 3 :c pero al menos ${xd} UwU`; 
            break;
        }
          break;
      }
    }
}

// 25. Leer un número entero de tres dígitos y determinar si alguno de sus dígitos es igual a la suma de los otros dos.
function result25(){
  
    var n25 = document.getElementById("input25").value;
    var length = (n25<0)? n25.length-1:n25.length;
    var len = (length==1)? `${n25} tiene solo 1 dígito`:`${n25} tiene ${length} dígitos`;
    var arr = Array.from(String(n25),Number);
    
    
    exponent = 10**(length-1);
    left = Number.parseInt((n25/exponent));
    right = Number.parseInt(n25%10);
    mid = Number.parseInt((n25-((left*100)+right))/10);
  
  //En este caso, solution es un filtro de números primos
    var solution = arr.filter(x=>left+right==x||left+mid==x||mid+right==x); 
    var partOf = arr.filter(x=>!(left+right==x||left+mid==x||mid+right==x)); 
  //sort organizará nuestro arreglo, mostrando la informacion de manera clara al usuario  
    var sort = solution.sort().filter((value,index,array)=>(array.indexOf(value)==index));
  //Personalización del problema (singulares o plurales)
   var xd = (sort.length==1)? `tiene al ${sort} que es la suma de ${partOf} UwU`:`Ninguno de sus números son el resultado de sumar los otros dos :C`;
    
    if((n25 == 0)){
      document.getElementById("r25").innerHTML = ``;
    }
    else if((n25 == "-")){
      document.getElementById("r25").innerHTML = ``; 
    }
    else{
      switch (length) {
        case 1:
          document.getElementById("r25").innerHTML = `${len} :c para este ejercicio necesito exactamente 3 dígitos`; 
          break;
            
        case 3:
          switch (sort.length) {
            case 0:
              document.getElementById("r25").innerHTML = `${len} :D pero entre ellos...<BR> ${xd}`; 
              break;
              
              default:
              document.getElementById("r25").innerHTML = `${len} :D y entre ellos ${xd}`; 
              break;
          }
          break;
            
        default:  
          document.getElementById("r25").innerHTML = `${len} >:c para este ejercicio necesito exactamente 3 dígitos`; 
          break;
      }
    }
}

// 26. Leer un número entero de cuatro dígitos y determinar a cuanto es igual la suma de sus dígitos.
function result26(){
  
    var n26 = document.getElementById("input26").value;
    var abs = Math.abs(n26);
    var arr = Array.from(String(abs),Number);
    
    var length = (n26<0)? n26.length-1:n26.length;
    var len = (length==1)? `${n26} tiene solo 1 dígito`:`${n26} tiene ${length} dígitos`;
  
  //En este caso, solution es un filtro de suma del arreglo
  var solution = arr.join('+'); 
  //Personalización del problema
  var summ = 0;
  for (let i = 0; i < arr.length; i++) {
   summ += arr[i];  
  }
  if (n26<0) {summ = summ*(-1);};

    if((n26 == 0)){
      document.getElementById("r26").innerHTML = ``;
    }
    else if((n26 == "-")){
      document.getElementById("r26").innerHTML = ``;  
    }
    else{
      switch (length) {
        case 1:
          document.getElementById("r26").innerHTML = `${len} y no 4 :C<br>...Y pues ni hay con quién sumarlo xd`; 
          break;
            
        case 4:
              document.getElementById("r26").innerHTML = `${len} :D<br>Y lo que es ${solution}<br>te dará la suma de ${summ} c:`; 
              break;

        default:  
            document.getElementById("r26").innerHTML = `${len} y no 4 :c pero que igual te lo calculo :D<br>${solution}<br>La suma de todo eso te dará... ${summ} UwU`; 
            break;
      }
    }
}


// 27. Leer un número entero de cuatro dígitos y determinar cuántos dígitos pares tiene.
function result27(){
  
  var n27 = document.getElementById("input27").value;
  var length = (n27<0)? n27.length-1:n27.length;
  var len = (length==1)? `${n27} tiene solo 1 dígito`:`${n27} tiene ${length} dígitos`;
  var arr = Array.from(String(n27),Number);

//En este caso, solution es un filtro de números pars
  var solution = arr.filter(x=>(x%2)==0); 
//sort organizará nuestro arreglo, mostrando la informacion de manera clara al usuario  
  var sort = solution.sort().filter((value,index,array)=>(array.indexOf(value)==index));
//Personalización del problema (singulares o plurales)
 var xd = (sort.length==1)? `tiene al ${sort} que es par`:`tiene varios números pares: ${sort}`;
  
  if((n27 == 0)){
    document.getElementById("r27").innerHTML = ``;
  }
  else if((n27 == "-")){
    document.getElementById("r27").innerHTML = ``; 
  }
  else{
    switch (length) {
      case 1:
        switch (sort.length) {
          case 0:
            document.getElementById("r27").innerHTML = `${len} :c y además no es un número par :cc doble F`; 
            break;
            
            default:
              document.getElementById("r27").innerHTML = `${len} :c pero al menos es un número par :D`; 
              break;
        }
        break;
          
      case 4:
        switch (sort.length) {
          case 0:
            document.getElementById("r27").innerHTML = `${len} :D pero ninguno de ellos es un número par :c`; 
            break;
            
            default:
            document.getElementById("r27").innerHTML = `${len} :D y entre ellos ${xd} UwU`; 
            break;
        }
        break;
          
      default:  
      switch (sort.length) {
        case 0:
          document.getElementById("r27").innerHTML = `${len} y no 4 :c e increíblemente, ninguno de sus dígitos es un número par F`; 
          break;
      
        default:
          document.getElementById("r27").innerHTML = `${len} y no 4 :c pero al menos ${xd} UwU`; 
          break;
      }
        break;
    }
  }
}

// 28. Leer un número entero menor que 50 y positivo y determinar si es un número par.
function result28(){
  
  var n28 = document.getElementById("input28").value;
  var aux = Number.parseInt(n28);
  
  //FILTROS
  var positive = (aux>0)? `Es positivo c:`:`No es positivo :c`;
  var fifty = (aux<50)? `es menor a 50 :D`:`es mayor a 50 :c`;
  var pair = ((aux%2)==0)? `Es par UwU`:`Es impar >:c`;
  var pero1 = (((aux<50)&&(aux>0))||((aux<0)&&(aux>50)))? `y`:`pero`;
  var pero2 = (((aux<50)&&((aux%2)==0))||((aux>50)&&((aux%2)!=0)))? `Además...`:`sin embargo...`;

  //RESULTADOS
 // var arr = [positive,fifty,pair];
  counter = 0;
  (positive === `Es positivo c:`)? counter++:``;
  (fifty === `es menor a 50 :D`)? counter++:``;
  (pair === `Es par UwU`)? counter++:``;

  var solution = `El número ${n28} cumple con ${counter} de las 3 condiciones:<br>${positive} ${pero1} ${fifty} ${pero2} ${pair}`

  if((n28 == 0)){
    document.getElementById("r28").innerHTML = ``;
  }
  else if((n28 == "-")){
    document.getElementById("r28").innerHTML = ``; 
  }
  else{
    document.getElementById("r28").innerHTML = `${solution}`; 
  }
}

// 29. Leer un número entero de cinco dígitos y determinar si es un número capicúo. Ej. 15651, 59895.
function result29(){
  
    var n29 = document.getElementById("input29").value;
    var abs = Math.abs(n29);
    var length = (n29<0)? n29.length-1:n29.length;
    var len = (length==1)? `${n29} tiene solo 1 dígito`:`${n29} tiene ${length} dígitos`;
    
    //En este caso, solution es un filtro de números primos
    var arr = Array.from(String(abs),Number);
    var aux = Array.from(String(abs),Number);
    var rev = aux.reverse();
    var left = Number.parseInt(arr.join(''));
    var right = Number.parseInt(rev.join(''));
    var solution = (left == right)? `<br>Ah, y... ¡Es un número capicúa! :D<br>(se lee igual de derecha a izquierda)<br> >${right}< >${left}<`:`<br>...Igual no es un número capicúa :c<br>(no se lee igual igual de derecha a izquierda)<br> >${right}< >${left}<`; 

    
    if((n29 == 0)){
      document.getElementById("r29").innerHTML = ``;
    }
    else if((n29 == "-")){
      document.getElementById("r29").innerHTML = ``; 
    }
    else{
      switch (length) {
        case 1:
          document.getElementById("r29").innerHTML = `El número ${len} y no 5 :c ${solution}`; 
          break;
          
          case 5:
            document.getElementById("r29").innerHTML = `El número ${len} :D ${solution}`; 
          break;
            
          default:  
          document.getElementById("r29").innerHTML = `El número ${len} y no 5 :c ${solution}`; 
          break;
        }
    }
}

// 30. Leer un número entero de cuatro dígitos y determinar si el segundo dígito es igual al penúltimo.
function result30(){
  var n30 = document.getElementById("input30").value;
  var aux = Math.abs(n30);
  var length = (n30<0)? n30.length-1:n30.length;
  var len = (length==1)? `El número ${n30} tiene 1 dígito`:`El número ${n30} tiene ${length} dígitos`;

  var arr = Array.from(String(aux),Number);
  //SOLUTION
  solution = (arr[1] == arr[(arr.length-2)])? `<br>En todo caso... Su segundo (${arr[1]}) y penúltimo (${arr[(arr.length-2)]}) dígito SON IGUALES UwU`:`<br>En todo caso... Su segundo (${arr[1]}) y penúltimo (${arr[(arr.length-2)]}) dígito SON DIFERENTES :c`;

  if((n30 == 0)){
    document.getElementById("r30").innerHTML = ``;
  }
  else if((n30 == "-")){
    document.getElementById("r30").innerHTML = ``; 
  }
  else{
    switch (length) {
      case 1:
        document.getElementById("r30").innerHTML = `${len} no más :c ¡dame más números, humano! >:c`; 
        break;

      case 4:
        document.getElementById("r30").innerHTML = `${len} :D ${solution}`; 
        break;
          
      default:
        document.getElementById("r30").innerHTML = `${len} >:C ${solution}`; 
        break;
    }
  }
}  

// 31. Leer un número entero y determina si es igual a 10.
function result31(){
  
    var n31 = document.getElementById("input31").value;
    var aux = Number.parseInt(n31);

    if((n31 == 0)){
      document.getElementById("r31").innerHTML = ``;
    }
    else if((n31 == "-")){
      document.getElementById("r31").innerHTML = ``; 
    }
    else{
      switch (aux) {
        case 10:
          document.getElementById("r31").innerHTML = `¡¡¡HURRAAA!!! UN 10 :DDDD 10 10 10 10101101 10!!<Br>UwU QUÉ FELICIDAD, UN 10 AWIWIII UwU<BR>En fin... Ya podrían ponerme algo más difícil, humanos >:c`; 
          break;
          
        default:
          document.getElementById("r31").innerHTML = `Eso no es un 10, es un ${n31} >:C`; 
          break;
      }
    }
}

// 32. Leer un número entero y determinar si es múltiplo de 7.
function result32(){
  
    var n32 = document.getElementById("input32").value;
    var aux = Number.parseInt(n32%7);

    if((n32 == 0)){
      document.getElementById("r32").innerHTML = ``;
    }
    else if((n32 == "-")){
      document.getElementById("r32").innerHTML = ``; 
    }
    else{
      switch (aux) {
        case 0:
          document.getElementById("r32").innerHTML = `¡¡¡HURRAAA!!! UN MÚLTIPLO DE 7 :DDDD  ¡¡777 777 777 77 777 7!!<Br>UwU QUÉ FELICIDAD, UN MÚLTIPLO DE 7 AWIWIII UwU<BR>En fin... Ya podrían ponerme algo más difícil, humanos 7n7`; 
          break;
          
        default:
          document.getElementById("r32").innerHTML = `Ese tal ${n32} no es múltiplo de 7 >:C`; 
          break;
      }
    }
}

// 33. Leer un número entero y determinar si termina en 7.
function result33(){
  
    var n33 = document.getElementById("input33").value;
    var aux = Math.abs(n33%10);

    if((n33 == 0)){
      document.getElementById("r33").innerHTML = ``;
    }
    else if((n33 == "-")){
      document.getElementById("r33").innerHTML = ``; 
    }
    else{
      switch (aux) {
        case 7:
          document.getElementById("r33").innerHTML = `¡¡¡HURRAAA!!! TERMINA EN 7 :DDDD ¡¡777 777 777 77 777 7!!<Br>UwU QUÉ FELICIDAD, UN 7 AWIWIII UwU<BR>En fin... Ya podrían ponerme algo más difícil, humanos 7n7||| -.-"`; 
          break;
          
        default:
          document.getElementById("r33").innerHTML = `${n33} NO TERMINA EN 7, TERMINA EN ${aux} >:C`; 
          break;
      }
    }
}

// 34. Leer un número entero menor que mil y determinar cuántos dígitos tiene.
function result34(){
  
    var n34 = document.getElementById("input34").value;
    var length = (n34<0)? n34.length-1:n34.length;
    var len = (length==1)? `tiene solo 1 dígito`:`tiene ${length} dígitos`;
    var aux = Number.parseInt(n34);
  
    //Personalización del problema 
    var solution = (aux<=1000)? `El ${aux} es igual o menor a 1000 :D`:`${aux} es mayor a 1000 :c`; 
    
    if((n34 == 0)){
      document.getElementById("r34").innerHTML = ``;
    }
    else if((n34 == "-")){
      document.getElementById("r34").innerHTML = ``; 
    }
    else{
      document.getElementById("r34").innerHTML = `${solution} y ${len}`; 
    }
}

// 35. Leer un número entero de dos dígitos, guardar cada dígito en una variable diferente y luego mostrarlas en pantalla.
function result35(){
  
    var n35 = document.getElementById("input35").value;
    var aux = Math.abs(n35);
    var arr = Array.from(String(aux),Number);
    var length = (n35<0)? n35.length-1:n35.length;
    var len = (length==1)? `El ${n35} tiene solo 1 dígito`:`El ${n35} tiene ${length} dígitos`;
    
    //ARREGLO PARA EL ABECEDARIO (con fromCharCode y un for)
    var abc = [];
    for (let i = 97; i<123; i++) {
      abc.push(String.fromCharCode(i));
    };
    
    //ARREGLO PARA ASOCIAR CADA DÍGITO A UNA LETRA (VARIABLE)
    var xd = ``;
    for (let miau = 0; miau < arr.length; miau++) {
      var solution = `${abc[miau]} = ${arr[miau]};<br>`;
      xd += solution;
    }
    if (n35<0) {
      xd += `...Y por supuesto, le agregas el signo negativo (-) a las variables en algún momento UwU`
    }

    if((n35 == 0)){
      document.getElementById("r35").innerHTML = ``;
    }
    else if((n35 == "-")){
      document.getElementById("r35").innerHTML = ``; 
    }
    else{
      switch (length) {
        case 1:
          document.getElementById("r35").innerHTML = `Pos... Eso es un ${n35}, sin más...<br>Pero que igual te lo hago variable, si quieres xd<br>${xd}`; 
          break;
          
          case 2:
            document.getElementById("r35").innerHTML = `${len} :D y sus dígitos separados en variables quedan así:<br>${xd}`; 
            break;
            
            default:
          document.getElementById("r35").innerHTML = `${len} y no 2 :C, pero que no importa... Que igual te lo calculo :D<br>${xd}`; 
          break;
      }
    }
}

// 36. Leer un número entero de 4 dígitos y determinar si tiene mas dígitos pares o impares.
function result36(){
  
    var n36 = document.getElementById("input36").value;
    var aux = Math.abs(n36);
    var length = (n36<0)? n36.length-1:n36.length;
    var len = (length==1)? `El ${n36} tiene solo 1 dígito`:`El ${n36} tiene ${length} dígitos`;
    var arr = Array.from(String(aux),Number);
  
  //En este caso, solution es un filtro de números primos
    var even = arr.filter(x=>x%2==0); 
    var odd = arr.filter(x=>!(x%2==0));
    var oneDigit = (aux%2==0)? `y no 4 :c y pues es un número par`:`y no 4 :c y pues es un número impar`;
  //sort organizará nuestro arreglo, mostrando la informacion de manera clara al usuario  
    var sortEven = even.sort().filter((value,index,array)=>(array.indexOf(value)==index));
    var sortOdd = odd.sort().filter((value,index,array)=>(array.indexOf(value)==index));
  //Personalización del problema (singulares o plurales)
    var evenResult = (sortEven.length==1)? `El ${n36} tiene un número par: el ${sortEven} `:`El ${n36} tiene varios números par: ${sortEven} `;
    var oddResult = (sortOdd.length==1)? `y tiene al ${sortOdd} que es impar`:`y tiene varios números impares: ${sortOdd}`;
    var solution = evenResult.concat(oddResult);
    var equals = (even.length == odd.length)? `<br>Y el ${n36} tiene igual proporción de pares (tiene ${even.length}) que de impares (tiene ${odd.length}) UwU`:``;
    var max = (even.length > odd.length)? `<br>Y el ${n36} tiene más números pares (tiene ${even.length}) que impares (tiene ${odd.length}) UwU`:`<br>Y el ${n36} tiene más números impares (tiene ${odd.length}) que pares (tiene ${even.length}) UwU`;
    var off = (equals == ``)? max:``;

    if((n36 == 0)){
      document.getElementById("r36").innerHTML = ``;
    }
    else if((n36 == "-")){
      document.getElementById("r36").innerHTML = ``; 
    }
    else{
      switch (length) {
        case 1:
          document.getElementById("r36").innerHTML = `${len} ${oneDigit}`; 
          break;
      
        case 4:
          switch (sortEven.length) {
            case 0:
              document.getElementById("r36").innerHTML = `${len} :D <br>el ${n36} no tiene números pares ${oddResult} ${equals} ${off}`; 
              break;
              
            default:
              switch (sortOdd.length) {
                case 0:
                  document.getElementById("r36").innerHTML = `${len} :D <br> ${evenResult} pero curiosamente no tiene números impares ${equals} ${off}`; 
                  break;
              
                default:
                  document.getElementById("r36").innerHTML = `${len} :D <br> ${solution} ${equals} ${off}`; 
                  break;
              }
              break;
          }
          break;
        
        default:
          switch (sortEven.length) {
            case 0:
              document.getElementById("r36").innerHTML = `${len} y no 4 :C ...Pero que igual te lo calculo :D<BR>no tiene números pares ${oddResult} ${equals} ${off}`; 
              break;
              
            default:
              switch (sortOdd.length) {
                case 0:
                  document.getElementById("r36").innerHTML = `${len} y no 4 :C ...Pero que igual te lo calculo :D<br> ${evenResult} pero curiosamente no tiene números impares :O ${equals} ${off}`; 
                  break;
              
                default:
                  document.getElementById("r36").innerHTML = `${len} y no 4 :C ...Pero que igual te lo calculo :D<br>${solution} ${equals} ${off}`; 
                  break;
              }
              break;
          }
          break;
      }
    }
}

// 37. Leer dos números enteros y determinar cuál es múltiplo de cuál.
function result37(){

  //Variable 1
  var n37 = document.getElementById("input37").value;
  var aux = Math.abs(n37);

  //Variable 2
  var n37b = document.getElementById("input37b").value;
  var auxb = Math.abs(n37b);
  

  if ((n37 == 0 && n37b == 0)) {
    document.getElementById("r37").innerHTML = ``;
  }
  else if((n37 == "-" && n37b == "-")){
    document.getElementById("r37").innerHTML = ``; 
  }
  else {
    if (n37 == `` || n37b == ``) {                                                                                           //PARA EJERCICIOS CON MÚLTIPLES VARIABLES 
      document.getElementById("r37").innerHTML = `Okay, un ${n37}${n37b}. Pero ponme un número en el otro cuadro también >:c`;
    } 
    else{
      switch (aux) {
        case auxb:
          document.getElementById("r37").innerHTML = `¡Ambas casillas tienen el mismo número, humano!<BR>Y pues todo número es múltiplo de si y ${n37} no es la excepción UwU`;
          break;
      
        default:
          switch (aux%auxb) {
            case 0:
              document.getElementById("r37").innerHTML = `El número de la izquierda (${n37}) es múltiplo del de la derecha (${n37b}) :D<br>Ya que si multiplicas ${n37b} * ${(n37/n37b)} veces, te dará ${n37} UwU`;
              break;
          
            default:
              switch (auxb%aux) {
                case 0:
                  document.getElementById("r37").innerHTML = `El número de la derecha (${n37b}) es múltiplo del de la izquierda (${n37}) :D<br>Ya que si multiplicas ${n37} * ${(n37b/n37)} veces, te dará ${n37b} UwU`;
                  break;
              
                default:
                  document.getElementById("r37").innerHTML = `Ninguno de los dos números, ni ${n37}, ni ${n37b} son múltiplos del otro :c<br>¡Prueba con otros números, humano!`;
                  break;
              }
              break;
          }
          break;
      }
    }
  }
}  

// 38. Leer tres números enteros y determinar si el último dígito de los tres números es igual.
function result38(){

    //Variables
    var n38 = document.getElementById("input38").value;
    var n38b = document.getElementById("input38b").value;
    var n38c = document.getElementById("input38c").value;

    //Valores absolutos de las variables (para que los arreglos no se pifeen con el signo menos (-))
    var aux = Math.abs(n38);
    var auxb = Math.abs(n38b);
    var auxc = Math.abs(n38c);

    //Arreglos para adquirir el último dígito de cada número
    var arr = Array.from(String(aux),Number); 
    var arrb = Array.from(String(auxb),Number);
    var arrc = Array.from(String(auxc),Number);

    var lastOne = arr[(arr.length-1)];
    var lastTwo = arrb[(arrb.length-1)];
    var lastThree = arrc[(arrc.length-1)];
    
    //LETS GO

    if ((n38 == 0 && n38b == 0 && n38c == 0)) {
      document.getElementById("r38").innerHTML = ``;
    }
    else if((n38 == "-" && n38b == "-" && n38c == "-")){
      document.getElementById("r38").innerHTML = ``; 
    }
   //Generamos una estructura de casos aplicable para ejercicios de 3 cifras 
    else {
      if (n38c == ``) {
        if (n38 != `` && n38b != ``) {
          document.getElementById("r38").innerHTML = `Okay, un ${n38} y un ${n38b}. Pero ponme un número en el otro cuadro también >:c`;
        }
        else{
          document.getElementById("r38").innerHTML = `Okay, un ${n38}${n38b}. Pero ponme un número en los otros dos cuadros también >:c`;
        }
      }
      else {
        if (n38 == `` && n38b == ``) {
          document.getElementById("r38").innerHTML = `Okay, un ${n38c}. Pero ponme un número en los otros dos cuadros también >:c`;
        }
        else if (n38 == `` || n38b == ``) {
          document.getElementById("r38").innerHTML = `Okay, un ${n38c} y un ${n38}${n38b}. Pero ponme un número en el otro cuadro también >:c`;
        }
        else{
          switch (lastOne) {

            case lastTwo:
              switch (lastTwo) {
                case lastThree:
                  document.getElementById("r38").innerHTML = `Los 3 números ${n38}, ${n38b} y ${n38c}...<br>¡Terminan en el mismo número: ${n38%10}! :D UwU`;
                  break;
                  
                default:
                  document.getElementById("r38").innerHTML = `El ${n38} de la izquierda termina igual que el ${n38b} del medio UwU<br>Ambos terminan en el número ${n38%10} c:`;
                  break;
              }
              break;

            case lastThree:
              switch (lastThree) {
                case lastTwo:
                  document.getElementById("r38").innerHTML = `Los 3 números ${n38}, ${n38b} y ${n38c}<br>terminan en el mismo número: ${n38%10}! :D UwU`;
                  break;
              
                default:
                  document.getElementById("r38").innerHTML = `El ${n38} de la izquierda termina igual que el ${n38c} de la derecha UwU<br>Ambos terminan en el número ${n38%10} c:`;
                  break;
              }
              break;
                
            default:
                  switch (lastTwo) {
                    case lastThree:
                  document.getElementById("r38").innerHTML = `El ${n38b} del medio  y el ${n38c} de la derecha terminan igual UwU<br>Ambos terminan en el número ${n38%10} c:`;
                  break;
              
                default:
                  document.getElementById("r38").innerHTML = `Ninguno de los 3 números terminan igual :c<br>¡PRUEBA OTRA COMBINACIÓN!`; 
                  break;
              }
              break;
          }
        }
      }  
    }
}

// 39. Leer tres números enteros y determina si el penúltimo dígito de los tres números es igual.
function result39(){

  //Variables
  var n39 = document.getElementById("input39").value;
  var n39b = document.getElementById("input39b").value;
  var n39c = document.getElementById("input39c").value;

  //Valores absolutos de las variables (para que los arreglos no se pifeen con el signo menos (-))
  var aux = Math.abs(n39);
  var auxb = Math.abs(n39b);
  var auxc = Math.abs(n39c);

  //Arreglos para adquirir el penúltimo dígito de cada número
  var arr = Array.from(String(aux),Number); 
  var arrb = Array.from(String(auxb),Number);
  var arrc = Array.from(String(auxc),Number);

  var penltOne = arr[(arr.length-2)];
  var penltTwo = arrb[(arrb.length-2)];
  var penltThree = arrc[(arrc.length-2)];
  
  //LETS GO

  if ((n39 == 0 && n39b == 0 && n39c == 0)) {
    document.getElementById("r39").innerHTML = ``;
  }
  else if((n39 == "-" && n39b == "-" && n39c == "-")){
    document.getElementById("r39").innerHTML = ``; 
  }
 //Generamos una estructura de casos aplicable para ejercicios de 3 cifras 
  else {
    if (n39c == ``) {
      if (n39 != `` && n39b != ``) {
        document.getElementById("r39").innerHTML = `Okay, un ${n39} y un ${n39b}. Pero ponme un número en el otro cuadro también >:c`;
      }
      else{
        document.getElementById("r39").innerHTML = `Okay, un ${n39}${n39b}. Pero ponme un número en los otros dos cuadros también >:c`;
      }
    }
    else {
      if (n39 == `` && n39b == ``) {
        document.getElementById("r39").innerHTML = `Okay, un ${n39c}. Pero ponme un número en los otros dos cuadros también >:c`;
      }
      else if (n39 == `` || n39b == ``) {
        document.getElementById("r39").innerHTML = `Okay, un ${n39c} y un ${n39}${n39b}. Pero ponme un número en el otro cuadro también >:c`;
      }
      else{
        switch (penltOne) {

          case penltTwo:
            switch (penltTwo) {
              case penltThree:
                document.getElementById("r39").innerHTML = `Los 3 números ${n39}, ${n39b} y ${n39c}...<br>¡Terminan en el mismo número: ${n39%10}! :D UwU`;
                break;
                
              default:
                document.getElementById("r39").innerHTML = `El ${n39} de la izquierda termina igual que el ${n39b} del medio UwU<br>Ambos terminan en el número ${n39%10} c:`;
                break;
            }
            break;

          case penltThree:
            switch (penltThree) {
              case penltTwo:
                document.getElementById("r39").innerHTML = `Los 3 números ${n39}, ${n39b} y ${n39c}<br>terminan en el mismo número: ${n39%10}! :D UwU`;
                break;
            
              default:
                document.getElementById("r39").innerHTML = `El ${n39} de la izquierda termina igual que el ${n39c} de la derecha UwU<br>Ambos terminan en el número ${n39%10} c:`;
                break;
            }
            break;
              
          default:
                switch (penltTwo) {
                  case penltThree:
                document.getElementById("r39").innerHTML = `El ${n39b} del medio  y el ${n39c} de la derecha terminan igual UwU<br>Ambos terminan en el número ${n39%10} c:`;
                break;
            
              default:
                document.getElementById("r39").innerHTML = `Ninguno de los 3 números terminan igual :c<br>¡PRUEBA OTRA COMBINACIÓN!`; 
                break;
            }
            break;
        }
      }
    }  
  }
}

// 40. Leer dos números enteros y si la diferencia entre los dos es menor o igual a 10 entonces mostrar en pantalla todos los enteros comprendidos entre el menor y el mayor de los números leídos.
function result40(){
  
  //variables de inputs
  var n40 = document.getElementById("input40").value;
  var n40b = document.getElementById("input40b").value;

  //variable que determina cuál número es el menor y mayor (para comenzar a contar desde allí)
  var min = Math.min(n40,n40b);
  var max = Math.max(n40,n40b);
  var box = [];
  
  for (let i = min; i <= max; i++) {
    box.push(i);
  };
  
  //variable que responda a la resta de las dos variables
  var test = (((n40-n40b)<=10)&&((n40-n40b)>=-10))? true:false;
  var rest = (test == true)? `La diferencia entre ${n40} y ${n40b} da ${n40-n40b}, lo que es menor a 10 unidades UwU<br>Si contáramos los números que hay entre el ${n40} y el ${n40b}, obtendríamos esto:<br>${box} UwU` :`La diferencia entre ${n40} y ${n40b} da ${n40-n40b}, lo que es mayor a 10 unidades...<br>Por lo que me salvé de contar huehuehue xd`;


  
  if ((n40 == 0 && n40b == 0)) {
    document.getElementById("r40").innerHTML = ``;
  }
  else if((n40 == "-" && n40b == "-")){
    document.getElementById("r40").innerHTML = ``; 
  }
  else {
    if (n40 == `` || n40b == ``) {                                                                                           //PARA EJERCICIOS CON MÚLTIPLES VARIABLES 
      document.getElementById("r40").innerHTML = `Okay, un ${n40}${n40b}. Pero ponme un número en el otro cuadro también >:c`;
    } 
    else{
      document.getElementById("r40").innerHTML = `Qué ejercicio tan rarito e,e... Pero okay, humano. ¡Aquí vamos! >:c<br>${rest}`;
    }
  } 
}

// 41. Leer dos números enteros y determinar si la diferencia entre los dos es un número primo.
function result41(){
  
  //variables de inputs
  var n41 = document.getElementById("input41").value;
  var n41b = document.getElementById("input41b").value;

  //Variable para diferir ambas variables
  var rest = Math.abs(n41-n41b);
  var uno = (rest==1)?  `1 unidad`:`${rest} unidades`;

    //ALGORITHM FOR PRIME NUMBERS >:c
  var box = [];
  var primes = ``;

  for (let numbers = 2; numbers <= rest; numbers++) {
      const prime = rest%numbers;
      if (prime == 0) {
        box.push(numbers);  
      }
    }
    
  var primes = (box.length == 1)? `es, asombrosamente, primo UwU`:`no es primo :c`;

  //CON ESTE HERMOSO ALGORITMO QUE CREÉ PARA PRIMOS LOS EJERCICIOS SE FACILITAN MÁS :D
  var result = `A ${n41} y ${n41b} los diferencian ${uno}<br>Ese número de unidades (${rest}) ${primes}`;
  
  if ((n41 == 0 && n41b == 0)) {
    document.getElementById("r41").innerHTML = ``;
  }
  else if((n41 == "-" && n41b == "-")){
    document.getElementById("r41").innerHTML = ``; 
  }
  else {
    if (n41 == `` || n41b == ``) {                                                                       //PARA EJERCICIOS CON MÚLTIPLES VARIABLES 
      document.getElementById("r41").innerHTML = `Okay, un ${n41}${n41b}. Pero ponme un número en el otro cuadro también >:c`;
    } 
    else{
      document.getElementById("r41").innerHTML = `¿Otra vez esta clase de ejercicio? >:v ...Okay, humano. ¡Aquí vamos! >:c<br>${result}`;
    }
  } 
}

// 42. Leer dos números enteros y determinar si la diferencia entre los dos es un número par.
function result42(){
  
  //variables de inputs
  var n42 = document.getElementById("input42").value;
  var n42b = document.getElementById("input42b").value;

  //Variable para diferir ambas variables
  var rest = Math.abs(n42-n42b);
  var uno = (rest==1)?  `1 unidad`:`${rest} unidades`;
  
  //RESULTADO PARA DEFINIR SI ES PAR O NO, PAPI
  var result = ((rest%2)==0)? `A ${n42} y ${n42b} los diferencian ${uno}<br>ESE NÚMERO DE UNIDADES (${rest}) ES PAR UwU`:`A ${n42} y ${n42b} los diferencian ${uno}<br>Ese número de unidades (${rest}) no es par :C`;
  


  if ((n42 == 0 && n42b == 0)) {
    document.getElementById("r42").innerHTML = ``;
  }
  else if((n42 == "-" && n42b == "-")){
    document.getElementById("r42").innerHTML = ``; 
  }
  else {
    if (n42 == `` || n42b == ``) {                                                                  //PARA EJERCICIOS CON MÚLTIPLES VARIABLES 
      document.getElementById("r42").innerHTML = `Okay, un ${n42}${n42b}. Pero ponme un número en el otro cuadro también >:c`;
    } 
    else{
      document.getElementById("r42").innerHTML = `Bueh... Ya me estoy acostumbrado a estos ejercicios xd...<br>Okay, humano. ¡Aquí vamos! >:c<br>${result}`;
    }
  } 
}

// 43. Leer dos números enteros y determinar si la diferencia entre los dos es un número divisor exacto de alguno de los dos números.
function result43(){
  
  //variables de inputs
  var n43 = document.getElementById("input43").value;
  var aux = Number.parseInt(n43);
  var n43b = document.getElementById("input43b").value;
  var auxb = Number.parseInt(n43b);

  //Variable para diferir ambas variables
  var rest = Math.abs(n43-n43b);
  var uno = (rest==1)?  `1 unidad`:`${rest} unidades`;

  //Filtros
  var nums = [n43,n43b];
  var zeros = nums.filter(x=>x%rest==0);
  var left = ((aux%rest)==0)? `Si divides a ${n43} por ${rest}, te dará... ${aux/rest} CON ${aux%rest} RESIDUO :D`:``; 
  var right = ((auxb%rest)==0)? `Si divides a ${n43b} por ${rest}, te dará... ${auxb/rest} CON ${auxb%rest} RESIDUO :D`:``;

  //RESULTADO PARA DEFINIR SI %=0 O NO, PAPI
  var result = (zeros.length>=1)? `A ${n43} y ${n43b} los diferencian ${uno}<br>${left}<br>${right}`:`A ${n43} y ${n43b} los diferencian ${uno}<br>Pero si divides a cualquiera de los dos números por ${rest}, no obtendrás una división exacta :c`;
  


  if ((n43 == 0 && n43b == 0)) {
    document.getElementById("r43").innerHTML = ``;
  }
  else if((n43 == "-" && n43b == "-")){
    document.getElementById("r43").innerHTML = ``; 
  }
  else {
    if (n43 == `` || n43b == ``) {                                                                //PARA EJERCICIOS CON MÚLTIPLES VARIABLES 
      document.getElementById("r43").innerHTML = `Okay, un ${n43}${n43b}. Pero ponme un número en el otro cuadro también >:c`;
    } 
    else{
      document.getElementById("r43").innerHTML = `Bueh... Ya me estoy acostumbrado a estos ejercicios xd...<br>Okay, humano. ¡Aquí vamos! >:c<br>${result}`;
    }
  } 
}

// 44. Leer un número entero de 4 dígitos y determinar si el primer dígito es múltiplo de alguno de los otros dígitos.
function result44(){
  
    //Variables
    var n44 = document.getElementById("input44").value;
    var aux = Math.abs(n44);
    var arr = Array.from(String(aux),Number);

    //Cantidad de dígitos
    var length = (n44<0)? n44.length-1:n44.length;
    var len = (length==1)? `${n44} tiene solo 1 dígito y no 2:c`:`${n44} tiene ${length} dígitos`;
  
  //En este caso, solution es un filtro del primer número y for el lector del resto de dígitos
    var solution = arr[0]; 
    var box = [];

    for (let i = 1; i < arr.length; i++) {
      const miau = (solution%arr[i]);
      if (miau == 0) {
        box.push(arr[i]);
      };
    };

  //sort organizará nuestro arreglo, mostrando la informacion de manera clara al usuario  
    var sort = box.sort().filter((value,index,array)=>(array.indexOf(value)==index));
  //Personalización del problema (singulares o plurales)
    var xd = (sort.length>=1)? `Tiene de primer número al ${solution}, el cual, curiosamente... <br> ¡ES MÚLTIPLO DEL ${box}! :D UwU`:`Comienza con el número ${solution}, el cual,<br>lamentablemente, no es múltiplo de ninguno de los otros números :c`;


    //COMENZAMOS    
    if((n44 == 0)){
      document.getElementById("r44").innerHTML = ``;
    }
    else if((n44 == "-")){
      document.getElementById("r44").innerHTML = ``; 
    }
    else{
      switch (length) {

        case 1:
          document.getElementById("r44").innerHTML = `${len} aunque podemos decir...<br>Que es múltiplo de si mismo xd ¡Ponme más números!`; 
          break;
           
        case 4:
          document.getElementById("r44").innerHTML = `${len} :D ${xd}`; 
          break;
            
        default:  
          document.getElementById("r44").innerHTML = `${len} y no 4 :c pero que igual te lo calculo :D <br> ${xd}`; 
          break;
      }
    }
}

// 45. Leer un número entero de 2 dígitos y si es par mostrar en pantalla la suma de sus dígitos, si es primo y menor que 10 mostrar en pantalla su último dígito y si es múltiplo de 5 y menor que 30 mostrar en pantalla el primer dígito.
function result45(){
  
  //Variables
  var n45 = document.getElementById("input45").value;
  var aux = Math.abs(n45);
  var arr = Array.from(String(aux),Number);

  //Cantidad de dígitos
  var length = (n45<0)? n45.length-1:n45.length;
  var len = (length==1)? `${n45} tiene solo 1 dígito y no 2 :c`:`${n45} tiene ${length} dígitos`;

  //3 FILTROS: 

  //1- SI ES PAR, SUMAR SUS DÍGITOS
  var summString = arr.join('+'); 
  var summResult = 0;

  for (let i = 0; i < arr.length; i++) {
  summResult += arr[i];  
  }

  var pair = ((n45%2)==0)? `El número ${n45} es par :D así que te sumo sus dígitos:<br>${summString} te dará: ${summResult} UwU`:`El número ${n45} no es par, así que...Me salvé de contar xd`;

  //2- PRIMO MENOR QUE 10 (2,3,5,7) (ÚLTIMO DÍGITO)
    //ALGORITHM FOR PRIME NUMBERS >:c
  var box = [];
  var primes = ``;

  for (let numbers = 2; numbers <= aux; numbers++) {
      const prime = n45%numbers;
      if (prime == 0) {
        box.push(numbers);  
      }
    }
    
  var primes = (box.length == 1 && n45>0)? `El ${n45} es primo UwU`:`El ${n45} no es primo :c`;
  var pero = (((box.length==1)&&(n45<10&&n45>0))||((box.length!=1)&&(n45>10&&n45>0)))? `y`:`pero`;
  var lessThan10 = (n45<10)? `es menor a 10 :D`:`es mayor que 10 :c ...`;
  var lastDigit = arr[(arr.length-1)];
  var showLast = ((box.length==1)&&(n45<10))? `Así que puedo mostrarte al ${lastDigit}, el último dígito del número UwU`:`No cumple ambas condiciones, así que no puedo mostrarte el ${lastDigit} :c xd`;


  //3- MÚLTIPLO DE 5 Y MENOR QUE 30 (PRIMER DÍGITO)
  var firstDigit = arr[0];
  var mult5 = ((n45%5)==0)? `El ${n45} es múltiplo de 5 :D`:`El ${n45} no es múltiplo de 5 :C`;
  var peroo = ((n45<30)&&((n45%5)==0)||((n45>30)&&((n45%5)!=0)))? `y`:`pero`;
  var lessThan30 = (n45<30)? `${n45} es menor a 30 :D`:`${n45} es mayor que 30 :C`;
  var showFirst = (((n45%5)==0)&&(n45<30))? `Así que puedo mostrarte el primer dígito del número que es ${firstDigit} UwUUUuwuwuwWuU`:`No cumple ambas condiciones, así que no puedo mostrarte al ${firstDigit} :c xdd`;

  //Personalización del problema
  var xd = `Tenemos 3 condiciones: <br> 1- Si es par, te sumo los números: <br> ${pair} <br> 2- Si es primo y menor que 10, te muestro su último dígito: <br> ${primes} ${pero} ${lessThan10}<br>${showLast}<br>3- Si es múltiplo de 5 y menor que 30, mostrar el primer dígito, así que...<br>${mult5} ${peroo} ${lessThan30}<br>${showFirst}`;


  //COMENZAMOS    
  if((n45 == 0)){
    document.getElementById("r45").innerHTML = ``;
  }
  else if((n45 == "-")){
    document.getElementById("r45").innerHTML = ``; 
  }
  else{
    switch (length) {
      case 2:
        document.getElementById("r45").innerHTML = `${len}... ¡Como pide el ejercicio! :D Y bueno...<br>Hagamos esto juntos, humano, porque yo sé que el ejercicio está complejo hasta para ti xd<br> ${xd}<br> Fin xd.`; 
        break;
          
      default:  
        document.getElementById("r45").innerHTML = `${len} pero que igual te lo calculo :D <br> Hagamos esto juntos, humano, porque yo sé que el ejercicio está complejo hasta para ti xd <br>${xd}<br> Fin xd.`; 
        break;
    }
  }
}

// 46. Leer un número entero de 2 dígitos y si termina en 1 mostrar en pantalla su primer dígito, si termina en 2 mostrar en pantalla la suma de sus dígitos y si termina en 3 mostrar en pantalla el producto de sus dos dígitos.
function result46(){
  
  //Variables
  var n46 = document.getElementById("input46").value;
  var aux = Math.abs(n46);
  var arr = Array.from(String(aux),Number);

  //Cantidad de dígitos
  var length = (n46<0)? n46.length-1:n46.length;
  var len = (length==1)? `${n46} tiene solo 1 dígito y no 2 :c`:`${n46} tiene ${length} dígitos`;

  //3 FILTROS CORRELATADOS AL ÚLTIMO DÍGITO: 
  var lastDigit = arr[(arr.length-1)];
  
  //1- SI TERMINA EN 1, MOSTRAR EL PRIMER DÍGITO
  var firstDigit = arr[0];
  var showFirst = (lastDigit==1)? `${n46} termina en ${lastDigit} así que puedo mostrarte el primer dígito del número que es ${firstDigit} UwUUUuwuwuwWuU`:`${n46} no termina en 1 sino en ${lastDigit} así que no puedo mostrarte al ${firstDigit} :c xdd`;
  
  //2- SI TERMINA EN 2, SUMAR DÍGITOS
  var summString = arr.join('+'); 
  var summResult = 0;

  for (let i = 0; i < arr.length; i++) {
  summResult += arr[i];  
  }

  var summ = (lastDigit == 2)? `El número ${n46} termina en ${lastDigit} :D así que te sumo sus dígitos:<br>${summString} te dará: ${summResult} UwU`:`El número ${n46} no termina en 2 sino en ${lastDigit}, así que...Me salvé de contar xd`;


  //3- SI TERMINA EN 3, MULTIPLICAR EL PRIMER Y SEGUNDO DÍGITO
  var mult = (arr[0]*arr[1]);
  var product = (lastDigit == 3)? `${n46} termina en ${lastDigit} UwU y el producto de sus dos primeros dígitos da ${mult} UWwuWUwuUWuwuUuU`:`${n46} termina en ${lastDigit} y no en 3, así que F xd no te multiplicaré na'ah >:v`; 

  //Personalización del problema
  var xd = `Tenemos 3 condiciones: <br> 1- Si termina en 1, te muestro el primer dígito: <br> ${showFirst} <br> 2- Si termina en 2, te muestro la suma de sus números: <br> ${summ} <br> 3- Si termina en 3, mostrar el producto de sus primeros dos dígitos, así que...<br>${product}`;


  //COMENZAMOS    
  if((n46 == 0)){
    document.getElementById("r46").innerHTML = ``;
  }
  else if((n46 == "-")){
    document.getElementById("r46").innerHTML = ``; 
  }
  else{
    switch (length) {
      case 2:
        document.getElementById("r46").innerHTML = `${len}... ¡Como pide el ejercicio! :D Y bueno...<br>Esto es el mismo ejercicio que el anterior (de 3 condiciones simultáneas sobre un número) pero más simplecito xd<br>LETS GOOOOO<br> ${xd}<br> Fin xd.`; 
        break;
          
      default:  
        document.getElementById("r46").innerHTML = `${len} pero que igual te lo calculo :D <br> Esto es el mismo ejercicio que el anterior (de 3 condiciones simultáneas sobre un número) pero más simplecito xd <br> LETS GOOOOO <br>${xd}<br> Fin xd.`; 
        break;
    }
  }
}

// 47. Leer dos números enteros y si la diferencia entre los dos números es par mostrar en pantalla la suma de los dígitos de los números, si dicha diferencia es un número primo menor que 10 entonces mostrar en pantalla el producto de los dos números y si la diferencia entre ellos termina en 4 mostrar en pantalla todos los dígitos por separado.
function result47(){
  var n47 = document.getElementById("input47").value;
  var n47b = document.getElementById("input47b").value;

  //3 CASOS BASADOS EN LA DIFERENCIA ENTRE LAS DOS VARIABLES
  var diff = Math.abs(n47-n47b);

  //VARIABLES NECESARIAS PARA EL ALGORTIMO
  var aux = Math.abs(n47);
  var auxb = Math.abs(n47b);
  var arr = Array.from(String(aux),Number);
  var arrb = Array.from(String(auxb),Number);
  var twoNums = arr.concat(arrb);     

  //1- diff es par > mostrar suma de los dígitos de los dos num
  var summString = twoNums.join('+'); 
  var summResult = 0;

  for (let i = 0; i < twoNums.length; i++) {
  summResult += twoNums[i];  
  }

  var summ = ((diff%2)==0)? `El número ${diff} ES PAR :D así que te sumo los dígitos de los dos números que me diste:<br>${summString} te dará: ${summResult} UwU`:`El número ${n47} no es par :C, así que...Me salvé de contar xd`;


  //2- diff es primo menor a 10 > mostrar producto de los dos números
    //ALGORITHM FOR PRIME NUMBERS >:c
  var box = [];
  var primes = ``;

  for (let numbers = 2; numbers <= diff; numbers++) {
      const prime = diff%numbers;
      if (prime == 0) {
        box.push(numbers);  
      }
    }
    
  var primes = (box.length == 1)? `${diff} es primo UwU`:`${diff} no es primo :c`;
  var minus10 = (diff<10)? `es menor a 10 :D`:`es mayor a 10 :cc`;
  var pero = (((box.length==1)&&(diff<10))||((box.length!=1)&&(diff>10)))? `y`:`pero`;

    //ALGORITHM FOR MULTIPLY
  var multiply = ((box.length==1)&&(diff<10))? `Así que puedo multiplicarte a ${n47}*${n47b} que te dará = ${(n47*n47b)} UwU`:` El número no cumple con las dos condiciones...<br>Así que no tengo permitido multiplicarte a ${n47} y ${n47b}...Lo siento, humano :c`;

  //3- diff termina en 4 > mostrar todos los dígitos por separado
  var diffArray = Array.from(String(diff),Number);
  var lastDigit = diffArray[(diffArray.length)-1];

  var allNums = (lastDigit == 4)? `El número de unidades que diferencia al ${n47} y al ${n47b} es ${diff}, el cual termina en 4 :D <br> Así que aquí tienes todos los dígitos de los dos números ingresados por ti UwU <br> ${twoNums}`:`El número de unidades que diferencia al ${n47} y al ${n47b} es ${diff} y no termina en 4 :c <br> ¡NO HAY DÍGITOS ARREGLADOS PARA TI! >:c `;

  //PERSONALIZACIÓN DEL EJERCICIO 
  var xd = `CASO 1: Si la diferencia es par, mostrar la suma de todos los dígitos de los dos números dados por el humano <br> ${summ} <br> CASO 2: Si la diferencia es un número primo menor a 10, multiplicar los dos números dados por el humano <br> ${primes} ${pero} ${minus10} ${multiply} <br> CASO 3: Si la diferencia termina en 4, mostrar todos los dígitos de las dos variables pero separados, pues... <br> ${allNums}`;

  //& LET'S GOOOOOOOOOOOOOOOOOOOOO
  
  if ((n47 == 0 && n47b == 0)) {
    document.getElementById("r47").innerHTML = ``;
  }
  else if((n47 == "-" && n47b == "-")){
    document.getElementById("r47").innerHTML = ``; 
  }
  else {
    if (n47 == `` || n47b == ``) {                                                              //PARA EJERCICIOS CON MÚLTIPLES VARIABLES 
      document.getElementById("r47").innerHTML = `Okay, un ${n47}${n47b}. Pero ponme un número en el otro cuadro también >:c`;
    } 
    else{
      document.getElementById("r47").innerHTML = `Tenemos ahora 3 casos diferentes basados en el número ${diff} que son las unidades que diferencian a ${n47} y ${n47b} <br> LET'S GOOOOOO<br>${xd} Y LISTOOOO, izi xd.`;
    }
  }  
}

// 48. Leer un número entero y si es menor que 100 determinar si es primo.
function result48(){
  
  //Variables
  var n48 = document.getElementById("input48").value;
  var aux = Math.abs(n48);

  //¿ES MENOR QUE 100?
  var filter100 = (n48<=100)? true:false;

  //¿ES PRIMO?
    //ALGORITHM FOR PRIME NUMBERS >:c
  var box = [];
  var primes = ``;
  
  for (let numbers = 1; numbers <= aux; numbers++) {
    const prime = aux%numbers;
    if (prime == 0) {
      box.push(numbers);  
    }
  };

  var fixBox = box.filter((value,index,array)=>array.indexOf(value)===index);
  
  var primes = (box.length == 2)? `es primo UwU ya que sólo puede ser dividido de manera exacta por el 1 y por si mismo (${fixBox}) c: awiwii`:`no es primo :c ya que es divisible de manera exacta por todos estos números: ${fixBox} <br> ¡Prueba otro número, humano! :c`;
  var ngtv = (n48<0)? `es negativo, así que hasta aquí llegamos, humano... <br> Porque los números primos no pueden ser negativos :c`:primes;

  //Personalización del problema
  var xd = `El ${n48} ${ngtv}`;


  //COMENZAMOS    
  if((n48 == 0)){
    document.getElementById("r48").innerHTML = ``;
  }
  else if((n48 == "-")){
    document.getElementById("r48").innerHTML = ``; 
  }
  else{
    switch (filter100) {
      case true:
        document.getElementById("r48").innerHTML = `¡${n48} ES MENOR A 100 COMO PIDE EL EJERCICIO! :D COMENCEMOS<br>${xd}`; 
        break;
          
      default:  
        document.getElementById("r48").innerHTML = `${n48} es mayor a 100 :c ...Pero que no importa, que igual te lo calculo todo :D LET'S GOOOOO <br>${xd}`; 
        break;
    }
  }
}

// 49. Leer un número entero y si es múltiplo de 4 determinar si su último dígito es primo.
function result49(){
  
  //Variables
  var n49 = document.getElementById("input49").value;
  var aux = Math.abs(n49);
  var arr = Array.from(String(aux),Number);
  

  //SI ES PRIMO
  //ALGORITHM FOR PRIME NUMBERS >:c
  var lastDigit = arr[(arr.length-1)];
  var box = [];
  var primes = ``;

  for (let numbers = 2; numbers <= lastDigit; numbers++) {
      const prime = lastDigit%numbers;
      if (prime == 0) {
        box.push(numbers);  
      }
  }
    
  var primes = (box.length == 1)? `Y además...Su último dígito (${lastDigit}) es primo UwU`:`Lamentablemente, su último dígito (${lastDigit}) no es primo :c`;


  //SI ES MÚLTIPLO DE OTRA COSA
  //ALGORITHM FOR PRIME NUMBERS >:c
  var boxx = [];
  var primess = ``;
  
  for (let n = 1; n <= aux; n++) {
    const prime = aux%n;
      if (prime == 0) {
          boxx.push(n);  
      }
  }
  
  var boxxSort = boxx.filter((value,index,array)=>array.indexOf(value)===index);

  var primess = (boxx.length == 2)? `sólo es múltiplo de ${boxxSort}...<br>Por lo que es un número primo UwU <br> ${primes}`:`es múltiplo de ${boxxSort} y por cierto, no es un número primo...<br> ${primes} <br> ¡Prueba con otro número, humano!`;

  

  //SI ES MÚLTIPLO DE 4
  var veces = (n49==4)? `vez`:`veces`;

  var mult4 = ((n49%4)==0)? `El ${n49} es múltiplo del 4, ya que si multiplicas 4 * ${(n49/4)} ${veces}, te dará ${n49} :D <br> ${primes} `:`El ${n49} no es múltiplo del 4 :c ...En realidad, <br> ${primess} <br>`;




  //Personalización del problema
  var xd = `${mult4}`;


  //COMENZAMOS    
  if((n49 == 0)){
    document.getElementById("r49").innerHTML = ``;
  }
  else if((n49 == "-")){
    document.getElementById("r49").innerHTML = ``; 
  }
  else{
    document.getElementById("r49").innerHTML = `${xd}`;
  }
}

// 50. Leer un número entero y si es múltiplo de 4 mostrar en pantalla su mitad, si es múltiplo de 5 mostrar en pantalla su cuadrado y si es múltiplo de 6 mostrar en pantalla su primer dígito. Asumir que el número no es mayor que 100.
function result50(){
  
  //Variables
  var n50 = document.getElementById("input50").value;
  var aux = Math.abs(n50);
  var arr = Array.from(String(aux), Number);
  

//3 FILTROS A MÚLTIPLOS DEL NÚMERO (& AL VALOR DE n50<100): 
  var filter100 = (n50<=100)? true:false;
  var veces = ((n50==4)||(n50==5)||(n50==6))? `vez`:`veces`;

  //1- SI ES MÚLTIPLO DE 4, MOSTRAR SU MITAD
  var mult4 = ((n50%4)==0)? `El ${n50} es múltiplo del 4, ya que si multiplicas 4 * ${(n50/4)} ${veces}, te dará ${n50} :D <br> La mitad de ${n50} es ${n50} / 2 = ${n50/2} UwU <br> Fin. xd`:``;

  
  //2- SI ES MÚLTIPLO DE 5, MOSTRAR SU CUADRADO
  var mult5 = ((n50%5)==0)? `El ${n50} es múltiplo del 5, ya que si multiplicas 5 * ${(n50/5)} ${veces}, te dará ${n50} :D <br> El cuadrado de ${n50} es ${n50} * ${n50} = ${n50*n50} UwU <br> Fin. xd`:``;
  
  
  //3- SI ES MÚLTIPLO DE 6, MOSTRAR SU PRIMER DÍGITO
  var mult6 = ((n50%6)==0)? `El ${n50} es múltiplo del 6, ya que si multiplicas 6 * ${(n50/6)} ${veces}, te dará ${n50} :D <br> El primer dígito del ${n50} es claramente el ${arr[0]}, como tú mismo puedes ver, humano UwU <br> Fin. xd`:``;


  //POR SI EL NÚMERO NO CUMPLE CON NINGUNA DE LAS TRES CONDICIONES
  //ALGORITHM FOR PRIME NUMBERS >:c
  var box = [];
  var primes = ``;
  
  for (let numbers = 1; numbers <= aux; numbers++) {
    const prime = aux%numbers;
      if (prime == 0) {
          box.push(numbers);  
      }
  }
  
  var boxSort = box.filter((value,index,array)=>array.indexOf(value)===index);

  var primes = (box.length == 2)? `sólo es múltiplo de ${boxSort}...Por lo que es un número primo UwU`:`es múltiplo de ${boxSort} UwU ¡Prueba con otro número, humano!`;

  var alv = (((n50%4)!=0)&&((n50%5)!=0)&&((n50%6)!=0))? `El ${n50} no es múltiplo ni de 4, ni de 5, ni de 6... <br> De hecho, ${primes}`:``;



  //Personalización del problema
  var xd = `${mult4} ${mult5} ${mult6} ${alv}`;


  //COMENZAMOS    
  if((n50 == 0)){
    document.getElementById("r50").innerHTML = ``;
  }
  else if((n50 == "-")){
    document.getElementById("r50").innerHTML = ``; 
  }
  else{
    switch (filter100) {
      case true:
        document.getElementById("r50").innerHTML = `¡${n50} ES MENOR A 100 COMO PIDE EL EJERCICIO! :D COMENCEMOS<br>${xd}`; 
        break;
          
      default:  
        document.getElementById("r50").innerHTML = `${n50} es mayor a 100 :c ...Pero que no importa, que igual te lo calculo todo :D LET'S GOOOOO <br>${xd}`; 
        break;
    }
  }
}

// 50 algoritmos reales de ciclos

x = 0
a = 0
b = 0
c = 0
d = 0

// 1. Leer un número entero y mostrar todos los enteros comprendidos entre 1 y el número leído.
function cycle01(){
  var c01 = document.getElementById("cycle01").value;
  var aux = Number.parseInt(c01);
  var text = ``;

  if (c01 == ``) {
    document.getElementById("c01").innerHTML = ``;
  }
  else if (c01 == "-") {
    document.getElementById("c01").innerHTML = ``;
  }
  else {
    if (c01 <= 0) {
      for (let i = aux; i <= 1; i++) {
        text += `${i} `;
        document.getElementById("c01").innerHTML = `${text}   UwU`;
      }
    }
    else {
      for (let i = 1; i <= aux; i++) {
        text += `${i} `;
        document.getElementById("c01").innerHTML = `${text}   UwU`;
      }
    }
  }
}

// 2. Leer un número entero y mostrar todos los pares comprendidos entre 1 y el número leído.
function cycle02(){
  var c02 = document.getElementById("cycle02").value;
  var aux = Number.parseInt(c02);
  var text = ``;

  var max = Math.max(1,aux);
  var min = Math.min(1,aux);

  for (let index = min; index <= max; index++) {
    if ((index%2)==0 && index!=0){
      text += `${index} `;
    }
  }

  if (c02 == ``) {        
    document.getElementById("c02").innerHTML = ``;
  }
  else if (c02 == "-") {
    document.getElementById("c02").innerHTML = ``;
  }
  else {
    document.getElementById("c02").innerHTML = `${text} UwU`;
  }
}

// 3. Leer un número entero y mostrar todos los divisores exactos del número comprendidos entre 1 y el número leído.
function cycle03(){
  var c03 = document.getElementById("cycle03").value;
  var aux = Number.parseInt(c03);
  var text = ``;

  if (c03 == ``) {
    document.getElementById("c03").innerHTML = ``;
  }
  else if (c03 == "-") {
    document.getElementById("c03").innerHTML = ``;
  }
  else {
    if (c03 <= 0) {
      for (let i = aux; i <= 1; i++) {
        if ((c03%i)==0){
          text += `${i} `;
          document.getElementById("c03").innerHTML = `${text}   UwU`;
        }
      }
    }
    else {
      for (let i = 1; i <= aux; i++) {
        if ((c03%i)==0){
          text += `${i} `;
          document.getElementById("c03").innerHTML = `${text}   UwU`;
        }
      }
    }
  }
}

// 4. Leer dos números y mostrar todos los enteros comprendidos entre ellos.
function cycle04(){
  var c04 = document.getElementById("cycle04").value;
  var c04b = document.getElementById("cycle04b").value;
  var aux = Number.parseInt(c04);
  var auxb = Number.parseInt(c04b);
  var text = ``;
  var min = Math.min(aux,auxb);
  var max = Math.max(aux,auxb);

  if ((c04 == `` && c04b == ``) || (c04 == "-" && c04b == "-")) {
    document.getElementById("c04").innerHTML = ``;
  }
  else if (c04 == `` || c04b == ``) {
    document.getElementById("c04").innerHTML = `Bueno, un ${c04}${c04b}... Y la otra casilla qué >:c`;
  }
  else {
    for (let i = min; i <= max; i++) {
      text += `${i} `;
      document.getElementById("c04").innerHTML = `${text} UwU`;
    }
  }
}

// 5. Leer dos números y mostrar todos los números terminados en 4 comprendidos entre ellos.
function cycle05(){
    var c05 = document.getElementById("cycle05").value;
    var c05b = document.getElementById("cycle05b").value;
    var aux = Number.parseInt(c05);
    var auxb = Number.parseInt(c05b);
    var text = ``;
    var min = Math.min(aux,auxb);
    var max = Math.max(aux,auxb);

    for (let i = min; i <= max; i++) {
      if ((i%10)==4||(i%10)==-4){
        text += `${i} `;
      }
    };
  
    if ((c05 == `` && c05b == ``) || (c05 == "-" && c05b == "-")) {
      document.getElementById("c05").innerHTML = ``;
    }
    else if (c05 == `` || c05b == ``) {
      document.getElementById("c05").innerHTML = `Bueno, un ${c05}${c05b}... Y la otra casilla qué >:c`;
    }
    else {
      if (text==``) {
        document.getElementById("c05").innerHTML = `Ninguno de los números enteros entre el ${c05} y el ${c05b} terminan en 4 :C `;
      } 
      else {
        document.getElementById("c05").innerHTML = `${text} UwU`;
      }
    }
}

// 6. Leer un número entero de tres dígitos y mostrar todos los enteros comprendidos entre 1 y cada uno de los dígitos.
function cycle06(){
  
    //VARIABLES BÁSICAS PARA EL CICLO
    var c06 = document.getElementById("cycle06").value;
    var aux = Math.abs(c06);
    var array = Array.from(String(aux),Number);
    var text = ``;
    
  
    //VARIABLES MAX Y MIN PARA UN for
    var max = '';
    var min = '';
  
    for (let index = 0; index <= array.length; index++) { //UNA TRAMPITA QUE SE ME OCURRIÓ PARA DIFERENCIAR POSITIVOS Y NEGATIVOS xd   
      if (c06<0) {
        max = Math.max(1,-(array[index]));
        min = Math.min(1,-(array[index]));
      }
      else{
        max = Math.max(1,(array[index]));
        min = Math.min(1,(array[index]));
      }
      for (let i = min; i <= max; i++) {
        text += `${i} `;
      }
      text += `<br>`;
    };

    //LETS GO 
    if (c06 == `` || c06 == "-") {
      document.getElementById("c06").innerHTML = ``;
    }
    else {
      switch (array.length) {
        case 1:
          document.getElementById("c06").innerHTML = `¿Solo 1 dígito? Pon los dígitos que quieras UwU <br> ${text} `;
          break;
          
          case 3:
          document.getElementById("c06").innerHTML = `UwU <br> ${text} `;
          break;  
          
          default:
          document.getElementById("c06").innerHTML = `El ejercicio pide 3 dígitos y no ${array.length}, pero que da igual UwU <br> Te lo ejecuto de todas formas: <br> ${text} `;
          break;
      }
    }
}


// 7. Mostrar en pantalla todos los enteros comprendidos entre 1 y 100.
//FUNCIONES PARA LOS BOTONES
var button07 = document.getElementById("cycle07");
function onMouseOverLight07(){
  button07.style.border="3px solid #ffaa22";
  button07.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
};
function onMouseOutLight07(){
  button07.style.border='3px solid #f7b64e';
  button07.style.color='#333333';
  button07.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function onMouseOverDark07(){
  button07.style.border="3px solid #ffaa22";
  button07.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function onMouseOutDark07(){
  button07.style.border = '3px solid #ffaa22';
  button07.style.color = 'rgb(31, 11, 11)';
  button07.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};
function onMouseDownDark07(){
  button07.style.border="1px solid #ffaa22";
  button07.style.background ="linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)";
  button07.style.color="rgb(31, 11, 11)";
	button07.style.top="1px";
};
function onMouseDownLight07(){
  button07.style.border="1px solid #ffa22";
  button07.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  button07.style.top="1px";
};

function buttonc07(){
  //SWITCH
  document.getElementById("c07").innerHTML = ``;
  button07.onclick = function () {cycle07()};
  //OH, STYLO
  button07.innerHTML = `LET'S GOOO >:C`;
  button07.onmouseover = function (){onMouseOverLight07()};
  button07.onmouseout = function (){onMouseOutLight07()};
  button07.onmousedown = function (){onMouseDownDark07()};
}

function cycle07() {
  
  //SOLUTION
  var count07 = ``;

    for (let index = 1; index <= 100; index++) {
      count07 += `${index} `;
      document.getElementById("c07").innerHTML = `${count07} UwU`;
    }
    
    //SWITCH
    button07.onclick = function () {buttonc07()};
    //OH, STYLO
    button07.innerHTML = `UwU`;
    button07.onmouseover = function (){onMouseOverDark07()};
    button07.onmouseout = function (){onMouseOutDark07()};
    button07.onmousedown = function (){onMouseDownLight07()};
}

// 8. Mostrar en pantalla todos los pares comprendidos entre 20 y 200.
//FUNCIONES PARA LOS BOTONES
var button08 = document.getElementById("cycle08");
function onMouseOverLight08(){
  button08.style.border="3px solid #ffaa22";
  button08.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
};
function onMouseOutLight08(){
  button08.style.border='3px solid #f7b64e';
  button08.style.color='#333333';
  button08.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function onMouseOverDark08(){
  button08.style.border="3px solid #ffaa22";
  button08.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function onMouseOutDark08(){
  button08.style.border = '3px solid #ffaa22';
  button08.style.color = 'rgb(31, 11, 11)';
  button08.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};
function onMouseDownDark08(){
  button08.style.border="1px solid #ffaa22";
  button08.style.background ="linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)";
  button08.style.color="rgb(31, 11, 11)";
	button08.style.top="1px";
};
function onMouseDownLight08(){
  button08.style.border="1px solid #ffa22";
  button08.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  button07.style.top="1px";
};

function buttonc08(){
  //SWITCH
  document.getElementById("c08").innerHTML = ``;
  button08.onclick = function () {cycle08()};
  //OH, STYLO
  button08.innerHTML = `LET'S GOOO >:C`;
  button08.onmouseover = function (){onMouseOverLight08()};
  button08.onmouseout = function (){onMouseOutLight08()};
  button08.onmousedown = function (){onMouseDownDark08()};
}

function cycle08() {
  
  //SOLUTION
  var count08 = ``;

    for (let index = 20; index <= 200; index=index+2) {
      count08 += `${index} `;
      document.getElementById("c08").innerHTML = `${count08} UwU`;
    }
    
    //SWITCH
    button08.onclick = function () {buttonc08()};
    //OH, STYLO
    button08.innerHTML = `UwU`;
    button08.onmouseover = function (){onMouseOverDark08()};
    button08.onmouseout = function (){onMouseOutDark08()};
    button08.onmousedown = function (){onMouseDownLight08()};
}

// 9. Mostrar en pantalla todos los números terminados en 6 comprendidos entre 25 y 205.
//FUNCIONES PARA LOS BOTONES
var button09 = document.getElementById("cycle09");
function onMouseOverLight09(){
  button09.style.border="3px solid #ffaa22";
  button09.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
};
function onMouseOutLight09(){
  button09.style.border='3px solid #f7b64e';
  button09.style.color='#333333';
  button09.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function onMouseOverDark09(){
  button09.style.border="3px solid #ffaa22";
  button09.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function onMouseOutDark09(){
  button09.style.border = '3px solid #ffaa22';
  button09.style.color = 'rgb(31, 11, 11)';
  button09.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};
function onMouseDownDark09(){
  button09.style.border="1px solid #ffaa22";
  button09.style.background ="linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)";
  button09.style.color="rgb(31, 11, 11)";
	button09.style.top="1px";
};
function onMouseDownLight09(){
  button09.style.border="1px solid #ffa22";
  button09.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  button07.style.top="1px";
};

function buttonc09(){
  //SWITCH
  document.getElementById("c09").innerHTML = ``;
  button09.onclick = function () {cycle09()};
  //OH, STYLO
  button09.innerHTML = `LET'S GOOO >:C`;
  button09.onmouseover = function (){onMouseOverLight09()};
  button09.onmouseout = function (){onMouseOutLight09()};
  button09.onmousedown = function (){onMouseDownDark09()};
}

function cycle09() {
  
  //SOLUTION
  var count09 = ``;

    for (let index = 25; index <= 205; index++) {
      if ((index%10)==6){
        count09 += `${index} `;
      }
      document.getElementById("c09").innerHTML = `${count09} UwU`;
    }
    
    //SWITCH
    button09.onclick = function () {buttonc09()};
    //OH, STYLO
    button09.innerHTML = `UwU`;
    button09.onmouseover = function (){onMouseOverDark09()};
    button09.onmouseout = function (){onMouseOutDark09()};
    button09.onmousedown = function (){onMouseDownLight09()};
}

// 10. Leer un número entero y determinar a cuánto es igual la suma de todos los enteros comprendidos entre 1 y el número leído.
function cycle10(){
  
  //VARIABLES BÁSICAS PARA EL CICLO
  var c10 = document.getElementById("cycle10").value;
  var aux = Number.parseInt(c10);
  var text = ``;
  var summ = 0;
  var cont = 0;

  //VARIABLES MAX Y MIN PARA UN for
  var max = Math.max(aux,1);
  var min = Math.min(aux,1);

  if (c10 == `` || c10 == "-") {
    document.getElementById("c10").innerHTML = ``;
  }
  else {
      for (let i = min; i <= max; i++) {
         cont++;
         if (cont>25){
          text += `<br>`;
          cont=0;
         };
          if (i<0){
            text += `${i}`;
          }
          else{
            if (i==min){
              text += `${i}`;
            }
            else {
              text += `+${i}`;
            }
          }
        summ += i;
        document.getElementById("c10").innerHTML = `${text} = ... <br> Eso te da un total de ${summ} UwU`;
      }
  }
}

// 11. Leer un número entero de dos dígitos y mostrar en pantalla todos los enteros comprendidos entre un dígito y otro.
function cycle11(){
  
    //VARIABLES BÁSICAS PARA EL CICLO
    var c11 = document.getElementById("cycle11").value;
    var text = ``;
    
    //VARIABLES PARA EL EJERCICIO (dígito 1 y 2)
    var abs = Math.abs(c11);
    var arr = Array.from(String(abs),Number);
    var left = arr[0];
    var right = arr[1];

    //CANTIDAD DE DÍGITOS
    var length = arr.length;
    var len = (length==1)? `El número ${c11} tiene ${length} dígito y no 2 :c <br> Dame al menos un dígito más, ser humano`:`El número ${c11} tiene ${length} dígitos y no 2 :c <br>...Pero que igual te calculo los dos primeros dígitos :D`;

    //VARIABLES MAX Y MIN PARA UN for
    var max = Math.max(left,right);
    var min = Math.min(left,right);

    for (let i = min; i <= max; i++) {
      text += `${i} `;
    }
  
    if (c11 == `` || c11 == "-" || c11 == 0) {
      document.getElementById("c11").innerHTML = ``;
    }
    else {
      switch (length) {
        case 1:
          document.getElementById("c11").innerHTML = `${len}`;
          break;
      
        case 2:
          document.getElementById("c11").innerHTML = `${text}   UwU`;
          break;
          
          default:
          document.getElementById("c11").innerHTML = `${len}<br>${text}   UwU`;
          break;
      }
    }
}
// 12. Leer un número entero de 3 dígitos y determinar si tiene el dígito 1.
function cycle12(){
  
  //VARIABLES BÁSICAS PARA EL CICLO
  var c12 = document.getElementById("cycle12").value;
  var abs = Math.abs(c12);
  var arr = Array.from(String(abs),Number);
  
  //VARIABLES PARA EL EJERCICIO (array.filters y demás)
  var three = [arr[0],arr[1],arr[2]];
  var uno3 = three.filter(x=>x==1);
  var derecha = (three[2] == 1)? `en la derecha`:``;
  var middle = (arr.length==3)? `en el medio`:`en el segundo dígito`;
  var mitad = (three[1] == 1)? `${middle} `:``;
  var izquierda = (three[0] == 1)? `en la izquierda`:``;
  var and = (uno3.length==3 || (three[0]!=1 && three[2]==1))? `y `:``;
  var comma = (uno3.length==3)? `, `:``;
  var yIzq = (uno3.length==2 && izquierda==`en la izquierda`)? ` y `:``;
  //Cada palabra se valoró de manera binaria para volver posible el código
  var uno = arr.filter(x=>x==1);
  var totalUnos = (uno.length==1)? `tiene un 1 :D`:`tiene ${uno.length} UNOS :D`;
  var hafIs = (abs==1)? `el número es un 1 :D`:`${totalUnos}`;
  var though = (uno.length>=1)? `...Aunque ${hafIs}`:`...Y de todas maneras, no tiene un 1 en ninguna parte >:c`;
  //POSICIÓN (en caso de número de 4 dígitos o más con un 1)
  var pos = [];
  var box = [];
  var sortedPos = [];
  for (let i = 0; i < arr.length; i++) {
    pos = (arr.indexOf(1,i))+1;
    if (pos!=0){
      box.push(pos);
    };
    sortedPos = box.filter((value,index,array)=>array.indexOf(value)==index);
  };
  
  //EN BÚSQUEDA DEL 1 
  var oneInThree = (uno3.length>=1)? `El número ${c12} tiene 3 dígitos :D y un 1 ${izquierda}${comma}${yIzq}${mitad}${and}${derecha}`:`El número ${c12} tiene 3 dígitos :D pero ninguno de ellos es un 1 :c`;
  var length = arr.length;
  var len = (length==1)? `El número ${c12} tiene ${length} dígito y no 3 :c ${though} <br> Dame al menos dos dígitos más, ser humano >:c`:`El número ${c12} tiene ${length} dígitos y no 3 :c ${though}`;
  var coor = (uno.length==1)? `Y ese 1 está en la posición n°`:`Los 1 están en las posiciones n°:`;
  var position = (uno.length>=1)? `${coor} ${sortedPos} UwU`:``;


  if (c12 == `` || c12 == "-" || c12 == 0) {
    document.getElementById("c12").innerHTML = ``;
  }
  else {
    switch (length) {
      case 1:
        document.getElementById("c12").innerHTML = `${len}`;
        break;
    
      case 3:
        document.getElementById("c12").innerHTML = `${oneInThree} UwU`;
        break;
        
        default:
        document.getElementById("c12").innerHTML = `${len}<br>${position}`;
        break;
    }
  }
}

// 13. Leer un entero y mostrar todos los múltiplos de 5 comprendidos entre 1 y el número leído.
function cycle13(){
  
    //VARIABLES BÁSICAS PARA EL CICLO
    var c13 = document.getElementById("cycle13").value;
    var aux = Number.parseInt(c13);
    var text = ``;
  
    //VARIABLES MAX Y MIN PARA UN for
    var max = Math.max(aux,1);
    var min = Math.min(aux,1);

    for (let i = min; i <= max; i++) {
      if ((i%5)==0 && i!=0){
        text += `${i} `;
      };
    }
  
    if (c13 == `` || c13 == "-") {
      document.getElementById("c13").innerHTML = ``;
    }
    else {
      if (text==``){
        document.getElementById("c13").innerHTML = `Entre los números ${min} y ${max} no hay múltiplos de 5 :C <br> ¡Prueba con otro número, humano!`;
      }
      else{
        document.getElementById("c13").innerHTML = `${text} UwU`;
      }
    }
}

// 14. Mostrar en pantalla los primeros 20 múltiplos de 3.
//FUNCIONES PARA LOS BOTONES
var button14 = document.getElementById("cycle14");
function onMouseOverLight14(){
  button14.style.border="3px solid #ffaa22";
  button14.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
};
function onMouseOutLight14(){
  button14.style.border='3px solid #f7b64e';
  button14.style.color='#333333';
  button14.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function onMouseOverDark14(){
  button14.style.border="3px solid #ffaa22";
  button14.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function onMouseOutDark14(){
  button14.style.border = '3px solid #ffaa22';
  button14.style.color = 'rgb(31, 11, 11)';
  button14.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};
function onMouseDownDark14(){
  button14.style.border="1px solid #ffaa22";
  button14.style.background ="linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)";
  button14.style.color="rgb(31, 11, 11)";
	button14.style.top="1px";
};
function onMouseDownLight14(){
  button14.style.border="1px solid #ffa22";
  button14.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  button07.style.top="1px";
};

function buttonc14(){
  //SWITCH
  document.getElementById("c14").innerHTML = ``;
  button14.onclick = function () {cycle14()};
  //OH, STYLO
  button14.innerHTML = `LET'S GOOO >:C`;
  button14.onmouseover = function (){onMouseOverLight14()};
  button14.onmouseout = function (){onMouseOutLight14()};
  button14.onmousedown = function (){onMouseDownDark14()};
}

function cycle14() {
  
  //SOLUTION
  var count14 = ``;
  var mult = 3;
  var quant = 20;

    for (let index = mult; index <= mult*quant; index=index+mult) {
      count14 += `${index} `;
      document.getElementById("c14").innerHTML = `${count14} UwU`;
    }
    
    //SWITCH
    button14.onclick = function () {buttonc14()};
    //OH, STYLO
    button14.innerHTML = `UwU`;
    button14.onmouseover = function (){onMouseOverDark14()};
    button14.onmouseout = function (){onMouseOutDark14()};
    button14.onmousedown = function (){onMouseDownLight14()};
}

// 15. Escribir en pantalla el resultado de sumar los primeros 20 múltiplos de 3.
//FUNCIONES PARA LOS BOTONES
var button15 = document.getElementById("cycle15");
function onMouseOverLight15(){
  button15.style.border="3px solid #ffaa22";
  button15.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
};
function onMouseOutLight15(){
  button15.style.border='3px solid #f7b64e';
  button15.style.color='#333333';
  button15.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function onMouseOverDark15(){
  button15.style.border="3px solid #ffaa22";
  button15.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function onMouseOutDark15(){
  button15.style.border = '3px solid #ffaa22';
  button15.style.color = 'rgb(31, 11, 11)';
  button15.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};
function onMouseDownDark15(){
  button15.style.border="1px solid #ffaa22";
  button15.style.background ="linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)";
  button15.style.color="rgb(31, 11, 11)";
	button15.style.top="1px";
};
function onMouseDownLight15(){
  button15.style.border="1px solid #ffa22";
  button15.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  button07.style.top="1px";
};

function buttonc15(){
  //SWITCH
  document.getElementById("c15").innerHTML = ``;
  button15.onclick = function () {cycle15()};
  //OH, STYLO
  button15.innerHTML = `LET'S GOOO >:C`;
  button15.onmouseover = function (){onMouseOverLight15()};
  button15.onmouseout = function (){onMouseOutLight15()};
  button15.onmousedown = function (){onMouseDownDark15()};
}

function cycle15() {
  
  //SOLUTION
  var count15 = ``;
  var mult = 3;
  var quant=20;
  var summ = 0;

    for (let index = mult; index <= mult*quant; index=index+mult) {
      if (index==mult){
        count15 += `${mult} `;
      }
      else{
        count15 += `+ ${index} `;
      };
      summ += index;
      document.getElementById("c15").innerHTML = `${count15} = ... <br> La suma de los ${quant} primeros múltiplos de ${mult} te dará ${summ} UwU`;
    }
    
    //SWITCH
    button15.onclick = function () {buttonc15()};
    //OH, STYLO
    button15.innerHTML = `UwU`;
    button15.onmouseover = function (){onMouseOverDark15()};
    button15.onmouseout = function (){onMouseOutDark15()};
    button15.onmousedown = function (){onMouseDownLight15()};
}

// 16. Mostrar en pantalla el promedio entero de los n primeros múltiplos de 3 para un número n leído.
function cycle16(){
  
    //VARIABLES BÁSICAS PARA EL CICLO
    var c16 = document.getElementById("cycle16").value;
    var abs = Math.abs(c16);

    var text = ``;
    var box = 0;
    var avg = 0;

    //BUCLE
    for (let i = 0; i <= abs; i++) {
      box += 3*i;
      text += `3*${i} = ${3*i}<br> `;
    }
    
    //TRAMPILLA PARA QUE TE DE 0 AL DIVIDIR 0 POR X
    avg = Number.parseInt(box/abs);   
    avgg = (box == 0)? 0:avg;

    if (c16 == `` || c16 == "-") {
      document.getElementById("c16").innerHTML = ``;
    }
    else {
      if(c16<0){
        document.getElementById("c16").innerHTML = `Oshe, quítale ese menos (-) al ${abs}, porque sho sólo cuento múltiplos para arriba UwU <br> MÚLTIPLOS: ${abs} <br> TOTAL: ${box} <br> PROMEDIO: ${avg}<br>UwU <br> ${text} `;
      }
      else{
        document.getElementById("c16").innerHTML = `MÚLTIPLOS: ${abs} <br> SUMA TOTAL: ${box} <br> PROMEDIO: ${avgg} <br> UwU <br> ${text} `;
      }
    }
}

// 17. Promediar los x primeros múltiplos de 2 y determinar si ese promedio es mayor que los y primeros múltiplos de 5 para valores de x y y leídos.
function cycle17(){
  
  //VARIABLES BÁSICAS PARA EL CICLO
  var c17 = document.getElementById("cycle17").value;
  var c17b = document.getElementById("cycle17b").value;
  //VARIABLES PARA UN for X (múltiplos 2)
  var abs = Math.abs(c17);
  var aux = Number.parseInt(c17);
  var avg = 0;
  var box = 0;
  var text = ``;
  //VARIABLES MAX Y MIN PARA UN for Y (múltiplos de 5)
  var absb = Math.abs(c17b);
  var auxb = Number.parseInt(c17b);
  var avgb = 0;
  var boxb = 0;
  var textb = ``;
  
  //IDENTIFICADOR DE NEGATIVOS
  var min = Math.min(aux,auxb);
  var neg = (aux<0 && auxb<0)? `${aux} y ${auxb} son negativos y sho sólo cuento múltiplos hacia arriba, ¡quítales ese menos! (-)`:`${min} es negativo, quítale ese menos (-) que los múltiplos los cuento para arriba`;
  
  
  //BUCLE PARA X
  for (let i = 0; i <= abs; i++) {
    box += 2*i;
    text += `2*${i} = ${i*2}<br> `;
  };
  
  //BUCLE PARA Y
  for (let miau = 0; miau <= absb; miau++) {
    boxb += 5*miau;
    textb += `5*${miau} = ${miau*5}<br> `;
  };

  
  
  //¿QUÉ PROMEDIO ES MAYOR?
  avg = Number.parseInt(box/abs);
  avgg = (box == 0)? 0:avg;

  avgb = Number.parseInt(boxb/absb);
  avggb = (boxb == 0)? 0:avgb;  
  
  var theOne = (avgg>avggb)? `El promedio entero de los ${abs} múltiplos de 2 (${avgg}) es mayor que el de los ${absb} múltiplos de 5 (${avggb}) UwU`:`El promedio entero de los ${abs} múltiplos de 2 (${avgg}) es menor que el de los ${absb} múltiplos de 5 (${avggb}) UwU`;
  var equals = (avgg==avggb)? `El promedio entero de los ${abs} múltiplos de 2 y de los ${absb} múltiplos de 5...¡Es el mismo! ${avgg} UwU`:theOne;


  if (c17 == `` && c17b == ``){
    document.getElementById("c17").innerHTML = ``;
    document.getElementById("c17b").innerHTML = ``;
    document.getElementById("c17c").innerHTML = ``;
  }
  else if (c17 == "-" && c17b == "-"){
    document.getElementById("c17").innerHTML = ``;
    document.getElementById("c17b").innerHTML = ``;
    document.getElementById("c17c").innerHTML = ``;
  }
  else {
    if (c17 == `` || c17b == ``) {
    document.getElementById("c17c").innerHTML = `Bueno, un ${c17}${c17b}... Y la otra casilla qué >:c`;
  }
  else {
      if(c17 < 0 || c17b < 0){
      document.getElementById("c17c").innerHTML = `Oshe, que ${neg} >:c`;
      document.getElementById("c17").innerHTML = `MÚLTIPLOS: ${abs} <br> SUMA TOTAL: ${box}<br>PROMEDIO: ${avgg}<br>UwU <br> ${text} `;
      document.getElementById("c17b").innerHTML = `MÚLTIPLOS: ${absb} <br> SUMA TOTAL: ${boxb}<br>PROMEDIO: ${avggb}<br>UwU <br> ${textb} `;
      }
      else{
        document.getElementById("c17").innerHTML = `MÚLTIPLOS: ${abs} <br> SUMA TOTAL: ${box}<br>PROMEDIO: ${avgg}<br>UwU <br> ${text} `;
        document.getElementById("c17b").innerHTML = `MÚLTIPLOS: ${absb} <br> SUMA TOTAL: ${boxb}<br>PROMEDIO: ${avggb}<br>UwU <br> ${textb} `;
        document.getElementById("c17c").innerHTML = `${equals}`;
      }
    }
  }
}

// 18. Leer dos números enteros y mostrar todos los múltiplos de 5 comprendidos entre el menor y el mayor.
function cycle18(){
    var c18 = document.getElementById("cycle18").value;
    var c18b = document.getElementById("cycle18b").value;
    var aux = Number.parseInt(c18);
    var auxb = Number.parseInt(c18b);
    var text = ``;
    var min = Math.min(aux,auxb);
    var max = Math.max(aux,auxb);

    for (let i = min; i <= max; i++) {
      if ((i%5)==0 && i!=0){
        text += `${i} `;
      }
    }
  
    if ((c18 == `` && c18b == ``) || (c18 == "-" && c18b == "-")) {
      document.getElementById("c18").innerHTML = ``;
    }
    else if (c18 == `` || c18b == ``) {
      document.getElementById("c18").innerHTML = `Bueno, un ${c18}${c18b}... Y la otra casilla qué >:c`;
    }
    else {
      if (text==``){
        document.getElementById("c18").innerHTML = `Entre el ${min} y el ${max} no hay múltiplos del 5 :c Prueba con otros números`;
      }
      else{
        document.getElementById("c18").innerHTML = `${text} UwU`;
      }
    }
}

// 19. Leer un número entero y determinar si es primo.
function cycle19(){
  
    var c19 = document.getElementById("cycle19").value;
    var aux = Math.abs(c19);

      //ALGORITHM FOR PRIME NUMBERS >:c
  var box = [];
  var primes = ``;

  for (let numbers = 1; numbers <= aux; numbers++) {
      const prime = c19%numbers;
      if (prime == 0) {
        box.push(numbers);  
      }
    }
    
  var primes = (box.length == 2)? `El número ${c19} es primo UwU ya que...<br>Es múltiplo solo de si mismo y del 1 (${box})`:`El número ${c19} no es primo :c ya que...<br> Es múltiplo de varios números a la vez: <br> Es múltiplo del... ${box}`;
  var ngtv = (c19<0)? `Si sabes que los números negativos no pueden ser negativos ya que deben ser mayores a 1... ¿No? <br> Quítale ese feo menos (-) al pobre ${aux} de encima >:c`:primes;

    if((c19 == `` || c19 == "-" || c19 == 0)){
      document.getElementById("c19").innerHTML = ``;
    }
    else{
    document.getElementById("c19").innerHTML = ngtv; 
    }
}

// 20. Leer un número entero y determinar cuántos dígitos tiene.
function cycle20(){
  
    //VARIABLES BÁSICAS PARA EL CICLO
    var c20 = document.getElementById("cycle20").value;
    var aux = Math.abs(c20);
    var arr = Array.from(String(aux),Number);

    //CONTADOR DE DÍGITOS... Sin ciclos, ni mamadas xd solo arrays hermosos
    var digits = arr.length;
    var uno = (digits==1)? `El número ${c20} tiene ${digits} dígito UwU`:`El número ${c20} tiene ${digits} dígitos UwU`;

    //LET'S GOOO
    if (c20 == `` || c20 == "-" || c20 == 0) {
      document.getElementById("c20").innerHTML = ``;
    }
    else {
      document.getElementById("c20").innerHTML = `${uno}`;
    }
}

// 21. Leer un número entero y determinar a cuánto es igual al suma de sus dígitos.
function cycle21(){
  
  var c21 = document.getElementById("cycle21").value;
  var abs = Math.abs(c21);
  var arr = Array.from(String(abs),Number);
  var length = arr.length;
  var len = (length==1)? `${c21} tiene solo 1 dígito`:`${c21} tiene ${length} dígitos`;

  //En este caso, solution es un filtro de suma del arreglo
  var solution = arr.join('+'); 
  var negative = (c21<0)? `Más el signo menos, claro xd`:``;
  //Personalización del problema
  var summ = 0;
  for (let i = 0; i < arr.length; i++) {
  summ += arr[i];  
  };
  if (c21<0) {summ = summ*(-1)};

  if((c21 == 0 || c21 == `` || c21 == "-")){
    document.getElementById("c21").innerHTML = ``;
  }
  else{
    switch (length) {
      case 1:
        document.getElementById("c21").innerHTML = `${len} y pues es un ${c21} sin más... ¡Dame más números, humano! >:c`;
        break;
        
        default:
        document.getElementById("c21").innerHTML = `${len} y la suma de sus dígitos sería... <br> ${solution} <br> Lo que da un total de ${summ} UwU <br> ${negative}`;
        break;
    }
  }
}

// 22. Leer un número entero y determinar cuántas veces tiene el dígito 1.
function cycle22(){
  //VARIABLES BÁSICAS PARA EL CICLO
  var c22 = document.getElementById("cycle22").value;
  var abs = Math.abs(c22);
  var arr = Array.from(String(abs),Number);
  
  //POSICIÓN (en caso de número de 4 dígitos o más con un 1)
  var pos = [];
  var box = [];
  var sortedPos = [];
  for (let i = 0; i < arr.length; i++) {
    pos = (arr.indexOf(1,i))+1;
    if (pos!=0){
      box.push(pos);
    };
    sortedPos = box.filter((value,index,array)=>array.indexOf(value)==index);
  };
  
  //Escáner de UNOS
  var uno = arr.filter(x=>x==1);
  var totalUnos = (uno.length==1)? `El número ${c22} tiene un 1 :D <br> En la posición n° ${sortedPos} UwU`:`El número ${c22} tiene ${uno.length} UNOS :D <br> En las posiciones n° ${sortedPos} UwU`;
  var ngtv = (c22<0)? `así sea negativo UwU`:``;
  var hafIs = (abs==1)? `Eso es un 1 :D ${ngtv}`:`${totalUnos}`;
  var though = (uno.length>=1)? `${hafIs}`:`El número ${c22} no tiene un 1 en ninguna parte >:c`;
  
  
  //EN BÚSQUEDA DEL 1 
  if (c22 == `` || c22 == "-" || c22 == 0) {
    document.getElementById("c22").innerHTML = ``;
  }
  else {
    document.getElementById("c22").innerHTML = `${though}`;
  }
}

// 23. Leer un número entero y determinar si la suma de sus dígitos es también un número primo.
function cycle23(){
  
  var c23 = document.getElementById("cycle23").value;
  var abs = Math.abs(c23);
  var arr = Array.from(String(abs),Number);
  var length = arr.length;
  var len = (length==1)? `${c23} tiene solo 1 dígito`:`${c23} tiene ${length} dígitos`;

  //En este caso, solution es un filtro de suma del arreglo
  var solution = arr.join('+'); 
  
  //Personalización del problema
  var summ = 0;
  for (let i = 0; i < arr.length; i++) {
    summ += arr[i];  
  };
  if (c23<0) {summ = summ*(-1)};
  var sum = Math.abs(summ);
  
  //ALGORITHM FOR PRIME NUMBERS >:c
  var box = [];
  var primes = ``;
  
  for (let numbers = 2; numbers <= sum; numbers++) {
      const prime = sum%numbers;
      if (prime == 0) {
        box.push(numbers);  
      }
    };
    
    var primes = (box.length == 1)? `<br>Ah, y...¡¡${summ} ES PRIMOO!! :DDd`:`<br> ...Igual ${summ} no es primo :c`;
    var negative = (c23<0)? `<br>Más el signo menos, claro xd<br> Por cierto... Los números negativos no pueden ser primos c:`:`${primes}`;
    var neg = (arr.length==1 && c23<0)? `Por cierto... Los números negativos no pueden ser primos c:`:`${primes}`; 

  if((c23 == 0 || c23 == `` || c23 == "-")){
    document.getElementById("c23").innerHTML = ``;
  }
  else{
    switch (length) {
      case 1:
        document.getElementById("c23").innerHTML = `${len} y pues es un ${c23} sin más... ¡Dame más números, humano! >:c ${neg}`;
        break;
        
        default:
        document.getElementById("c23").innerHTML = `${len} y la suma de sus dígitos sería... <br> ${solution} <br> Lo que da un total de ${summ} UwU ${negative}`;
        break;
    }
  }
}

// 24. Leer un número entero y determinar a cuánto es igual al suma de sus dígitos pares.
function cycle24(){
  
  var c24 = document.getElementById("cycle24").value;
  var abs = Math.abs(c24);
  var arr = Array.from(String(abs),Number);
  var length = arr.length;
  var len = (length==1)? `${c24} tiene solo 1 dígito`:`${c24} tiene ${length} dígitos`;

  //En este caso, solution es un filtro de suma del arreglo
  var pair = arr.filter(x=>x%2==0);
  var solution = pair.join('+'); 
  var negative = (c24<0)? `Más el signo menos, claro xd`:``;
  //Personalización del problema
  var summ = 0;
  for (let i = 0; i < arr.length; i++) {
    if (i%2==0){
      summ += arr[i];  
    }
  };
  if (c24<0) {summ = summ*(-1)};

  if((c24 == 0 || c24 == `` || c24 == "-")){
    document.getElementById("c24").innerHTML = ``;
  }
  else{
    switch (length) {
      case 1:
        document.getElementById("c24").innerHTML = `${len} y pues es un ${c24} sin más... ¡Dame más números, humano! >:c`;
        break;
        
        default:
        document.getElementById("c24").innerHTML = `${len} y la suma de sus dígitos pares sería... <br> ${solution} <br> Lo que da un total de ${summ} UwU <br> ${negative}`;
        break;
    }
  }
}

// 25. Leer un número entero y determinar a cuánto es igual el promedio entero de sus dígitos.
function cycle25(){
  
  var c25 = document.getElementById("cycle25").value;
  var abs = Math.abs(c25);
  var arr = Array.from(String(abs),Number);
  var length = arr.length;
  var len = (length==1)? `${c25} tiene solo 1 dígito`:`${c25} tiene ${length} dígitos`;

  //En este caso, solution es un filtro de suma del arreglo
  var solution = arr.join('+'); 
  var negative = (c25<0)? `<br> Más el signo menos, claro xd <br>`:`<br>`;
  //Personalización del problema
  var summ = 0;
  for (let i = 0; i < arr.length; i++) {
    summ += arr[i];  
  };
  if (c25<0) {summ = summ*(-1)};
  var avg = Number.parseInt(summ/length);

  if((c25 == 0 || c25 == `` || c25 == "-")){
    document.getElementById("c25").innerHTML = ``;
  }
  else{
    switch (length) {
      case 1:
        document.getElementById("c25").innerHTML = `${len} y pues es un ${c25} sin más... ¡Dame más números, humano! >:c`;
        break;
        
        default:
        document.getElementById("c25").innerHTML = `${len} y la suma de sus dígitos sería... ${solution} <br> Lo que da un total de ${summ} UwU y al dividir enteros... ${negative} El promedio de la suma de los dígitos del ${c25} equivale a ${avg} ( ${summ} / ${length} = ${avg} ) UwU`;
        break;
    }
  }
}

// 26. Leer un número entero y determinar cuál es el mayor de sus dígitos.
function cycle26(){
  
    //VARIABLES BÁSICAS PARA EL CICLO
    var c26 = document.getElementById("cycle26").value;
    var aux = Math.abs(c26);
    var arr = Array.from(String(aux),Number);
    var length = arr.length;
    
    //MAX 
    var max = Math.max(...arr);
    var ngtv = (c26<0)? `<br> ¡Y me vale si es negativo! >:v`:``;
  
    if (c26 == `` || c26 == "-") {
      document.getElementById("c26").innerHTML = ``;
    }
    else {
      switch (length) {
        case 1:
          document.getElementById("c26").innerHTML = `Eso es un ${c26} y pos... Ajá. ${ngtv}`;
          break;
          
          case 2:
          document.getElementById("c26").innerHTML = `El mayor número de esos dos (${aux}) es el ${max} UwU ${ngtv}`;
          break;

        default:
          document.getElementById("c26").innerHTML = `El mayor dígito en el número ${aux} es el ${max} UwU ${ngtv}`;
          break;
      }
    }
}

// 27. Leer 2 números enteros y determinar cuál de los dos tiene mayor cantidad de dígitos.
function cycle27(){
  //VARIABLES
    var c27 = document.getElementById("cycle27").value;
    var c27b = document.getElementById("cycle27b").value;
    var abs = Math.abs(c27);
    var absb = Math.abs(c27b);

  //ARRAYS
    var arr = Array.from(String(abs),Number);
    var arrb = Array.from(String(absb),Number);

  //WHICH ONE KEEPS MORE DIGITS?
    var length = arr.length;
    var lengthb = arrb.length;
    var high = Math.max(abs,absb);
    var low = Math.min(abs,absb);
    var max = Math.max(length,lengthb);
    var min = Math.min(length,lengthb);
    var plural = (max==1)? `${max} dígito`:`${max} dígitos`;
    var pluralb = (min==1)? `${min} dígito`:`${min} dígitos`;
    var win = `Entre el ${c27} y el ${c27b}, hasta tú mismo, humano, puedes contar que <br> el ${high} tiene más dígitos (${plural}) que el ${low} (${pluralb}) UwU`
    var digits = (length==lengthb)? `Los dos números (${c27} & ${c27b}) tienen la misma cantidad de dígitos: ${max} c:`:win;

    if ((c27 == `` && c27b == ``) || (c27 == "-" && c27b == "-") || (c27 == 0 && c27b == 0)) {
      document.getElementById("c27").innerHTML = ``;
    }
    else if (c27 == 0 || c27b == 0) {
      document.getElementById("c27").innerHTML = `Bueno, un ${c27}${c27b}... Y la otra casilla qué >:c`;
    }
    else {
      document.getElementById("c27").innerHTML = `${digits}`;
    }
}

// 28. Leer 2 números enteros y determinar cual de los dos tiene mayor cantidad de dígitos primos.
function cycle28(){
  //VARIABLES
    var c28 = document.getElementById("cycle28").value;
    var c28b = document.getElementById("cycle28b").value;
    var abs = Math.abs(c28);
    var absb = Math.abs(c28b);

  //ARRAYS
    var arr = Array.from(String(abs),Number);
    var arrb = Array.from(String(absb),Number);

  //ALGORITHM FOR PRIME NUMBERS A >:c
  const primes = [2,3,5,7];

  var box = arr.filter(x=>primes.includes(x));
  var sortbox = box.sort();

  //ALGORITHM FOR PRIME NUMBERS B >:c
  var boxb = arrb.filter(x=>primes.includes(x));
  var sortboxb = boxb.sort();

  //WHICH ONE KEEPS MORE PRIME DIGITS?
    var length = box.length;
    var lengthb = boxb.length;
    var singular = (length == 1)? `solo un número primo: <br> el ${c28} tiene al ${sortbox} y el ${c28b} tiene al ${sortboxb}`:`la misma cantidad de dígitos primos: ${length} <br> El ${c28} tiene los primos n° ${sortbox} mientras que el ${c28b} tiene los primos n° ${sortboxb}`;
    var max = (length>lengthb)? `Por ende... El número con más dígitos primos es el ${c28}`:`Por ende... El número con más dígitos primos es el ${c28b}`;
    var plural = (length==1)? `El ${c28} tiene ${length} dígito primo: el n°`:`El ${c28} tiene ${length} dígitos primos: los n°`;
    var pluralb = (lengthb==1)? `El ${c28b} tiene ${lengthb} dígito primo: el n°`:`El ${c28b} tiene ${length} dígitos primos: los n°`;
    var itsOn = `${plural} ${sortbox}`;
    var itsOnb = `${pluralb} ${sortboxb}`;
    var zero = (length == 0)? `El número ${c28} no tiene dígitos primos :C`:itsOn;
    var zeroB = (lengthb == 0)? `El número ${c28b} no tiene dígitos primos :C`:itsOnb;

    var win = `${zero} <br> ${zeroB} <br> ${max} UwU`;
    var digits = (length==lengthb)? `Ambos números (${c28} & ${c28b}) tienen ${singular} c:`:win;
    var ngtv = (c28<0||c28b<0)? `<br>Por cierto... Los números negativos no pueden ser primos... <br> Pero como andamos hablando de dígitos, te la pasaré esta vez... e,e`:``;

    //LET'S GET STARTED
    if ((c28 == `` && c28b == ``) || (c28 == "-" && c28b == "-") || (c28 == 0 && c28b == 0)) {
      document.getElementById("c28").innerHTML = ``;
    }
    else if (c28 == `` || c28b == ``) {
      document.getElementById("c28").innerHTML = `Bueno, un ${c28}${c28b}... Y la otra casilla qué >:c`;
    }
    else {
      document.getElementById("c28").innerHTML = `${digits} ${ngtv}`;
    }
}

// 29. Leer un número entero y determinar a cuánto es igual el primero de sus dígitos.
function cycle29(){

  //VARIABLES ELEMENTALES 
  var c29 = document.getElementById("cycle29").value;
  var abs = Math.abs(c29);

  //ARREGLO
  var arr = Array.from(String(abs),Number);

  //PRIMER DÍGITO
  var firstDigit = arr[0];

  //PERSONALIZACIÓN DE LA SOLUCIÓN
  var ngtv = (c29<0)? `<br> ¡Y me vale que sea negativo! >:v xd`:``;

  //ESQUEMA DE CASOS
  if (c29 == `-` || c29 == `` || c29 == 0) {
    document.getElementById("c29").innerHTML = ``;
  }
  else {
    document.getElementById("c29").innerHTML = `El primer dígito del ${c29} es el ${firstDigit} UwU ${ngtv}`;
  }
}

// 30. Leer un número entero y mostrar todos sus componentes numéricos o sea aquellos para quienes él sea un múltiplo.
function cycle30(){
    //VARIABLES BÁSICAS PARA EL CICLO
    var c30 = document.getElementById("cycle30").value;
    var abs = Math.abs(c30);
    
    //ARREGLOS PARA DEPOSITAR Y ORDENAR LOS COMPONENTES NUMÉRICOS
    var boxx = [];
    
    for (let i = 1; i <= abs; i++) {
      if (abs%i==0) {
        boxx.push(i);
      };
    };
    
    var comp = boxx.sort().filter((value,index,array)=>array.indexOf(value)===index);
    
    //ALGORITHM FOR PRIME NUMBERS >:c
  var box = [];
  var primes = ``;

  for (let numbers = 2; numbers <= abs; numbers++) {
      const prime = c30%numbers;
      if (prime == 0) {
        box.push(numbers);  
      };
    };
    
  var primes = (box.length == 1)? `(es un número primo UwU)`:``;


    if (c30 == `` || c30 == "-") {
      document.getElementById("c30").innerHTML = ``;
    }
    else {
        document.getElementById("c30").innerHTML = `Los componentes numéricos o números de los que <br> el ${c30} es múltiplo, son los n° ${comp} ${primes}`;
    }
}

// 31. Leer números hasta que digiten 0 y determinar a cuánto es igual el promedio de los números terminados en 5.
  
  //Definimos ENTER como botón para el input 
  var i31 = document.getElementById("cycle31");
  i31.addEventListener('keydown', interactive31, false);

  //Variables requeridas
  var spanCycle31 = document.getElementById("c31");
  var spanCycle31c = document.getElementById("c31c");
  var arrCycle31 = [];
  var sorCycle31 = [];
  var endCycle31 = [];
  var fivesFilter = [];
  var element = 0;
  var avg = 0;
  var zero = 0;
  var zero2 = 0;
  var shit = 0;

  //Función que se ejecutará cuando se oprima ENTER dentro del input 31 de la sección ciclos
  function interactive31(e){
    if (e.keyCode === 13) {
      
      //Variables "locales"
      var i31 = document.getElementById("cycle31");
      var number = i31.value;
      var c31 = document.getElementById("c31");
      
      //Esquema de casos
      if ( number>0 || number<0 ){
        arrCycle31.push(Number.parseInt(number));
        sorCycle31 = arrCycle31.sort().filter((value,index,array)=>array.indexOf(value)===index);
        endCycle31 = sorCycle31.join(', ');
        c31.innerHTML = `Números registrados: ${endCycle31}`;
        fivesFilter = sorCycle31.filter(x=>x%10==5);
        element = eval(fivesFilter.join("+"));
        avg = Number.parseInt((element)/(fivesFilter.length));
        i31.value = ``;
        if (sorCycle31.length>=1){
          document.getElementById("c31c").innerHTML = `Cuando hayas acabado de registrar números, <br> ingresa el CERO para mostrarte el resultado c:`;
        }
      }
      else if (number==``){
      }
      else {
        i31.value = ``;

        if (sorCycle31.length==0){
          document.getElementById("c31c").innerHTML = `>:CC ¡Te dije que escribieras primero un número diferente a CERO, humano! <br> ¿Cómo quieres que te calcule nada si no me has registrado números? >:c`;
          c31.innerHTML = ``;
        }
        else{
          arrCycle31.push(Number.parseInt(number));
          //Personalización de la solución
          var plural = (fivesFilter.length==1)? `${fivesFilter.length} termina en 5: ${fivesFilter.join(', ')} <br> Y pues ni modo a sacarle promedio a un solo número... xd Ingresa más números UwU`:`${fivesFilter.length} terminan en 5: ${fivesFilter.join(', ')} <br> El promedio de estos números [ ( ${fivesFilter.join(" + ")} ) / ${fivesFilter.length} ] = ( ${element} / ${fivesFilter.length} ) es ${avg} UwU`;
          var ninguno = (fivesFilter.length==0)? `ninguno termina en 5 :C <br> Ingresa más números, humano (y ojalá que terminen en 5 e,e)`:plural;
          //Solución
          document.getElementById("c31c").innerHTML = `De los números que me registraste, ${ninguno} <br> Si ingresas nuevamente el cero, puedo reiniciarte los números registrados, humano c:`;
          //El cero como botón de reinicio
          zero = arrCycle31[(arrCycle31.length)-1]; // El último número ingresado
          zero2 = arrCycle31[(arrCycle31.length)-2]; //El penúltimo número ingresado
          if (zero == 0 ){
            shit = 69;
          }
          else{
            shit = 98;
          };
          if ( zero == 0 && zero2 == 0){
            c31.innerHTML = `Has reiniciado los números registrados con éxito :D`;
            document.getElementById("c31c").innerHTML = `Te invito a registrar nuevos números (obvio distintos a cero)`;
            arrCycle31 = [];
            sorCycle31 = [];
            endCycle31 = [];
            fivesFilter = [];
            element = 0;
            avg = 0;
            zero = 0;
            zero2 = 0;
            shit = 0;
          };
        }
      }
    }
  }
  

    //Creamos una función para que aparezca un texto cuando el usuario escribe
    function cycle31 () {
      var c31 = document.getElementById("cycle31").value;
      var aux = Number.parseInt(c31);
      var five = (aux%10);
  

      if (c31 == `` || c31 == '-'){
        document.getElementById("c31b").innerHTML = ``;
      }
      else {
        if (five==5 && aux!=5){
          document.getElementById("c31b").innerHTML = `¡Genial! Un número que termina en 5 c:< Oprime ENTER para yo registrarlo UwU`;
        }
        else if (c31 == 0 && sorCycle31.length==0){
          document.getElementById("c31b").innerHTML = `Oshe, regístrame números primero, antes de pensar en ceros >:c`;
        }
        else{
          if (c31 == 0){
            if (shit == 69){
              document.getElementById("c31b").innerHTML = `¿Quieres reiniciar los números registrados? UwU`;
            }
            else{
              document.getElementById("c31b").innerHTML = `¿Quieres calcular ya el resultado? UwU`;
            }
          }
          else{
            if (sorCycle31.includes(aux)){
              document.getElementById("c31b").innerHTML = `Ya registraste al ${aux}, intenta con otro número`;
            }
            else{
              document.getElementById("c31b").innerHTML = `¡Genial! Un ${aux} c: Oprime ENTER para yo registrarlo UwU`;
            }
          }
        }
      }
    }

// 32. Leer números hasta que digiten 0 y determinar a cuanto es igual el promedio entero de los número primos leídos.
  
  //Definimos ENTER como botón para el input 
  var i32 = document.getElementById("cycle32");
  i32.addEventListener('keydown', interactive32, false);

  //Variables requeridas
  var spanCycle32 = document.getElementById("c32");
  var spanCycle32c = document.getElementById("c32c");
  var arrCycle32 = [];
  var sorCycle32 = [];
  var endCycle32 = [];
  var primesFilter = [];
  var sortedFilter = [];
  var element32 = 0;
  var avg32 = 0;
  var zero32 = 0;
  var zero232 = 0;
  var shit32 = 0;
  var box = [];


  //Función que se ejecutará cuando se oprima ENTER dentro del input 32 de la sección ciclos
  function interactive32(e){
    if (e.keyCode === 13) {
      
      //Variables "locales"
      var i32 = document.getElementById("cycle32");
      var number = i32.value;
      var c32 = document.getElementById("c32");

      //Esquema de casos
      if ( number>0 || number<0 ){
        arrCycle32.push(Number.parseInt(number));
        sorCycle32 = arrCycle32.sort().filter((value,index,array)=>array.indexOf(value)===index);
        endCycle32 = sorCycle32.join(', ');
        c32.innerHTML = `Números registrados: ${endCycle32}`;
        element = eval(primesFilter.join("+"));
        avg = Number.parseInt((element)/(primesFilter.length));
        i32.value = ``;
        //ALGORITHM FOR PRIME NUMBERS >:c
        for (let index = 0; index < sorCycle32.length; index++) {
          const miau = sorCycle32[index];
          for (let numbers = 2; numbers <= miau; numbers++) {
            const prime = miau%numbers;
            if (prime == 0) {
              box.push(numbers);
            };
            if (box.length == 1) {
              primesFilter.push(miau);
            };
            box = [];
          };
        };
        sortedFilter = primesFilter.filter((value,index,array)=>array.indexOf(value)===index);
        if (sorCycle32.length>=1){
          document.getElementById("c32c").innerHTML = `Cuando hayas acabado de registrar números, <br> ingresa el CERO para mostrarte el resultado c:`;
        };
      }
      else if (number==``){
      }
      else {
        i32.value = ``;

        if (sorCycle32.length==0){
          document.getElementById("c32c").innerHTML = `>:CC ¡Te dije que escribieras primero un número diferente a CERO, humano! <br> ¿Cómo quieres que te calcule nada si no me has registrado números? >:c`;
          c32.innerHTML = ``;
        }
        else{
          arrCycle32.push(Number.parseInt(number));
          //Personalización de la solución
          var plural = (sortedFilter.length==1)? `${sortedFilter.length} es primo: ${sortedFilter.join(', ')} <br> Y pues ni modo a sacarle promedio a un solo número... xd Ingresa más números UwU`:`${sortedFilter.length} son primos: ${sortedFilter.join(', ')} <br> El promedio de estos números [ ( ${sortedFilter.join(" + ")} ) / ${sortedFilter.length} ] = ( ${element} / ${sortedFilter.length} ) es ${avg} UwU`;
          var ninguno = (sortedFilter.length==0)? `ninguno es primo :C <br> Ingresa más números, humano (y ojalá primos e,e)`:plural;
          //Solución
          document.getElementById("c32c").innerHTML = `De los números que me registraste, ${ninguno} <br> Si ingresas nuevamente el cero, puedo reiniciarte los números registrados, humano c:`;
          //El cero como botón de reinicio
          zero = arrCycle32[(arrCycle32.length)-1]; // El último número ingresado
          zero2 = arrCycle32[(arrCycle32.length)-2]; //El penúltimo número ingresado
          if (zero == 0 ){
            shit = 69;
          }
          else{
            shit = 98;
          };
          if ( zero == 0 && zero2 == 0){
            c32.innerHTML = `Has reiniciado los números registrados con éxito :D`;
            document.getElementById("c32c").innerHTML = `Te invito a registrar nuevos números (obvio distintos a cero)`;
            arrCycle32 = [];
            sorCycle32 = [];
            endCycle32 = [];
            primesFilter = [];
            element = 0;
            avg = 0;
            zero = 0;
            zero2 = 0;
            shit = 0;
          };
        }
      }
    }
  }
  

    //Creamos una función para que aparezca un texto cuando el usuario escribe
    function cycle32 () {
      var c32 = document.getElementById("cycle32").value;
      var aux = Number.parseInt(c32);
      var abs = Math.abs(c32);
  
      //ALGORITHM FOR PRIME NUMBERS >:c
      var box = [];

      for (let numbers = 2; numbers <= abs; numbers++) {
          const prime = c32%numbers;
          if (prime == 0) {
            box.push(numbers);  
          }
      };
    
      var primes = (box.length == 1)? `es primo UwU`:`no es primo :c`;
      var ngtv = (c32<0)? `... En su versión positiva. <br> Recuerda que los negativos no son primos e.e`:` c:`;

      if (c32 == `` || c32 == '-'){
        document.getElementById("c32b").innerHTML = ``;
      }
      else {
        if (primes == `es primo UwU`){
          document.getElementById("c32b").innerHTML = `¡Genial! El ${abs} es primo${ngtv} <br> Oprime ENTER para yo registrarlo UwU`;
        }
        else if (c32 == 0 && sorCycle32.length==0){
          document.getElementById("c32b").innerHTML = `Oshe, regístrame números primero, antes de pensar en ceros >:c`;
        }
        else{
          if (c32 == 0){
            if (shit == 69){
              document.getElementById("c32b").innerHTML = `¿Quieres reiniciar los números registrados? UwU`;
            }
            else{
              document.getElementById("c32b").innerHTML = `¿Quieres calcular ya el resultado? UwU`;
            }
          }
          else{
            if (sorCycle32.includes(aux)){
              document.getElementById("c32b").innerHTML = `Ya registraste al ${aux}, intenta con otro número`;
            }
            else{
              document.getElementById("c32b").innerHTML = `¡Genial! Un ${aux} c: aunque no es primo... Igual si quieres lo registro <br> Oprime ENTER para yo registrarlo UwU`;
            }
          }
        }
      }
    }

// 33. Si 32768 es el tope superior para los números enteros, determinar cuál es el número primo mas cercano por debajo de él.
//FUNCIONES PARA LOS BOTONES
var button33 = document.getElementById("cycle33");
function onMouseOverLight33(){
  button33.style.border="3px solid #ffaa22";
  button33.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
};
function onMouseOutLight33(){
  button33.style.border='3px solid #f7b64e';
  button33.style.color='#333333';
  button33.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function onMouseOverDark33(){
  button33.style.border="3px solid #ffaa22";
  button33.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function onMouseOutDark33(){
  button33.style.border = '3px solid #ffaa22';
  button33.style.color = 'rgb(31, 11, 11)';
  button33.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};
function onMouseDownDark33(){
  button33.style.border="1px solid #ffaa22";
  button33.style.background ="linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)";
  button33.style.color="rgb(31, 11, 11)";
	button33.style.top="1px";
};
function onMouseDownLight33(){
  button33.style.border="1px solid #ffa22";
  button33.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  button07.style.top="1px";
};

function buttonc33(){
  //SWITCH
  document.getElementById("c33").innerHTML = ``;
  button33.onclick = function () {cycle33()};
  //OH, STYLO
  button33.innerHTML = `LET'S GOOO >:C`;
  button33.onmouseover = function (){onMouseOverLight33()};
  button33.onmouseout = function (){onMouseOutLight33()};
  button33.onmousedown = function (){onMouseDownDark33()};
}

function cycle33() {
  // Si 32768 es el tope superior para los números enteros, determinar cuál es el número primo mas cercano por debajo de él.
  
  //SOLUTION
  //ALGORITHM FOR PRIME NUMBERS >:c
  var box = [];
  var primes = [];
  var subject = 0;
  var lastFive = [];
  
  for (let index = 32700; index <= 32768; index++) {
    subject = index;
    for (let numbers = 2; numbers <= subject; numbers++) {
      const prime = subject%numbers;
      if (prime == 0) {
        box.push(numbers);
      };
    };
    if (box.length==1){
      primes.push(subject);
    };
    lastFive = primes.join(`,  `);
    document.getElementById("c33").innerHTML = `ÚLTIMO PRIMO:  ${primes[primes.length-1]} c: <BR> ÚLTIMOS 5 PRIMOS:  ${lastFive} UwU`;
    box = [];
  };
  
    
    //SWITCH
    button33.onclick = function () {buttonc33()};
    //OH, STYLO
    button33.innerHTML = `UwU`;
    button33.onmouseover = function (){onMouseOverDark33()};
    button33.onmouseout = function (){onMouseOutDark33()};
    button33.onmousedown = function (){onMouseDownLight33()};
}

// 34. Generar los números del 1 al 10 utilizando un ciclo que vaya de 10 a 1.
//FUNCIONES PARA LOS BOTONES
var button34 = document.getElementById("cycle34");
function onMouseOverLight34(){
  button34.style.border="3px solid #ffaa22";
  button34.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
};
function onMouseOutLight34(){
  button34.style.border='3px solid #f7b64e';
  button34.style.color='#333333';
  button34.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function onMouseOverDark34(){
  button34.style.border="3px solid #ffaa22";
  button34.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function onMouseOutDark34(){
  button34.style.border = '3px solid #ffaa22';
  button34.style.color = 'rgb(31, 11, 11)';
  button34.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};
function onMouseDownDark34(){
  button34.style.border="1px solid #ffaa22";
  button34.style.background ="linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)";
  button34.style.color="rgb(31, 11, 11)";
	button34.style.top="1px";
};
function onMouseDownLight34(){
  button34.style.border="1px solid #ffa22";
  button34.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  button07.style.top="1px";
};

function buttonc34(){
  //SWITCH
  document.getElementById("c34").innerHTML = ``;
  button34.onclick = function () {cycle34()};
  //OH, STYLO
  button34.innerHTML = `LET'S GOOO >:C`;
  button34.onmouseover = function (){onMouseOverLight34()};
  button34.onmouseout = function (){onMouseOutLight34()};
  button34.onmousedown = function (){onMouseDownDark34()};
}

function cycle34() {
  
  //SOLUTION
  var count34 = ``;

    for (let index = 10; index >= 1; index--) {
      count34 += `${index} `;
    };

    document.getElementById("c34").innerHTML = `${count34} UwU`;
    
    //SWITCH
    button34.onclick = function () {buttonc34()};
    //OH, STYLO
    button34.innerHTML = `UwU`;
    button34.onmouseover = function (){onMouseOverDark34()};
    button34.onmouseout = function (){onMouseOutDark34()};
    button34.onmousedown = function (){onMouseDownLight34()};
}
// 35. Leer dos números enteros y determinar a cuánto es igual el producto mutuo del primer dígito de cada uno.
function cycle35(){
  //variables
  var c35 = document.getElementById("cycle35").value;
  var c35b = document.getElementById("cycle35b").value;

  //Valores absolutos
  var abs = Math.abs(c35);
  var absb = Math.abs(c35b);

  //arrays
  var arr = Array.from(String(abs),Number);
  var arrb = Array.from(String(absb),Number);
  var product = arr[0]*arrb[0];
  var ngtv = ((c35*c35b)<0)? product*-1:product;
  var miau = (c35<0||c35b<0)? `Siempre respetando signos`:``;
  
  //Personalización del problema
  var digits = (arr.length==1)? `PRIMER NÚMERO: ${c35}`:`PRIMER DÍGITO DE ${c35}: ${arr[0]}`;
  var digitsb = (arrb.length==1)? `SEGUNDO NÚMERO: ${c35b}`:`PRIMER DÍGITO DE ${c35b}: ${arrb[0]}`;

  //Esquema de casos
  if ((c35 == 0 && c35b == 0)) {
    document.getElementById("c35").innerHTML = ``;
  }
  else if((c35 == "-" && c35b == "-")){
    document.getElementById("c35").innerHTML = ``; 
  }
  else {
    if (c35 == 0 || c35b == 0) {                                                                                           //PARA EJERCICIOS CON MÚLTIPLES VARIABLES 
      document.getElementById("c35").innerHTML = `Okay, un ${c35}${c35b}. Pero ponme un número en el otro cuadro también >:c`;
    }
    else{
      document.getElementById("c35").innerHTML = `${digits}<br> ${digitsb} <br> RESULTADO DEL PRODUCTO: ${ngtv} <br> ${miau} UwU`; 
    } 
  }  
}


// 36. Mostrar en pantalla la tabla de multiplicar del número 5.
//FUNCIONES PARA LOS BOTONES
var button36 = document.getElementById("cycle36");
function onMouseOverLight36(){
  button36.style.border="3px solid #ffaa22";
  button36.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
};
function onMouseOutLight36(){
  button36.style.border='3px solid #f7b64e';
  button36.style.color='#333333';
  button36.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function onMouseOverDark36(){
  button36.style.border="3px solid #ffaa22";
  button36.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function onMouseOutDark36(){
  button36.style.border = '3px solid #ffaa22';
  button36.style.color = 'rgb(31, 11, 11)';
  button36.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};
function onMouseDownDark36(){
  button36.style.border="1px solid #ffaa22";
  button36.style.background ="linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)";
  button36.style.color="rgb(31, 11, 11)";
	button36.style.top="1px";
};
function onMouseDownLight36(){
  button36.style.border="1px solid #ffa22";
  button36.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  button07.style.top="1px";
};

function buttonc36(){
  //SWITCH
  document.getElementById("c36").innerHTML = ``;
  button36.onclick = function () {cycle36()};
  //OH, STYLO
  button36.innerHTML = `LET'S GOOO >:C`;
  button36.onmouseover = function (){onMouseOverLight36()};
  button36.onmouseout = function (){onMouseOutLight36()};
  button36.onmousedown = function (){onMouseDownDark36()};
}

function cycle36() {
  
  //SOLUTION
  var count36 = ``;

    for (let index = 0; index <= 10; index++) {
      count36 += `5 * ${index} = ${5*index} <br>`;
    }

  document.getElementById("c36").innerHTML = `UwU <br> ${count36}`;
    
    //SWITCH
    button36.onclick = function () {buttonc36()};
    //OH, STYLO
    button36.innerHTML = `UwU`;
    button36.onmouseover = function (){onMouseOverDark36()};
    button36.onmouseout = function (){onMouseOutDark36()};
    button36.onmousedown = function (){onMouseDownLight36()};
}

// 37. Generar todas las tablas de multiplicar del 1 al 10.
//FUNCIONES PARA LOS BOTONES
var button37 = document.getElementById("cycle37");
function onMouseOverLight37(){
  button37.style.border="3px solid #ffaa22";
  button37.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
};
function onMouseOutLight37(){
  button37.style.border='3px solid #f7b64e';
  button37.style.color='#333333';
  button37.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function onMouseOverDark37(){
  button37.style.border="3px solid #ffaa22";
  button37.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function onMouseOutDark37(){
  button37.style.border = '3px solid #ffaa22';
  button37.style.color = 'rgb(31, 11, 11)';
  button37.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};
function onMouseDownDark37(){
  button37.style.border="1px solid #ffaa22";
  button37.style.background ="linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)";
  button37.style.color="rgb(31, 11, 11)";
	button37.style.top="1px";
};
function onMouseDownLight37(){
  button37.style.border="1px solid #ffa22";
  button37.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  button07.style.top="1px";
};

function buttonc37(){
  //SWITCH
  for (let index = 1; index <= 10; index++) {
    document.getElementById(`c37${index}`).innerHTML = ``;
  };
  button37.onclick = function () {cycle37()};
  //OH, STYLO
  button37.innerHTML = `LET'S GOOO >:C`;
  button37.onmouseover = function (){onMouseOverLight37()};
  button37.onmouseout = function (){onMouseOutLight37()};
  button37.onmousedown = function (){onMouseDownDark37()};
}

function cycle37() {
  
  //SOLUTION
  var count37 = ``;
  var number = 0; 

  for (let i = 1; i <= 10; i++) {    
    number = i;
    for (let n = 0; n <= 10; n++) {
      count37 += `${number} * ${n} = ${number*n}<br>`
    };  
    document.getElementById(`c37${i}`).innerHTML = `${count37}`;
    count37 = ``;
  };
    
    //SWITCH
    button37.onclick = function () {buttonc37()};
    //OH, STYLO
    button37.innerHTML = `UwU`;
    button37.onmouseover = function (){onMouseOverDark37()};
    button37.onmouseout = function (){onMouseOutDark37()};
    button37.onmousedown = function (){onMouseDownLight37()};
}

// 38. Leer un número entero y mostrar en pantalla su tabla de multiplicar.
function cycle38(){
  
    //VARIABLES BÁSICAS PARA EL CICLO
    var c38 = document.getElementById("cycle38").value;
    var aux = Number.parseInt(c38);
  
  //SOLUTION
  var count38 = ``;

    for (let index = 0; index <= 10; index++) {
      count38 += `${aux} * ${index} = ${aux*index} <br>`;
    }

  //CASOS    
    if (c38 == `` || c38 == "-") {
      document.getElementById("c38").innerHTML = ``;
    }
    else {
      document.getElementById("c38").innerHTML = `UwU <br> ${count38}`;
    }
    
}

// 39. Se define la serie de Fibonacci como la serie que comienza con los dígitos 1 y 0 y va sumando progresivamente los dos últimos elementos de la serie, así:
//     0 1 1 2 3 5 8 13 21 34.......
//     Utilizando el concepto de ciclo generar la serie de Fibonacci hasta llegar o sobrepasas el número 10.000.
//FUNCIONES PARA LOS BOTONES
var button39 = document.getElementById("cycle39");
function onMouseOverLight39(){
  button39.style.border="3px solid #ffaa22";
  button39.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
};
function onMouseOutLight39(){
  button39.style.border='3px solid #f7b64e';
  button39.style.color='#333333';
  button39.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function onMouseOverDark39(){
  button39.style.border="3px solid #ffaa22";
  button39.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function onMouseOutDark39(){
  button39.style.border = '3px solid #ffaa22';
  button39.style.color = 'rgb(31, 11, 11)';
  button39.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};
function onMouseDownDark39(){
  button39.style.border="1px solid #ffaa22";
  button39.style.background ="linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)";
  button39.style.color="rgb(31, 11, 11)";
	button39.style.top="1px";
};
function onMouseDownLight39(){
  button39.style.border="1px solid #ffa22";
  button39.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  button07.style.top="1px";
};

function buttonc39(){
  //SWITCH
  document.getElementById("c39").innerHTML = ``;
  button39.onclick = function () {cycle39()};
  //OH, STYLO
  button39.innerHTML = `LET'S GOOO >:C`;
  button39.onmouseover = function (){onMouseOverLight39()};
  button39.onmouseout = function (){onMouseOutLight39()};
  button39.onmousedown = function (){onMouseDownDark39()};
}

function cycle39() {
  
  //FIBONNACI
  a = 0;
  b = 1;
  text = ``;

  for (let fibo = 0; fibo <= 11000; fibo = a+b) {
    text += `${fibo}`;
    a = b;
    b = fibo;

    if (fibo<10000){
      text += `, `;
    }
    else {
      text += `...`;
    };
  };
  
  document.getElementById("c39").innerHTML = `${text} <br> UwU`;
    
    //SWITCH
    button39.onclick = function () {buttonc39()};
    //OH, STYLO
    button39.innerHTML = `UwU`;
    button39.onmouseover = function (){onMouseOverDark39()};
    button39.onmouseout = function (){onMouseOutDark39()};
    button39.onmousedown = function (){onMouseDownLight39()};
}

// 40. Leer un número de dos dígitos y determinar si pertenece a la serie de Fibonacci.
function cycle40(){
  
    //VARIABLES BÁSICAS PARA EL CICLO
    var c40 = document.getElementById("cycle40").value;
    var abs = Math.abs(c40);
    var arr = Array.from(String(abs),Number);
    var length = arr.length;
  
    //FIBONACCI
  var a = 0;
  var b = 1;
  var box = [];

  for (let fibo = 0; fibo <= 11000; fibo = a+b) {
    box.push(fibo);
    a = b;
    b = fibo;
  };

  var fibou = box.filter(x=>x==abs);
  var ngtv = (c40<0)? `<br> Aunque es negativo... Pero eso le quitas el menos (-) y ya queda xd UwU`:``;
  var solution = (fibou.length==1 || abs == 1)? `PERTENECE A LA SERIE FIBONACCI :DD ${ngtv}`:`no pertenece a la serie FIBONACCI :c Prueba con otro número <br> ...En el ejercicio anterior tienes la serie hasta el n° 10.000 *guiño guiño* `;
  var digits = (length==1)? `dígito`:`dígitos`;
  var fiboFilter = (fibou.length==1 || abs == 1)? `y es una pena porque...<br> SI ${solution}`:`<br>...Y de todas maneras, ${solution}`;
  var twoDigits = (length==2)? `Aunque el ${c40} tiene ${length} ${digits}, ${solution}`:`El ${c40} no tiene 2 dígitos sino ${length} :C ${fiboFilter}`;
  var fibonacci = (length==2 && fibou.length==1)? `El ${c40} no sólo tiene ${length} ${digits}, sino que también... ${solution} <br> AWIWIIIIIIIIIIIIII UwUwUwUwUwUwUwU xd`:`${twoDigits}`;
  
  
    if (c40 == `` || c40 == "-") {
      document.getElementById("c40").innerHTML = ``;
    }
    else {
      switch (length) {
        case 2:
          document.getElementById("c40").innerHTML = ` ${fibonacci}   `;
          break;
          
        default:
          document.getElementById("c40").innerHTML = `${fibonacci}   `;
          break;
      }
    }
}

// 41. Determinar a cuánto es igual la suma de los elementos de la serie de Fibonacci entre 0 y 100.
//FUNCIONES PARA LOS BOTONES
var button41 = document.getElementById("cycle41");
function onMouseOverLight41(){
  button41.style.border="3px solid #ffaa22";
  button41.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
};
function onMouseOutLight41(){
  button41.style.border='3px solid #f7b64e';
  button41.style.color='#333333';
  button41.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function onMouseOverDark41(){
  button41.style.border="3px solid #ffaa22";
  button41.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function onMouseOutDark41(){
  button41.style.border = '3px solid #ffaa22';
  button41.style.color = 'rgb(31, 11, 11)';
  button41.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};
function onMouseDownDark41(){
  button41.style.border="1px solid #ffaa22";
  button41.style.background ="linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)";
  button41.style.color="rgb(31, 11, 11)";
	button41.style.top="1px";
};
function onMouseDownLight41(){
  button41.style.border="1px solid #ffa22";
  button41.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  button07.style.top="1px";
};

function buttonc41(){
  //SWITCH
  document.getElementById("c41").innerHTML = ``;
  button41.onclick = function () {cycle41()};
  //OH, STYLO
  button41.innerHTML = `LET'S GOOO >:C`;
  button41.onmouseover = function (){onMouseOverLight41()};
  button41.onmouseout = function (){onMouseOutLight41()};
  button41.onmousedown = function (){onMouseDownDark41()};
}

function cycle41() {
  
    //FIBONACCI
  a = 0;
  b = 1;
  text = ``;
  summ = 0;

  for (let fibo = 0; fibo <= 100; fibo = a+b) {

    //FOR TEXTING FIBO SERIE
    text += `${fibo}`;
    a = b;
    b = fibo;

    if (fibo<80){
      text += ` + `;
    }
    else {
      text += ` = ...`;
    };
    //FOR SUMMARIZE THAT FIBO SERIE TIL 100
    summ += fibo;

  };
  
  document.getElementById("c41").innerHTML = `${text} <br> ¡¡¡ ${summ} !!! Es el total de sumar la serie fibonacci hasta 100 UwU`;
    
    //SWITCH
    button41.onclick = function () {buttonc41()};
    //OH, STYLO
    button41.innerHTML = `UwU`;
    button41.onmouseover = function (){onMouseOverDark41()};
    button41.onmouseout = function (){onMouseOutDark41()};
    button41.onmousedown = function (){onMouseDownLight41()};
}

// 42. Determinar a cuánto es igual el promedio entero de los elementos de la serie de Fibonacci entre 0 y 1000.
//FUNCIONES PARA LOS BOTONES
var button42 = document.getElementById("cycle42");
function onMouseOverLight42(){
  button42.style.border="3px solid #ffaa22";
  button42.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
};
function onMouseOutLight42(){
  button42.style.border='3px solid #f7b64e';
  button42.style.color='#333333';
  button42.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function onMouseOverDark42(){
  button42.style.border="3px solid #ffaa22";
  button42.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function onMouseOutDark42(){
  button42.style.border = '3px solid #ffaa22';
  button42.style.color = 'rgb(31, 11, 11)';
  button42.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};
function onMouseDownDark42(){
  button42.style.border="1px solid #ffaa22";
  button42.style.background ="linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)";
  button42.style.color="rgb(31, 11, 11)";
	button42.style.top="1px";
};
function onMouseDownLight42(){
  button42.style.border="1px solid #ffa22";
  button42.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  button07.style.top="1px";
};

function buttonc42(){
  //SWITCH
  document.getElementById("c42").innerHTML = ``;
  button42.onclick = function () {cycle42()};
  //OH, STYLO
  button42.innerHTML = `LET'S GOOO >:C`;
  button42.onmouseover = function (){onMouseOverLight42()};
  button42.onmouseout = function (){onMouseOutLight42()};
  button42.onmousedown = function (){onMouseDownDark42()};
}

function cycle42() {
  
    //FIBONACCI
  var a = 0;
  var b = 1;
  var text = ``;
  var summ = 0;
  var box = [];

  for (let fibo = 0; fibo <= 1000; fibo = a+b) {

    //FOR TEXTING FIBO SERIE
    text += `${fibo}`;
    a = b;
    b = fibo;

    if (fibo<900){
      text += ` + `;
    }
    else {
      text += ` = ...`;
    };
    //FOR SUMMARIZE THAT FIBO SERIE 
    summ += fibo;
    box.push(fibo);
  };

    var avg = Number.parseInt(summ/box.length);
  
  document.getElementById("c42").innerHTML = `${text} <br> ¡¡¡ ${summ} !!! Es el total de sumar la serie fibonacci hasta 1000 UwU <br> Y el promedio entero de esta serie fibonacci hasta 1000 es ${avg} ( ${summ} / ${box.length} c: )`;
    
    //SWITCH
    button42.onclick = function () {buttonc42()};
    //OH, STYLO
    button42.innerHTML = `UwU`;
    button42.onmouseover = function (){onMouseOverDark42()};
    button42.onmouseout = function (){onMouseOutDark42()};
    button42.onmousedown = function (){onMouseDownLight42()};
}

// 43. Determinar cuántos elementos de la serie de Fibonacci se encuentran entre 1000 y 2000.
//FUNCIONES PARA LOS BOTONES
var button43 = document.getElementById("cycle43");
function onMouseOverLight43(){
  button43.style.border="3px solid #ffaa22";
  button43.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
};
function onMouseOutLight43(){
  button43.style.border='3px solid #f7b64e';
  button43.style.color='#333333';
  button43.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function onMouseOverDark43(){
  button43.style.border="3px solid #ffaa22";
  button43.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function onMouseOutDark43(){
  button43.style.border = '3px solid #ffaa22';
  button43.style.color = 'rgb(31, 11, 11)';
  button43.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};
function onMouseDownDark43(){
  button43.style.border="1px solid #ffaa22";
  button43.style.background ="linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)";
  button43.style.color="rgb(31, 11, 11)";
	button43.style.top="1px";
};
function onMouseDownLight43(){
  button43.style.border="1px solid #ffa22";
  button43.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  button07.style.top="1px";
};

function buttonc43(){
  //SWITCH
  document.getElementById("c43").innerHTML = ``;
  button43.onclick = function () {cycle43()};
  //OH, STYLO
  button43.innerHTML = `LET'S GOOO >:C`;
  button43.onmouseover = function (){onMouseOverLight43()};
  button43.onmouseout = function (){onMouseOutLight43()};
  button43.onmousedown = function (){onMouseDownDark43()};
}

function cycle43() {
  
    //FIBONACCI
  a = 0;
  b = 1;
  text = ``;
  summ = 0;
  box = [];

  for (let fibo = 0; fibo <= 3000; fibo = a+b) {

    //FOR TEXTING FIBO SERIE
    text += `${fibo}`;
    a = b;
    b = fibo;
    
    if (fibo<2500){
      text += `, `;
    }
    else {
      text += `...`;
    };
    //FOR SUMMARIZE THAT FIBO SERIE TIL 100
    summ += fibo;
    box.push(fibo);
  };

  howMany = box.length;

  document.getElementById("c43").innerHTML = `Entre el 1000 y el 2000 sólo hay un número fibonacci: el 1597 <br> Aquí abajo te los dejo por si no me crees UwU <br> ${text} xd`;
    
    //SWITCH
    button43.onclick = function () {buttonc43()};
    //OH, STYLO
    button43.innerHTML = `UwU`;
    button43.onmouseover = function (){onMouseOverDark43()};
    button43.onmouseout = function (){onMouseOutDark43()};
    button43.onmousedown = function (){onMouseDownLight43()};
}

// 44. Leer un número y calcularle su factorial.
function cycle44(){
  
    //VARIABLES BÁSICAS PARA EL CICLO
    var c44 = document.getElementById("cycle44").value;
    var aux = Math.abs(c44);
    var text = ``;
    
    //FACTOR NUMBERS!
    var fact = 1;
    for (let i = 1; i <= aux; i++) {
      //ALGORITHM FOR TEXT      
      text += `${i}`;
      if (i < aux){
        text += ` * `;
      }
      else {
        text += ` = `;
      }

      //ALGORITHM FOR RESULT
      fact = fact*i;
    };

    ngtv = (c44<0)? `<br> Aunque por definición, <br> los factoriales no pueden ser negativos... <br> Pero te la paso por esta vez, humano xd`:``;
  
    if (c44 == `` || c44 == "-") {
      document.getElementById("c44").innerHTML = ``;
    }
    else {
        document.getElementById("c44").innerHTML = `${text} ¡¡¡ ${fact} !!! <br> Ese es el factorial de ${c44} UwU ${ngtv}`;
    }
}

// 45. Leer un número y calcularle el factorial a todos los enteros comprendidos entre 1 y el número leído.
function cycle45(){
  
    //VARIABLES BÁSICAS PARA EL CICLO
    var c45 = document.getElementById("cycle45").value;
    var abs = Math.abs(c45);
    
    //VARIABLES NECESARIAS PARA EL FACTORIAL EN CICLO
    var fact = 1;
    var arr = [];
    var array = [];
    var arrow = 0;
    var text = ``;
    
    //CICLO PARA ORGANIZAR LOS NÚMEROS DE 1 A N
    for (let number = 1; number <= abs; number++) {
      arr.push(number);
      array = arr.filter((value,index,array)=>array.indexOf(value)===index);
    };
    
    //CICLO FACTORIAL
    for (let index = 0; index < array.length; index++) {
      arrow = array[index];
      for (let count = 1; count <= arrow; count++) { 
        //algorithm for solution
        fact = fact*count;
        //ALGORITHM FOR TEXT      
        text += `${count}`;
        if (count < arrow ){
          text += ` * `;
        }
        else {
          text += ` = ${fact} <br>`;
        }      
      }
    };

    var red = (c45<0)? `Que los números negativos no pueden ser factorialesss >:c pero supongamos que <br> no tiene ese feo signo de menos (-) y calculémoslo igual UwU`:``;
      
  
    if (c45 == `` || c45 == "-" || c45 == 0) {
      document.getElementById("c45").innerHTML = ``;
    }
    else {
      document.getElementById("c45").innerHTML = `UwU <br> ${text}${red}`;
    }
}

// 46. Leer un número entero y calcular el promedio entero de los factoriales de los enteros comprendidos entre 1 y el número leído.
function cycle46(){
  
  //VARIABLES BÁSICAS PARA EL CICLO
  var c46 = document.getElementById("cycle46").value;
  var abs = Math.abs(c46);
  
  //VARIABLES NECESARIAS PARA EL FACTORIAL EN CICLO
  var fact = 1;
  var arr = [];
  var array = [];
  var arrow = 0;
  var text = ``;
  var summ = 0;
  
  //CICLO PARA ORGANIZAR LOS NÚMEROS DE 1 A N
  for (let number = 1; number <= abs; number++) {
    arr.push(number);
    array = arr.filter((value,index,array)=>array.indexOf(value)===index);
  };
  
  //CICLO FACTORIAL
  for (let index = 0; index < array.length; index++) {
    arrow = array[index];
    for (let count = 1; count <= arrow; count++) { 
      //algorithm for solution
      fact = fact*count;
      //ALGORITHM FOR TEXT      
      text += `${count}`;
      if (count < arrow ){
        text += ` * `;
      }
      else {
        text += ` = ${fact} <br>`;
        summ += fact;
      }      
    }
  };

  var red = (c46<0)? `Que los números negativos no pueden ser factorialesss >:c pero supongamos que <br> no tiene ese feo signo de menos (-) y calculémoslo igual UwU`:``;
  var avg = Number.parseInt(summ/arr.length);

  if (c46 == `` || c46 == "-" || c46 == 0) {
    document.getElementById("c46").innerHTML = ``;
  }
  else {
    document.getElementById("c46").innerHTML = `SUMA DE FACTORIALES: ${summ} <br> CANTIDAD DE ELEMENTOS: ${array.length} <br> PROMEDIO ENTERO: ${avg}  UwU <br> Puedes comprobarlo tú mismo, humano c: <br> ${text}${red}`;
  }
}

// 47. Leer un número entero y calcular a cuánto es igual la sumatoria de todos los factoriales de los números comprendidos entre 1 y el número leído.
function cycle47(){
  
  //VARIABLES BÁSICAS PARA EL CICLO
  var c47 = document.getElementById("cycle47").value;
  var abs = Math.abs(c47);
  
  //VARIABLES NECESARIAS PARA EL FACTORIAL EN CICLO
  var fact = 1;
  var arr = [];
  var array = [];
  var arrow = 0;
  var text = ``;
  var summ = 0;
  
  //CICLO PARA ORGANIZAR LOS NÚMEROS DE 1 A N
  for (let number = 1; number <= abs; number++) {
    arr.push(number);
    array = arr.filter((value,index,array)=>array.indexOf(value)===index);
  };
  
  //CICLO FACTORIAL
  for (let index = 0; index < array.length; index++) {
    arrow = array[index];
    for (let count = 1; count <= arrow; count++) { 
      //algorithm for solution
      fact = fact*count;
      //ALGORITHM FOR TEXT      
      text += `${count}`;
      if (count < arrow ){
        text += ` * `;
      }
      else {
        text += ` = ${fact} <br>`;
        summ += fact;
      }      
    }
  };

  var red = (c47<0)? `Que los números negativos no pueden ser factorialesss >:c pero supongamos que <br> no tiene ese feo signo de menos (-) y calculémoslo igual UwU`:``;
    

  if (c47 == `` || c47 == "-" || c47 == 0) {
    document.getElementById("c47").innerHTML = ``;
  }
  else {
    document.getElementById("c47").innerHTML = `SUMA DE FACTORIALES: ${summ} UwU <br> Puedes comprobarlo tú mismo, humano c: <br> ${text}${red}`;
  }
}

// 48. Utilizando ciclos anidados generar las siguientes parejas de enteros

// 0 1
// 1 1
// 2 2
// 3 2
// 4 3
// 5 3
// 6 4
// 7 4
// 8 5
// 9 5

//FUNCIONES PARA LOS BOTONES
var button48 = document.getElementById("cycle48");
function onMouseOverLight48(){
  button48.style.border="3px solid #ffaa22";
  button48.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
};
function onMouseOutLight48(){
  button48.style.border='3px solid #f7b64e';
  button48.style.color='#333333';
  button48.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function onMouseOverDark48(){
  button48.style.border="3px solid #ffaa22";
  button48.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function onMouseOutDark48(){
  button48.style.border = '3px solid #ffaa22';
  button48.style.color = 'rgb(31, 11, 11)';
  button48.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};
function onMouseDownDark48(){
  button48.style.border="1px solid #ffaa22";
  button48.style.background ="linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)";
  button48.style.color="rgb(31, 11, 11)";
	button48.style.top="1px";
};
function onMouseDownLight48(){
  button48.style.border="1px solid #ffa22";
  button48.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  button07.style.top="1px";
};

function buttonc48(){
  //SWITCH
  document.getElementById("c48").innerHTML = ``;
  button48.onclick = function () {cycle48()};
  //OH, STYLO
  button48.innerHTML = `LET'S GOOO >:C`;
  button48.onmouseover = function (){onMouseOverLight48()};
  button48.onmouseout = function (){onMouseOutLight48()};
  button48.onmousedown = function (){onMouseDownDark48()};
}

function cycle48() {
  
  //SOLUTION
  var left = [];
  var right = [];
  var text = ``;

  for (let miau = 0; miau <= 9; miau++) {
    left.push(miau);
  };
  
  for (let lol = 1; lol <= 5; lol++) {
    for (let wow = 1; wow <= 2; wow++) { 
      right.push(lol);
    }
  };

  for (let pairs = 0; pairs <= 9; pairs++) {
    text += `${left[pairs]} ${right[pairs]} <br>`;
  };

  document.getElementById("c48").innerHTML = `${text} <br> aWIWIII`;
  
    //SWITCH
    button48.onclick = function () {buttonc48()};
    //OH, STYLO
    button48.innerHTML = `UwU`;
    button48.onmouseover = function (){onMouseOverDark48()};
    button48.onmouseout = function (){onMouseOutDark48()};
    button48.onmousedown = function (){onMouseDownLight48()};
}

// 49. Utilizando ciclos anidados generar las siguientes ternas de números

// 1 1 1
// 2 1 2
// 3 1 3
// 4 2 1
// 5 2 2
// 6 2 3
// 7 3 1
// 8 3 2
// 9 3 3

//FUNCIONES PARA LOS BOTONES
var button49 = document.getElementById("cycle49");
function onMouseOverLight49(){
  button49.style.border="3px solid #ffaa22";
  button49.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
};
function onMouseOutLight49(){
  button49.style.border='3px solid #f7b64e';
  button49.style.color='#333333';
  button49.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function onMouseOverDark49(){
  button49.style.border="3px solid #ffaa22";
  button49.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function onMouseOutDark49(){
  button49.style.border = '3px solid #ffaa22';
  button49.style.color = 'rgb(31, 11, 11)';
  button49.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};
function onMouseDownDark49(){
  button49.style.border="1px solid #ffaa22";
  button49.style.background ="linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)";
  button49.style.color="rgb(31, 11, 11)";
	button49.style.top="1px";
};
function onMouseDownLight49(){
  button49.style.border="1px solid #ffa22";
  button49.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  button07.style.top="1px";
};

function buttonc49(){
  //SWITCH
  document.getElementById("c49").innerHTML = ``;
  button49.onclick = function () {cycle49()};
  //OH, STYLO
  button49.innerHTML = `LET'S GOOO >:C`;
  button49.onmouseover = function (){onMouseOverLight49()};
  button49.onmouseout = function (){onMouseOutLight49()};
  button49.onmousedown = function (){onMouseDownDark49()};
}

function cycle49() {
  
  //SOLUTION
  var left = [];
  var mid = [];
  var right = [];
  var text = ``;

  //LEFT NUMBER
  for (let miau = 1; miau <= 9; miau++) {
    left.push(miau);
  };
  
  //MID NUMBER
  for (let lol = 1; lol <= 3; lol++) {
    for (let wow = 1; wow <= 3; wow++) { 
      mid.push(lol);
    }
  };
  
  //RIGHT NUMBER
  for (let lol = 1; lol <= 3; lol++) {
    for (let wow = 1; wow <= 3; wow++) { 
      right.push(wow);
    }
  };

  //full sequence
  for (let pairs = 0; pairs <= 8; pairs++) {
    text += `${left[pairs]} ${mid[pairs]} ${right[pairs]} <br>`;
  };

  document.getElementById("c49").innerHTML = `${text} <br> :DD aWIWIII`;
  
    //SWITCH
    button49.onclick = function () {buttonc49()};
    //OH, STYLO
    button49.innerHTML = `UwU`;
    button49.onmouseover = function (){onMouseOverDark49()};
    button49.onmouseout = function (){onMouseOutDark49()};
    button49.onmousedown = function (){onMouseDownLight49()};
}

// 50. Utilizando ciclos anidados generar las siguientes parejas de números

// 0 1
// 1 1
// 2 1
// 3 1
// 4 2
// 5 2
// 6 2
// 7 2

//FUNCIONES PARA LOS BOTONES
var button50 = document.getElementById("cycle50");
function onMouseOverLight50(){
  button50.style.border="3px solid #ffaa22";
  button50.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
};
function onMouseOutLight50(){
  button50.style.border='3px solid #f7b64e';
  button50.style.color='#333333';
  button50.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function onMouseOverDark50(){
  button50.style.border="3px solid #ffaa22";
  button50.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function onMouseOutDark50(){
  button50.style.border = '3px solid #ffaa22';
  button50.style.color = 'rgb(31, 11, 11)';
  button50.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};
function onMouseDownDark50(){
  button50.style.border="1px solid #ffaa22";
  button50.style.background ="linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)";
  button50.style.color="rgb(31, 11, 11)";
	button50.style.top="1px";
};
function onMouseDownLight50(){
  button50.style.border="1px solid #ffa22";
  button50.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  button07.style.top="1px";
};

function buttonc50(){
  //SWITCH
  document.getElementById("c50").innerHTML = ``;
  button50.onclick = function () {cycle50()};
  //OH, STYLO
  button50.innerHTML = `LET'S GOOO >:C`;
  button50.onmouseover = function (){onMouseOverLight50()};
  button50.onmouseout = function (){onMouseOutLight50()};
  button50.onmousedown = function (){onMouseDownDark50()};
}

function cycle50() {
  
  //SOLUTION
  var left = [];
  var right = [];
  var text = ``;

  for (let miau = 0; miau <= 7; miau++) {
    left.push(miau);
  };
  
  for (let lol = 1; lol <= 2; lol++) {
    for (let wow = 1; wow <= 4; wow++) { 
      right.push(lol);
    }
  };

  for (let pairs = 0; pairs <= 7; pairs++) {
    text += `${left[pairs]} ${right[pairs]} <br>`;
  };

  document.getElementById("c50").innerHTML = `${text} <br> AWIWII UwU`;
  
    //SWITCH
    button50.onclick = function () {buttonc50()};
    //OH, STYLO
    button50.innerHTML = `UwU`;
    button50.onmouseover = function (){onMouseOverDark50()};
    button50.onmouseout = function (){onMouseOutDark50()};
    button50.onmousedown = function (){onMouseDownLight50()};
}

// 50 algoritmos reales de arreglos

x = 0
a = 0
b = 0
c = 0
d = 0

// Función para omitir el 0 como número máximo en un arreglo lleno de valores negativos
var max2 = -1000;

const theSecondHigher = (arr) =>{
  var arr;
  let max1 = max2;
  
  for(var i=0;i<arr.length;i++){
    if((Number.parseInt(arr[i]))>max1){
      if(arr[i]!=0){
        max1=(Number.parseInt(arr[i]));
      }
    };
    if(max1!=0 && max1!=max2){
      max2 = max1;
      return max1;
    };
  };
    if(max1 == max1){
      return max1;
    };
}

//DRAG AND DROP
var vectorBlocks = document.querySelectorAll("div.vector > div");
var dragSrcEl = null;
function handleDragStart(e){
  this.style.opacity = '0.4';
  let ploop = new Audio("./music/drag.mp3");
  ploop.play();
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html',this.innerHTML);}
function handleDragOver(e){
  if (e.preventDefault){e.preventDefault();}
  e.dataTransfer.dropEffect = 'move';
  return false;
}
function handleDragEnter(e){this.classList.add('over');}
function handleDragLeave(e){this.classList.remove('over');}
function handleDrop(e){
  let droop = new Audio("./music/drop.mp3");
  droop.play();
  if(e.stopPropagation){e.stopPropagation();}
  if (dragSrcEl != this){
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
  }
  return false; 
}
function handleDragEnd(e){
  this.style.opacity = '1';
  [].forEach.call(vectorBlocks,function(block){
    block.classList.remove('over');
  });
}
//DRAG AND DROP PARA EL VECTOR Y SUS CASILLAS
[].forEach.call(vectorBlocks,function(block){
  block.addEventListener('dragstart',handleDragStart);
  block.addEventListener('dragover',handleDragOver);
  block.addEventListener('dragenter',handleDragEnter);
  block.addEventListener('dragleave',handleDragLeave);
  block.addEventListener('drop',handleDrop);
  block.addEventListener('dragend',handleDragEnd);
});


//IMÁGENES DE FLECHAS APAGADAS PARA VECTORES
var offArrows = document.querySelectorAll("div.arrow > div");
[].forEach.call(offArrows,function(quiver){
  quiver.innerHTML = `<img class="arrowImg" src="./arrowOff.png" alt="Aquí había una flecha... Ya no está xd">`;
});


//OBJETO PARA GENERAR UN ARRAY Y 10 NÚMEROS ALEATORIOS DESDE -999 HASTA 999
class get10Random {
  constructor(vectorClass) {
    this.nums = 0;
    this.box = document.getElementsByClassName(vectorClass);
    this.aux = new Array;

    this.method = function (min, max) {
      if (this.aux.length == 10) {
        this.aux = new Array;
        for (let i = 0; i < 10; i++) {
          this.nums = Math.round(Math.random() * (max - min) + min);
          this.aux.push(this.nums);
          this.box[i].innerHTML = this.aux[i];
        }
      }
      else {
        for (let i = this.aux.length; i < 10; i++) {
          this.nums = Math.round(Math.random() * (max - min) + min);
          this.aux.push(this.nums);
          this.box[i].innerHTML = this.aux[i];
        }
      }
      return this.box;
    };

    this.equalize = function () {
      for (let i = 0; i < this.aux.length; i++) {
        this.box[i].innerHTML = this.aux[i];
      }
      if (this.aux.length == 0) {
        for (let i = 0; i < 10; i++) {
          this.box[i].innerHTML = ``;
        }
      }
      return this.box;
    };
  }
}



// 1. Leer 10 enteros, almacenarlos en un vector y determinar en qué posición del vector está el mayor número leído.
var box01 = new get10Random("vector01");
var buttona01 = document.getElementById("arrayb01");
var inputArr01 = document.getElementById("arrayi01");
var freedom;
var justice;
var love;
var flash = 0;
var xd = 0;
var cancelButton = 0;
  //DRAG AND DROP
  [].forEach.call(vectorBlocks,function(block){
    block.addEventListener('dragend',solutiona01);
  });

//solución al problema
function solutiona01(){
  if (cancelButton==1){}
  else{
    
  function limitSolution(){
    cancelButton = 0;
  };
  //Variables locales elementales
  let arrow = document.getElementsByClassName("arrow01");
  var imgOn   = '<img class="arrowImg" src="./arrowOn.png" alt="Aquí había una flecha... Ya no está xd">';
  var imgOff = `<img class="arrowImg" src="./arrowOff.png" alt="Aquí había una flecha... Ya no está xd">`;
  var img = `<img class="arrowImg" src="./arrow.png" alt="Aquí había una flecha... Ya no está xd">`;
  //Un reinicio ligero al oprimir el vector
  [].forEach.call(arrow,function(arrows){
    arrows.innerHTML = imgOff; 
  });
    //Variables para solucionar la pregunta concreta
    var arrVector01 = [];
    for (let nums of box01.box){
      if (nums.textContent == 0){
        arrVector01.push(Number.parseInt(0));
      }
      else{
        arrVector01.push(Number.parseInt(nums.textContent));
      }
    };
    var seeker = ((Math.max(...arrVector01))==0)? theSecondHigher(arrVector01):Math.max(...arrVector01);
    var snitch = arrVector01.indexOf(seeker);

  //"Animación" de las flechas
  function animation(){
    var card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    if(xd == 2){ 
      if (flash==-1){
        arrow[0].innerHTML = imgOff;
        xd = 0;
        flash=0;
      }
      else if (flash==0){
        arrow[1].innerHTML = imgOff;
        arrow[0].innerHTML = img;
        flash=-1;
      }
      else{
        if (flash<=8){
          arrow[(flash+1)].innerHTML = imgOff;
        };
        arrow[flash].innerHTML = img;
        flash--;
      }               
    }
    else if(xd == 1){             //¿A LAS CUÁNTAS VUELTAS QUIERES VOLTEAR?
      flash = 9;
      arrow[flash].innerHTML = img;
      xd = 2;
      flash--;
    }
    else{
      if (flash==10){                       //VUELTA 2
        arrow[(flash-1)].innerHTML = imgOff;
        xd++;
        flash = 0;
      }
      else{                                 //VUELTA 1
        if (flash>=1){
          arrow[(flash-1)].innerHTML = imgOff;
        };
        arrow[flash].innerHTML = img;
        flash++;
      }
    };
      getE("a01e").innerHTML = `...`
  };  

  //SOLUCIÓN LÓGICA ESQUEMÁTICA DEL PROBLEMA 
  function solution(){
    clearInterval(freedom);
    win = new Audio();
    win.src = "music/win.mp3";
    win.play();
    card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();
    flash = snitch;

    for (let i = 0; i < 10; i++) {
      if(i == snitch) {
        arrow[i].innerHTML = imgOn;
      }
      else{
        arrow[i].innerHTML = imgOff;
      }
    };
    getE("a01e").innerHTML = `De este vector, el número más alto es el ${seeker} y se halla en la posición n°${snitch} c:`;
  }; 


  //Diálogos al vaciar
  if (box01.aux.length == 0) {
    flash = 0;

    getE("a01e").innerHTML = ``;
    [].forEach.call(arrow,function(arrows){
      arrows.innerHTML = imgOff; 
    });
  }
  else if (box01.aux.length == 10){
    cancelButton = 1;
    freedom = setInterval(animation,250);
    justice = setTimeout(solution, 2000);
    love = setTimeout(limitSolution,3000);
  }
  else{
    console.log(arrVector01);
    console.log(box01.aux);
    getE("a01e").innerHTML = `De este vector, el número más alto es el ${seeker} y se halla en la posición n°${snitch} c: <br> Te invito a llenar todo el vector, humano, y mira lo que pasa -guiño guiño-`;
  };
};
};


//FUNCIONES PARA EL INPUT
inputArr01.addEventListener("keydown",arrayi01, false); 
function arrayi01(e){
    //DIÁLOGOS PARA EL BOTÓN
    if (box01.aux.length == 10 || box01.aux.length == 0){
      buttona01.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
    }
    else{
      if (box01.aux.length == 9){
        buttona01.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      }
      else{
        buttona01.innerHTML = `GENERAR ${10-box01.aux.length} NÚMEROS ALEATORIOS`;
      }
    };

  var ngt = (inputArr01.value<0)? `-`:``;
  if (inputArr01.value == `` || inputArr01.value == '-' || inputArr01.value == '--' || inputArr01.value == '---' || inputArr01.value == '----' || inputArr01.value == NaN){
    document.getElementById("a01").innerHTML = ``;
  }
  else{
    if (inputArr01.value == 0){
      if (box01.aux.length > 0){
        document.getElementById("a01").innerHTML = `¿Quieres reiniciar el vector, humano? ¡Tírame ese cero entonces! c:<`;
      }
      else{
        document.getElementById("a01").innerHTML = `Oye, humano... Primero regístrame números con ENTER <br> antes de estar pensando en reiniciar el vector... ¿No? >:c`;
      }
    }
    else{
      document.getElementById("a01").innerHTML = `¡Cool, un ${ngt}${Math.abs(inputArr01.value)}! Regístralo oprimiendo ENTER c:`;
    }
  };
  //Ejecutar función cuando se oprima ENTER
  if (e.keyCode === 13){ 
    if (inputArr01.value == `` || inputArr01.value == '-' || inputArr01.value == '--' || inputArr01.value == '---' || inputArr01.value == '----' || inputArr01.value == NaN){
      inputArr01.value = ``;
    }
    else if (inputArr01.value == 0){
      if(box01.aux==0){
        inputArr01.value = ``;
      }
      else{
        let zero = new Audio();
        zero.src = "music/hollow.mp3";
        zero.play();
        clearTimeout(justice);
        clearInterval(freedom);
        document.getElementById("a01b").innerHTML = ``;
        document.getElementById("a01c").innerHTML = `Vector reiniciado con éxito.`;
        setTimeout(fade,7000);
        function fade(){
          return document.getElementById("a01c").innerHTML = ``;
        };
        box01.aux = [];
        box01.equalize();
        solutiona01();
        inputArr01.value = ``;
      }
    }
    else{
      if (box01.aux.length == 10){
        document.getElementById("a01c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        box01.aux.shift();
        box01.aux.push(Number(inputArr01.value));
        box01.equalize();
        solutiona01();
        inputArr01.value = ``;
      }
      else{
        document.getElementById("a01c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        box01.aux.push(Number(inputArr01.value));
        box01.equalize();
        solutiona01();
        inputArr01.value = ``;
      }
    }
  };
} 

//FUNCIONES PARA EL BOTÓN
function onMouseOverLight01(){
  buttona01.style.border="3px solid #ffab22";
  buttona01.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  buttona01.style.color="rgb(31, 11, 11)";
};
function onMouseOutLight01(){
  buttona01.style.border='3px solid #f7b64e';
  buttona01.style.color='#333333';
  buttona01.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function onMouseOverDark01(){
  buttona01.style.border="3px solid #ffaa22";
  buttona01.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function onMouseOutDark01(){
  buttona01.style.border = '1px solid #ff9d00';
  buttona01.style.color = 'rgb(31, 11, 11)';
  buttona01.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};

function array01(){
  //SOLUTION
  box01.method(-999,10000);
  document.getElementById("a01c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
  buttona01.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
  solutiona01();

  //OH, STYLO
  buttona01.onmouseover = function (){onMouseOverLight01()};
  buttona01.onmouseout = function (){onMouseOutLight01()};
  buttona01.onmousedown = function (){onMouseOutDark01()};
  buttona01.onmouseup = function (){onMouseOverDark01()};
}

// 2. Leer 10 enteros, almacenarlos en un vector y determinar en qué posición del vector está el mayor número par leído.
function array02(){

}

// 3. Leer 10 enteros, almacenarlos en un vector y determinar en qué posición del vector está el mayor número primo leído.
function array03(){

}
// 4. Cargar un vector de 10 posiciones con los 10 primeros elementos de la serie de Fibonacci y mostrarlo en pantalla.
function array04(){

}

// 5. Almacenar en un vector de 10 posiciones los 10 números primos comprendidos entre 100 y 300. Luego mostrarlos en pantalla.
function array05(){

}

// 6. Leer dos números enteros y almacenar en un vector los 10 primeros números primos comprendidos entre el menor y el mayor. Luego mostrarlos en pantalla.
function array06(){

}

// 7. Leer 10 números enteros, almacenarlos en un vector y determinar en qué posiciones se encuentra el número mayor.
function array07(){

}

// 8. Leer 10 números enteros, almacenarlos en un vector y determinar en qué posiciones se encuentran los números terminados en 4.
function array08(){

}

// 9. Leer 10 números enteros, almacenarlos en un vector y determinar cuántas veces está repetido el mayor.
function array09(){

}

// 10. Leer 10 números enteros, almacenarlos en un vector y determinar en qué posiciones se encuentran los números con mas de 3 dígitos.
function array10(){

}
