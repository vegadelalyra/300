function result°(){
    var n° = document.getElementById("input°").value;
    var n°b = document.getElementById("input°b").value;
    var n°c = document.getElementById("input°c").value;
    var length = (n°<0)? (n°.length)-1:n°.length;
    var lengthB = (n°b<0)? (n°b.length)-1:n°b.length;
    var lengthC = (n°c<0)? (n°c.length)-1:n°c.length;
    
    
    if ((° == 0 && °b == 0 && °c == 0)) {
      document.getElementById("r°").innerHTML = ``;
  
    }
    else if((° == "-" && °b == "-" && °c == "-")){
      document.getElementById("r°").innerHTML = ``; 
    }
   //Generamos una estructura de casos aplicable para ejercicios de 3 cifras 
    else {
      if (°c == 0) {
        if (° != 0 && °b != 0) {
          document.getElementById("r°").innerHTML = `Okay, un ${°} y un ${°b}. Pero ponme un número en el otro cuadro también >:c`;
        }
        else{
          document.getElementById("r°").innerHTML = `Okay, un ${°}${°b}. Pero ponme un número en los otros dos cuadros también >:c`;
        }
      }
      else {
        if (° == 0 && °b == 0) {
          document.getElementById("r°").innerHTML = `Okay, un ${°c}. Pero ponme un número en los otros dos cuadros también >:c`;
        }
        else if (° == 0 || °b == 0) {
          document.getElementById("r°").innerHTML = `Okay, un ${°c} y un ${°}${°b}. Pero ponme un número en el otro cuadro también >:c`;
        }
        else{
          switch (length) {

            case 1:
            case 2:
            case 3:
              break;
              
            default:
              document.getElementById("r°").innerHTML = ``; 
              break;
          }
        }
      }  
    }
  }