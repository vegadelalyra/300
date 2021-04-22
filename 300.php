<!DOCTYPE html>
<html lang="es">
<head>
    <script src="lottie.js" defer></script>
    <script src=300.js defer></script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"&amp;gt>
    <link rel="icon" type="image/png" href="./icon.png">
    <link rel="stylesheet" href="./300.css">
    <title>300</title>
</head>
<!--oncontextmenu="return false" para proteger código -->
<!-- Animaciones para el menú -->
<body onload= "return pre();" onfocus= "return pre()" onblur= "return pree()">

    <!-- Reproductor de audio -->
    <!-- The default song played -->
    <audio src="./playlists/reflex/Floating Museum - Ghost In The Shell.mp3" preload="auto"></audio>

    <!-- Audio player dashboard -->
    <div id="draggableDiv">
        <details id="details">
            <!-- Playlist name -->
            <summary class="puta"><p id="plays">playlists</p></summary>
            <div id="audio-player-container">
                <!-- Play/pause button -->
                <button class="aPb" id="play-icon"></button>
                <!-- Current time mark -->
                <span id="current-time" class="time">0:00</span>
                <!-- Seek slider -->
                <input class="aPi" type="range" id="seek-slider" max="100" value="0">
                <!-- Audio duration -->
                <span id="duration" class="time">0:00</span>
                <!-- Volume output -->
                <output id="volume-output">100</output>
                <!-- Volume slider -->
                <input class="aPi" type="range" id="volume-slider" max="100" value="100">
                <!-- Audio/mute button -->
                <button class="aPb" id="mute-icon"></button>
                <!-- button/images for playlists -->
                <img id="epic" class="imai" src="./img/epic.png" height="100px" width="100px">
                <img id="mind" class="imai" src="./img/mind.png" height="100px" width="100px">
                <img id="cool" class="imai" src="./img/cool.png" height="100px" width="100px">
            </div>
        </details>
        </div>

    <!-- Intro al inicio -->
        <div id="containerIntro300">
            <!-- Animaciones de caída de los títulos de las secciones -->
            <h1 id="intro300" onclick=" 
                    document.getElementById('plays').style.opacity='1';
                    document.getElementById('h300').style.opacity='1'; 
                    document.getElementById('section01').style.transform='translateY(0px)';  
                    document.getElementById('section02').style.transform='translateY(0px)';  
                    document.getElementById('section03').style.transform='translateY(0px)';  
                    document.getElementById('section04').style.transform='translateY(0px)';  
                    document.getElementById('section05').style.transform='translateY(0px)';  
                    document.getElementById('section06').style.transform='translateY(0px)';  
                    document.getElementById('section07').style.transform='translateY(0px)';
                    document.getElementById('section08').style.transform='translateY(0px)';
                    document.getElementById('section09').style.transform='translateY(0px)';
                    setTimeout(launcher,200);
            ">0</h1>
        </div>
    
    <header id="título300">
        <div id="div300" >
            <center>
                <h1 id="h300">300</h1>
            </center>
        </div>
    </header>

   <details id="50algoritmosInformales">
       
       <summary id="section01" style="transform:translateY(-3000px)">
        <h3>50 algoritmos informales</h3>
    </summary>
        <pre>
            
        1. Desarrollar un algoritmo que permita adquirir una revista.
        
            0. Aprender en qué lugar (físico o virtual) se adquieren revistas
            1. Tener dinero
            si no, conseguir dinero, 
            2. Definir qué revista se desea adquirir 
                si no hay deseo disponible, terminar algoritmo 
                3. Consultar en el lugar si existe esa revista
                si existe, adquirir, terminar algoritmo.
                si existe, pero no hay, esperar
                    si mientras espera, la revista deseada cambia, cancelar espera, volver a paso 3
                si no existe, cambiar deseo, volver a paso 2.
                

        2. Desarrollar un algoritmo que permita entrar a una casa que está con llave.
            0. ¿Necesito atravesar una puerta?
                si, paso 1
                no, muere algoritmo
            1. Identificar puerta requerida
            2. ¿Vivo en esa casa?
                si, paso 3
                no, paso 6
                3. ¿Tengo la llave de esa puerta?
                si, paso 4
                no, paso 6
            4. Sacar llave mientras se dirige a la puerta
                si realmente no tengo la llave, paso 6
                5. Intentar abrir puerta
                ¿abrió? muere algoritmo
                ¿no abre? Volver a intentar.
                no abre, paso 6
            6. Ir a tocar a la puerta
                si abren, la puerta no tenía llave. Muere algoritmo.
                si no abren, qué oso xd, volver a intentar.
                    no abren, paso 7
            7. ¿Conoces quién podría tener las llaves de la puerta?
            si, paso 8
                no, volver a tocar a la puerta
                    ¿abren? 
                    no, 
            8. Llamar a la persona
            9. Solicitarle ingreso a la casa
                rechazado, paso 0,
                si, identificamos la puerta
                        ¿es la puerta correcta?
                            si, repetir paso 9 insistir
                            no, repetir paso 1
                    no, muere algoritmo.
            10. Esperar por la llave
            11. Cruzar puerta con llave           
         
            
        3. Desarrollar un algoritmo que permita dar un beso.
            0. Mirar a los ojos
            1. Preguntar con los ojos qué tipo de beso quiere
            2. ¿Queremos darle el beso que los ojos quieren?
                si, complacer
                no, ser egoísta
                    ser egoísta implica elegir un tipo de beso:
                        elegir beso: 
                        beso genérico
                                se mostrará el beso genérico en el paso 3
            3. Hacerle saber con la mirada a los ojos que si le besarás pero no como quieren
            4. Sonreír ligeramente
            5. Ordenar sin palabras a la mirada a venir hacia ti 
                viene, paso 6
                no viene, acercarse lenta y agraciadamente
                6. Tocar sus brazos con suavidad
            7. Acercar tu rostro al suyo
            8. Deslizar los dedos hasta su espalda
            9. Tomarla ya firmemente con las manos
            10. Traerla hacia ti 
            12. Cerrar lentamente los ojos
            13. Mientras los ojos se cierran, conectar suavemente tu boca a la de ella
            14. Ojos cerrados, concentrarse en sentir
            15. Sentir sus labios con los tuyos
            16. Identificar la forma de sus labios.
            Identificado labio inferior 
                    Identificado labio superior
                    16. Contraer labios en labio inferior para aumentar el sentir.
            17. Separar labios para permitir sentir.
            18. Contraer labios en labio superior para aumentar el sentir.
            19. Separar labios para permitir sentir.
            20. Repetir
            21. ¿Se busca aumentar la variable sentir?
                no, muere beso.
                si, paso 21
                21. Pasar de beso genérico a otro tipo de beso.
        
                
        4. Desarrollar un algoritmo que permita empacar un regalo.
            0. Identificar tamaño y forma del regalo
            1. Definir cantidad de dinero y posible rango de costos asociado a empacar un regalo
            2. ¿Tienes dinero suficiente?
            si
                llevar regalo a un lugar donde te lo empaquen bien bonitoxd, fin del algoritmo.
            no  
                paso 3
            3. ¿Tienes bolsas de regalo?
                si
                    ¿es del tamaño del regalo?
                        si  
                            empacar, fin del algoritmo.
                        no 
                           paso 1
                           no, paso 3
            4. ¿Tienes papel regalo?
            si
                    ¿es suficiente para envolver el regalo?
                        si
                        envolver, fin del algoritmo.
                        no 
                        paso 1
            
        
        5. Desarrollar un algoritmo que permita encender un vehículo.
            0. ¿Tienes llaves del auto?
                si
                    paso 1
                    no 
                    buscar llaves del auto
                    1. Ir hacia el auto, mantener llaves en la mano
            2. Abrir seguros de las puertas con el control remoto de las llaves 
            3. Abrir puerta del conductor
            3. Incorporarte en el asiento
            4. Meter las llaves correctamente
            5. Girar llaves hasta que el carro prenda
        
            
        6. Desarrollar un algoritmo que permita fritar un huevo.
            0. Definir tipo y cantidad de huevo que se quiere cocinar
            1. Preparar recipiente requerido en la estufa para ese tipo de huevo
            2. Sacar la cantidad de huevos requerida de la nevera
            3. Prender la estufa y poner a calentar recipiente requerido
            4. Según qué tipo, echar huevos de x forma al recipiente 
            5. Definir en qué término se quieren los huevos
            6. En base al término, definir el tiempo de cocción
            7. Si se requiere batir, batir
            8. Esperar que los huevos coccionen el tiempo definido
            9. Una vez cocinados el tiempo definido, apagar estufa
            10. Servir huevos en plato
            
        
        7. Desarrollar un algoritmo que permita mirar por un telescopio.
            0. Acomodarse correctamente en el telescopio
            1. Asomar el ojo por el lente
            2. Mirar por el telescopio
            Fin
        
            
        8. Desarrollar un algoritmo que permita botar la basura.
            0. Preparar una bolsa de basura grande
            1. Recoger todas las bolsas de basura pequeñas en todos los cuartos
            2. Depositar en la bolsa de basura grande todas las bolsas de basura pequeñas recogidas 
            3. Cerrar bolsa de basura grande con un nudo
            4. Tomar bolsa de basura grande con las manos del nudo realizado
            5. Sacarla al andén de tu casa
            Fin
        
        9. Desarrollar un algoritmo que permita tomar un baño.
            0. Entrar al baño 
            1. Desnudarse
            2. Entrar a la ducha
            3. Abrir la llave
            4. Enjuagarse
            5. Cerrar llave
            6. Enjabonarse
            7. Volver a abrir llave
            8. Enjuagarse
            9. Cerrar llave
            10. Salir de la ducha
            11. Tomar una toalla
            12. Secarse
            Fin
        
        10. Desarrollar un algoritmo que permita estudiar para un examen.
            0. ¿Sabemos qué temas serán evaluados?
            si
                    paso 1
                no 
                paso 4
            1. Listar los temas que serán evaluados
            2. Definir cada uno
            3. Realizar un ejercicio de cada uno
            4. Dar un repaso general a todo
            5. ¿Es complejo el contenido?
                si 
                    paso 6
                no 
                    paso 7
            6. Realizar un esquema gráfico que relacione todos los conceptos
            7. Exponer para ti mismo
            Fin
        
        
        11. Desarrollar un algoritmo que permita tocar determinada canción con un instrumento musical.
            
        0. Definir canción que se quiere tocar
            1. ¿Te sabes la canción?
                    no
                        aprendétela, luego paso 1
                        si
                        paso 2
            2. Definir instrumento en el que se quiere tocar la canción
            ¿Sabes tocar ese instrumento?
                    no
                    aprender ese instrumento, luego paso 2  
                    si
                        paso 3
                        3. ¿Sabes la partitura de esa canción en tu instrumento?
                no
                    aprenderla, luego paso 3
                si 
                    paso 4
            4. Tocar canción deseada en el instrumento deseado
            Fin  
        
            
        12. Desarrollar un algoritmo que permita viajar en avión.
            0. Comprar pasaje de vuelo
            1. Estar a tiempo en el aeropuerto
            2. Realizar proceso de check in
            3. Esperar para abordar 
            4. Abordar 
            5. Viajar en avión 
            Fin
            
        
        13. Desarrollar un algoritmo que permita encender un bombillo.
            0. ¿Hay bombillo en el enchufe de bombillos? 
                si 
                    paso 5
                    no 
                    ¿tienes bombillos?
                        si 
                        paso 1
                        no 
                        comprar bombillo
            1. Tomar bombillo
            2. Montarte sobre lo que te brinde estabilidad y altura para alcanzar el enchufe 
            3. Poner bombillo en el enchufe
            4. Bajarte con cuidado
            5. Activar el interruptor del enchufe para prender bombillo
            Fin
                
        
        14. Desarrollar un algoritmo que permita encender una vela.
            0. Adquirir vela 
            1. Adquirir encendedor 
                no hay encendedor
                    paso 3
                    2. Mantenerla incorporada sobre un plato pequeño
            3. Brindarle fuego
            4. Permitir que un poco de cera caiga sobre un plato pequeño
            5. Aplastar la vela sobre el charco de cera
            6. Testear que la vela esté firme
                si 
                    Fin
                no
                paso 4
            Fin            
            
        
            15. Desarrollar un algoritmo que permita apagar una vela.
            0. Ubicar vela 
            1. Caminar hacia la vela 
            2. Acercar cara a una distancia prudente
            3. Soplar vela 
            4. ¿Se apagó la vela? 
                si  
                    Fin 
                    no 
                    Paso 2 
            Fin            
            
        16. Desarrollar un algoritmo que permita apagar un bombillo.
        0. Ubicar interruptores y bombillos
            1. Definir que un bombillo y su interruptor siempre están ubicados en la misma zona
            2. Aprender qué interruptor prende/apaga cada bombillo
            3. Determinar qué bombillos están prendidos
            4. Determinar qué bombillo se desea apagar 
            5. Apagar bombillo
            Fin
        
        
        17. Desarrollar un algoritmo que permita parquear un vehículo.
        0. Hallar un lugar 
            1. Cruzar lugar perpendicularmente por el largor del vehículo
            2. Poner reversa
            3. Con cautela, introducir el vehículo en el lugar hallado
            4. Calibrar el vehículo para que quede lo más recto posible
            5. Apagar motor
            6. ¿Hay coches a los lados?
                si 
                    abrir puertas con cuidado
                        ¿están abiertas las puertas sin causar daños?
                        si 
                                paso 6
                            no 
                            prender vehículo y salir corriendo xd
                no 
                paso 6
            6. Salir del vehículo
        Fin
        
        
        18. Desarrollar un algoritmo que permita almorzar.
            0. ¿Cocinarás almuerzo? 
                si
                paso 4
                no
                ¿Te cocinarán almuerzo? 
                        no 
                            paso 1
                            si  
                            paso 2
                            1. Pide almuerzo a domicilio 
            2. Esperar almuerzo 
            3. Recibir almuerzo 
            4. Servirte almuerzo
            5. Almorzar
            Fin
            
        
            19. Desarrollar un algoritmo que permita ir de la casa al trabajo.
            0. Determinar dónde trabajo
            1. Determinar rutas de llegada 
            2. Clasificar rutas por velocidad de llegada y riesgos de ruta
            3. Correlacionar velocidad/riesgo 
            4. Enumerar rutas, las más peligrosas pero rápidas: 10
            5. Valorar necesidad de tiempo de llegada
            6. Elegir una ruta según el nivel de necesidad
            7. Utilizar ruta
        Fin
        
        
        20. Desarrollar un algoritmo que permita colocarse una camisa.
            0. Abrir tu armario
            1. Elegir una camisa
            2. Sacarla de la perchera
            3. ¿Es especial la ocasión?
                si 
                    paso 4
                no
                    paso 5
            4. Plancharla
            5. Sacudirla un poco 
            6. Quitarte lo que traigas puesto y ponértela 
            7. Abrochar cada botón con cada ojal de arriba a abajo
            8. Verte al espejo 
                ¿Te gusta cómo te ves? 
                    no 
                        volver al paso 0
                    si 
                        paso 9
            9. Decirte lo cool que eres 
            Fin 
        
        
        21. Desarrollar un algoritmo que permita quitarse la camisa.
            0. ¿Estás en un lugar donde te quitarías la camisa?
                si 
                    paso 1
                no 
                    quítatela igual xdddd nah mentira, vete a otro lugar, paso 0
            1. Desabrocha de arriba a abajo cada botón 
            2. Toma con la mano izquierda el cuello derecho
            3. Desliza tu brazo derecho fuera de la manga de la camisa
            4. ¿Tienes ya una mano libre?
                si
                    paso 5
                no
                    jueputa no sabe quitarse una camisa xd paso 2
            5. Con la mano libre, tomar la muñeca de la manga aún puesta
            6. Deslizar brazo izquierdo fuera de la manga
            7. Desplegar camiseta
            8. Echarla a la ropa sucia
            Fin
        
        
        22. Desarrollar un algoritmo que permita escuchar un determinado disco.
            0. Determinar nombre del disco 
            1. Buscarlo en youtube
                ¿Está?  
                    si  
                        escuchar, Fin. 
                    no  
                        buscarlo en Spotify
                            ¿Está?
                                si
                                    Escuchar, Fin.
                                no 
                                    Buscar en vídeos de google
                                        ¿Está?
                                            Si 
                                                Escuchar, Fin
                                            No 
                                                Ah, entonces esa hpta tanción no existe xd paso 2
            2. Pensar en otro disco 
                ¿Tienes el nombre? 
                    si 
                        Paso 1
                    no 
                        Paso 0     
        Fin                                                 
        
        
        23. Desarrollar un algoritmo que permita abrir una ventana.
            0. Identificar ventana
            1. Ir hacia la ventana
            2. Identificar cómo se abre la ventana
            3. Abrir
            Fin
        
        
        24. Desarrollar un algoritmo que permita ir a la tienda a comprar algo.
            0. Identificar tiendas más cercanas 
            1. Clasificar tiendas por sus niveles de oferta y niveles de precios
            2. Definir qué producto se necesita
            3. Seleccionar la tienda más adecuada para cubrir la necesidad
            4. Ir a la tienda por el producto requerido 
            5. Regresar a casa por la misma ruta 
        
        
        25. Desarrollar un algoritmo que permita tomar una fotografía.    
            0. Identificar ubicación del fotógrafo (la propia)
            1. Identificar ubicación del objetivo a fotografear.
            2. Orientar la cámara al objetivo que se desea fotografear.
            3. Revisar (ángulo, iluminación y contenido) calidad de la posible foto.
            4. ¿Cumple el control de calidad la posible foto actual? 
                si 
                    paso 9
                no 
                    paso 5
            5. Identificar qué atributo del ente calidad no cumple con el control de calidad
            6. Identificar qué ubicación del objetivo o el fotógrafo hay que modificar para corregir el atributo
            7. Modificar la ubicación requerida.
            8. Paso 3 
            9. Tomar foto 
            FIN
            
        
        26. Desarrollar un algoritmo que permita hacer deporte.
            0. Definir el deporte que desas realizar    
            1. ¿Requieres más personas para ese deporte?
                si 
                    invitar personas
                        ¿conseguiste las personas?
                            si 
                                paso 2
                            no 
                                paso 0
                no 
                    paso 2
            2. Definir fecha, hora y lugar donde se practicará el deporte
            3. ¿Ha llegado el momento? 
                si 
                    paso 4 
                no 
                    paso 3
            4. Estirar tu cuerpo
            5. Vestirte adecuadamente para ese deporte
            6. Desplazarte a la zona indicada para ejecutar ese deporte
            7. Calentar
            8. Llevar a cabo el deporte  
        FIN
        
        
        27. Desarrollar un algoritmo que permita cortarse el cabello. 
            0. ¿Tienes dinero? 
                no 
                    muere algoritmo
                si 
                    paso 1 
            1. Solicitar turno con tu barbero de confianza
            2. ¿Se logró el turno? 
                si 
                    paso 3
                no
                    paso 1
            3. Asisitir al turno
            4. Salir con corte de cabello
        FIN
        
        
        28. Desarrollar un algoritmo que permita hacer un avión con una hoja de papel.
        Aquí si me corchó porque no sé hacer aviones de papel xd así que hice trampa y busqué los pasos en internet
        
        1. Dobla el papel a la mitad por el lado más largo.
        2. Vuelve a estirar. Pliega una tira de unos cinco centímetros en la parte superior del folio.
        3. Gira la tira sobre sí misma seis veces, ocupando alrededor de una tercera parte del papel.
        4. Vuelve a doblar a la mitad. Lleva los triángulos hacia dentro para crear el morro del avión.
        5. Haz un ala en cada lado de tu aeroplano para conseguir la forma final.
        FIN
        
        29. Desarrollar un algoritmo que permita manejar una bicicleta.
        
            0. Llevar a fuera la bicicleta.
            1. Mantenerla firme frente a ti.
            2. Poner la bici entre tus piernas, pasando tu pierna por encima de la bici
            3. Tener las dos manos en los mangos, 
            4. Las piernas en el suelo a cada lado de la bici
            5. Poner un pie sobre el pedal
            6. Impulsarte con tu otro pie
            7. Con la velocidad inicial y tu peso, equilibrar la bicicleta
            8. Pedalear
            9. Ajustar la velocidad deseada
            10. Frenar cuando se desee detener
            11. Poner piernas en el suelo cuando se haya frenado.
        FIN 
        
        
        30. Desarrollar un algoritmo que permita manejar una motocicleta.
            1. Tomar las llaves de la motocicleta.
            0. Llevar a fuera la motocicleta.
            1. Mantenerla firme frente a ti.
            2. Poner la moto entre tus piernas, pasando tu pierna por encima de la moto
            3. Tener las dos manos en los mangos, 
            4. Las piernas en el suelo a cada lado de la moto
            5. Prender batería con las llaves
            5. Poner un pie sobre el pedal
            6. Arrancar el motor con el pedal
            7. Acelerar lentamente
            8. Conducir
            9. Ajustar la velocidad deseada
            10. Frenar cuando se desee detener
            11. Poner piernas en el suelo cuando se haya frenado.
            FIN 
        
        31. Desarrollar un algoritmo que permita manejar un monociclo.
            0. ¿Tienes amigo hippie?
                si 
                    llámalo y pídele que te enseñe a manejar monociclo, fin.
                no 
                    paso 1
            1. Saca el monociclo a la calle
            2. Siéntate en el monociclo
            3. Mantén el equilibrio
            4. ¿Te caíste?
                sí 
                    paso 2
                no 
                    fin    
                
        
        
        32. Desarrollar un algoritmo que permita maquillarse.
            0. Traer el maquillaje que quieres a un espacio con espejo
            1. Limpiar tu cara
            2. Tomar 1 maquillaje deseado y prepararlo para su uso
            3. Aplicar delicadamente sobre el rostro 
            4. Chequear resultado en el espejo. 
            5. ¿Te gusta como quedaste?
                si 
                    ¿Quieres echarte algo más?
                        si 
                            paso 1
                        no 
                            paso 5
                no 
                    ¿Mucho maquillaje? 
                        no 
                            paso 2
                        si  
                            paso 1
            5. Guardar maquillaje usado
            6. Verte al espejo
            7. ¡ALV SI QUE ERES COOL!
        
        
        33. Desarrollar un algoritmo que permita hacer un pastel.
            0. Consultar receta de lo que quieres preparar
            1. Comprar ingredientes de lo que quieres preparar
            2. Asear tu área de trabajo
            3. Seguir la receta 
            4. Limpiar el área de trabajo
            5. Servir 
        FIN
        
        
        34. Desarrollar un algoritmo que permita hacer un almuerzo.
            0. Consultar receta de lo que quieres preparar
            1. Comprar ingredientes de lo que quieres preparar
            2. Asear tu área de trabajo
            3. Seguir la receta 
            4. Limpiar el área de trabajo
            5. Servir 
            FIN
        
        
        35. Desarrollar un algoritmo que permita adquirir un pantalón.
            0. Clasificar comercios por productos y gammas de presupuesto
            0. Definir qué producto se quiere comprar
            1. Definir cuánto dinero se tiene
            2. Realizar un presupuesto
            3. Identificar el lugar correcto para nuestro presupuesto y necesidad
            4. Desplazarse al lugar en un momento posible
            5. Realizar las compras
        Fin
        
        
        36. Desarrollar un algoritmo que permita hacer un mercado pequeño.
        0. Clasificar comercios por productos y gammas de presupuesto
        0. Definir qué productos se quiere comprar
        1. Definir cuánto dinero se tiene
        2. Realizar un presupuesto
        3. Identificar el lugar correcto para nuestro presupuesto y necesidad
        4. Desplazarse al lugar en un momento posible
        5. Realizar las compras
        Fin
        
        
        37. Desarrollar un algoritmo que permita leer el periódico.
            0. Posicionar cualquier objeto leíble frente a los ojos
            1. Orientar mirada y atención a los signos
            2. Decodificar los signos 
            3. Dar sentido a lo leído 
            4. Comprender lo leído
            5. ¿Es de valor lo leído?
                si 
                    adquirir conocimiento
                no  
                    leer sin importancia
        FIN
        
        
        38. Desarrollar un algoritmo que permita saludar a un amigo.
            0. Sonreír con la mirada 
            1. Lenguaje corporal accesible
            2. Esperar acuerdo tácito 
            3. Definir nivel de intensidad bajo el acuerdo táctio
            4. Saludar con x nivel de intensidad
        Fin
        
        
        39. Desarrollar un algoritmo que permita arrullar a un bebé hasta que se duerma.
            0. Asentar bebé en los brazos 
            1. Percibir la atención del bebé con la mirada
            2. Realizar movimientos y sonidos suaves
            3. ¿Se durmió?
                no
                    paso 1 
                si 
                    fin
        
        
        40. Desarrollar un algoritmo que permita hacer un gol en fútbol.
            0. Posicionar el balón bajo nuestro control cerca de la cancha enemiga
            1. Hacer tiro certero 
            2. ¿Realizaste gol?
                no 
                    ¿el partido acabó? 
                        si 
                            F de fin 
                        no 
                            paso 0 
                si
                    fin 
        
        
        41. Desarrollar un algoritmo que permita jugar ping-pong.
            0. Tomar paleta de ping-pong 
            1. Pararte de uno de los lados de la mesa de ping-pong
            2. Saludar a tu rival
            3. Golpear la pelota hacia la dirección de tu rival con tu paleta 
            4. ¿La golpeaste? 
                si 
                    ¿terminó el partido?
                        si 
                            Fin.
                        no 
                            paso 3
                    paso 3
                no 
                    ¿terminó el partido? 
                        si 
                            Fin. 
                        no  
                            paso 3 
            Fin.                        
             
        
        42. Desarrollar un algoritmo que permita nadar.
            0. Vestirte adecuadamente 
            1. Estirar 
            2. Testear agua 
            3. Zambullirte 
            4. Fijar límite de la piscina que se quiere alcanzar
            5. Inclinarse hasta quedar horizontal
            6. Sacar del agua pie izquierdo y mano derecha 
            7. Remar 
            8. Sacar del agua pie derecho y mano izquierda
            9. Remar 
            10. 1, 2 con piernas 
            11. Círculos con los brazos 
            12. ¿Llegaste al punto deseado? 
                no 
                    5 
                si 
                    fin 
        
        
        43. Desarrollar un algoritmo que permita tirarse desde un avión con un paracaídas.
            0. Tirarse del avión
            1. Disfrutar de la caída 
            2. Suficiente disfrute.
            3. ¿Tienes paracaídas? 
                si 
                    paso 4
                no 
                    paso 5
            4. Activar paracaídas
            5. Aterrizar
            Fin 
        
        
        44. Desarrollar un algoritmo que permita tirarse desde un avión sin un paracaídas.
            0. Tirarse del avión
            1. Disfrutar de la caída 
            2. Suficiente disfrute.
            3. ¿Tienes paracaídas? 
                si 
                    paso 4
                no 
                    paso 5
            4. Activar paracaídas
            5. Aterrizar
            Fin 
        
        45. Desarrollar un algoritmo que permita descifrar un jeroglífico.
            0. Posicionar cualquier objeto leíble frente a los ojos
            1. Orientar mirada y atención a los signos
            2. Decodificar los signos 
            3. Dar sentido a lo leído 
            4. Comprender lo leído (hallar intención o lógica)
            5. ¿Reconoces algún patrón?
                si 
                    paso 6 
                no 
                    paso 1
            6. Alfabetizar 
            7. Formar ideas coherentes uniendo letras o signos identificados
            FIN
        
        
        46. Desarrollar un algoritmo que permita amarrase un zapato.
            0. Tomar una agujeta con cada mano
            1. Realizar un nudo simple
            2. Doblar un cordón en forma de pétalo
            3. Rodear el pétalo en su inicio con el otro cordón
            4. Pasar pétalo por debajo, en el espacio entre el cordón y el nudo
            5. Jalar según qué tan apretado se quiera 
            6. ¿Se amarró el zapato? 
                no 
                    paso 0
                si 
                    ¿es el primer zapato?
                        si 
                            paso 0 
                        no 
                            Fin 
        
        
        47. Desarrollar un algoritmo que permita quitarse los zapatos.
            0. Jalar las puntas de los cordones
            1. ¿Se deshizo el nudo? 
                no 
                    paso 2
                si 
                    paso 3 
            2. Deshacer nudo
            3. Tomar parte del talón 
            4. Sacar el pie del zapato
            5. Repetir proceso con el otro pie-zapato
            FIN
        
        48. Desarrollar un algoritmo que permita silbar.
            0. Inhala suavemente
            1. Forma una pequeña O con los labios
            2. Apoya en el diafragma 
            3. Empuja el aire a través de la O 
            4. Filtra la presión del aire para cambiar sonidos 
            5. Forma melodías
            FIN
        
        49. Desarrollar un algoritmo que permita elevar una cometa.
            0. Tener una cometa conectada a un rollo de piola
            1. Salir corriendo  con con cometa en mano
            2. Soltarla a poca distancia de la piola sin dejar de correr
            3. Sigue corriendo
            4. ¿La cometa está en el aire? 
                no 
                    paso 3
                si 
                    paso 5
            5. Sueltale piola para que se eleve más a medida que corres más 
            6. ¿Esta elevada la cometa? 
                no 
                    paso 3 
                si 
                    Puedes dejar de correr 
            7. Modifica la altura de la cometa con la cantidad de piola suelta
            8. Cuando tengas suficiente, recoge toda la piolas
            FIN
        
        
        50. Desarrollar un algoritmo que permita desarrollar algoritmos.
        Inicio
            0. DETERMINA EL OBJETIVO
                SABER HACIA DÓNDE VAMOS 
                    DISEÑAR UN INICIO
                SABER HASTA DÓNDE PODEMOS LLEGAR
                    DISEÑAR UN FINAL
            1. ALGORITMO 
            CAMINO PARA LLEGAR AL OBJETIVO
                PASOS SECUENCIALES ORDENADOS
                    TRANSCRIPCIÓN
                    DIGITACIÓN
                    COMPILACIÓN 
                        DETECCIÓN DE ERRORES:
                        DE SÍNTAXIS
                        DE PRECAUCIÓN           
            2. LA PRUEBA DE ESCRITORIO
                DETECCIÓN DE ERRORES:
                    DE LÓGICA
            3. EJECUCIÓN
            4. VERIFICACIÓN DE RESULTADOS
                ¿ERROR DE COMPILACIÓN? 
                    Si
                        volver a paso 1 
                    No 
                        ¿ERROR LÓGICO? 
                    Si 
                        ¿EL PROBLEMA PERSISTE? 
                            NO 
                                volver a paso 2 
                            SI 
                                volver a paso 0    
                    NO 
                        DESARROLLO DE ALGORITMO EXITOSO           
        FIN FINAL FINAL
        
        </pre>

    </details>

    <details id="6variables">

        <summary id="section02" style="transform:translateY(-12000px)">
            <h3 >6 ejercicios de variables</h3>
        </summary>
        <center>
    <table><!--tr fila / td columna-->
        <tr> 
            <td>

                1.


                a = 10
                b = 20
                c = 5
                a = a + 3
                b = b + 4 - a
                c = a + b + c
                a = a + c
                b = 4
                c = c + 3 - b + 2


                ¿Qué valores quedan almacenados en las variables a, b y c?
            </td>
            <td>
                <label>ALGORITMO</label>
                    <iframe src="./variables/1.html" width="550" height="348"></iframe>
            </td>
            <td>
                <label>RESULTADOS</label>
                <textarea id="1" cols="30" rows="16"></textarea>
            </td>
        </tr> 
            
            <td>

                2.

                a = 5
                b = 18
                c = 15
                d = 25
                a = a + 10
                b = b + 5 – c
                c = c + 4 + b
                d = d + b + a
                a = a + 1
                b = b + c
                c = b + c
                d = b + b

                ¿Qué valores quedan almacenados en las variables a, b, c y d?
            </td>
            <td>
                <label>ALGORITMO</label>
                <iframe src="./variables/2.html" width="550" height="348"></iframe>
            </td>
            <td>
                <label>RESULTADOS</label>
                <textarea id="2" cols="30" rows="16"></textarea>
            </td>
        <tr>

            <td>

                3.


                a = 9
                b = 6
                a = a + 4
                b = b + 2
                a = a + 10
                b = b – 25
                a = a – 20
                b = b + 5
                a = a + 4
                b = b + 2
                a = a + 10
                b = b – 10

                ¿Qué valores quedan almacenados en las variables a y b ? 
            </td>
            <td>
                <label>ALGORITMO</label>
                <iframe src="./variables/3.html" width="550" height="348"></iframe>
            </td>
            <td>
                <label>RESULTADOS</label>
                <textarea id="3" cols="30" rows="16"></textarea>
            </td>
        <tr>
            <td>

                4.


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

                ¿Qué valores quedan almacenados en las variables a, b, c y d ?
            </td>
            <td>
                <label>ALGORITMO</label>
                <iframe src="./variables/4.html" width="550" height="348"></iframe>
            </td>
            <td>
                <label>RESULTADOS</label>
                <textarea id="4" ></textarea>
            </td>
        </tr>    
        <tr>
            <td>


                5.


                a = 10
                b = 5
                a = a - 5
                b = b + 6
                a = a + 18
                b = b – 23
                a = a – 21
                b = b - 5
                a = a - 4
                b = b - 2
                a = a + 10
                b = b + 10

                ¿Qué valores quedan almacenados en las variables a y b ?
            </td>
            <td>
                <label>ALGORITMO</label>
                <iframe src="./variables/5.html" width="550" height="348"></iframe>
            </td>
            <td>
                <label>RESULTADOS</label>
                <textarea id="5" cols="30" rows="16"></textarea>
            </td>
        </tr>
            <td>

                6.


                a = 8
                b = 7
                c = 5
                d = 8
                a = a + b – c + d
                b = a + b – c + d
                c = a + b – c + d
                d = a + b – c + d
                a = a + b – c + d
                b = a + b – c + d
                c = a + b – c + d
                d = a + b – c + d

                ¿Qué valores quedan almacenados en las variables a, b c y d ?
            </td>
            <td>
                <label>ALGORITMO</label>
                <iframe src="./variables/6.html" width="550" height="348"></iframe>
            </td>
            <td>
                <label>RESULTADOS</label>
                <textarea id="6" cols="30" rows="16"></textarea>
            </td>
        </tr>
    </table>
    </center>
    </details>

    <details id="20operadores">

        <summary id="section03" style="transform:translateY(-30000px)">
            <h3 >20 ejercicios de operadores</h3>
        </summary>
        <center>
        <div id="title">
            <center>Todos los siguientes ejercicios deberán desarrollarse utilizando las reglas de la aritmética entera.</center>
        </div>
        <table id="centrarTabla">
            <tr>    
                <td>
                1. 
            
            a = 10
            b = 20
            c = 10
            a = a + 15
            b = b + 12
            c = a * c
            
            ¿ Qué valores quedan en las variables a, b y c?
                </td>
                <td> 
            <label>RESULTADOS</label> 
            <textarea id="301"></textarea>
            
                </td>     
            </tr>

            <tr>
                <td>
            

            2. 
            
            a = 3
            b = 8
            c = 1
            a = 5
            b = 9
            c = 7
            a = a + 1
            b = b + 2
            c = c + 3
            
            ¿Qué valores quedan en las variables a, b y c?
                </td>
                <td> 
                    <label>RESULTADOS</label> 
                    <textarea id="302"></textarea>
                </td>   
            <tr>
                <td>   
            

            3. 
            
            a = 10
            b = 5
            c = 10
            a = a + b - 5
            b = a + b - 5
            c = a + b - 5
            a = a + 5 * b / 2
            b = a + 5 * b / 2
            c = a + 5 * b / 2
            
            ¿Qué valores quedan en las variables a, b y c?
            
                    </td>
                    <td> 
                        <label>RESULTADOS</label> 
                        <textarea id="303"></textarea>
                    </td>
            </tr>
        <tr>
            <td>
            
            4. 
            
            a = 5
            b = 5
            c = 5
            a = a + a
            b = b + b
            c = c + c
            a = a + b + c
            b = a + b + c
            c = a + b + c
            
            ¿Qué valores quedan en las variables a, b y c?
            </td>
            <td> 
                <label>RESULTADOS</label> 
                <textarea id="304"></textarea>
            </td>
        </tr>
        <tr>
            <td>  
            

            5. 
            
            a = 10
            b = 10
            c = 10
            a = a + 5
            b = a + 3
            c = a + 2
            a = b + 4
            b = b + 5
            c = c + 8
            
            ¿Qué valores quedan en las variables a, b y c?
            
            </td>
            <td> 
                <label>RESULTADOS</label> 
                <textarea id="305"></textarea>
            </td>
        </tr> 
        <tr>
            <td>
            
            6. 
            
            a = 10
            b = 1
            c = 4
            a = a + c
            b = a + c
            c = a + c
            a = c + 5
            b = c + b
            c = a + b + c
            
            ¿Qué valores quedan en las variables a, b y c?
            
            </td>
            <td> 
                <label>RESULTADOS</label> 
                <textarea id="306"></textarea>
            </td>
        <tr>
            <td>
            
            7. 
            
            a = 1
            b = 1
            c = 1
            a = a + a
            b = b + a
            c = c + a
            a = a + a
            b = b + a
            c = c + a
            
            ¿Qué valores quedan en las variables a, b y c?
            
            </td>
            <td> 
                <label>RESULTADOS</label> 
                <textarea id="307"></textarea>
            </td>
        </tr>
        <tr>
            <td>
            
            8. 
            
            a = 10
            b = 50
            c = 30
            a = a – b
            b = b – c
            c = c – a
            a = a – 1
            b = b – a
            c = c + a – b
            
            ¿Qué valores quedan en las variables a, b y c?
            </td>
            <td> 
                <label>RESULTADOS</label> 
                <textarea id="308"></textarea>
            </td>
        </tr>
            <td> 
            

            9. 
            
            a = 1
            b = 2
            c = 3
            a = a + b
            b = a – b
            c = a * b
            a = a – b
            b = a + b
            c = a * b
            
            ¿Qué valores quedan en las variables a, b y c?
            
           </td> 
           <td> 
            <label>RESULTADOS</label> 
            <textarea id="309"></textarea>
            </td>
        </tr>
            <td>
            
            10. 
            
            a = 1
            b = 2
            c = 3
            a = a + 2
            b = a + 2 + b
            c = a + 2 + c
            a = a / 2
            b = b / 2
            c = c / 2
            
            ¿Qué valores quedan en las variables a, b y c?
            
            </td>      
            <td> 
                <label>RESULTADOS</label> 
                <textarea id="310"></textarea>
            </td>
        </tr> 
        </table>
            <center ><h3 id="title1">“Linealizar” las siguientes expresiones</center></h3>
        <table id="centrarTabla2">
        <tr>
            <!--slide-->
            <td>
                <label>EXPRESIONES</label>
                <iframe src="./operadores/2.html" width="550" height="348"></iframe>
            </td> 
            <td> 
                <label>ALGORITMOS</label> 
                <iframe src="./operadores/1.html" width="550" height="348"></iframe>
            </td>
        </tr>
        </table>
     </center>
    </details>

    <details id="3estructuras">

    <summary  id="section04" style="transform:translateY(-60000px)">
        <h3>3 técnicas de transcripción</h3>
    </summary>
<center><table>
    <tr>
        <td>
        <details>
            <summary>DIAGRAMAS DE FLUJO</summary>
            <center><img src="./optFluj.png"></center>
        </details>
        </td>
        
        <td>
        <details>
            <summary>DIAGRAMACIÓN RECTANGULAR ESTRUCTURADA</summary>
            <center><img src="./optRec.png"></center>
        </details>
        </td>

        <td>
        <details>
            <summary>SEUDOCÓDIGO</summary>      
        <pre id="seudoCode">

38. Desarrollar un algoritmo que permita saludar a un amigo.


    Inicio
    
        
    Mientras se hace contacto visual
        
        Sonreír
        
        Indicar intención de saludar con lenguaje corporal
        
        Si está accesible de tiempo Y distancia
         
            Acercarse hasta quedar de frente
         
                Apretar manos
        
        Sino
        
            Levantar la mano de lejos
        
        Saludar 
       
    Fin_mientras	

    Fin
        </pre>    
        </details>
        </td>
    </tr>
</table></center>
    </details>

    <details id="50decisiones">
        <summary id="section05" style="transform:translateY(-120000px)"><h3>50 algoritmos de decisiones</h3></summary><br><br>
        <center>        
        1. Leer un número entero y determinar si es un número terminado en 4.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result();" required> <br>
            <span id="r1"></span>
            <br><br>
        2. Leer un número entero y determinar si tiene 3 dígitos.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input2" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result2();"  required> <br>
            <span id="r2"></span>
            <br><br>
        3. Leer un número entero y determinar si es negativo.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input3" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result3();"  required><br>
            <span id="r3"></span>
            <br><br>
        4. Leer un número entero de dos dígitos y determinar a cuánto es igual la suma de sus dígitos.            <br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input4" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result4();"  required><br>
            <span id="r4"></span>
            <br><br>
        5. Leer un número entero de dos dígitos y determinar si ambos dígitos son pares.           <br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input5" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result5();"  required><br>
            <span id="r5"></span>
            <br><br>
        6. Leer un número entero de dos dígitos menor que 20 y determinar si es primo.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input6" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result6();"  required><br>
            <span id="r6"></span>
            <br><br>
        7. Leer un número entero de dos dígitos y determinar si es primo y además si es negativo.    <br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input7" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result7();"  required><br>
            <span id="r7"></span>
            <br><br>
        8. Leer un número entero de dos dígitos y determinar si sus dos dígitos son pares.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input8" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result8();"  required><br>
            <span id="r8"></span>
            <br><br>
        9. Leer un número entero de dos dígitos y determinar si un dígito es múltiplo del otro.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input9" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result9();"  required><br>
            <span id="r9"></span>
            <br><br>
        10. Leer un número entero de dos dígitos y determinar si los dos dígitos son iguales.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input10" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result10();"  required><br>
            <span id="r10"></span>
            <br><br>
        11. Leer dos números enteros y determinar cuál es el mayor.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input11" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result11();"  required>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input11b" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result11();"  required><br>
            <span id="r11"></span>
            <br><br>
        12. Leer dos números enteros de dos dígitos y determinar si tienen dígitos comunes.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input12" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result12();"  required>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input12b" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result12();"  required><br>
            <span id="r12"></span>
            <br><br>
        13. Leer dos números enteros de dos dígitos y determinar si la suma de los dos números origina un número par.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input13" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result13();"  required>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input13b" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result13();"  required><br>
            <span id="r13"></span>
            <br><br>
        14. Leer dos números enteros de dos dígitos y determinar a cuánto es igual la suma de todos los dígitos.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input14" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result14();"  required>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input14b" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result14();"  required><br>
            <span id="r14"></span>
            <br><br>
        15. Leer un número entero de tres dígitos y determinar a cuánto es igual la suma de sus dígitos.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input15" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result15();"  required><br>
            <span id="r15"></span>
            <br><br>
        16. Leer un número entero de tres dígitos y determinar si al menos dos de sus tres dígitos son iguales.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input16" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result16();"  required><br>
            <span id="r16"></span>
            <br><br>
        17. Leer un número entero de tres dígitos y determinar en qué posición está el mayor dígito.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input17" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result17();"  required><br>
            <span id="r17"></span>
            <br><br>
        18. Leer un número entero de tres dígitos y determinar si algún dígito es múltiplo de los otros.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input18" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result18();"  required><br>
            <span id="r18"></span>
            <br><br>
        19. Leer tres números enteros y determinar cuál es el mayor. Usar solamente dos variables.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input19" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result19();"  required>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input19b" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result19();"  required>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input19c" placeholder="Escribe números aquí >:c" title="Escribe un número en las otras dos cajas" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result19();" required><br>
            <span id="r19"></span>
            <br><br>
        20. Leer tres números enteros y mostrarlos ascendentemente.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input20" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result20();"  required>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input20b" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result20();"  required>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input20c" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result20();"  required><br>
            <span id="r20"></span>
            <br><br>
        21. Leer tres números enteros de dos dígitos cada uno y determinar en cuál de ellos se encuentra el mayor dígito.  <br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input21" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result21();"  required>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input21b" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result21();"  required>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input21c" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result21();"  required><br>
            <span id="r21"></span>
            <br><br> 
        22. Leer un número entero de tres dígitos y determinar si el primer dígito es igual al último.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input22" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result22();"  required><br>
            <span id="r22"></span>
            <br><br>
        23. Leer un número entero de tres dígitos y determinar cuántos dígitos primos tiene.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input23" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result23();"  required><br>
            <span id="r23"></span>
            <br><br>
        24. Leer un número entero de tres dígitos y determinar cuántos dígitos pares tiene.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input24" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result24();"  required><br>
            <span id="r24"></span>
            <br><br>
        25. Leer un número entero de tres dígitos y determinar si alguno de sus dígitos es igual a la suma de los otros dos.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input25" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result25();"  required><br>
            <span id="r25"></span>
            <br><br>
        26. Leer un número entero de cuatro dígitos y determinar a cuanto es igual la suma de sus dígitos.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input26" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result26();"  required><br>
            <span id="r26"></span>
            <br><br>
        27. Leer un número entero de cuatro dígitos y determinar cuántos dígitos pares tiene.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input27" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result27();"  required><br>
            <span id="r27"></span>
            <br><br>
        28. Leer un número entero menor que 50 y que sea positivo y determinar si es un número par.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input28" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result28();"  required><br>
            <span id="r28"></span>
            <br><br>
        29. Leer un número entero de cinco dígitos y determinar si es un número capicúo. Ej. 15651, 59895.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input29" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result29();"  required><br>
            <span id="r29"></span>
            <br><br>
        30. Leer un número entero de cuatro dígitos y determinar si el segundo dígito es igual al penúltimo.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input30" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result30();"  required><br>
            <span id="r30"></span>
            <br><br>                                    
        31. Leer un número entero y determina si es igual a 10.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input31" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result31();"  required><br>
            <span id="r31"></span>
            <br><br>                    
        32. Leer un número entero y determinar si es múltiplo de 7.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input32" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result32();"  required><br>
            <span id="r32"></span>
            <br><br>                    
        33. Leer un número entero y determinar si termina en 7.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input33" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result33();"  required><br>
            <span id="r33"></span>
            <br><br>                    
        34. Leer un número entero menor que mil y determinar cuántos dígitos tiene.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input34" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result34();"  required><br>
            <span id="r34"></span>
            <br><br>                    
        35. Leer un número entero de dos dígitos, guardar cada dígito en una variable diferente y luego mostrarlas en pantalla.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input35" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result35();"  required><br>
            <span id="r35"></span>
            <br><br>                    
        36. Leer un número entero de 4 dígitos y determinar si tiene mas dígitos pares o impares.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input36" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result36();"  required><br>
            <span id="r36"></span>
            <br><br>                    
        37. Leer dos números enteros y determinar cuál es múltiplo de cuál.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input37" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result37();"  required>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input37b" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result37();"  required><br>
            <span id="r37"></span>
            <br><br>  
        38. Leer tres números enteros y determinar si el último dígito de los tres números es igual.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input38" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result38();"  required>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input38b" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result38();"  required>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input38c" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result38();"  required><br>
            <span id="r38"></span>
            <br><br>  
        39. Leer tres números enteros y determina si el penúltimo dígito de los tres números es igual.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input39" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result39();"  required>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input39b" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result39();"  required>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input39c" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result39();"  required><br>
            <span id="r39"></span>
            <br><br>  
        40. Leer dos números enteros y si la diferencia entre los dos es menor o igual a 10<br>entonces mostrar en pantalla todos los enteros comprendidos entre el menor y el mayor de los números leídos.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input40" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result40();"  required>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input40b" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result40();"  required><br>
            <span id="r40"></span>
            <br><br>  
        41. Leer dos números enteros y determinar si la diferencia entre los dos es un número primo.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input41" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result41();"  required>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input41b" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result41();"  required><br>
            <span id="r41"></span>
            <br><br>  
        42. Leer dos números enteros y determinar si la diferencia entre los dos es un número par.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input42" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result42();"  required>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input42b" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result42();"  required><br>
            <span id="r42"></span>
            <br><br>  
        43. Leer dos números enteros y determinar si la diferencia entre los dos<br>es un número divisor exacto de alguno de los dos números.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input43" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result43();"  required>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input43b" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result43();"  required><br>
            <span id="r43"></span>
            <br><br>  
        44. Leer un número entero de 4 dígitos y determinar<br>si el primer dígito es múltiplo de alguno de los otros dígitos.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input44" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result44();"  required><br>
            <span id="r44"></span>
            <br><br>       
        45. Leer un número entero de 2 dígitos y si es par, mostrar en pantalla la suma de sus dígitos,<br>si es primo y menor que 10, mostrar en pantalla su último dígito<br> y si es múltiplo de 5 y menor que 30, mostrar en pantalla el primer dígito.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input45" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result45();"  required><br>
            <span id="r45"></span>
            <br><br>       
        46. Leer un número entero de 2 dígitos y si termina en 1, mostrar en pantalla su primer dígito,<br>si termina en 2, mostrar en pantalla la suma de sus dígitos<br>y si termina en 3, mostrar en pantalla el producto de sus dos dígitos.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input46" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result46();"  required><br>
            <span id="r46"></span>
            <br><br>       
        47. Leer dos números enteros y si la diferencia entre los dos números es par, mostrar en pantalla la suma de los dígitos de los números,<br>si dicha diferencia es un número primo menor que 10, entonces mostrar en pantalla el producto de los dos números<br>y si la diferencia entre ellos termina en 4, mostrar en pantalla todos los dígitos por separado.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input47" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result47();"  required>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input47b" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result47();"  required><br>
            <span id="r47"></span>
            <br><br>       
        48. Leer un número entero y si es menor que 100 determinar si es primo.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input48" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result48();"  required><br>
            <span id="r48"></span>
            <br><br>       
        49. Leer un número entero y si es múltiplo de 4 determinar si su último dígito es primo.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input49" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result49();"  required><br>
            <span id="r49"></span>
            <br><br>       
        50. Leer un número entero y si es múltiplo de 4, mostrar en pantalla su mitad,<br>si es múltiplo de 5, mostrar en pantalla su cuadrado y si es múltiplo de 6,<br>mostrar en pantalla su primer dígito. Asumir que el número no es mayor que 100.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="input50" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return result50();"  required><br>
            <span id="r50"></span>
            <br><br>       


        <br><br>
    </center>
    </details>

    <details id="50ciclos">
        <summary id="section06" style="transform:translateY(-500000px)"><h3>50 algoritmos de ciclos</h3></summary><br><br>
            <center>
        1. Leer un número entero y mostrar todos los enteros comprendidos entre 1 y el número leído.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="cycle01" placeholder="Escribe números aquí >:c"  title="Escribe un número" maxlength="3" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return cycle01();"  required><br>
            <span id="c01"></span>
            <br><br>       
        2. Leer un número entero y mostrar todos los pares comprendidos entre 1 y el número leído.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="cycle02" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="3" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return cycle02();"  required><br>
            <span id="c02"></span>
            <br><br>       
        3. Leer un número entero y mostrar todos los divisores exactos <br> del número comprendidos entre 1 y el número leído.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="cycle03" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="3" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return cycle03();"  required><br>
            <span id="c03"></span>
            <br><br>       
        4. Leer dos números y mostrar todos los enteros comprendidos entre ellos.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="cycle04" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="3" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return cycle04();"  required>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="cycle04b" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="3" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return cycle04();"  required><br>
            <span id="c04"></span>
            <br><br>       
        5. Leer dos números y mostrar todos los números terminados en 4 comprendidos entre ellos.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="cycle05" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="3" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return cycle05();"  required>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="cycle05b" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="3" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return cycle05();"  required><br>
            <span id="c05"></span>
            <br><br>       
        6. Leer un número entero de tres dígitos y mostrar  todos los <br> enteros comprendidos entre 1 y cada uno de los dígitos.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="cycle06" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="15" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return cycle06();"  required><br>
            <span id="c06"></span>
            <br><br>       
        7. Mostrar en pantalla todos los enteros comprendidos entre 1 y 100.<br><br>
            <button  onclick="cycle07()" title="Clickéame, bebé UwU" id="cycle07"> LETS GOOO >:C </button> <br><br>
            <span id="c07"></span>
            <br><br>       
        8. Mostrar en pantalla todos los pares comprendidos entre 20 y 200.<br><br>
            <button  onclick="cycle08()" title="Clickéame, bebé UwU" id="cycle08"> LETS GOOO >:C </button> <br><br>
            <span id="c08"></span>
            <br><br>       
        9. Mostrar en pantalla todos los números terminados en 6 comprendidos entre 25 y 205.<br><br>
            <button  onclick="cycle09()" title="Clickéame, bebé UwU" id="cycle09"> LETS GOOO >:C </button> <br><br>
            <span id="c09"></span>
            <br><br>       
        10. Leer un número entero y determinar a cuánto es igual la suma <br> de todos los enteros comprendidos entre 1 y el número leído.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="cycle10" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="3" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return cycle10();"  required><br>
            <span id="c10"></span>
            <br><br>       
        11. Leer un número entero de dos dígitos y mostrar en pantalla <br> todos los enteros comprendidos entre un dígito y otro.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="cycle11" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="15" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return cycle11();"  required><br>
            <span id="c11"></span>
            <br><br>       
        12. Leer un número entero de 3 dígitos y determinar si tiene el dígito 1.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="cycle12" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="15" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return cycle12();"  required><br>
            <span id="c12"></span>
            <br><br>       
        13. Leer un entero y mostrar todos los múltiplos de 5 comprendidos entre 1 y el número leído.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="cycle13" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="3" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return cycle13();"  required><br>
            <span id="c13"></span>
            <br><br>       
        14. Mostrar en pantalla los primeros 20 múltiplos de 3.<br><br>
            <button  onclick="cycle14()" title="Clickéame, bebé UwU" id="cycle14"> LETS GOOO >:C </button> <br><br>
            <span id="c14"></span>
            <br><br>   
        15. Escribir en pantalla el resultado de sumar los primeros 20 múltiplos de 3.<br><br>
            <button  onclick="cycle15()" title="Clickéame, bebé UwU" id="cycle15"> LETS GOOO >:C </button> <br><br>
            <span id="c15"></span>
            <br><br>   
        16. Mostrar en pantalla el promedio entero de los n primeros múltiplos de 3 para un número n leído.<br><br>
            <input onfocus="if(this.placeholder=='¿Cuántos múltiplos de 3 quieres?')this.placeholder=''" onblur="if(this.placeholder=='')this.placeholder='¿Cuántos múltiplos de 3 quieres?'" type="text" id="cycle16" placeholder="¿Cuántos múltiplos de 3 quieres?" title="Escribe un número" maxlength="3" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return cycle16();"  required><br>
            <span id="c16"></span>
            <br><br>       
        17. Promediar los X primeros múltiplos de 2 y determinar  si ese promedio <br> es mayor que los Y primeros múltiplos de 5 para valores de X & Y leídos.<br><br>
            <input onfocus="if(this.placeholder=='¿Cuántos múltiplos de 2 quieres?')this.placeholder=''" onblur="if(this.placeholder=='')this.placeholder='¿Cuántos múltiplos de 2 quieres?'" type="text" id="cycle17" placeholder="¿Cuántos múltiplos de 2 quieres?" title="Escribe un número" maxlength="3" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return cycle17();"  required>
            <input onfocus="if(this.placeholder=='¿Cuántos múltiplos de 5 quieres?')this.placeholder=''" onblur="if(this.placeholder=='')this.placeholder='¿Cuántos múltiplos de 5 quieres?'" type="text" id="cycle17b" placeholder="¿Cuántos múltiplos de 5 quieres?" title="Escribe un número" maxlength="3" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return cycle17();"  required><br>
            <span id="c17c"></span><br><br>
            <span id="c17"></span><span id="c17b"></span>
            <br><br>       
        18. Leer dos números enteros y mostrar todos los múltiplos de 5 comprendidos entre el menor y el mayor.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="cycle18" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="3" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return cycle18();"  required>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="cycle18b" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="3" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return cycle18();"  required><br>
            <span id="c18"></span>
            <br><br>       
        19. Leer un número entero y determinar si es primo.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="cycle19" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return cycle19();"  required><br>
            <span id="c19"></span>
            <br><br>       
        20. Leer un número entero y determinar cuántos dígitos tiene.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="cycle20" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="15" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return cycle20();"  required><br>
            <span id="c20"></span>
            <br><br>       
        21. Leer un número entero y determinar a cuánto es igual la suma de sus dígitos.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="cycle21" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="15" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return cycle21();"  required><br>
            <span id="c21"></span>
            <br><br>  
        22. Leer un número entero y determinar cuántas veces tiene el dígito 1.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="cycle22" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="15" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return cycle22();"  required><br>
            <span id="c22"></span>
            <br><br>  
        23. Leer un número entero y determinar si la suma de sus dígitos es también un número primo.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="cycle23" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="15" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return cycle23();"  required><br>
            <span id="c23"></span>
            <br><br>  
        24. Leer un número entero y determinar a cuánto es igual al suma de sus dígitos pares.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="cycle24" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="15" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return cycle24();"  required><br>
            <span id="c24"></span>
            <br><br>  
        25. Leer un número entero y determinar a cuánto es igual el promedio entero de sus dígitos.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="cycle25" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="15" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return cycle25();"  required><br>
            <span id="c25"></span>
            <br><br>  
        26. Leer un número entero y determinar cuál es el mayor de sus dígitos.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="cycle26" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="15" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return cycle26();"  required><br>
            <span id="c26"></span>
            <br><br>  
        27. Leer 2 números enteros y determinar cuál de los dos tiene mayor cantidad de dígitos.            <br><br> 
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="cycle27" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="15" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return cycle27();"  required>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="cycle27b" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="15" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return cycle27();"  required><br>
            <span id="c27"></span>
            <br><br> 
        28. Leer 2 números enteros y determinar cual de los dos tiene mayor cantidad de dígitos primos.            <br><br> 
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="cycle28" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="15" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return cycle28();"  required>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="cycle28b" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="15" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return cycle28();"  required><br>
            <span id="c28"></span>
            <br><br> 
        29. Leer un número entero y determinar a cuánto es igual el primero de sus dígitos.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="cycle29" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="15" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return cycle29();"  required><br>
            <span id="c29"></span>
            <br><br>  
        30. Leer un número entero y mostrar todos sus componentes numéricos <br> o sea aquellos para quienes él sea un múltiplo.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="cycle30" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="3" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return cycle30();"  required><br>
            <span id="c30"></span>
            <br><br>  
        31. Leer números hasta que digiten 0 y determinar a cuánto es igual el promedio de los números terminados en 5.<br><br>
            <span id="c31a"></span><br>
            <input  onfocus="this.placeholder=''; document.getElementById('c31a').innerHTML='Escribe números distintos a CERO, humano c:<br> (si terminan en 5 como pide el ejercicio, mejor que mejor -guiño, guiño-)'" onblur="this.placeholder='Escribe números aquí >:c'; document.getElementById('c31a').innerHTML=''" type="text" id="cycle31" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="3" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return cycle31();" required><br>
            <span id="c31b"></span><br>
            <span id="c31"></span><br>
            <span id="c31c"></span>
            <br><br>  
        32. Leer números hasta que digiten 0 y determinar a cuanto es igual el promedio entero de los números primos leídos.<br><br>
            <span id="c32a"></span><br>
            <input  onfocus="this.placeholder=''; document.getElementById('c32a').innerHTML='Escribe números distintos a CERO, humano c:<br> (yo te determino si son primos o ño -guiño guiño-)'" onblur="this.placeholder='Escribe números aquí >:c'; document.getElementById('c32a').innerHTML=''" type="text" id="cycle32" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="3" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return cycle32();" required><br>
            <span id="c32b"></span><br>
            <span id="c32"></span><br>
            <span id="c32c"></span>
            <br><br>  
        33. Si 32768 es el tope superior para los números enteros, determinar cuál es el número primo mas cercano por debajo de él.<br><br>
            <button  onclick="cycle33()" id="cycle33" title="Clickéame, bebé UwU"> LETS GOOO >:C </button> <br><br>
            <span id="c33"></span>
            <br><br>   
        34. Generar los números del 1 al 10 utilizando un ciclo que vaya de 10 a 1.<br><br>
            <button  onclick="cycle34()" id="cycle34" title="Clickéame, bebé UwU" > LETS GOOO >:C </button> <br><br>
            <span id="c34"></span>
            <br><br>   
        35. Leer dos números enteros y determinar a cuánto es igual el producto mutuo del primer dígito de cada uno.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="cycle35" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="15" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return cycle35();"  required>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="cycle35b" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="15" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return cycle35();"  required><br>
            <span id="c35"></span>
            <br><br>  
        36. Mostrar en pantalla la tabla de multiplicar del número 5.<br><br>
            <button  onclick="cycle36()" id="cycle36" title="Clickéame, bebé UwU"> LETS GOOO >:C </button> <br><br>
            <span id="c36"></span>
            <br><br>   
        37. Generar todas las tablas de multiplicar del 1 al 10.<br><br>
            <button  onclick="cycle37()" id="cycle37" title="Clickéame, bebé UwU"> LETS GOOO >:C </button> <br><br>
            <table>
                <tr>
                    <th>TABLA DEL 1</th>
                    <th>TABLA DEL 2</th>
                    <th>TABLA DEL 3</th>
                    <th>TABLA DEL 4</th>
                    <th>TABLA DEL 5</th>
                    <th>TABLA DEL 6</th>
                    <th>TABLA DEL 7</th>
                    <th>TABLA DEL 8</th>
                    <th>TABLA DEL 9</th>
                    <th>TABLA DEL 10</th>
                </tr>
                <tr id="tr10">
                    <td><span id="c371"></span></td>
                    <td><span id="c372"></span></td>
                    <td><span id="c373"></span></td>
                    <td><span id="c374"></span></td>
                    <td><span id="c375"></span></td>
                    <td><span id="c376"></span></td>
                    <td><span id="c377"></span></td>
                    <td><span id="c378"></span></td>
                    <td><span id="c379"></span></td>
                    <td><span id="c3710"></span></td>
                </tr>
            </table>
            <br><br>   
        38. Leer un número entero y mostrar en pantalla su tabla de multiplicar.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="cycle38" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return cycle38();"  required><br>
            <span id="c38"></span>
            <br><br>  
        39. Se define la serie de Fibonacci como la serie que comienza con los dígitos 1 y 0 y va sumando progresivamente los dos últimos elementos de la serie, así:<br>
            0 1 1 2 3 5 8 13 21 34.......
            Utilizando el concepto de ciclo, generar la serie de Fibonacci hasta llegar o sobrepasar al número 10.000.<br><br>
            <button  onclick="cycle39()" id="cycle39" title="Clickéame, bebé UwU"> LETS GOOO >:C </button> <br><br>
            <span id="c39"></span>
            <br><br>   
        40. Leer un número de dos dígitos y determinar si pertenece a la serie de Fibonacci.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="cycle40" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="15" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return cycle40();"  required><br>
            <span id="c40"></span>
            <br><br>  
        41. Determinar a cuánto es igual la suma de los elementos de la serie de Fibonacci entre 0 y 100.<br><br>
            <button  onclick="cycle41()" id="cycle41" title="Clickéame, bebé UwU"> LETS GOOO >:C </button> <br><br>
            <span id="c41"></span>
            <br><br>   
        42. Determinar a cuánto es igual el promedio entero de los elementos de la serie de Fibonacci entre 0 y 1000.<br><br>
            <button  onclick="cycle42()" id="cycle42" title="Clickéame, bebé UwU"> LETS GOOO >:C </button> <br><br>
            <span id="c42"></span>
            <br><br>   
        43. Determinar cuántos elementos de la serie de Fibonacci se encuentran entre 1000 y 2000.<br><br>
            <button  onclick="cycle43()" id="cycle43" title="Clickéame, bebé UwU"> LETS GOOO >:C </button> <br><br>
            <span id="c43"></span>
            <br><br>   
        44. Leer un número y calcularle su factorial.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="cycle44" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="3" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return cycle44();"  required><br>
            <span id="c44"></span>
            <br><br>  
        45. Leer un número y calcularle el factorial a todos los enteros comprendidos entre 1 y el número leído.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="cycle45" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="2" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return cycle45();"  required><br>
            <span id="c45"></span>
            <br><br>  
        46. Leer un número entero y calcular el promedio entero de los factoriales de los enteros comprendidos entre 1 y el número leído.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="cycle46" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="2" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return cycle46();"  required><br>
            <span id="c46"></span>
            <br><br>  
        47. Leer un número entero y calcular a cuánto es igual la sumatoria de todos los factoriales de los números comprendidos entre 1 y el número leído.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="cycle47" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="2" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return cycle47();"  required><br>
            <span id="c47"></span>
            <br><br>  
        48. Utilizando ciclos anidados generar las siguientes parejas de enteros<br>
              0 1
            | 1 1
            | 2 2
            | 3 2
            | 4 3
            | 5 3
            | 6 4
            | 7 4
            | 8 5
            | 9 5
                <br><br>
                <button  onclick="cycle48()" id="cycle48" title="Clickéame, bebé UwU"> LETS GOOO >:C </button> <br><br>
                <span id="c48"></span>
                <br><br>   
        49. Utilizando ciclos anidados generar las siguientes ternas de números<br>
            1 1 1
            | 2 1 2
            | 3 1 3
            | 4 2 1
            | 5 2 2
            | 6 2 3
            | 7 3 1
            | 8 3 2
            | 9 3 3
                <br><br>
                <button  onclick="cycle49()" id="cycle49" title="Clickéame, bebé UwU"> LETS GOOO >:C </button> <br><br>
                <span id="c49"></span>
                <br><br>   
        50. Utilizando ciclos anidados generar las siguientes parejas de números<br>
            0 1
            | 1 1
            | 2 1
            | 3 1
            | 4 2
            | 5 2
            | 6 2
            | 7 2
                <br><br>
                <button  onclick="cycle50()" id="cycle50" title="Clickéame, bebé UwU"> LETS GOOO >:C </button> <br><br>
                <span id="c50"></span>
                <br><br>   
        </center>
    </details>
    
    <details id="50vectores">
        <summary id="section07" style="transform:translateY(-1000000px)"><h3>50 algoritmos de vectores</h3></summary><br>
        <center>
        <div class="gates" onclick="title='REGISTRAR NÚMEROS EN EL INPUT: ENTER | BORRAR NÚMEROS REGISTRADOS: REGISTRAR CERO'"  >
            <br> Para los ejercicios de "leer 10 números", puedes optar por registrar <br> números en el input o generar el resto de números aleatoriamente UwU <br><br>
        </div>
        <br>
        <br>
        1. Leer 10 enteros, almacenarlos en un vector y determinar en qué posición del vector está el mayor número leído.<br><br>
            <span id="a01c"></span><br>
            <input class="falseButton"  type="text" id="arrayi01" placeholder='INGRESAR NÚMEROS' title="" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi01(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array01();" id="arrayb01"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a01"></span><br>
            <span id="a01b"></span><br>
            <div id="a01d" class="vector">
                <div class="vector01" data-id="0" draggable="true"></div>
                <div class="vector01" data-id="1" draggable="true"></div>
                <div class="vector01" data-id="2" draggable="true"></div>
                <div class="vector01" data-id="3" draggable="true"></div>
                <div class="vector01" data-id="4" draggable="true"></div>
                <div class="vector01" data-id="5" draggable="true"></div>
                <div class="vector01" data-id="6" draggable="true"></div>
                <div class="vector01" data-id="7" draggable="true"></div>
                <div class="vector01" data-id="8" draggable="true"></div>
                <div class="vector01" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow01"></div>
                <div class="arrow01"></div>
                <div class="arrow01"></div>
                <div class="arrow01"></div>
                <div class="arrow01"></div>
                <div class="arrow01"></div>
                <div class="arrow01"></div>
                <div class="arrow01"></div>
                <div class="arrow01"></div>
                <div class="arrow01"></div>
            </div><br><br>
            <span id="a01e"></span><br>
            <br><br><br><br>  
        2. Leer 10 enteros, almacenarlos en un vector y determinar en qué posición del vector está el mayor número par leído.<br><br>
            <span id="a02c"></span><br>
            <input class="falseButton"  type="text" id="arrayi02" placeholder='INGRESAR NÚMEROS' title="" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi02(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array02();" id="arrayb02"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a02"></span><br>
            <span id="a02b"></span><br>
            <div id="a02d" class="vector">
                <div class="vector02" data-id="0" draggable="true"></div>
                <div class="vector02" data-id="1" draggable="true"></div>
                <div class="vector02" data-id="2" draggable="true"></div>
                <div class="vector02" data-id="3" draggable="true"></div>
                <div class="vector02" data-id="4" draggable="true"></div>
                <div class="vector02" data-id="5" draggable="true"></div>
                <div class="vector02" data-id="6" draggable="true"></div>
                <div class="vector02" data-id="7" draggable="true"></div>
                <div class="vector02" data-id="8" draggable="true"></div>
                <div class="vector02" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow02"></div>
                <div class="arrow02"></div>
                <div class="arrow02"></div>
                <div class="arrow02"></div>
                <div class="arrow02"></div>
                <div class="arrow02"></div>
                <div class="arrow02"></div>
                <div class="arrow02"></div>
                <div class="arrow02"></div>
                <div class="arrow02"></div>
            </div><br><br>
            <span id="a02e"></span><br>
            <br><br><br><br>  
        3. Leer 10 enteros, almacenarlos en un vector y determinar en qué posición del vector está el mayor número primo leído.<br><br>
            <span id="a03c"></span><br>
            <input class="falseButton"  type="text" id="arrayi03" placeholder='INGRESAR NÚMEROS' title="" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi03(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array03();" id="arrayb03"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a03"></span><br>
            <span id="a03b"></span><br>
            <div id="a03d" class="vector">
                <div class="vector03" data-id="0" draggable="true"></div>
                <div class="vector03" data-id="1" draggable="true"></div>
                <div class="vector03" data-id="2" draggable="true"></div>
                <div class="vector03" data-id="3" draggable="true"></div>
                <div class="vector03" data-id="4" draggable="true"></div>
                <div class="vector03" data-id="5" draggable="true"></div>
                <div class="vector03" data-id="6" draggable="true"></div>
                <div class="vector03" data-id="7" draggable="true"></div>
                <div class="vector03" data-id="8" draggable="true"></div>
                <div class="vector03" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow03"></div>
                <div class="arrow03"></div>
                <div class="arrow03"></div>
                <div class="arrow03"></div>
                <div class="arrow03"></div>
                <div class="arrow03"></div>
                <div class="arrow03"></div>
                <div class="arrow03"></div>
                <div class="arrow03"></div>
                <div class="arrow03"></div>
            </div><br><br>
            <span id="a03e"></span><br>
            <br><br><br><br> 
        4. Cargar un vector de 10 posiciones con los 10 primeros elementos de la serie de Fibonacci y mostrarlo en pantalla.<br><br><br>
            <details id="detailsArr04" class="detArr">
                <summary> 
                    <div class="randBut" class="arraynferno">    
                        <button id="arrayb04" onclick="arrayy04()"> LET'S GOOO >:C </button>
                    </div>
                </summary>
                <br><br>
                <div id="a04d" class="vector">
                    <div class="vector04" data-id="0" draggable="true">1</div>
                    <div class="vector04" data-id="1" draggable="true">1</div>
                    <div class="vector04" data-id="2" draggable="true">2</div>
                    <div class="vector04" data-id="3" draggable="true">3</div>
                    <div class="vector04" data-id="4" draggable="true">5</div>
                    <div class="vector04" data-id="5" draggable="true">8</div>
                    <div class="vector04" data-id="6" draggable="true">13</div>
                    <div class="vector04" data-id="7" draggable="true">21</div>
                    <div class="vector04" data-id="8" draggable="true">34</div>
                    <div class="vector04" data-id="9" draggable="true">55</div>
                </div>
            </details>
            <br><br> 
        5. Almacenar en un vector de 10 posiciones los 10 números primos comprendidos entre 100 y 300. Luego mostrarlos en pantalla.<br><br><br>
            <details id="detailsArr05" class="detArr">
                <summary> 
                    <div class="randBut" class="arraynferno">    
                        <button id="arrayb05" onclick="arrayy05()"> LET'S GOOO >:C </button>
                    </div>
                </summary>
                <br><br>
                <div id="a05d" class="vector">
                    <div class="vector05" data-id="0" draggable="true">101</div>
                    <div class="vector05" data-id="1" draggable="true">103</div>
                    <div class="vector05" data-id="2" draggable="true">107</div>
                    <div class="vector05" data-id="3" draggable="true">109</div>
                    <div class="vector05" data-id="4" draggable="true">113</div>
                    <div class="vector05" data-id="5" draggable="true">127</div>
                    <div class="vector05" data-id="6" draggable="true">131</div>
                    <div class="vector05" data-id="7" draggable="true">137</div>
                    <div class="vector05" data-id="8" draggable="true">139</div>
                    <div class="vector05" data-id="9" draggable="true">149</div>
                </div>
            </details>
            <br><br>       <br><br>
        6. Leer dos números enteros y almacenar en un vector los 10 primeros números primos comprendidos entre el menor y el mayor. Luego mostrarlos en pantalla.<br><br><br>
            <span id="arr06intro"> oli <br> xd </span><br><br>

            <div id="arr666">
                <div id="arr6l">
                    <input class="falseButton"  type="text" id="arrayi06" placeholder='INGRESAR NÚMERO I' title="" maxlength="2" onclick="javascript:select();" onkeypress="return onlyNum(event);" required><br>         
                    <div class="randBut">    
                        <button class="botonesSeccionArreglos" onclick="array06();" id="arrayb06"> GENERAR NÚMERO I </button>
                    </div>
                </div>

                <span id="arrSpan06l">?</span>
                <span id="arrSpan06r">?</span>

                <div id="arr6r">
                    <input class="falseButton"  type="text" id="arrayi06b" placeholder='INGRESAR NÚMERO II' title="" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" required><br>         
                    <div class="randBut">    
                        <button class="botonesSeccionArreglos" onclick="array06b();" id="arrayb06b"> GENERAR NÚMERO II </button>
                    </div>
                </div>
            </div>
            <br><br><br>
            <div id="a06d" class="vector">
                <div class="vector06" data-id="0" draggable="true"></div>
                <div class="vector06" data-id="1" draggable="true"></div>
                <div class="vector06" data-id="2" draggable="true"></div>
                <div class="vector06" data-id="3" draggable="true"></div>
                <div class="vector06" data-id="4" draggable="true"></div>
                <div class="vector06" data-id="5" draggable="true"></div>
                <div class="vector06" data-id="6" draggable="true"></div>
                <div class="vector06" data-id="7" draggable="true"></div>
                <div class="vector06" data-id="8" draggable="true"></div>
                <div class="vector06" data-id="9" draggable="true"></div>
            </div>
            <br><br><br><br>
        7. Leer 10 números enteros, almacenarlos en un vector y determinar en qué posiciones se encuentra el número mayor.<br><br>
            <span id="a07c"></span><br>
            <input class="falseButton"  type="text" id="arrayi07" placeholder='INGRESAR NÚMEROS' title="" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi07(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array07();" id="arrayb07"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a07"></span><br>
            <span id="a07b"></span><br>
            <div id="a07d" class="vector">
                <div class="vector07" data-id="0" draggable="true"></div>
                <div class="vector07" data-id="1" draggable="true"></div>
                <div class="vector07" data-id="2" draggable="true"></div>
                <div class="vector07" data-id="3" draggable="true"></div>
                <div class="vector07" data-id="4" draggable="true"></div>
                <div class="vector07" data-id="5" draggable="true"></div>
                <div class="vector07" data-id="6" draggable="true"></div>
                <div class="vector07" data-id="7" draggable="true"></div>
                <div class="vector07" data-id="8" draggable="true"></div>
                <div class="vector07" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow07"></div>
                <div class="arrow07"></div>
                <div class="arrow07"></div>
                <div class="arrow07"></div>
                <div class="arrow07"></div>
                <div class="arrow07"></div>
                <div class="arrow07"></div>
                <div class="arrow07"></div>
                <div class="arrow07"></div>
                <div class="arrow07"></div>
            </div><br><br>
            <span id="a07e"></span><br>
            <br><br><br><br> 
        8. Leer 10 números enteros, almacenarlos en un vector y determinar en qué posiciones se encuentran los números terminados en 4.<br><br>
            <span id="a08c"></span><br>
            <input class="falseButton"  type="text" id="arrayi08" placeholder='INGRESAR NÚMEROS' title="" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi08(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array08();" id="arrayb08"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a08"></span><br>
            <span id="a08b"></span><br>
            <div id="a08d" class="vector">
                <div class="vector08" data-id="0" draggable="true"></div>
                <div class="vector08" data-id="1" draggable="true"></div>
                <div class="vector08" data-id="2" draggable="true"></div>
                <div class="vector08" data-id="3" draggable="true"></div>
                <div class="vector08" data-id="4" draggable="true"></div>
                <div class="vector08" data-id="5" draggable="true"></div>
                <div class="vector08" data-id="6" draggable="true"></div>
                <div class="vector08" data-id="7" draggable="true"></div>
                <div class="vector08" data-id="8" draggable="true"></div>
                <div class="vector08" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow08"></div>
                <div class="arrow08"></div>
                <div class="arrow08"></div>
                <div class="arrow08"></div>
                <div class="arrow08"></div>
                <div class="arrow08"></div>
                <div class="arrow08"></div>
                <div class="arrow08"></div>
                <div class="arrow08"></div>
                <div class="arrow08"></div>
            </div><br><br>
            <span id="a08e"></span><br>
            <br><br><br><br> 

        9. Leer 10 números enteros, almacenarlos en un vector y determinar cuántas veces está repetido el mayor.<br><br>
            <span id="a09c"></span><br>
            <input class="falseButton"  type="text" id="arrayi09" placeholder='INGRESAR NÚMEROS' title="" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi09(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array09();" id="arrayb09"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a09"></span><br>
            <span id="a09b"></span><br>
            <div id="a09d" class="vector">
                <div class="vector09" data-id="0" draggable="true"></div>
                <div class="vector09" data-id="1" draggable="true"></div>
                <div class="vector09" data-id="2" draggable="true"></div>
                <div class="vector09" data-id="3" draggable="true"></div>
                <div class="vector09" data-id="4" draggable="true"></div>
                <div class="vector09" data-id="5" draggable="true"></div>
                <div class="vector09" data-id="6" draggable="true"></div>
                <div class="vector09" data-id="7" draggable="true"></div>
                <div class="vector09" data-id="8" draggable="true"></div>
                <div class="vector09" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow09"></div>
                <div class="arrow09"></div>
                <div class="arrow09"></div>
                <div class="arrow09"></div>
                <div class="arrow09"></div>
                <div class="arrow09"></div>
                <div class="arrow09"></div>
                <div class="arrow09"></div>
                <div class="arrow09"></div>
                <div class="arrow09"></div>
            </div><br><br>
            <span id="a09e"></span><br>
            <br><br><br><br> 
        
        10. Leer 10 números enteros, almacenarlos en un vector y determinar en qué posiciones se encuentran los números con más de 3 dígitos.<br><br>
            <span id="a10c"></span><br>
            <input class="falseButton"  type="text" id="arrayi10" placeholder='INGRESAR NÚMEROS' title="" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi10(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array10();" id="arrayb10"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a10"></span><br>
            <span id="a10b"></span><br>
            <div id="a10d" class="vector">
                <div class="vector10" data-id="0" draggable="true"></div>
                <div class="vector10" data-id="1" draggable="true"></div>
                <div class="vector10" data-id="2" draggable="true"></div>
                <div class="vector10" data-id="3" draggable="true"></div>
                <div class="vector10" data-id="4" draggable="true"></div>
                <div class="vector10" data-id="5" draggable="true"></div>
                <div class="vector10" data-id="6" draggable="true"></div>
                <div class="vector10" data-id="7" draggable="true"></div>
                <div class="vector10" data-id="8" draggable="true"></div>
                <div class="vector10" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow10"></div>
                <div class="arrow10"></div>
                <div class="arrow10"></div>
                <div class="arrow10"></div>
                <div class="arrow10"></div>
                <div class="arrow10"></div>
                <div class="arrow10"></div>
                <div class="arrow10"></div>
                <div class="arrow10"></div>
                <div class="arrow10"></div>
            </div><br><br>
            <span id="a10e"></span><br>
            <br><br><br><br> 

        11. Leer 10 números enteros, almacenarlos en un vector y determinar cuántos números tienen, de los almacenados allí, tienen menos de 3 dígitos.<br><br>
            <span id="a11c"></span><br>
            <input class="falseButton"  type="text" id="arrayi11" placeholder='INGRESAR NÚMEROS' title="" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi11(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array11();" id="arrayb11"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a11"></span><br>
            <span id="a11b"></span><br>
            <div id="a11d" class="vector">
                <div class="vector11" data-id="0" draggable="true"></div>
                <div class="vector11" data-id="1" draggable="true"></div>
                <div class="vector11" data-id="2" draggable="true"></div>
                <div class="vector11" data-id="3" draggable="true"></div>
                <div class="vector11" data-id="4" draggable="true"></div>
                <div class="vector11" data-id="5" draggable="true"></div>
                <div class="vector11" data-id="6" draggable="true"></div>
                <div class="vector11" data-id="7" draggable="true"></div>
                <div class="vector11" data-id="8" draggable="true"></div>
                <div class="vector11" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow11"></div>
                <div class="arrow11"></div>
                <div class="arrow11"></div>
                <div class="arrow11"></div>
                <div class="arrow11"></div>
                <div class="arrow11"></div>
                <div class="arrow11"></div>
                <div class="arrow11"></div>
                <div class="arrow11"></div>
                <div class="arrow11"></div>
            </div><br><br>
            <span id="a11e"></span><br>
            <br><br><br><br> 

        12. Leer 10 números enteros, almacenarlos en un vector y determinar a cuánto es igual el promedio entero de los datos del vector.<br><br>
            <span id="a12c"></span><br>
            <input class="falseButton"  type="text" id="arrayi12" placeholder='INGRESAR NÚMEROS' title="" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi12(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array12();" id="arrayb12"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a12"></span><br>
            <span id="a12b"></span><br>
            <div id="a12d" class="vector">
                <div class="vector12" data-id="0" draggable="true"></div>
                <div class="vector12" data-id="1" draggable="true"></div>
                <div class="vector12" data-id="2" draggable="true"></div>
                <div class="vector12" data-id="3" draggable="true"></div>
                <div class="vector12" data-id="4" draggable="true"></div>
                <div class="vector12" data-id="5" draggable="true"></div>
                <div class="vector12" data-id="6" draggable="true"></div>
                <div class="vector12" data-id="7" draggable="true"></div>
                <div class="vector12" data-id="8" draggable="true"></div>
                <div class="vector12" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow12"></div>
                <div class="arrow12"></div>
                <div class="arrow12"></div>
                <div class="arrow12"></div>
                <div class="arrow12"></div>
                <div class="arrow12"></div>
                <div class="arrow12"></div>
                <div class="arrow12"></div>
                <div class="arrow12"></div>
                <div class="arrow12"></div>
            </div><br><br>
            <span id="a12e"></span><br>
            <br><br><br><br> 

        13. Leer 10 números enteros, almacenarlos en un vector y determinar si el promedio entero de estos datos está almacenado en el vector.<br><br>
            <span id="a13c"></span><br>
            <input class="falseButton"  type="text" id="arrayi13" placeholder='INGRESAR NÚMEROS' title="" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi13(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array13();" id="arrayb13"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a13"></span><br>
            <span id="a13b"></span><br>
            <div id="a13d" class="vector">
                <div class="vector13" data-id="0" draggable="true"></div>
                <div class="vector13" data-id="1" draggable="true"></div>
                <div class="vector13" data-id="2" draggable="true"></div>
                <div class="vector13" data-id="3" draggable="true"></div>
                <div class="vector13" data-id="4" draggable="true"></div>
                <div class="vector13" data-id="5" draggable="true"></div>
                <div class="vector13" data-id="6" draggable="true"></div>
                <div class="vector13" data-id="7" draggable="true"></div>
                <div class="vector13" data-id="8" draggable="true"></div>
                <div class="vector13" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow13"></div>
                <div class="arrow13"></div>
                <div class="arrow13"></div>
                <div class="arrow13"></div>
                <div class="arrow13"></div>
                <div class="arrow13"></div>
                <div class="arrow13"></div>
                <div class="arrow13"></div>
                <div class="arrow13"></div>
                <div class="arrow13"></div>
            </div><br><br>
            <span id="a13e"></span><br>
            <br><br><br><br> 

        14. Leer 10 números enteros, almacenarlos en un vector y determinar cuántas veces se repite el promedio entero de los datos dentro del vector.<br><br>
            <span id="a14c"></span><br>
            <input class="falseButton"  type="text" id="arrayi14" placeholder='INGRESAR NÚMEROS' title="" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi14(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array14();" id="arrayb14"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a14"></span><br>
            <span id="a14b"></span><br>
            <div id="a14d" class="vector">
                <div class="vector14" data-id="0" draggable="true"></div>
                <div class="vector14" data-id="1" draggable="true"></div>
                <div class="vector14" data-id="2" draggable="true"></div>
                <div class="vector14" data-id="3" draggable="true"></div>
                <div class="vector14" data-id="4" draggable="true"></div>
                <div class="vector14" data-id="5" draggable="true"></div>
                <div class="vector14" data-id="6" draggable="true"></div>
                <div class="vector14" data-id="7" draggable="true"></div>
                <div class="vector14" data-id="8" draggable="true"></div>
                <div class="vector14" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow14"></div>
                <div class="arrow14"></div>
                <div class="arrow14"></div>
                <div class="arrow14"></div>
                <div class="arrow14"></div>
                <div class="arrow14"></div>
                <div class="arrow14"></div>
                <div class="arrow14"></div>
                <div class="arrow14"></div>
                <div class="arrow14"></div>
            </div><br><br>
            <span id="a14e"></span><br>
            <br><br><br><br> 

        15. Leer 10 números enteros, almacenarlos en un vector y determinar cuántos datos almacenados son múltiplos de 3.<br><br>
            <span id="a15c"></span><br>
            <input class="falseButton"  type="text" id="arrayi15" placeholder='INGRESAR NÚMEROS' title="" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi15(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array15();" id="arrayb15"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a15"></span><br>
            <span id="a15b"></span><br>
            <div id="a15d" class="vector">
                <div class="vector15" data-id="0" draggable="true"></div>
                <div class="vector15" data-id="1" draggable="true"></div>
                <div class="vector15" data-id="2" draggable="true"></div>
                <div class="vector15" data-id="3" draggable="true"></div>
                <div class="vector15" data-id="4" draggable="true"></div>
                <div class="vector15" data-id="5" draggable="true"></div>
                <div class="vector15" data-id="6" draggable="true"></div>
                <div class="vector15" data-id="7" draggable="true"></div>
                <div class="vector15" data-id="8" draggable="true"></div>
                <div class="vector15" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow15"></div>
                <div class="arrow15"></div>
                <div class="arrow15"></div>
                <div class="arrow15"></div>
                <div class="arrow15"></div>
                <div class="arrow15"></div>
                <div class="arrow15"></div>
                <div class="arrow15"></div>
                <div class="arrow15"></div>
                <div class="arrow15"></div>
            </div><br><br>
            <span id="a15e"></span><br>
            <br><br><br><br> 

        16. Leer 10 números enteros, almacenarlos en un vector y determinar cuáles son los datos almacenados múltiplos de 3.<br><br>
            <span id="a16c"></span><br>
            <input class="falseButton"  type="text" id="arrayi16" placeholder='INGRESAR NÚMEROS' title="" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi16(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array16();" id="arrayb16"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a16"></span><br>
            <span id="a16b"></span><br>
            <div id="a16d" class="vector">
                <div class="vector16" data-id="0" draggable="true"></div>
                <div class="vector16" data-id="1" draggable="true"></div>
                <div class="vector16" data-id="2" draggable="true"></div>
                <div class="vector16" data-id="3" draggable="true"></div>
                <div class="vector16" data-id="4" draggable="true"></div>
                <div class="vector16" data-id="5" draggable="true"></div>
                <div class="vector16" data-id="6" draggable="true"></div>
                <div class="vector16" data-id="7" draggable="true"></div>
                <div class="vector16" data-id="8" draggable="true"></div>
                <div class="vector16" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow16"></div>
                <div class="arrow16"></div>
                <div class="arrow16"></div>
                <div class="arrow16"></div>
                <div class="arrow16"></div>
                <div class="arrow16"></div>
                <div class="arrow16"></div>
                <div class="arrow16"></div>
                <div class="arrow16"></div>
                <div class="arrow16"></div>
            </div><br><br>
            <span id="a16e"></span><br>
            <br><br><br><br> 

        17. Leer 10 números enteros, almacenarlos en un vector y determinar cuántos números negativos hay.<br><br>
            <span id="a17c"></span><br>
            <input class="falseButton"  type="text" id="arrayi17" placeholder='INGRESAR NÚMEROS' title="" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi17(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array17();" id="arrayb17"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a17"></span><br>
            <span id="a17b"></span><br>
            <div id="a17d" class="vector">
                <div class="vector17" data-id="0" draggable="true"></div>
                <div class="vector17" data-id="1" draggable="true"></div>
                <div class="vector17" data-id="2" draggable="true"></div>
                <div class="vector17" data-id="3" draggable="true"></div>
                <div class="vector17" data-id="4" draggable="true"></div>
                <div class="vector17" data-id="5" draggable="true"></div>
                <div class="vector17" data-id="6" draggable="true"></div>
                <div class="vector17" data-id="7" draggable="true"></div>
                <div class="vector17" data-id="8" draggable="true"></div>
                <div class="vector17" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow17"></div>
                <div class="arrow17"></div>
                <div class="arrow17"></div>
                <div class="arrow17"></div>
                <div class="arrow17"></div>
                <div class="arrow17"></div>
                <div class="arrow17"></div>
                <div class="arrow17"></div>
                <div class="arrow17"></div>
                <div class="arrow17"></div>
            </div><br><br>
            <span id="a17e"></span><br>
            <br><br><br><br> 

        18. Leer 10 números enteros, almacenarlos en un vector y determinar en qué posiciones están los números positivos.<br><br>
            <span id="a18c"></span><br>
            <input class="falseButton"  type="text" id="arrayi18" placeholder='INGRESAR NÚMEROS' title="" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi18(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array18();" id="arrayb18"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a18"></span><br>
            <span id="a18b"></span><br>
            <div id="a18d" class="vector">
                <div class="vector18" data-id="0" draggable="true"></div>
                <div class="vector18" data-id="1" draggable="true"></div>
                <div class="vector18" data-id="2" draggable="true"></div>
                <div class="vector18" data-id="3" draggable="true"></div>
                <div class="vector18" data-id="4" draggable="true"></div>
                <div class="vector18" data-id="5" draggable="true"></div>
                <div class="vector18" data-id="6" draggable="true"></div>
                <div class="vector18" data-id="7" draggable="true"></div>
                <div class="vector18" data-id="8" draggable="true"></div>
                <div class="vector18" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow18"></div>
                <div class="arrow18"></div>
                <div class="arrow18"></div>
                <div class="arrow18"></div>
                <div class="arrow18"></div>
                <div class="arrow18"></div>
                <div class="arrow18"></div>
                <div class="arrow18"></div>
                <div class="arrow18"></div>
                <div class="arrow18"></div>
            </div><br><br>
            <span id="a18e"></span><br>
            <br><br><br><br> 

        19. Leer 10 números enteros, almacenarlos en un vector y determinar cuál es el número menor.<br><br>
            <span id="a19c"></span><br>
            <input class="falseButton"  type="text" id="arrayi19" placeholder='INGRESAR NÚMEROS' title="" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi19(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array19();" id="arrayb19"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a19"></span><br>
            <span id="a19b"></span><br>
            <div id="a19d" class="vector">
                <div class="vector19" data-id="0" draggable="true"></div>
                <div class="vector19" data-id="1" draggable="true"></div>
                <div class="vector19" data-id="2" draggable="true"></div>
                <div class="vector19" data-id="3" draggable="true"></div>
                <div class="vector19" data-id="4" draggable="true"></div>
                <div class="vector19" data-id="5" draggable="true"></div>
                <div class="vector19" data-id="6" draggable="true"></div>
                <div class="vector19" data-id="7" draggable="true"></div>
                <div class="vector19" data-id="8" draggable="true"></div>
                <div class="vector19" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow19"></div>
                <div class="arrow19"></div>
                <div class="arrow19"></div>
                <div class="arrow19"></div>
                <div class="arrow19"></div>
                <div class="arrow19"></div>
                <div class="arrow19"></div>
                <div class="arrow19"></div>
                <div class="arrow19"></div>
                <div class="arrow19"></div>
            </div><br><br>
            <span id="a19e"></span><br>
            <br><br><br><br> 

        20. Leer 10 números enteros, almacenarlos en un vector y determinar en qué posición está el menor número primo.<br><br>
            <span id="a20c"></span><br>
            <input class="falseButton"  type="text" id="arrayi20" placeholder='INGRESAR NÚMEROS' title="" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi20(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array20();" id="arrayb20"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a20"></span><br>
            <span id="a20b"></span><br>
            <div id="a20d" class="vector">
                <div class="vector20" data-id="0" draggable="true"></div>
                <div class="vector20" data-id="1" draggable="true"></div>
                <div class="vector20" data-id="2" draggable="true"></div>
                <div class="vector20" data-id="3" draggable="true"></div>
                <div class="vector20" data-id="4" draggable="true"></div>
                <div class="vector20" data-id="5" draggable="true"></div>
                <div class="vector20" data-id="6" draggable="true"></div>
                <div class="vector20" data-id="7" draggable="true"></div>
                <div class="vector20" data-id="8" draggable="true"></div>
                <div class="vector20" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow20"></div>
                <div class="arrow20"></div>
                <div class="arrow20"></div>
                <div class="arrow20"></div>
                <div class="arrow20"></div>
                <div class="arrow20"></div>
                <div class="arrow20"></div>
                <div class="arrow20"></div>
                <div class="arrow20"></div>
                <div class="arrow20"></div>
            </div><br><br>
            <span id="a20e"></span><br>
            <br><br><br><br> 
        
        21. Leer 10 números enteros, almacenarlos en un vector y determinar en qué posición está el número cuya suma de dígitos sea la mayor.<br><br>
            <span id="a21c"></span><br>
            <input class="falseButton"  type="text" id="arrayi21" placeholder='INGRESAR NÚMEROS' title="" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi21(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array21();" id="arrayb21"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a21"></span><br>
            <span id="a21b"></span><br>
            <div id="a21d" class="vector">
                <div class="vector21" data-id="0" draggable="true"></div>
                <div class="vector21" data-id="1" draggable="true"></div>
                <div class="vector21" data-id="2" draggable="true"></div>
                <div class="vector21" data-id="3" draggable="true"></div>
                <div class="vector21" data-id="4" draggable="true"></div>
                <div class="vector21" data-id="5" draggable="true"></div>
                <div class="vector21" data-id="6" draggable="true"></div>
                <div class="vector21" data-id="7" draggable="true"></div>
                <div class="vector21" data-id="8" draggable="true"></div>
                <div class="vector21" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow21"></div>
                <div class="arrow21"></div>
                <div class="arrow21"></div>
                <div class="arrow21"></div>
                <div class="arrow21"></div>
                <div class="arrow21"></div>
                <div class="arrow21"></div>
                <div class="arrow21"></div>
                <div class="arrow21"></div>
                <div class="arrow21"></div>
            </div><br><br>
            <span id="a21e"></span><br>
            <br><br><br><br> 

        22. Leer 10 números enteros, almacenarlos en un vector y determinar cuáles son los números múltiplos de 5 y en qué posiciones están.<br><br>
                <span id="a22c"></span><br>
                <input class="falseButton"  type="text" id="arrayi22" placeholder='INGRESAR NÚMEROS' title="" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi22(event);"  required><br>
                <div class="randBut">    
                    <button class="botonesSeccionArreglos" onclick="array22();" id="arrayb22"> GENERAR 10 NÚMEROS ALEATORIOS </button>
                </div>
                <br>
                <span id="a22"></span><br>
                <span id="a22b"></span><br>
                <div id="a22d" class="vector">
                    <div class="vector22" data-id="0" draggable="true"></div>
                    <div class="vector22" data-id="1" draggable="true"></div>
                    <div class="vector22" data-id="2" draggable="true"></div>
                    <div class="vector22" data-id="3" draggable="true"></div>
                    <div class="vector22" data-id="4" draggable="true"></div>
                    <div class="vector22" data-id="5" draggable="true"></div>
                    <div class="vector22" data-id="6" draggable="true"></div>
                    <div class="vector22" data-id="7" draggable="true"></div>
                    <div class="vector22" data-id="8" draggable="true"></div>
                    <div class="vector22" data-id="9" draggable="true"></div>
                </div>
                <div class="arrow">
                    <div class="arrow22"></div>
                    <div class="arrow22"></div>
                    <div class="arrow22"></div>
                    <div class="arrow22"></div>
                    <div class="arrow22"></div>
                    <div class="arrow22"></div>
                    <div class="arrow22"></div>
                    <div class="arrow22"></div>
                    <div class="arrow22"></div>
                    <div class="arrow22"></div>
                </div><br><br>
                <span id="a22e"></span><br>
                <br><br><br><br> 

        23. Leer 10 números enteros, almacenarlos en un vector y determinar si existe al menos un número repetido.<br><br>
            <span id="a23c"></span><br>
            <input class="falseButton"  type="text" id="arrayi23" placeholder='INGRESAR NÚMEROS' title="" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi23(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array23();" id="arrayb23"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a23"></span><br>
            <span id="a23b"></span><br>
            <div id="a23d" class="vector">
                <div class="vector23" data-id="0" draggable="true"></div>
                <div class="vector23" data-id="1" draggable="true"></div>
                <div class="vector23" data-id="2" draggable="true"></div>
                <div class="vector23" data-id="3" draggable="true"></div>
                <div class="vector23" data-id="4" draggable="true"></div>
                <div class="vector23" data-id="5" draggable="true"></div>
                <div class="vector23" data-id="6" draggable="true"></div>
                <div class="vector23" data-id="7" draggable="true"></div>
                <div class="vector23" data-id="8" draggable="true"></div>
                <div class="vector23" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow23"></div>
                <div class="arrow23"></div>
                <div class="arrow23"></div>
                <div class="arrow23"></div>
                <div class="arrow23"></div>
                <div class="arrow23"></div>
                <div class="arrow23"></div>
                <div class="arrow23"></div>
                <div class="arrow23"></div>
                <div class="arrow23"></div>
            </div><br><br>
            <span id="a23e"></span><br>
            <br><br> 

        24. Leer 10 números enteros, almacenarlos en un vector y determinar en qué posición está el número con mas dígitos.<br><br>
            <span id="a24c"></span><br>
            <input class="falseButton"  type="text" id="arrayi24" placeholder='INGRESAR NÚMEROS' title="" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi24(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array24();" id="arrayb24"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a24"></span><br>
            <span id="a24b"></span><br>
            <div id="a24d" class="vector">
                <div class="vector24" data-id="0" draggable="true"></div>
                <div class="vector24" data-id="1" draggable="true"></div>
                <div class="vector24" data-id="2" draggable="true"></div>
                <div class="vector24" data-id="3" draggable="true"></div>
                <div class="vector24" data-id="4" draggable="true"></div>
                <div class="vector24" data-id="5" draggable="true"></div>
                <div class="vector24" data-id="6" draggable="true"></div>
                <div class="vector24" data-id="7" draggable="true"></div>
                <div class="vector24" data-id="8" draggable="true"></div>
                <div class="vector24" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow24"></div>
                <div class="arrow24"></div>
                <div class="arrow24"></div>
                <div class="arrow24"></div>
                <div class="arrow24"></div>
                <div class="arrow24"></div>
                <div class="arrow24"></div>
                <div class="arrow24"></div>
                <div class="arrow24"></div>
                <div class="arrow24"></div>
            </div><br><br>
            <span id="a24e"></span><br>
            <br><br> 

        25. Leer 10 números enteros, almacenarlos en un vector y determinar cuántos de los números leídos son números primos terminados en 3.<br><br>
        <span id="a25c"></span><br>
        <input class="falseButton"  type="text" id="arrayi25" placeholder='INGRESAR NÚMEROS' title="" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi25(event);"  required><br>
        <div class="randBut">    
            <button class="botonesSeccionArreglos" onclick="array25();" id="arrayb25"> GENERAR 10 NÚMEROS ALEATORIOS </button>
        </div>
        <br>
        <span id="a25"></span><br>
        <span id="a25b"></span><br>
        <div id="a25d" class="vector">
            <div class="vector25" data-id="0" draggable="true"></div>
            <div class="vector25" data-id="1" draggable="true"></div>
            <div class="vector25" data-id="2" draggable="true"></div>
            <div class="vector25" data-id="3" draggable="true"></div>
            <div class="vector25" data-id="4" draggable="true"></div>
            <div class="vector25" data-id="5" draggable="true"></div>
            <div class="vector25" data-id="6" draggable="true"></div>
            <div class="vector25" data-id="7" draggable="true"></div>
            <div class="vector25" data-id="8" draggable="true"></div>
            <div class="vector25" data-id="9" draggable="true"></div>
        </div>
        <div class="arrow">
            <div class="arrow25"></div>
            <div class="arrow25"></div>
            <div class="arrow25"></div>
            <div class="arrow25"></div>
            <div class="arrow25"></div>
            <div class="arrow25"></div>
            <div class="arrow25"></div>
            <div class="arrow25"></div>
            <div class="arrow25"></div>
            <div class="arrow25"></div>
        </div><br><br>
        <span id="a25e"></span><br>
        <br><br> 

        26. Leer 10 números enteros, almacenarlos en un vector y calcularle el factorial a cada uno de los números leídos. <br><br>
            <span id="a26c"></span><br>
            <input class="falseButton"  type="text" id="arrayi26" placeholder='INGRESAR NÚMEROS' title="" maxlength="1" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi26(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array26();" id="arrayb26"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a26"></span><br>
            <span id="a26b"></span><br>
            <div id="a26d" class="vector">
                <div class="vector26" data-id="0" draggable="true"></div>
                <div class="vector26" data-id="1" draggable="true"></div>
                <div class="vector26" data-id="2" draggable="true"></div>
                <div class="vector26" data-id="3" draggable="true"></div>
                <div class="vector26" data-id="4" draggable="true"></div>
                <div class="vector26" data-id="5" draggable="true"></div>
                <div class="vector26" data-id="6" draggable="true"></div>
                <div class="vector26" data-id="7" draggable="true"></div>
                <div class="vector26" data-id="8" draggable="true"></div>
                <div class="vector26" data-id="9" draggable="true"></div>
            </div>
            <br><br>
            <span id="a26e"></span><br>
            <br><br>
        27. Leer 10 números enteros, almacenarlos en un vector y determinar a cuánto es igual el promedio entero de los factoriales de cada uno de los números leídos.<br><br>
            <span id="a27c"></span><br>
            <input class="falseButton"  type="text" id="arrayi27" placeholder='INGRESAR NÚMEROS' title="" maxlength="1" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi27(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array27();" id="arrayb27"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a27"></span><br>
            <span id="a27b"></span><br>
            <div id="a27d" class="vector">
                <div class="vector27" data-id="0" draggable="true"></div>
                <div class="vector27" data-id="1" draggable="true"></div>
                <div class="vector27" data-id="2" draggable="true"></div>
                <div class="vector27" data-id="3" draggable="true"></div>
                <div class="vector27" data-id="4" draggable="true"></div>
                <div class="vector27" data-id="5" draggable="true"></div>
                <div class="vector27" data-id="6" draggable="true"></div>
                <div class="vector27" data-id="7" draggable="true"></div>
                <div class="vector27" data-id="8" draggable="true"></div>
                <div class="vector27" data-id="9" draggable="true"></div>
            </div>
            <br><br>
            <span id="a27e"></span><br>
            <br><br>
        28. Leer 10 números enteros, almacenarlos en un vector y mostrar en pantalla todos los enteros <br> comprendidos entre 1 y cada uno de los números almacenados en el vector.<br><br>
            <span id="a28c"></span><br>
            <input class="falseButton"  type="text" id="arrayi28" placeholder='INGRESAR NÚMEROS' title="" maxlength="1" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi28(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array28();" id="arrayb28"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a28"></span><br>
            <span id="a28b"></span><br>
            <div id="a28d" class="vector">
                <div class="vector28" data-id="0" draggable="true"></div>
                <div class="vector28" data-id="1" draggable="true"></div>
                <div class="vector28" data-id="2" draggable="true"></div>
                <div class="vector28" data-id="3" draggable="true"></div>
                <div class="vector28" data-id="4" draggable="true"></div>
                <div class="vector28" data-id="5" draggable="true"></div>
                <div class="vector28" data-id="6" draggable="true"></div>
                <div class="vector28" data-id="7" draggable="true"></div>
                <div class="vector28" data-id="8" draggable="true"></div>
                <div class="vector28" data-id="9" draggable="true"></div>
            </div>
            <br><br>
            <span id="a28e"></span><br>
            <br><br>
        29. Leer 10 números enteros, almacenarlos en un vector y mostrar en pantalla todos los enteros comprendidos <br>  entre 1 y cada uno de los dígitos de cada uno de los números almacenados en el vector.<br><br>
            <span id="a29c"></span><br>
            <input class="falseButton"  type="text" id="arrayi29" placeholder='INGRESAR NÚMEROS' title="" maxlength="2" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi29(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array29();" id="arrayb29"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a29"></span><br>
            <span id="a29b"></span><br>
            <div id="a29d" class="vector">
                <div class="vector29" data-id="0" draggable="true"></div>
                <div class="vector29" data-id="1" draggable="true"></div>
                <div class="vector29" data-id="2" draggable="true"></div>
                <div class="vector29" data-id="3" draggable="true"></div>
                <div class="vector29" data-id="4" draggable="true"></div>
                <div class="vector29" data-id="5" draggable="true"></div>
                <div class="vector29" data-id="6" draggable="true"></div>
                <div class="vector29" data-id="7" draggable="true"></div>
                <div class="vector29" data-id="8" draggable="true"></div>
                <div class="vector29" data-id="9" draggable="true"></div>
            </div>
            <br><br>
            <span id="a29e"></span><br>
            <br><br>
        30. Leer 10 números enteros, almacenarlos en un vector. Luego leer un entero <br> y determinar si este último entero se encuentra entre los 10 valores almacenados en el vector.<br><br>
            <span id="a30c"></span><br>
            <input class="falseButton"  type="text" id="arrayi30" placeholder='INGRESAR NÚMEROS' title="" maxlength="1" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi30(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array30();" id="arrayb30"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a30"></span><br>
            <span id="a30b"></span><br>
            <div id="a30d" class="vector">
                <div class="vector30" data-id="0" draggable="true"></div>
                <div class="vector30" data-id="1" draggable="true"></div>
                <div class="vector30" data-id="2" draggable="true"></div>
                <div class="vector30" data-id="3" draggable="true"></div>
                <div class="vector30" data-id="4" draggable="true"></div>
                <div class="vector30" data-id="5" draggable="true"></div>
                <div class="vector30" data-id="6" draggable="true"></div>
                <div class="vector30" data-id="7" draggable="true"></div>
                <div class="vector30" data-id="8" draggable="true"></div>
                <div class="vector30" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow30"></div>
                <div class="arrow30"></div>
                <div class="arrow30"></div>
                <div class="arrow30"></div>
                <div class="arrow30"></div>
                <div class="arrow30"></div>
                <div class="arrow30"></div>
                <div class="arrow30"></div>
                <div class="arrow30"></div>
                <div class="arrow30"></div>
            </div><br><br>
            <span class="eleven" id="a30f"></span><br>
            <span id="a30f" class="eleven"></span><br>
            <span id="a30e"></span>
            <br><br>
        31. Leer 10 números enteros, almacenarlos en un vector. Luego leer un entero <br> y determinar cuántos divisores exactos tiene este último número entre los valores almacenados en el vector.<br><br>
            <span id="a31c"></span><br>
            <input class="falseButton"  type="text" id="arrayi31" placeholder='INGRESAR NÚMEROS' title="" maxlength="2" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi31(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array31();" id="arrayb31"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a31"></span><br>
            <span id="a31b"></span><br>
            <div id="a31d" class="vector">
                <div class="vector31" data-id="0" draggable="true"></div>
                <div class="vector31" data-id="1" draggable="true"></div>
                <div class="vector31" data-id="2" draggable="true"></div>
                <div class="vector31" data-id="3" draggable="true"></div>
                <div class="vector31" data-id="4" draggable="true"></div>
                <div class="vector31" data-id="5" draggable="true"></div>
                <div class="vector31" data-id="6" draggable="true"></div>
                <div class="vector31" data-id="7" draggable="true"></div>
                <div class="vector31" data-id="8" draggable="true"></div>
                <div class="vector31" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow31"></div>
                <div class="arrow31"></div>
                <div class="arrow31"></div>
                <div class="arrow31"></div>
                <div class="arrow31"></div>
                <div class="arrow31"></div>
                <div class="arrow31"></div>
                <div class="arrow31"></div>
                <div class="arrow31"></div>
                <div class="arrow31"></div>
            </div><br><br>
            <span class="eleven" id="a31f"></span><br>
            <span id="a31f" class="eleven"></span><br>
            <span id="a31e"></span>
            <br><br><br><br> 
        32. Leer 10 números enteros, almacenarlos en un vector. Luego leer un entero y determinar cuántos números <br> de los almacenados en el vector terminan en el mismo dígito que el último valor leído.<br><br>
            <span id="a32c"></span><br>
            <input class="falseButton"  type="text" id="arrayi32" placeholder='INGRESAR NÚMEROS' title="" maxlength="2" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi32(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array32();" id="arrayb32"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a32"></span><br>
            <span id="a32b"></span><br>
            <div id="a32d" class="vector">
                <div class="vector32" data-id="0" draggable="true"></div>
                <div class="vector32" data-id="1" draggable="true"></div>
                <div class="vector32" data-id="2" draggable="true"></div>
                <div class="vector32" data-id="3" draggable="true"></div>
                <div class="vector32" data-id="4" draggable="true"></div>
                <div class="vector32" data-id="5" draggable="true"></div>
                <div class="vector32" data-id="6" draggable="true"></div>
                <div class="vector32" data-id="7" draggable="true"></div>
                <div class="vector32" data-id="8" draggable="true"></div>
                <div class="vector32" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow32"></div>
                <div class="arrow32"></div>
                <div class="arrow32"></div>
                <div class="arrow32"></div>
                <div class="arrow32"></div>
                <div class="arrow32"></div>
                <div class="arrow32"></div>
                <div class="arrow32"></div>
                <div class="arrow32"></div>
                <div class="arrow32"></div>
            </div><br><br>
            <span class="eleven" id="a32f"></span><br>
            <span id="a32f" class="eleven"></span><br>
            <span id="a32e"></span>
            <br><br><br><br> 
        33. Leer 10 números enteros, almacenarlos en un vector y determinar a cuánto es igual la suma de los dígitos pares de cada uno de los números leídos.<br><br>
            <span id="a33c"></span><br>
            <input class="falseButton"  type="text" id="arrayi33" placeholder='INGRESAR NÚMEROS' title="" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi33(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array33();" id="arrayb33"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a33"></span><br>
            <span id="a33b"></span><br>
            <div id="a33d" class="vector">
                <div class="vector33" data-id="0" draggable="true"></div>
                <div class="vector33" data-id="1" draggable="true"></div>
                <div class="vector33" data-id="2" draggable="true"></div>
                <div class="vector33" data-id="3" draggable="true"></div>
                <div class="vector33" data-id="4" draggable="true"></div>
                <div class="vector33" data-id="5" draggable="true"></div>
                <div class="vector33" data-id="6" draggable="true"></div>
                <div class="vector33" data-id="7" draggable="true"></div>
                <div class="vector33" data-id="8" draggable="true"></div>
                <div class="vector33" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow33"></div>
                <div class="arrow33"></div>
                <div class="arrow33"></div>
                <div class="arrow33"></div>
                <div class="arrow33"></div>
                <div class="arrow33"></div>
                <div class="arrow33"></div>
                <div class="arrow33"></div>
                <div class="arrow33"></div>
                <div class="arrow33"></div>
            </div><br><br>
            <span id="a33e"></span><br>
            <br><br><br><br> 
        34. Leer 10 números enteros, almacenarlos en un vector y determinar cuántas veces en el vector <br>
        se encuentra el dígito 2. No se olvide que el dígito 2 puede estar varias veces en un mismo
        número.<br><br>
            <span id="a34c"></span><br>
            <input class="falseButton"  type="text" id="arrayi34" placeholder='INGRESAR NÚMEROS' title="" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi34(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array34();" id="arrayb34"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a34"></span><br>
            <span id="a34b"></span><br>
            <div id="a34d" class="vector">
                <div class="vector34" data-id="0" draggable="true"></div>
                <div class="vector34" data-id="1" draggable="true"></div>
                <div class="vector34" data-id="2" draggable="true"></div>
                <div class="vector34" data-id="3" draggable="true"></div>
                <div class="vector34" data-id="4" draggable="true"></div>
                <div class="vector34" data-id="5" draggable="true"></div>
                <div class="vector34" data-id="6" draggable="true"></div>
                <div class="vector34" data-id="7" draggable="true"></div>
                <div class="vector34" data-id="8" draggable="true"></div>
                <div class="vector34" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow34"></div>
                <div class="arrow34"></div>
                <div class="arrow34"></div>
                <div class="arrow34"></div>
                <div class="arrow34"></div>
                <div class="arrow34"></div>
                <div class="arrow34"></div>
                <div class="arrow34"></div>
                <div class="arrow34"></div>
                <div class="arrow34"></div>
            </div><br><br>
            <span id="a34e"></span><br>
            <br><br><br><br> 
        35. Leer 10 números enteros, almacenarlos en un vector y determinar si el promedio entero de dichos números es un número primo.<br><br>
            <span id="a35c"></span><br>
            <input class="falseButton"  type="text" id="arrayi35" placeholder='INGRESAR NÚMEROS' title="" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi35(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array35();" id="arrayb35"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a35"></span><br>
            <span id="a35b"></span><br>
            <div id="a35d" class="vector">
                <div class="vector35" data-id="0" draggable="true"></div>
                <div class="vector35" data-id="1" draggable="true"></div>
                <div class="vector35" data-id="2" draggable="true"></div>
                <div class="vector35" data-id="3" draggable="true"></div>
                <div class="vector35" data-id="4" draggable="true"></div>
                <div class="vector35" data-id="5" draggable="true"></div>
                <div class="vector35" data-id="6" draggable="true"></div>
                <div class="vector35" data-id="7" draggable="true"></div>
                <div class="vector35" data-id="8" draggable="true"></div>
                <div class="vector35" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow35"></div>
                <div class="arrow35"></div>
                <div class="arrow35"></div>
                <div class="arrow35"></div>
                <div class="arrow35"></div>
                <div class="arrow35"></div>
                <div class="arrow35"></div>
                <div class="arrow35"></div>
                <div class="arrow35"></div>
                <div class="arrow35"></div>
            </div><br><br>
            <span id="a35e"></span><br>
            <br><br><br><br> 

        36. Leer 10 números enteros, almacenarlos en un vector y determinar cuántos dígitos primos hay en los números leídos.<br><br>
            <span id="a36c"></span><br>
            <input class="falseButton"  type="text" id="arrayi36" placeholder='INGRESAR NÚMEROS' title="" maxlength="2" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi36(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array36();" id="arrayb36"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>  
            <br>
            <span id="a36"></span><br>
            <span id="a36b"></span><br>
            <div id="a36d" class="vector">
                <div class="vector36" data-id="0" draggable="true"></div>
                <div class="vector36" data-id="1" draggable="true"></div>
                <div class="vector36" data-id="2" draggable="true"></div>
                <div class="vector36" data-id="3" draggable="true"></div>
                <div class="vector36" data-id="4" draggable="true"></div>
                <div class="vector36" data-id="5" draggable="true"></div>
                <div class="vector36" data-id="6" draggable="true"></div>
                <div class="vector36" data-id="7" draggable="true"></div>
                <div class="vector36" data-id="8" draggable="true"></div>
                <div class="vector36" data-id="9" draggable="true"></div>
            </div>
            <br><br>
            <span id="a36e"></span><br>
            <br><br><br><br>

        37. Leer 10 números enteros, almacenarlos en un vector y determinar a cuántos es igual el cuadrado de cada uno de los números leídos.<br><br>
            <span id="a37c"></span><br>
            <input class="falseButton"  type="text" id="arrayi37" placeholder='INGRESAR NÚMEROS' title="" maxlength="3" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi37(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array37();" id="arrayb37"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>  
            <br>
            <span id="a37"></span><br>
            <span id="a37b"></span><br>
            <div id="a37d" class="vector">
                <div class="vector37" data-id="0" draggable="true"></div>
                <div class="vector37" data-id="1" draggable="true"></div>
                <div class="vector37" data-id="2" draggable="true"></div>
                <div class="vector37" data-id="3" draggable="true"></div>
                <div class="vector37" data-id="4" draggable="true"></div>
                <div class="vector37" data-id="5" draggable="true"></div>
                <div class="vector37" data-id="6" draggable="true"></div>
                <div class="vector37" data-id="7" draggable="true"></div>
                <div class="vector37" data-id="8" draggable="true"></div>
                <div class="vector37" data-id="9" draggable="true"></div>
            </div>
            <br><br>
            <span id="a37e"></span><br>
            <br><br><br>

        38. Leer 10 números enteros, almacenarlos en un vector y determinar si la semisuma entre el valor mayor y el valor menor es un número primo.
            <span id="a38c"></span><br>
            <input class="falseButton"  type="text" id="arrayi38" placeholder='INGRESAR NÚMEROS' title="" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi38(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array38();" id="arrayb38"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a38"></span><br>
            <span id="a38b"></span><br>
            <div id="a38d" class="vector">
                <div class="vector38" data-id="0" draggable="true"></div>
                <div class="vector38" data-id="1" draggable="true"></div>
                <div class="vector38" data-id="2" draggable="true"></div>
                <div class="vector38" data-id="3" draggable="true"></div>
                <div class="vector38" data-id="4" draggable="true"></div>
                <div class="vector38" data-id="5" draggable="true"></div>
                <div class="vector38" data-id="6" draggable="true"></div>
                <div class="vector38" data-id="7" draggable="true"></div>
                <div class="vector38" data-id="8" draggable="true"></div>
                <div class="vector38" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow38"></div>
                <div class="arrow38"></div>
                <div class="arrow38"></div>
                <div class="arrow38"></div>
                <div class="arrow38"></div>
                <div class="arrow38"></div>
                <div class="arrow38"></div>
                <div class="arrow38"></div>
                <div class="arrow38"></div>
                <div class="arrow38"></div>
            </div><br><br>
            <span id="a38e"></span><br>
            <br><br><br><br> 
        39. Leer 10 números enteros, almacenarlos en un vector y determinar si la semisuma entre el valor mayor y el valor menor es un número par.<br><br>
            <span id="a39c"></span><br>
            <input class="falseButton"  type="text" id="arrayi39" placeholder='INGRESAR NÚMEROS' title="" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi39(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array39();" id="arrayb39"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a39"></span><br>
            <span id="a39b"></span><br>
            <div id="a39d" class="vector">
                <div class="vector39" data-id="0" draggable="true"></div>
                <div class="vector39" data-id="1" draggable="true"></div>
                <div class="vector39" data-id="2" draggable="true"></div>
                <div class="vector39" data-id="3" draggable="true"></div>
                <div class="vector39" data-id="4" draggable="true"></div>
                <div class="vector39" data-id="5" draggable="true"></div>
                <div class="vector39" data-id="6" draggable="true"></div>
                <div class="vector39" data-id="7" draggable="true"></div>
                <div class="vector39" data-id="8" draggable="true"></div>
                <div class="vector39" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow39"></div>
                <div class="arrow39"></div>
                <div class="arrow39"></div>
                <div class="arrow39"></div>
                <div class="arrow39"></div>
                <div class="arrow39"></div>
                <div class="arrow39"></div>
                <div class="arrow39"></div>
                <div class="arrow39"></div>
                <div class="arrow39"></div>
            </div><br><br>
            <span id="a39e"></span><br>
            <br><br><br><br> 
        40. Leer 10 números enteros, almacenarlos en un vector y determinar cuántos números de los almacenados en dicho vector terminan en 15.<br><br>
            <span id="a40c"></span><br>
            <input class="falseButton"  type="text" id="arrayi40" placeholder='INGRESAR NÚMEROS' title="" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi40(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array40();" id="arrayb40"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a40"></span><br>
            <span id="a40b"></span><br>
            <div id="a40d" class="vector">
                <div class="vector40" data-id="0" draggable="true"></div>
                <div class="vector40" data-id="1" draggable="true"></div>
                <div class="vector40" data-id="2" draggable="true"></div>
                <div class="vector40" data-id="3" draggable="true"></div>
                <div class="vector40" data-id="4" draggable="true"></div>
                <div class="vector40" data-id="5" draggable="true"></div>
                <div class="vector40" data-id="6" draggable="true"></div>
                <div class="vector40" data-id="7" draggable="true"></div>
                <div class="vector40" data-id="8" draggable="true"></div>
                <div class="vector40" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow40"></div>
                <div class="arrow40"></div>
                <div class="arrow40"></div>
                <div class="arrow40"></div>
                <div class="arrow40"></div>
                <div class="arrow40"></div>
                <div class="arrow40"></div>
                <div class="arrow40"></div>
                <div class="arrow40"></div>
                <div class="arrow40"></div>
            </div><br><br>
            <span id="a40e"></span><br>
            <br><br><br><br> 
        41. Leer 10 números enteros, almacenarlos en un vector y determinar cuántos números de los almacenados en dicho vector comienzan con 3.<br><br>
            <span id="a41c"></span><br>
            <input class="falseButton"  type="text" id="arrayi41" placeholder='INGRESAR NÚMEROS' title="" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi41(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array41();" id="arrayb41"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a41"></span><br>
            <span id="a41b"></span><br>
            <div id="a41d" class="vector">
                <div class="vector41" data-id="0" draggable="true"></div>
                <div class="vector41" data-id="1" draggable="true"></div>
                <div class="vector41" data-id="2" draggable="true"></div>
                <div class="vector41" data-id="3" draggable="true"></div>
                <div class="vector41" data-id="4" draggable="true"></div>
                <div class="vector41" data-id="5" draggable="true"></div>
                <div class="vector41" data-id="6" draggable="true"></div>
                <div class="vector41" data-id="7" draggable="true"></div>
                <div class="vector41" data-id="8" draggable="true"></div>
                <div class="vector41" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow41"></div>
                <div class="arrow41"></div>
                <div class="arrow41"></div>
                <div class="arrow41"></div>
                <div class="arrow41"></div>
                <div class="arrow41"></div>
                <div class="arrow41"></div>
                <div class="arrow41"></div>
                <div class="arrow41"></div>
                <div class="arrow41"></div>
            </div><br><br>
            <span id="a41e"></span><br>
            <br><br> 
        42. Leer 10 números enteros, almacenarlos en un vector y determinar cuántos números con cantidad par de dígitos pares hay almacenados en dicho vector.<br><br>
            <span id="a42c"></span><br>
            <input class="falseButton"  type="text" id="arrayi42" placeholder='INGRESAR NÚMEROS' title="" maxlength="5" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi42(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array42();" id="arrayb42"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a42"></span><br>
            <span id="a42b"></span><br>
            <div id="a42d" class="vector">
                <div class="vector42" data-id="0" draggable="true"></div>
                <div class="vector42" data-id="1" draggable="true"></div>
                <div class="vector42" data-id="2" draggable="true"></div>
                <div class="vector42" data-id="3" draggable="true"></div>
                <div class="vector42" data-id="4" draggable="true"></div>
                <div class="vector42" data-id="5" draggable="true"></div>
                <div class="vector42" data-id="6" draggable="true"></div>
                <div class="vector42" data-id="7" draggable="true"></div>
                <div class="vector42" data-id="8" draggable="true"></div>
                <div class="vector42" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow42"></div>
                <div class="arrow42"></div>
                <div class="arrow42"></div>
                <div class="arrow42"></div>
                <div class="arrow42"></div>
                <div class="arrow42"></div>
                <div class="arrow42"></div>
                <div class="arrow42"></div>
                <div class="arrow42"></div>
                <div class="arrow42"></div>
            </div><br><br>
            <span id="a42e"></span><br>
            <br><br><br><br> 
        43. Leer 10 números enteros, almacenarlos en un vector y determinar en qué posiciones se encuentra el número con mayor cantidad de dígitos primos.<br><br>
            <span id="a43c"></span><br>
            <input class="falseButton"  type="text" id="arrayi43" placeholder='INGRESAR NÚMEROS' title="" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi43(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array43();" id="arrayb43"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a43"></span><br>
            <span id="a43b"></span><br>
            <div id="a43d" class="vector">
                <div class="vector43" data-id="0" draggable="true"></div>
                <div class="vector43" data-id="1" draggable="true"></div>
                <div class="vector43" data-id="2" draggable="true"></div>
                <div class="vector43" data-id="3" draggable="true"></div>
                <div class="vector43" data-id="4" draggable="true"></div>
                <div class="vector43" data-id="5" draggable="true"></div>
                <div class="vector43" data-id="6" draggable="true"></div>
                <div class="vector43" data-id="7" draggable="true"></div>
                <div class="vector43" data-id="8" draggable="true"></div>
                <div class="vector43" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow43"></div>
                <div class="arrow43"></div>
                <div class="arrow43"></div>
                <div class="arrow43"></div>
                <div class="arrow43"></div>
                <div class="arrow43"></div>
                <div class="arrow43"></div>
                <div class="arrow43"></div>
                <div class="arrow43"></div>
                <div class="arrow43"></div>
            </div><br><br>
            <span id="a43e"></span><br>
            <br><br><br><br> 
        44. Leer 10 números enteros, almacenarlos en un vector y determinar cuántos de los números <br> almacenados en dicho vector pertenecen a los 100 primeros elementos de la serie de Fibonacci.<br><br>
            <span id="a44c"></span><br>
            <input class="falseButton"  type="text" id="arrayi44" placeholder='INGRESAR NÚMEROS' title="" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi44(event);"  required><br>
            <div class="randBut">    
                <button onclick="array44();" id="arrayb44"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a44"></span><br>
            <span id="a44b"></span><br>
            <div id="a44d" class="vector">
                <div class="vector44" data-id="0" draggable="true"></div>
                <div class="vector44" data-id="1" draggable="true"></div>
                <div class="vector44" data-id="2" draggable="true"></div>
                <div class="vector44" data-id="3" draggable="true"></div>
                <div class="vector44" data-id="4" draggable="true"></div>
                <div class="vector44" data-id="5" draggable="true"></div>
                <div class="vector44" data-id="6" draggable="true"></div>
                <div class="vector44" data-id="7" draggable="true"></div>
                <div class="vector44" data-id="8" draggable="true"></div>
                <div class="vector44" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow44"></div>
                <div class="arrow44"></div>
                <div class="arrow44"></div>
                <div class="arrow44"></div>
                <div class="arrow44"></div>
                <div class="arrow44"></div>
                <div class="arrow44"></div>
                <div class="arrow44"></div>
                <div class="arrow44"></div>
                <div class="arrow44"></div>
            </div><br><br>
            <span id="a44e"></span><br>
            <br><br><br><br> 
        45. Leer 10 números enteros, almacenarlos en un vector y determinar cuántos números de los almacenados en dicho vector comienzan por 34.<br><br>
            <span id="a45c"></span><br>
            <input class="falseButton"  type="text" id="arrayi45" placeholder='INGRESAR NÚMEROS' title="" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi45(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array45();" id="arrayb45"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a45"></span><br>
            <span id="a45b"></span><br>
            <div id="a45d" class="vector">
                <div class="vector45" data-id="0" draggable="true"></div>
                <div class="vector45" data-id="1" draggable="true"></div>
                <div class="vector45" data-id="2" draggable="true"></div>
                <div class="vector45" data-id="3" draggable="true"></div>
                <div class="vector45" data-id="4" draggable="true"></div>
                <div class="vector45" data-id="5" draggable="true"></div>
                <div class="vector45" data-id="6" draggable="true"></div>
                <div class="vector45" data-id="7" draggable="true"></div>
                <div class="vector45" data-id="8" draggable="true"></div>
                <div class="vector45" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow45"></div>
                <div class="arrow45"></div>
                <div class="arrow45"></div>
                <div class="arrow45"></div>
                <div class="arrow45"></div>
                <div class="arrow45"></div>
                <div class="arrow45"></div>
                <div class="arrow45"></div>
                <div class="arrow45"></div>
                <div class="arrow45"></div>
            </div><br><br>
            <span id="a45e"></span><br>
            <br><br><br><br> 
        46. Leer 10 números enteros, almacenarlos en un vector y determinar cuántos números de los almacenados en dicho vector son primos y comienzan por 5.<br><br>
            <span id="a46c"></span><br>
            <input class="falseButton"  type="text" id="arrayi46" placeholder='INGRESAR NÚMEROS' title="" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi46(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array46();" id="arrayb46"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a46"></span><br>
            <span id="a46b"></span><br>
            <div id="a46d" class="vector">
                <div class="vector46" data-id="0" draggable="true"></div>
                <div class="vector46" data-id="1" draggable="true"></div>
                <div class="vector46" data-id="2" draggable="true"></div>
                <div class="vector46" data-id="3" draggable="true"></div>
                <div class="vector46" data-id="4" draggable="true"></div>
                <div class="vector46" data-id="5" draggable="true"></div>
                <div class="vector46" data-id="6" draggable="true"></div>
                <div class="vector46" data-id="7" draggable="true"></div>
                <div class="vector46" data-id="8" draggable="true"></div>
                <div class="vector46" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow46"></div>
                <div class="arrow46"></div>
                <div class="arrow46"></div>
                <div class="arrow46"></div>
                <div class="arrow46"></div>
                <div class="arrow46"></div>
                <div class="arrow46"></div>
                <div class="arrow46"></div>
                <div class="arrow46"></div>
                <div class="arrow46"></div>
            </div><br><br>
            <span id="a46e"></span><br>
            <br><br><br><br> 
        47. Leer 10 números enteros, almacenarlos en un vector y determinar en qué posiciones se encuentran los números múltiplos de 10.<br><br>
            <span id="a47c"></span><br>
            <input class="falseButton"  type="text" id="arrayi47" placeholder='INGRESAR NÚMEROS' title="" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi47(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array47();" id="arrayb47"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a47"></span><br>
            <span id="a47b"></span><br>
            <div id="a47d" class="vector">
                <div class="vector47" data-id="0" draggable="true"></div>
                <div class="vector47" data-id="1" draggable="true"></div>
                <div class="vector47" data-id="2" draggable="true"></div>
                <div class="vector47" data-id="3" draggable="true"></div>
                <div class="vector47" data-id="4" draggable="true"></div>
                <div class="vector47" data-id="5" draggable="true"></div>
                <div class="vector47" data-id="6" draggable="true"></div>
                <div class="vector47" data-id="7" draggable="true"></div>
                <div class="vector47" data-id="8" draggable="true"></div>
                <div class="vector47" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow47"></div>
                <div class="arrow47"></div>
                <div class="arrow47"></div>
                <div class="arrow47"></div>
                <div class="arrow47"></div>
                <div class="arrow47"></div>
                <div class="arrow47"></div>
                <div class="arrow47"></div>
                <div class="arrow47"></div>
                <div class="arrow47"></div>
            </div><br><br>
            <span id="a47e"></span><br>
            <br><br>
        48. Leer 10 números enteros, almacenarlos en un vector y determinar en qué posición se encuentra el número primo con mayor cantidad de dígitos pares.<br><br>
            <span id="a48c"></span><br>
            <input class="falseButton"  type="text" id="arrayi48" placeholder='INGRESAR NÚMEROS' title="" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi48(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array48();" id="arrayb48"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a48"></span><br>
            <span id="a48b"></span><br>
            <div id="a48d" class="vector">
                <div class="vector48" data-id="0" draggable="true"></div>
                <div class="vector48" data-id="1" draggable="true"></div>
                <div class="vector48" data-id="2" draggable="true"></div>
                <div class="vector48" data-id="3" draggable="true"></div>
                <div class="vector48" data-id="4" draggable="true"></div>
                <div class="vector48" data-id="5" draggable="true"></div>
                <div class="vector48" data-id="6" draggable="true"></div>
                <div class="vector48" data-id="7" draggable="true"></div>
                <div class="vector48" data-id="8" draggable="true"></div>
                <div class="vector48" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow48"></div>
                <div class="arrow48"></div>
                <div class="arrow48"></div>
                <div class="arrow48"></div>
                <div class="arrow48"></div>
                <div class="arrow48"></div>
                <div class="arrow48"></div>
                <div class="arrow48"></div>
                <div class="arrow48"></div>
                <div class="arrow48"></div>
            </div><br><br>
            <span id="a48e"></span><br>
            <br><br><br><br> 
        49. Leer 10 números enteros, almacenarlos en un vector y determinar cuántos números terminan en dígito primo.<br><br>
            <span id="a49c"></span><br>
            <input class="falseButton"  type="text" id="arrayi49" placeholder='INGRESAR NÚMEROS' title="" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi49(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array49();" id="arrayb49"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a49"></span><br>
            <span id="a49b"></span><br>
            <div id="a49d" class="vector">
                <div class="vector49" data-id="0" draggable="true"></div>
                <div class="vector49" data-id="1" draggable="true"></div>
                <div class="vector49" data-id="2" draggable="true"></div>
                <div class="vector49" data-id="3" draggable="true"></div>
                <div class="vector49" data-id="4" draggable="true"></div>
                <div class="vector49" data-id="5" draggable="true"></div>
                <div class="vector49" data-id="6" draggable="true"></div>
                <div class="vector49" data-id="7" draggable="true"></div>
                <div class="vector49" data-id="8" draggable="true"></div>
                <div class="vector49" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow49"></div>
                <div class="arrow49"></div>
                <div class="arrow49"></div>
                <div class="arrow49"></div>
                <div class="arrow49"></div>
                <div class="arrow49"></div>
                <div class="arrow49"></div>
                <div class="arrow49"></div>
                <div class="arrow49"></div>
                <div class="arrow49"></div>
            </div><br><br>
            <span id="a49e"></span><br>
            <br><br><br><br> 
        50. Leer 10 números enteros, almacenarlos en un vector y determinar cuántos números de los almacenados en dicho vector comienzan en dígito primo.<br><br>
            <span id="a50c"></span><br>
            <input class="falseButton"  type="text" id="arrayi50" placeholder='INGRESAR NÚMEROS' title="" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi50(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array50();" id="arrayb50"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a50"></span><br>
            <span id="a50b"></span><br>
            <div id="a50d" class="vector">
                <div class="vector50" data-id="0" draggable="true"></div>
                <div class="vector50" data-id="1" draggable="true"></div>
                <div class="vector50" data-id="2" draggable="true"></div>
                <div class="vector50" data-id="3" draggable="true"></div>
                <div class="vector50" data-id="4" draggable="true"></div>
                <div class="vector50" data-id="5" draggable="true"></div>
                <div class="vector50" data-id="6" draggable="true"></div>
                <div class="vector50" data-id="7" draggable="true"></div>
                <div class="vector50" data-id="8" draggable="true"></div>
                <div class="vector50" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow50"></div>
                <div class="arrow50"></div>
                <div class="arrow50"></div>
                <div class="arrow50"></div>
                <div class="arrow50"></div>
                <div class="arrow50"></div>
                <div class="arrow50"></div>
                <div class="arrow50"></div>
                <div class="arrow50"></div>
                <div class="arrow50"></div>
            </div><br><br>
            <span id="a50e"></span><br>
        </center> 
    </details>
    
    <details id="50matrices">
        <summary id="section08" style="transform:translateY(-1500000px)"><h3>50 algoritmos de matrices</h3></summary>
        <center>
            <span class="gates">
                <br>
                <em>BIENVENIDO A MATRIX</em> <br><br> 
                Genera matrices con doble click <br> Alterna entre valor y posición con click derecho <br> Primero se leen filas (verticales), luego columnas (horizontales) 
                <br><br><br>
            </span>
            <div class="matrixCradle">
                <div class="matrix"><br>
                    <div class="mSpan">
                        <span> 1. Leer una matriz 4x4 entera y determinar en qué fila y en qué columna se encuentra el número mayor. </span>
                    </div>
                    <br><br><br>
                    <div class="cuad" id="cuad01"> <p> <em> dame doble click c: </em> </p> </div>
                    <div class="cave" id="m01"></div><br><br>
                </div>

                <div class="matrix"><br>
                    <div class="mSpan">
                        <span> 2. Leer una matriz 4x4 entera y determinar cuántas veces se repite en ella el número mayor. </span>
                    </div>
                    <br><br><br>
                    <div class="cuad" id="cuad02"> <p> <em> dame doble click c: </em> </p> </div>
                    <div class="cave" id="m02"></div><br><br>
                </div>

                <div class="matrix"><br><br>
                    <div class="mSpan">
                        <span> 3. Leer una matriz 3x4 entera y determinar en qué posiciones exactas se encuentran los números pares. </span>
                    </div>
                    <br><br><br><br><br>
                    <div class="cuad" id="cuad03"> <p> <em> dame doble click c: </em> </p> </div>
                    <div class="cave" id="m03"></div><br><br>
                </div>

                <div class="matrix"><br><br>
                    <div class="mSpan">
                        <span> 4. Leer una matriz 4x3 entera y determinar en qué posiciones exactas se encuentran los números primos. </span>
                    </div>
                    <br><br><br>
                    <div class="cuad" id="cuad04"> <p> <em> dame doble click c: </em> </p> </div>
                    <div class="cave" id="m04"></div><br><br>
                </div>

                <div class="matrix"><br><br>
                    <div class="mSpan">
                        <span> 5. Leer una matriz 4x3 entera, calcular la suma de los elementos de cada fila y determinar cuál es la fila que tiene la mayor suma. </span>
                    </div>
                    <br><br>
                    <div class="cuad" id="cuad05"> <p> <em> dame doble click c: </em> </p> </div>
                    <div class="cave" id="m05"></div><br><br>
                </div>

                <div class="matrix"><br><br>
                    <div class="mSpan">
                        <span> 6. Leer una matriz 4x4 entera y calcular el promedio de los números mayores de cada fila. </span><br><br>
                    </div>
                    <span id="mAns06" class="mAns"></span><br><br>
                    <div class="cuad" id="cuad06"> <p> <em> dame doble click c: </em> </p> </div>
                    <div class="cave" id="m06"></div><br><br>
                </div>

                <div class="matrix"><br><br>
                    <div class="mSpan">
                        <span> 7. Leer una matriz 4x4 entera y determinar en qué posiciones están los enteros terminados en 0. </span>
                    </div>
                    <br><br><br>
                    <div class="cuad" id="cuad07"> <p> <em> dame doble click c: </em> </p> </div>
                    <div class="cave" id="m07"></div><br><br>
                </div>

                <div class="matrix"><br><br>
                    <div class="mSpan">
                        <span> 8. Leer una matriz 4x4 entera y determinar cuántos enteros terminados en 0 hay almacenados en ella. </span>
                    </div>
                    <br><br><br>
                    <div class="cuad" id="cuad08"> <p> <em> dame doble click c: </em> </p> </div>
                    <div class="cave" id="m08"></div><br><br>
                </div>

                <div class="matrix"><br><br>
                    <div class="mSpan">
                        <span> 9. Leer una matriz 3x4 entera y determinar cuántos de los números almacenados son primos y terminan en 3. </span>
                    </div>
                    <br><br><br><br>
                    <div class="cuad" id="cuad09"> <p> <em> dame doble click c: </em> </p> </div>
                    <div class="cave" id="m09"></div><br><br>
                </div>

                <div class="matrix"><br>
                    <div class="mSpan">
                        <span> 10. Leer una matriz 5x3 entera y determinar en qué fila está el mayor número primo. </span>
                    </div>
                    <br>
                    <div class="cuad" id="cuad10"> <p> <em> dame doble click c: </em> </p> </div>
                    <div class="cave" id="m10"></div><br><br>
                </div>

                <div class="matrix"><br>
                    <div class="mSpan">
                        <span> 11. Leer una matriz 5x3 entera y determinar en qué columna está el menor número par. </span>
                    </div>
                    <br>
                    <div class="cuad" id="cuad11"> <p> <em> dame doble click c: </em> </p> </div>
                    <div class="cave" id="m11"></div><br><br>
                </div>

                <div class="matrix"><br>
                    <div class="mSpan">
                        <span> 12. Leer una matriz 5x5 entera y determinar en qué fila está el mayor número terminado en 6. </span>
                    </div>
                    <br>
                    <div class="cuad" id="cuad12"> <p> <em> dame doble click c: </em> </p> </div>
                    <div class="cave" id="m12"></div><br><br>
                </div>

                <div class="matrix"><br>
                    <div class="mSpan">
                        <span> 13. Leer una matriz 5x3 entera y determinar en qué columna está el mayor número que comienza por el 4. </span>
                    </div>
                    <br>
                    <div class="cuad" id="cuad13"> <p> <em> dame doble click c: </em> </p> </div>
                    <div class="cave" id="m13"></div><br><br>
                </div>

                <div class="matrix"><br>
                    <div class="mSpan">
                        <span> 14. Leer una matriz 5x5 entera y determinar cuántos números almacenados en ella tienen mas de 3 dígitos. </span>
                    </div>
                    <br>
                    <div class="cuad" id="cuad14"> <p> <em> dame doble click c: </em> </p> </div>
                    <div class="cave" id="m14"></div><br><br>
                </div>

                <div class="matrix"><br>
                    <div class="mSpan">
                        <span> 15. Leer una matriz 5x4 entera y determinar cuántos números almacenados en ella terminan en 34. </span>
                    </div>
                    <br>
                    <div class="cuad" id="cuad15"> <p> <em> dame doble click c: </em> </p> </div>
                    <div class="cave" id="m15"></div><br><br>
                </div>

                <div class="matrix"><br>
                    <div class="mSpan">
                        <span> 16. Leer una matriz 5x4 entera y determinar cuántos números almacenados en ella tienen un solo dígito. </span>
                    </div>
                    <br>
                    <div class="cuad" id="cuad16"> <p> <em> dame doble click c: </em> </p> </div>
                    <div class="cave" id="m16"></div><br><br>
                </div>

                <div class="matrix"><br>
                    <div class="mSpan">
                        <span> 17. Leer una matriz 5x4 entera y determinar cuántos múltiplos de 5 hay almacenados en ella. </span>
                    </div>
                    <br>
                    <div class="cuad" id="cuad17"> <p> <em> dame doble click c: </em> </p> </div>
                    <div class="cave" id="m17"></div><br><br>
                </div>

                <div class="matrix"><br>
                    <div class="mSpan">
                        <span> 18. Leer una matriz 5x5 entera y determinar en qué posición exacta se encuentra el mayor múltiplo de 8. </span>
                    </div>
                    <br>
                    <div class="cuad" id="cuad18"> <p> <em> dame doble click c: </em> </p> </div>
                    <div class="cave" id="m18"></div><br><br>
                </div>

                <div class="duality">
                    <div class="mSpan">
                        <span> 19. Leer dos matrices 4x5 entera y determinar si sus contenidos son exactamente iguales. 
                            <br> <em class="mAns" id="m19em"></em>
                        </span>
                    </div>
                    <div class="origin">
                        <div class="cuad" id="cuad19"> <p> <em class='m1'> dame doble click c: </em> </p> </div>
                        <div class="cave" id="m19"></div>
                    </div>
                    <div class="symmetry">
                        <div class="cuad" id="cuad20"> <p> <em class='m2'> dame doble click c: </em> </p> </div>
                        <div class="cave" id="m20"></div>
                    </div>
                </div>

                <div class="duality" id="dualMatrixInput">
                    <div class="mSpan">
                        <span> 20. Leer dos matrices 4x5 entera, luego leer un entero y determinar si cada uno de los elementos de una de las matrices es igual a cada uno de los elementos de la otra matriz multiplicado por el entero leído.     
                        </span>
                    </div>

                    <input class='matrixInput' onfocus="this.placeholder=''" onblur="this.placeholder='Escribe un múltiplo aquí >:c'" type="text" id="mi21" placeholder="Escribe un múltiplo aquí >:c" title="Escribe un número" maxlength="1" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return fusion21(matrix21.nums, matrix22.nums);" required> 

                    <div class="origin">
                        <div class="cuad" id="cuad21"> <p> <em class='m1'> dame doble click c: </em> </p> </div>
                        <div class="cave" id="m21"></div>
                    </div>
                    <div class="symmetry">
                        <div class="cuad" id="cuad22"> <p> <em class='m2'> dame doble click c: </em> </p> </div>
                        <div class="cave" id="m22"></div>
                    </div>
                </div>

                <div class="duality">
                    <div class="mSpan">
                        <span> 21. Leer dos matrices 4x5 enteras y determinar cuántos datos tienen en común. </span>
                    </div>
                    <div class="origin">
                        <div class="cuad" id="cuad23"> <p> <em class='m1'> dame doble click c: </em> </p> </div>
                        <div class="cave" id="m23"></div>
                    </div>
                    <div class="symmetry">
                        <div class="cuad" id="cuad24"> <p> <em class='m2'> dame doble click c: </em> </p> </div>
                        <div class="cave" id="m24"></div>
                    </div>
                </div>

                <div class="duality">
                    <div class="mSpan">
                        <span> 
                            22. Leer dos matrices 4x5 enteras y determinar si el número mayor <br> almacenado en la primera está en la segunda. <br>
                            <em class="mAns" id="m25em"></em>
                        </span>
                    </div>
                    <div class="origin">
                        <div class="cuad" id="cuad25"> <p> <em class='m1'> dame doble click c: </em> </p> </div>
                        <div class="cave" id="m25"></div>
                    </div>
                    <div class="symmetry">
                        <div class="cuad" id="cuad26"> <p> <em class='m2'> dame doble click c: </em> </p> </div>
                        <div class="cave" id="m26"></div>
                    </div>
                </div>
                
                <div class="duality">
                    <div class="mSpan">
                        <span> 
                            23. Leer dos matrices 4x5 enteras y determinar si el número mayor de una de las matrices es igual al número mayor de la otra matriz.  <br>
                            <em class="mAns" id="m27em"></em>
                        </span>
                    </div>
                    <div class="origin">
                        <div class="cuad" id="cuad27"> <p> <em class='m1'> dame doble click c: </em> </p> </div>
                        <div class="cave" id="m27"></div>
                    </div>
                    <div class="symmetry">
                        <div class="cuad" id="cuad28"> <p> <em class='m2'> dame doble click c: </em> </p> </div>
                        <div class="cave" id="m28"></div>
                    </div>
                </div>   

                <div class="duality">
                    <div class="mSpan">
                        <span> 
                            24. Leer dos matrices 4x5 enteras y determinar si el mayor número primo de una de las matrices también se encuentra en la otra matriz.
                            <br> <em class="mAns" id="m29em"></em>
                        </span>
                    </div>
                    <div class="origin">
                        <div class="cuad" id="cuad29"> <p> <em class='m1'> dame doble click c: </em> </p> </div>
                        <div class="cave" id="m29"></div>
                    </div>
                    <div class="symmetry">
                        <div class="cuad" id="cuad30"> <p> <em class='m2'> dame doble click c: </em> </p> </div>
                        <div class="cave" id="m30"></div>
                    </div>
                </div>   
                
                <div class="duality">
                    <div class="mSpan">
                        <span> 
                            25. Leer dos matrices 4x5 enteras y determinar si el mayor número primo de una de las matrices es también el mayor número primo de la otra matriz.
                           <br> <em class="mAns" id="m31em"></em>
                        </span>
                    </div>
                    <div class="origin">
                        <div class="cuad" id="cuad31"> <p> <em class='m1'> dame doble click c: </em> </p> </div>
                        <div class="cave" id="m31"></div>
                    </div>
                    <div class="symmetry">
                        <div class="cuad" id="cuad32"> <p> <em class='m2'> dame doble click c: </em> </p> </div>
                        <div class="cave" id="m32"></div>
                    </div>
                </div>                    

                <div class="duality">
                    <div class="mSpan">
                        <span> 
                            26. Leer dos matrices 4x5 enteras y determinar si la cantidad de números pares almacenados en una matriz es igual a la cantidad de números pares almacenados en la otra matriz.
                            <br> <em class="mAns" id="m33em"></em>
                        </span>
                    </div>
                    <div class="origin">
                        <div class="cuad" id="cuad33"> <p> <em class='m1'> dame doble click c: </em> </p> </div>
                        <div class="cave" id="m33"></div>
                    </div>
                    <div class="symmetry">
                        <div class="cuad" id="cuad34"> <p> <em class='m2'> dame doble click c: </em> </p> </div>
                        <div class="cave" id="m34"></div>
                    </div>
                </div>   
                
                <div class="duality">
                    <div class="mSpan">
                        <span> 
                            27. Leer dos matrices 4x5 enteras y determinar si la cantidad de números primos almacenados en una matriz es igual a la cantidad de números primos almacenados en la otra matriz.
                            <br> <em class="mAns" id="m35em"></em>
                        </span>
                    </div>
                    <div class="origin">
                        <div class="cuad" id="cuad35"> <p> <em class='m1'> dame doble click c: </em> </p> </div>
                        <div class="cave" id="m35"></div>
                    </div>
                    <div class="symmetry">
                        <div class="cuad" id="cuad36"> <p> <em class='m2'> dame doble click c: </em> </p> </div>
                        <div class="cave" id="m36"></div>
                    </div>
                </div>                   
                
                <div class="matrix"><br><br>
                    <div class="mSpan">
                        <span> 28. Leer una matriz 4x6 entera y determinar en qué posiciones se encuentran los números cuyo penúltimo dígito sea el 5. </span>
                    </div>
                    <br>
                    <div class="cuad" id="cuad37"> <p> <em> dame doble click c: </em> </p> </div>
                    <div class="cave" id="m37"></div><br><br>
                </div>      
                
                <div class="matrix"><br><br>
                    <div class="mSpan">
                        <span> 29. Leer una matriz 4x6 entera y determinar si alguno de sus números está repetido al menos 3 veces. </span>
                    </div>
                    <br>
                    <div class="cuad" id="cuad38"> <p> <em> dame doble click c: </em> </p> </div>
                    <div class="cave" id="m38"></div><br><br>
                </div>   

                <div class="matrix"><br>
                    <div class="mSpan">
                        <span> 30. Leer una matriz 4x6 entera y determinar cuántas veces está en ella el número menor. </span>
                    </div>
                    <br>
                    <div class="cuad" id="cuad39"> <p> <em> dame doble click c: </em> </p> </div>
                    <div class="cave" id="m39"></div><br><br>
                </div>   

                <div class="matrix"><br>
                    <div class="mSpan">
                        <span> 31. Leer una matriz 4x6 entera y determinar en qué posiciones están los menores por fila. </span>
                    </div>
                    <br>
                    <div class="cuad" id="cuad40"> <p> <em> dame doble click c: </em> </p> </div>
                    <div class="cave" id="m40"></div><br><br>
                </div>   
                
                <div class="matrix"><br>
                    <div class="mSpan">
                        <span> 32. Leer una matriz 4x6 entera y determinar en qué posiciones están los menores primos por fila. </span>
                    </div>
                    <br>
                    <div class="cuad" id="cuad41"> <p> <em> dame doble click c: </em> </p> </div>
                    <div class="cave" id="m41"></div><br><br>
                </div>    
                                
                <div class="matrix"><br>
                    <div class="mSpan">
                        <span> 33. Leer una matriz 4x6 entera y determinar en qué posiciones están los menores pares por fila. </span>
                    </div>
                    <br>
                    <div class="cuad" id="cuad42"> <p> <em> dame doble click c: </em> </p> </div>
                    <div class="cave" id="m42"></div><br><br>
                </div>   

                <div class="matrix"><br><br>
                    <div class="mSpan">
                        <span> 34. Leer una matriz 4x6 entera y determinar cuántos de los números almacenados en ella pertenecen a los 100 primeros elementos de la serie de Fibonacci. </span>
                    </div>
                    <br>
                    <div class="cuad" id="cuad43"> <p> <em> dame doble click c: </em> </p> </div>
                    <div class="cave" id="m43"></div><br><br>
                </div>   

                <div class="matrix"><br><br>
                    <div class="mSpan">
                        <span> 35. Leer una matriz 4x6 enteras y determinar cuál es el mayor dato almacenado en ella que pertenezca a la Serie de Fibonacci. </span>
                    </div>
                    <br>
                    <div class="cuad" id="cuad44"> <p> <em> dame doble click c: </em> </p> </div>
                    <div class="cave" id="m44"></div><br><br>
                </div>  
                
                <div class="duality">
                    <div class="mSpan">
                        <span> 
                            36. Leer dos matrices 4x6 enteras y determinar si el mayor número almacenado en una de ellas que pertenezca a la Serie de Fibonacci es igual al mayor número almacenado en la otra matriz que pertenezca a la Serie de Fibonacci.
                            <br> <em class="mAns" id="m45em"></em><br>
                        </span>
                    </div>
                    <div class="origin">
                        <div class="cuad" id="cuad45"> <p> <em class='m1'> dame doble click c: </em> </p> </div>
                        <div class="cave" id="m45"></div>
                    </div>
                    <div class="symmetry">
                        <div class="cuad" id="cuad46"> <p> <em class='m2'> dame doble click c: </em> </p> </div>
                        <div class="cave" id="m46"></div>
                    </div>
                </div>        
                
                <div class="duality">
                    <div class="mSpan">
                        <span> 
                            37. Leer dos matrices 4x6 enteras y determinar si el número mayor <br> de una matriz se encuentra en la misma posición exacta en la otra matriz.
                            <br> <em class="mAns" id="m47em"></em>
                        </span>
                    </div>
                    <div class="origin">
                        <div class="cuad" id="cuad47"> <p> <em class='m1'> dame doble click c: </em> </p> </div>
                        <div class="cave" id="m47"></div>
                    </div>
                    <div class="symmetry">
                        <div class="cuad" id="cuad48"> <p> <em class='m2'> dame doble click c: </em> </p> </div>
                        <div class="cave" id="m48"></div>
                    </div>
                </div>   

                <div class="duality">
                    <div class="mSpan">
                        <span> 
                            38. Leer dos matrices 4x6 enteras y determinar si el mayor número primo <br> de una matriz está repetido en la otra matriz.
                            <br> <em class="mAns" id="m49em"></em>
                        </span>
                    </div>
                    <div class="origin">
                        <div class="cuad" id="cuad49"> <p> <em class='m1'> dame doble click c: </em> </p> </div>
                        <div class="cave" id="m49"></div>
                    </div>
                    <div class="symmetry">
                        <div class="cuad" id="cuad50"> <p> <em class='m2'> dame doble click c: </em> </p> </div>
                        <div class="cave" id="m50"></div>
                    </div>
                </div>                   

                <div class="duality">
                    <div class="mSpan">
                        <span> 
                            39. Leer dos matrices 4x6 enteras y determinar si el promedio de las “esquinas” <br> de una matriz es igual al promedio de las “esquinas” de la otra matriz.
                            <br> <em class="mAns" id="m51em"> </em>
                        </span>
                    </div>
                    <div class="origin">
                        <em class="mAns" id="m51ema"> pos miau </em>
                        <div class="cuad" id="cuad51"> <p> <em class='m1'> dame doble click c: </em> </p> </div>
                        <div class="cave" id="m51"></div>
                    </div>
                    <div class="symmetry">
                        <em class="mAns" id="m51emb"> pos wow </em>
                        <div class="cuad" id="cuad52"> <p> <em class='m2'> dame doble click c: </em> </p> </div>
                        <div class="cave" id="m52"></div>
                    </div>
                </div>  

                <div class="duality">
                    <div class="mSpan">
                        <span> 
                            40. Leer dos matrices 5x5 enteras y determinar si el promedio entero de los elementos de la diagonal de una matriz es igual al promedio de los elementos de la diagonal de la otra matriz.
                            <br> <em class="mAns" id="m53em"></em>
                        </span>
                    </div>
                    <div class="origin">
                        <em class="mAns" id="m53ema"> pos miau </em>
                        <div class="cuad" id="cuad53"> <p> <em class='m1'> dame doble click c: </em> </p> </div>
                        <div class="cave" id="m53"></div>
                    </div>
                    <div class="symmetry">
                        <em class="mAns" id="m53emb"> pos wow </em>
                        <div class="cuad" id="cuad54"> <p> <em class='m2'> dame doble click c: </em> </p> </div>
                        <div class="cave" id="m54"></div>
                    </div>
                </div> 

                <div class="duality">
                    <div class="mSpan">
                        <span> 
                            41. Leer dos matrices 5x5 enteras y determinar si el promedio entero de todos los elementos que no están en la diagonal de una matriz es igual al promedio entero de todos los elementos que no están en la diagonal de la otra.
                            <br> <em class="mAns" id="m55em"></em>
                        </span>
                    </div>
                    <div class="origin">
                        <em class="mAns" id="m55ema"> pos miau </em>
                        <div class="cuad" id="cuad55"> <p> <em class='m1'> dame doble click c: </em> </p> </div>
                        <div class="cave" id="m55"></div>
                    </div>
                    <div class="symmetry">
                        <em class="mAns" id="m55emb"> pos wow </em>
                        <div class="cuad" id="cuad56"> <p> <em class='m2'> dame doble click c: </em> </p> </div>
                        <div class="cave" id="m56"></div>
                    </div>
                </div>  
                
                <div class="duality">
                    <div class="mSpan">
                        <span> 
                            42. Leer dos matrices 5x5 enteras y determinar si el promedio entero de los números primos de una matriz se encuentra almacenado en la otra matriz.
                            <br> <em class="mAns" id="m57em"></em>
                        </span>
                    </div>
                    <div class="origin">
                        <em class="mAns" id="m57ema"> pos miau </em>
                        <div class="cuad" id="cuad57"> <p> <em class='m1'> dame doble click c: </em> </p> </div>
                        <div class="cave" id="m57"></div>
                    </div>
                    <div class="symmetry">
                        <em class="mAns" id="m57emb"> pos wow </em>
                        <div class="cuad" id="cuad58"> <p> <em class='m2'> dame doble click c: </em> </p> </div>
                        <div class="cave" id="m58"></div>
                    </div>
                </div>         
                
                <div class="duality">
                    <div class="mSpan">
                        <span> 
                            43. Leer dos matrices 5x5 enteras y determinar si el promedio entero de los números pares de una matriz es igual al promedio de los números pares de la otra matriz.
                            <br> <em class="mAns" id="m59em"></em>
                        </span>
                    </div>
                    <div class="origin">
                        <em class="mAns" id="m59ema"> pos miau </em>
                        <div class="cuad" id="cuad59"> <p> <em class='m1'> dame doble click c: </em> </p> </div>
                        <div class="cave" id="m59"></div>
                    </div>
                    <div class="symmetry">
                        <em class="mAns" id="m59emb"> pos wow </em>
                        <div class="cuad" id="cuad60"> <p> <em class='m2'> dame doble click c: </em> </p> </div>
                        <div class="cave" id="m60"></div>
                    </div>
                </div>

                <div class="duality">
                    <div class="mSpan">
                        <span> 
                            44. Leer dos matrices 5x5 enteras y determinar si el promedio entero de los números terminados en 4 de una matriz se encuentra al menos 3 veces en la otra matriz.
                            <br> <em class="mAns" id="m61em"></em>
                        </span>
                    </div>
                    <div class="origin">
                        <em class="mAns" id="m61ema"> pos miau </em>
                        <div class="cuad" id="cuad61"> <p> <em class='m1'> dame doble click c: </em> </p> </div>
                        <div class="cave" id="m61"></div>
                    </div>
                    <div class="symmetry">
                        <em class="mAns" id="m61emb"> pos wow </em>
                        <div class="cuad" id="cuad62"> <p> <em class='m2'> dame doble click c: </em> </p> </div>
                        <div class="cave" id="m62"></div>
                    </div>
                </div>       
                
                <div class="duality">
                    <div class="mSpan">
                        <span> 
                            45. Leer dos matrices 5x5 enteras y determinar si el promedio entero de los números mayores de cada fila de una matriz es igual al promedio de los números mayores de cada fila de la otra matriz.
                            <br> <em class="mAns" id="m63em"></em>
                        </span>
                    </div>
                    <div class="origin">
                        <em class="mAns" id="m63ema"> pos miau </em>
                        <div class="cuad" id="cuad63"> <p> <em class='m1'> dame doble click c: </em> </p> </div>
                        <div class="cave" id="m63"></div>
                    </div>
                    <div class="symmetry">
                        <em class="mAns" id="m63emb"> pos wow </em>
                        <div class="cuad" id="cuad64"> <p> <em class='m2'> dame doble click c: </em> </p> </div>
                        <div class="cave" id="m64"></div>
                    </div>
                </div>           
                
                <div class="duality">
                    <div class="mSpan">
                        <span> 
                            46. Leer dos matrices 5x5 enteras y determinar si el promedio entero de los números menores de cada fila de una matriz corresponden a alguno de los datos almacenados en las “esquinas” de la otra matriz.
                            <br> <em class="mAns" id="m65em"></em>
                        </span>
                    </div>
                    <div class="origin">
                        <em class="mAns" id="m65ema"> pos miau </em>
                        <div class="cuad" id="cuad65"> <p> <em class='m1'> dame doble click c: </em> </p> </div>
                        <div class="cave" id="m65"></div>
                    </div>
                    <div class="symmetry">
                        <em class="mAns" id="m65emb"> pos wow </em>
                        <div class="cuad" id="cuad66"> <p> <em class='m2'> dame doble click c: </em> </p> </div>
                        <div class="cave" id="m66"></div>
                    </div>
                </div>  
                
                <div class="duality">
                    <div class="mSpan">
                        <span> 
                            47. Leer dos matrices 5x5 enteras y determinar si el promedio de los mayores números primos por cada fila de una matriz es igual al promedio de los mayores números primos por cada fila de la otra matriz.
                            <br> <em class="mAns" id="m67em"></em>
                        </span>
                    </div>
                    <div class="origin">
                        <em class="mAns" id="m67ema"> pos miau </em>
                        <div class="cuad" id="cuad67"> <p> <em class='m1'> dame doble click c: </em> </p> </div>
                        <div class="cave" id="m67"></div>
                    </div>
                    <div class="symmetry">
                        <em class="mAns" id="m67emb"> pos wow </em>
                        <div class="cuad" id="cuad68"> <p> <em class='m2'> dame doble click c: </em> </p> </div>
                        <div class="cave" id="m68"></div>
                    </div>
                </div>                      
                
                <div class="duality">
                    <div class="mSpan">
                        <span> 
                            48. Leer dos matrices 5x5 entera y determinar si el promedio de los mayores elementos que pertenecen a la serie de Fibonacci de cada fila de una matriz es igual al promedio de los mayores elementos que pertenecen a la serie de Fibonacci de cada fila de la otra matriz.
                            <br> <em class="mAns" id="m69em"></em>
                        </span>
                    </div>
                    <div class="origin">
                        <em class="mAns" id="m69ema"> pos miau </em>
                        <div class="cuad" id="cuad69"> <p> <em class='m1'> dame doble click c: </em> </p> </div>
                        <div class="cave" id="m69"></div>
                    </div>
                    <div class="symmetry">
                        <em class="mAns" id="m69emb"> pos wow </em>
                        <div class="cuad" id="cuad70"> <p> <em class='m2'> dame doble click c: </em> </p> </div>
                        <div class="cave" id="m70"></div>
                    </div>
                </div>    

                <div class="matrix"><br><br>
                    <div class="mSpan">
                        <span> 49. Leer una matriz 3x3 entera y determinar si el promedio de todos los datos almacenados en ella se encuentra también almacenado. </span><br><br>
                    </div>
                    <span id="mAns71" class="mAns"></span><br><br>
                    <div class="cuad" id="cuad71"> <p> <em> dame doble click c: </em> </p> </div>
                    <div class="cave" id="m71"></div><br><br>
                </div>                

                <div class="matrix" id="lastMatrix"><br>
                    <div class="mSpan">
                        <span> 50. Leer una matriz 5x5 y determinar si el promedio de los elementos que se encuentran en su diagonal está almacenado en ella. Mostrar en pantalla en qué posiciones exactas se encuentra dicho dato. </span><br>
                    </div>
                    <span id="mAns72" class="mAns"></span><br>
                    <div class="cuad" id="cuad72"> <p> <em> dame doble click c: </em> </p> </div>
                    <div class="cave" id="m72"></div><br><br>
                </div>  
            </div>
            <br><br>
            <span class="gates">
                <br> Espero que todo esto de matrix logre ocultar el hecho de que las matrices son realmente barras de chocolate... <br><br><br>
            </span>
        </center>
    </details>

    <details id="50funciones">
        <summary id="section09" style="transform:translateY(-2000000px)"><h3>50 algoritmos de funciones</h3></summary><br><br>
        <center>
            1. Construir una función que reciba como parámetro un entero y retorne su último dígito. <br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="fi01" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return F01();" required> <br>
            <span id="fs01"></span>
            <br><br><br><br>

            2. Construir una función que reciba como parámetro un entero y retorne sus dos últimos dígitos. <br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="fi02" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return F02();" required> <br>
            <span id="fs02"></span>
            <br><br><br><br>

            3. Construir una función que reciba como parámetro un entero y retorne la cantidad de dígitos. <br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="fi03" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return F03();" required> <br>
            <span id="fs03"></span>
            <br><br><br><br>

            4. Construir una función que reciba como parámetro un entero y retorne la cantidad de dígitos pares. <br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="fi04" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return F04();" required> <br>
            <span id="fs04"></span>
            <br><br><br><br>

            5. Construir una función que reciba como parámetro un entero y retorne la cantidad de dígitos primos. <br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="fi05" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return F05();" required> <br>
            <span id="fs05"></span>
            <br><br><br><br>
            
            6. Construir una función que reciba como parámetro un entero y retorne el carácter al cual pertenece ese entero como código ASCII. <br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe un número aquí >:c'" type="text" id="fi06" placeholder="Escribe un número aquí >:c" title="Escribe un número" maxlength="1" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return F06();" required> <br>
            <span id="fs06"></span>
            <br><br><br><br>

            7. Construir una función que reciba como parámetro un carácter y retorne el código ASCII asociado a él. <br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe un carácter aquí >:c'" type="text" id="fi07" placeholder="Escribe un carácter aquí >:c" title="Escribe cualquier carácter" maxlength="1" onclick="javascript:select();" onkeyup="return F07();" required> <br>
            <span id="fs07"></span>
            <br><br><br><br>

            8. Construir una función que reciba como parámetro un entero y retorne 1 si dicho entero está entre <br> los 30 primeros elementos de la serie de Fibonacci. Deberá retornar 0 si no es así. <br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="fi08" class="inputBar" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="6" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return F08();" required> <br><br><br>
            <div class='barBox' id="bar08">
                <div class='bgBar'></div>
                <div class='bar'>
                    <div class='barL'> <em> 0 </em> </div>
                    <div class='barR'> <em> 1 </em> </div>
                </div>
            </div>
            <br><br><br><br><br>

            9. Construir una función que reciba un entero y le calcule su factorial. <br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="fi09" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="2" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return F09();" required> <br>
            <span id="fs09"></span>
            <br><br><br><br>  

            10. Construir una función que reciba como parámetro un entero y retorne el primer dígito de este entero. <br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="fi10" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="7" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return F10();" required> <br>
            <span id="fs10"></span>
            <br><br><br><br>  
            
            11. Construir una función que reciba como parámetro un entero y un dígito y retorne 1 si dicho entero es múltiplo de dicho dígito y 0 si no es así. <br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="fi11" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="6" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return F11();" required> 
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe un múltiplo aquí >:c'" type="text" id="fi11b" placeholder="Escribe un múltiplo aquí >:c" title="Escribe un número" maxlength="1" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return F11();" required> <br><br><br>
            <div class='barBox' id="bar11">
                <div class='bgBar'></div>
                <div class='bar'>
                    <div class='barL'> <em> 0 </em> </div>
                    <div class='barR'> <em> 1 </em> </div>
                </div>
            </div>
            <br><br><br><br><br>

            12. Construir una función que reciba como parámetro un entero y un dígito y retorne 1 si dicho dígito está en dicho entero y 0 si no es así. <br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="fi12" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="6" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return F12();" required> 
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe un dígito aquí >:c'" type="text" id="fi12b" placeholder="Escribe un dígito aquí >:c" title="Escribe un número" maxlength="1" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return F12();" required> <br><br><br>
            <div class='barBox' id="bar12">
                <div class='bgBar'></div>
                <div class='bar'>
                    <div class='barL'> <em> 0 </em> </div>
                    <div class='barR'> <em> 1 </em> </div>
                </div>
            </div>
            <br><br><br><br><br>

            13. Construir una función que reciba como parámetro un entero y un dígito y retorne la cantidad de veces que se encuentra dicho dígito en dicho entero. <br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="fi13" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="6" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return F13();" required>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe un número aquí >:c'" type="text" id="fi13b" placeholder="Escribe un número aquí >:c" title="Escribe un número" maxlength="1" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return F13();" required> <br>
            <span id="fs13"></span>
            <br><br><br><br>   

            14. Construir una función que reciba como parámetros dos números enteros y retorne el valor del mayor. <br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="fi14" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="6" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return F14();" required>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="fi14b" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="6" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return F14();" required> <br>
            <span id="fs14"></span>
            <br><br><br><br>   
  
            15. Construir una función que reciba como parámetros dos números enteros y retorne 1 si el primer número es múltiplo del segundo y 0 si no.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="fi15" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="6" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return F15();" required> 
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe un múltiplo aquí >:c'" type="text" id="fi15b" placeholder="Escribe un múltiplo aquí >:c" title="Escribe un número" maxlength="6" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return F15();" required> <br><br><br>
            <div class='barBox' id="bar15">
                <div class='bgBar'></div>
                <div class='bar'>
                    <div class='barL'> <em> 0 </em> </div>
                    <div class='barR'> <em> 1 </em> </div>
                </div>
            </div>
            <br><br><br><br><br>

            16. Construir una función que reciba como parámetro un entero y retorne 1 si corresponde al código ASCII de una letra minúscula. <br> Deberá retornar 0 si no es así. Los códigos ASCII de las letras minúsculas van desde 97 que es la a hasta 122 que es la z. <br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="fi16" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="3" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return F16();" required> <br><br><br>
            <div class='barBox' id="bar16">
                <div class='bgBar'></div>
                <div class='bar'>
                    <div class='barL'> <em> 0 </em> </div>
                    <div class='barR'> <em> 1 </em> </div>
                </div>
            </div>
            <br><br><br><br><br>

            17. Construir una función que reciba como parámetro un entero y retorne 1 si corresponde al código ASCII de un dígito. <br> (Los códigos ASCII de los dígitos van desde 48 que es el dígito 0 hasta 57 que es el dígito 9). Deberá retornar 0 si no es así.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="fi17" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="2" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return F17();" required> <br><br><br>
            <div class='barBox' id="bar17">
                <div class='bgBar'></div>
                <div class='bar'>
                    <div class='barL'> <em> 0 </em> </div>
                    <div class='barR'> <em> 1 </em> </div>
                </div>
            </div>
            <br><br><br><br><br>

            18. Construir una función que reciba como parámetro un valor entero y retornar 1 si dicho valor <br> es el factorial de alguno de los dígitos del número. Deberá retornar 0 si no es así. <br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="fi18" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="6" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return F18();" required> <br><br><br>
            <div class='barBox' id="bar18">
                <div class='bgBar'></div>
                <div class='bar'>
                    <div class='barL'> <em> 0 </em> </div>
                    <div class='barR'> <em> 1 </em> </div>
                </div>
            </div>
            <br><br><br><br><br>

            19. Construir una función que reciba como parámetro un entero y retorne 1 si dicho valor es un número de mínimo 3 dígitos. Deberá retornar 0 si no es así.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="fi19" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="6" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return F19();" required> <br><br><br>
            <div class='barBox' id="bar19">
                <div class='bgBar'></div>
                <div class='bar'>
                    <div class='barL'> <em> 0 </em> </div>
                    <div class='barR'> <em> 1 </em> </div>
                </div>
            </div>
            <br><br><br><br><br>

            20. Construir una función que reciba como parámetro un entero y retorne 1 si en dicho valor todos los dígitos son iguales. Deberá retornar 0 si no es así. <br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="fi20" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="6" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return F20();" required> <br><br><br>
            <div class='barBox' id="bar20">
                <div class='bgBar'></div>
                <div class='bar'>
                    <div class='barL'> <em> 0 </em> </div>
                    <div class='barR'> <em> 1 </em> </div>
                </div>
            </div>
            <br><br><br><br><br>

            21. Construir una función que reciba como parámetro un entero y retorne 1 si en dicho valor el primer dígito es igual al último. Deberá retornar 0 si no es así. <br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="fi21" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="6" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return F21();" required> <br><br><br>
            <div class='barBox' id="bar21">
                <div class='bgBar'></div>
                <div class='bar'>
                    <div class='barL'> <em> 0 </em> </div>
                    <div class='barR'> <em> 1 </em> </div>
                </div>
            </div>
            <br><br><br><br><br>

            22. Construir una función que reciba como parámetro un entero y retorne 1 si dicho valor es múltiplo de 5. Deberá retornar 0 si no es así.<br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="fi22" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="6" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return F22();" required> <br><br><br>
            <div class='barBox' id="bar22">
                <div class='bgBar'></div>
                <div class='bar'>
                    <div class='barL'> <em> 0 </em> </div>
                    <div class='barR'> <em> 1 </em> </div>
                </div>
            </div>
            <br><br><br><br><br>

            23. Construir una función que reciba como parámetro dos enteros y retorne 1 si la diferencia entre los dos valores es un número primo. Deberá retornar 0 si no es así. <br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="fi23" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="6" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return F23();" required> 
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="fi23b" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="6" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return F23();" required> <br><br><br>
            <div class='barBox' id="bar23">
                <div class='bgBar'></div>
                <div class='bar'>
                    <div class='barL'> <em> 0 </em> </div>
                    <div class='barR'> <em> 1 </em> </div>
                </div>
            </div>
            <br><br><br><br><br> 

            24. Construir una función que reciba como parámetro dos enteros de dos dígitos cada uno y retorne 1 si son inversos. <br> Ejemplo: 83 es inverso de 38. Deberá retornar 0 si no es así. <br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="fi24" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="2" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return F24();" required> 
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="fi24b" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="2" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return F24();" required> <br><br><br>
            <div class='barBox' id="bar24">
                <div class='bgBar'></div>
                <div class='bar'>
                    <div class='barL'> <em> 0 </em> </div>
                    <div class='barR'> <em> 1 </em> </div>
                </div>
            </div>
            <br><br><br><br><br> 

            25. Construir una función que reciba como parámetro un entero y un dígito menor o igual a 5  y retorne <br> el dígito del número que se encuentre en la posición especificada por el dígito que llegó como parámetro. <br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="fi25" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="6" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return F25();" required>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe un número aquí >:c'" type="text" id="fi25b" placeholder="Escribe un número aquí >:c" title="Escribe un número" maxlength="1" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return F25();" required> <br>
            <span id="fs25"></span>
            <br><br><br><br>   

            26. Construir una función que reciba como parámetro un vector de 10 posiciones enteras y retorne el mayor de los datos del vector.<br><br>
            <span id="a51c"></span><br>
            <input class="falseButton"  type="text" id="arrayi51" placeholder='INGRESAR NÚMEROS' title="" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi51(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array51();" id="arrayb51"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a51"></span><br>
            <span id="a51b"></span><br>
            <div id="a51d" class="vector">
                <div class="vector51" data-id="0" draggable="true"></div>
                <div class="vector51" data-id="1" draggable="true"></div>
                <div class="vector51" data-id="2" draggable="true"></div>
                <div class="vector51" data-id="3" draggable="true"></div>
                <div class="vector51" data-id="4" draggable="true"></div>
                <div class="vector51" data-id="5" draggable="true"></div>
                <div class="vector51" data-id="6" draggable="true"></div>
                <div class="vector51" data-id="7" draggable="true"></div>
                <div class="vector51" data-id="8" draggable="true"></div>
                <div class="vector51" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow51"></div>
                <div class="arrow51"></div>
                <div class="arrow51"></div>
                <div class="arrow51"></div>
                <div class="arrow51"></div>
                <div class="arrow51"></div>
                <div class="arrow51"></div>
                <div class="arrow51"></div>
                <div class="arrow51"></div>
                <div class="arrow51"></div>
            </div><br><br>
            <span id="a51e"></span><br>
            <br><br><br><br>  

            27. Construir una función que reciba como parámetro un vector de 10 posiciones enteras y retorne la posición en la cual se encuentra el mayor de los datos del vector.<br><br>
            <span id="a52c"></span><br>
            <input class="falseButton"  type="text" id="arrayi52" placeholder='INGRESAR NÚMEROS' title="" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi52(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array52();" id="arrayb52"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a52"></span><br>
            <span id="a52b"></span><br>
            <div id="a52d" class="vector">
                <div class="vector52" data-id="0" draggable="true"></div>
                <div class="vector52" data-id="1" draggable="true"></div>
                <div class="vector52" data-id="2" draggable="true"></div>
                <div class="vector52" data-id="3" draggable="true"></div>
                <div class="vector52" data-id="4" draggable="true"></div>
                <div class="vector52" data-id="5" draggable="true"></div>
                <div class="vector52" data-id="6" draggable="true"></div>
                <div class="vector52" data-id="7" draggable="true"></div>
                <div class="vector52" data-id="8" draggable="true"></div>
                <div class="vector52" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow52"></div>
                <div class="arrow52"></div>
                <div class="arrow52"></div>
                <div class="arrow52"></div>
                <div class="arrow52"></div>
                <div class="arrow52"></div>
                <div class="arrow52"></div>
                <div class="arrow52"></div>
                <div class="arrow52"></div>
                <div class="arrow52"></div>
            </div><br><br>
            <span id="a52e"></span><br>
            <br><br><br><br>  

            28. Construir una función que reciba como parámetro un vector de 10 posiciones enteras y retorne la cantidad de números primos almacenados en el vector.<br><br>
            <span id="a53c"></span><br>
            <input class="falseButton"  type="text" id="arrayi53" placeholder='INGRESAR NÚMEROS' title="" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi53(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array53();" id="arrayb53"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a53"></span><br>
            <span id="a53b"></span><br>
            <div id="a53d" class="vector">
                <div class="vector53" data-id="0" draggable="true"></div>
                <div class="vector53" data-id="1" draggable="true"></div>
                <div class="vector53" data-id="2" draggable="true"></div>
                <div class="vector53" data-id="3" draggable="true"></div>
                <div class="vector53" data-id="4" draggable="true"></div>
                <div class="vector53" data-id="5" draggable="true"></div>
                <div class="vector53" data-id="6" draggable="true"></div>
                <div class="vector53" data-id="7" draggable="true"></div>
                <div class="vector53" data-id="8" draggable="true"></div>
                <div class="vector53" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow53"></div>
                <div class="arrow53"></div>
                <div class="arrow53"></div>
                <div class="arrow53"></div>
                <div class="arrow53"></div>
                <div class="arrow53"></div>
                <div class="arrow53"></div>
                <div class="arrow53"></div>
                <div class="arrow53"></div>
                <div class="arrow53"></div>
            </div><br><br>
            <span id="a53e"></span><br>
            <br><br><br><br>  

            29. Construir una función que reciba como parámetro un vector de 10 posiciones enteras y retorne la cantidad de números que pertenecen a los 30 primeros elementos de la serie de Fibonacci. <br><br>
            <span id="a54c"></span><br>
            <input class="falseButton"  type="text" id="arrayi54" placeholder='INGRESAR NÚMEROS' title="" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi54(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array54();" id="arrayb54"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a54"></span><br>
            <span id="a54b"></span><br>
            <div id="a54d" class="vector">
                <div class="vector54" data-id="0" draggable="true"></div>
                <div class="vector54" data-id="1" draggable="true"></div>
                <div class="vector54" data-id="2" draggable="true"></div>
                <div class="vector54" data-id="3" draggable="true"></div>
                <div class="vector54" data-id="4" draggable="true"></div>
                <div class="vector54" data-id="5" draggable="true"></div>
                <div class="vector54" data-id="6" draggable="true"></div>
                <div class="vector54" data-id="7" draggable="true"></div>
                <div class="vector54" data-id="8" draggable="true"></div>
                <div class="vector54" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow54"></div>
                <div class="arrow54"></div>
                <div class="arrow54"></div>
                <div class="arrow54"></div>
                <div class="arrow54"></div>
                <div class="arrow54"></div>
                <div class="arrow54"></div>
                <div class="arrow54"></div>
                <div class="arrow54"></div>
                <div class="arrow54"></div>
            </div><br><br>
            <span id="a54e"></span><br>
            <br><br><br><br>  

            30. Construir una función que reciba como parámetro un vector de 10 posiciones enteras y retorne la posición del mayor número primo almacenado en el vector. <br><br>
            <span id="a55c"></span><br>
            <input class="falseButton"  type="text" id="arrayi55" placeholder='INGRESAR NÚMEROS' title="" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi55(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array55();" id="arrayb55"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a55"></span><br>
            <span id="a55b"></span><br>
            <div id="a55d" class="vector">
                <div class="vector55" data-id="0" draggable="true"></div>
                <div class="vector55" data-id="1" draggable="true"></div>
                <div class="vector55" data-id="2" draggable="true"></div>
                <div class="vector55" data-id="3" draggable="true"></div>
                <div class="vector55" data-id="4" draggable="true"></div>
                <div class="vector55" data-id="5" draggable="true"></div>
                <div class="vector55" data-id="6" draggable="true"></div>
                <div class="vector55" data-id="7" draggable="true"></div>
                <div class="vector55" data-id="8" draggable="true"></div>
                <div class="vector55" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow55"></div>
                <div class="arrow55"></div>
                <div class="arrow55"></div>
                <div class="arrow55"></div>
                <div class="arrow55"></div>
                <div class="arrow55"></div>
                <div class="arrow55"></div>
                <div class="arrow55"></div>
                <div class="arrow55"></div>
                <div class="arrow55"></div>
            </div><br><br>
            <span id="a55e"></span><br>
            <br><br><br><br>  

            31. Construir una función que reciba como parámetro un vector de 10 posiciones enteras y retorne el promedio entero del vector. <br><br>
            <span id="a56c"></span><br>
            <input class="falseButton"  type="text" id="arrayi56" placeholder='INGRESAR NÚMEROS' title="" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi56(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array56();" id="arrayb56"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a56"></span><br>
            <span id="a56b"></span><br>
            <div id="a56d" class="vector">
                <div class="vector56" data-id="0" draggable="true"></div>
                <div class="vector56" data-id="1" draggable="true"></div>
                <div class="vector56" data-id="2" draggable="true"></div>
                <div class="vector56" data-id="3" draggable="true"></div>
                <div class="vector56" data-id="4" draggable="true"></div>
                <div class="vector56" data-id="5" draggable="true"></div>
                <div class="vector56" data-id="6" draggable="true"></div>
                <div class="vector56" data-id="7" draggable="true"></div>
                <div class="vector56" data-id="8" draggable="true"></div>
                <div class="vector56" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow56"></div>
                <div class="arrow56"></div>
                <div class="arrow56"></div>
                <div class="arrow56"></div>
                <div class="arrow56"></div>
                <div class="arrow56"></div>
                <div class="arrow56"></div>
                <div class="arrow56"></div>
                <div class="arrow56"></div>
                <div class="arrow56"></div>
            </div><br><br>
            <span id="a56e"></span><br>
            <br><br><br><br>  

            32. Construir una función que reciba como parámetro un vector de 10 posiciones enteras y retorne el promedio real del vector. <br><br>
            <span id="a57c"></span><br>
            <input class="falseButton"  type="text" id="arrayi57" placeholder='INGRESAR NÚMEROS' title="" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi57(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array57();" id="arrayb57"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a57"></span><br>
            <span id="a57b"></span><br>
            <div id="a57d" class="vector">
                <div class="vector57" data-id="0" draggable="true"></div>
                <div class="vector57" data-id="1" draggable="true"></div>
                <div class="vector57" data-id="2" draggable="true"></div>
                <div class="vector57" data-id="3" draggable="true"></div>
                <div class="vector57" data-id="4" draggable="true"></div>
                <div class="vector57" data-id="5" draggable="true"></div>
                <div class="vector57" data-id="6" draggable="true"></div>
                <div class="vector57" data-id="7" draggable="true"></div>
                <div class="vector57" data-id="8" draggable="true"></div>
                <div class="vector57" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow57"></div>
                <div class="arrow57"></div>
                <div class="arrow57"></div>
                <div class="arrow57"></div>
                <div class="arrow57"></div>
                <div class="arrow57"></div>
                <div class="arrow57"></div>
                <div class="arrow57"></div>
                <div class="arrow57"></div>
                <div class="arrow57"></div>
            </div><br><br>
            <span id="a57e"></span><br>
            <br><br><br><br>  

            33. Construir una función que reciba como parámetros un vector de 10 posiciones enteras e identifique los números pares. <br><br>
            <span id="a58c"></span><br>
            <input class="falseButton"  type="text" id="arrayi58" placeholder='INGRESAR NÚMEROS' title="" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi58(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array58();" id="arrayb58"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a58"></span><br>
            <span id="a58b"></span><br>
            <div id="a58d" class="vector">
                <div class="vector58" data-id="0" draggable="true"></div>
                <div class="vector58" data-id="1" draggable="true"></div>
                <div class="vector58" data-id="2" draggable="true"></div>
                <div class="vector58" data-id="3" draggable="true"></div>
                <div class="vector58" data-id="4" draggable="true"></div>
                <div class="vector58" data-id="5" draggable="true"></div>
                <div class="vector58" data-id="6" draggable="true"></div>
                <div class="vector58" data-id="7" draggable="true"></div>
                <div class="vector58" data-id="8" draggable="true"></div>
                <div class="vector58" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow58"></div>
                <div class="arrow58"></div>
                <div class="arrow58"></div>
                <div class="arrow58"></div>
                <div class="arrow58"></div>
                <div class="arrow58"></div>
                <div class="arrow58"></div>
                <div class="arrow58"></div>
                <div class="arrow58"></div>
                <div class="arrow58"></div>
            </div><br><br>
            <span id="a58e"></span><br>
            <br><br><br><br>  

            34. Construir una función que reciba como parámetro un vector de 10 posiciones enteras y retorne la posición del número entero que tenga 3 o más dígitos. <br><br>
            <span id="a59c"></span><br>
            <input class="falseButton"  type="text" id="arrayi59" placeholder='INGRESAR NÚMEROS' title="" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi59(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array59();" id="arrayb59"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a59"></span><br>
            <span id="a59b"></span><br>
            <div id="a59d" class="vector">
                <div class="vector59" data-id="0" draggable="true"></div>
                <div class="vector59" data-id="1" draggable="true"></div>
                <div class="vector59" data-id="2" draggable="true"></div>
                <div class="vector59" data-id="3" draggable="true"></div>
                <div class="vector59" data-id="4" draggable="true"></div>
                <div class="vector59" data-id="5" draggable="true"></div>
                <div class="vector59" data-id="6" draggable="true"></div>
                <div class="vector59" data-id="7" draggable="true"></div>
                <div class="vector59" data-id="8" draggable="true"></div>
                <div class="vector59" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow59"></div>
                <div class="arrow59"></div>
                <div class="arrow59"></div>
                <div class="arrow59"></div>
                <div class="arrow59"></div>
                <div class="arrow59"></div>
                <div class="arrow59"></div>
                <div class="arrow59"></div>
                <div class="arrow59"></div>
                <div class="arrow59"></div>
            </div><br><br>
            <span id="a59e"></span><br>
            <br><br><br><br>  

            35. Construir una función que reciba como parámetro un vector de 10 posiciones enteras y retorne la posición en la que se encuentre el mayor número primo que termine en 3 almacenado en el vector. <br><br>
            <span id="a60c"></span><br>
            <input class="falseButton"  type="text" id="arrayi60" placeholder='INGRESAR NÚMEROS' title="" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi60(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array60();" id="arrayb60"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a60"></span><br>
            <span id="a60b"></span><br>
            <div id="a60d" class="vector">
                <div class="vector60" data-id="0" draggable="true"></div>
                <div class="vector60" data-id="1" draggable="true"></div>
                <div class="vector60" data-id="2" draggable="true"></div>
                <div class="vector60" data-id="3" draggable="true"></div>
                <div class="vector60" data-id="4" draggable="true"></div>
                <div class="vector60" data-id="5" draggable="true"></div>
                <div class="vector60" data-id="6" draggable="true"></div>
                <div class="vector60" data-id="7" draggable="true"></div>
                <div class="vector60" data-id="8" draggable="true"></div>
                <div class="vector60" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow60"></div>
                <div class="arrow60"></div>
                <div class="arrow60"></div>
                <div class="arrow60"></div>
                <div class="arrow60"></div>
                <div class="arrow60"></div>
                <div class="arrow60"></div>
                <div class="arrow60"></div>
                <div class="arrow60"></div>
                <div class="arrow60"></div>
            </div><br><br>
            <span id="a60e"></span><br>
            <br><br><br><br>  

            36. Construir una función que reciba como parámetro un entero y retorne ese elemento de la serie de Fibonacci. <br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe números aquí >:c'" type="text" id="fi36" placeholder="Escribe números aquí >:c" title="Escribe un número" maxlength="2" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return F36();" required> <br>
            <span id="fs36"></span>
            <br><br><br><br>   

            37. Construir una función que reciba como parámetros dos enteros, el primero actuará como base <br> y el segundo como exponente y retorne el resultado de elevar dicha base a dicho exponente. <br><br>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe una base aquí >:c'" type="text" id="fi37" placeholder="Escribe una base aquí >:c" title="Escribe un número base" maxlength="2" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return F37();" required>
            <input  onfocus="this.placeholder=''" onblur="this.placeholder='Escribe un exponente aquí >:c'" type="text" id="fi37b" placeholder="Escribe un exponente aquí >:c" title="Escribe un número exponente" maxlength="1" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return F37();" required> <br>
            <span id="fs37"></span>
            <br><br><br><br>   

            38. Construir una función que reciba como parámetro un vector de 10 posiciones enteras y retorne la cantidad de números terminados en 3 que contiene el vector. <br><br>
            <span id="a61c"></span><br>
            <input class="falseButton"  type="text" id="arrayi61" placeholder='INGRESAR NÚMEROS' title="" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi61(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array61();" id="arrayb61"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a61"></span><br>
            <span id="a61b"></span><br>
            <div id="a61d" class="vector">
                <div class="vector61" data-id="0" draggable="true"></div>
                <div class="vector61" data-id="1" draggable="true"></div>
                <div class="vector61" data-id="2" draggable="true"></div>
                <div class="vector61" data-id="3" draggable="true"></div>
                <div class="vector61" data-id="4" draggable="true"></div>
                <div class="vector61" data-id="5" draggable="true"></div>
                <div class="vector61" data-id="6" draggable="true"></div>
                <div class="vector61" data-id="7" draggable="true"></div>
                <div class="vector61" data-id="8" draggable="true"></div>
                <div class="vector61" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow61"></div>
                <div class="arrow61"></div>
                <div class="arrow61"></div>
                <div class="arrow61"></div>
                <div class="arrow61"></div>
                <div class="arrow61"></div>
                <div class="arrow61"></div>
                <div class="arrow61"></div>
                <div class="arrow61"></div>
                <div class="arrow61"></div>
            </div><br><br>
            <span id="a61e"></span><br>
            <br><br><br><br>  

            39. Construir una función que reciba como parámetro un vector de 10 posiciones enteras y retorne la cantidad de múltiplos de 3. <br><br>
            <span id="a62c"></span><br>
            <input class="falseButton"  type="text" id="arrayi62" placeholder='INGRESAR NÚMEROS' title="" maxlength="4" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi62(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array62();" id="arrayb62"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a62"></span><br>
            <span id="a62b"></span><br>
            <div id="a62d" class="vector">
                <div class="vector62" data-id="0" draggable="true"></div>
                <div class="vector62" data-id="1" draggable="true"></div>
                <div class="vector62" data-id="2" draggable="true"></div>
                <div class="vector62" data-id="3" draggable="true"></div>
                <div class="vector62" data-id="4" draggable="true"></div>
                <div class="vector62" data-id="5" draggable="true"></div>
                <div class="vector62" data-id="6" draggable="true"></div>
                <div class="vector62" data-id="7" draggable="true"></div>
                <div class="vector62" data-id="8" draggable="true"></div>
                <div class="vector62" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow62"></div>
                <div class="arrow62"></div>
                <div class="arrow62"></div>
                <div class="arrow62"></div>
                <div class="arrow62"></div>
                <div class="arrow62"></div>
                <div class="arrow62"></div>
                <div class="arrow62"></div>
                <div class="arrow62"></div>
                <div class="arrow62"></div>
            </div><br><br>
            <span id="a62e"></span><br>
            <br><br><br><br>  

            40. Construir una función que reciba como parámetro un vector de 10 posiciones enteras y un dígito y que retorne la cantidad de números del vector que terminan en dicho dígito. <br><br>
            <span id="a63c"></span><br>
            <input class="falseButton"  type="text" id="arrayi63" placeholder='INGRESAR NÚMEROS' title="" maxlength="2" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi63(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array63();" id="arrayb63"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a63"></span><br>
            <span id="a63b"></span><br>
            <div id="a63d" class="vector">
                <div class="vector63" data-id="0" draggable="true"></div>
                <div class="vector63" data-id="1" draggable="true"></div>
                <div class="vector63" data-id="2" draggable="true"></div>
                <div class="vector63" data-id="3" draggable="true"></div>
                <div class="vector63" data-id="4" draggable="true"></div>
                <div class="vector63" data-id="5" draggable="true"></div>
                <div class="vector63" data-id="6" draggable="true"></div>
                <div class="vector63" data-id="7" draggable="true"></div>
                <div class="vector63" data-id="8" draggable="true"></div>
                <div class="vector63" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow63"></div>
                <div class="arrow63"></div>
                <div class="arrow63"></div>
                <div class="arrow63"></div>
                <div class="arrow63"></div>
                <div class="arrow63"></div>
                <div class="arrow63"></div>
                <div class="arrow63"></div>
                <div class="arrow63"></div>
                <div class="arrow63"></div>
            </div><br><br>
            <span class="eleven" id="a63f"></span><br>
            <span id="a63f" class="eleven"></span><br>
            <span id="a63e"></span>
            <br><br><br><br> 

            41. Construir una función que reciba como parámetro un vector de 10 posiciones enteras y un dígito y que retorne la cantidad de números del vector en donde dicho dígito está de penúltimo. <br><br>
            <span id="a64c"></span><br>
            <input class="falseButton"  type="text" id="arrayi64" placeholder='INGRESAR NÚMEROS' title="" maxlength="2" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return arrayi64(event);"  required><br>
            <div class="randBut">    
                <button class="botonesSeccionArreglos" onclick="array64();" id="arrayb64"> GENERAR 10 NÚMEROS ALEATORIOS </button>
            </div>
            <br>
            <span id="a64"></span><br>
            <span id="a64b"></span><br>
            <div id="a64d" class="vector">
                <div class="vector64" data-id="0" draggable="true"></div>
                <div class="vector64" data-id="1" draggable="true"></div>
                <div class="vector64" data-id="2" draggable="true"></div>
                <div class="vector64" data-id="3" draggable="true"></div>
                <div class="vector64" data-id="4" draggable="true"></div>
                <div class="vector64" data-id="5" draggable="true"></div>
                <div class="vector64" data-id="6" draggable="true"></div>
                <div class="vector64" data-id="7" draggable="true"></div>
                <div class="vector64" data-id="8" draggable="true"></div>
                <div class="vector64" data-id="9" draggable="true"></div>
            </div>
            <div class="arrow">
                <div class="arrow64"></div>
                <div class="arrow64"></div>
                <div class="arrow64"></div>
                <div class="arrow64"></div>
                <div class="arrow64"></div>
                <div class="arrow64"></div>
                <div class="arrow64"></div>
                <div class="arrow64"></div>
                <div class="arrow64"></div>
                <div class="arrow64"></div>
            </div><br><br>
            <span class="eleven" id="a64f"></span><br>
            <span id="a64f" class="eleven"></span><br>
            <span id="a64e"></span>
            <br><br><br><br> 

            <div class='matrixCradle'>
                
                <div class="matrix"><br><br>
                    <div class="mSpan">
                        <span> 42. Construir una función que reciba como parámetro una matriz de 3x4 entera y retorne la cantidad de veces que se repite el mayor dato de la matriz. </span>
                    </div>
                    <br><br><br>
                    <div class="cuad" id="cuad73"> <p> <em> dame doble click c: </em> </p> </div>
                    <div class="cave" id="m73"></div><br><br>
                </div>

                <div class="matrix"><br><br>
                    <div class="mSpan">
                        <span> 43. Construir una función que reciba como parámetro una matriz 3x4 entera y retorne la cantidad de números primos almacenados en la matriz. </span>
                    </div>
                    <br><br><br>
                    <div class="cuad" id="cuad74"> <p> <em> dame doble click c: </em> </p> </div>
                    <div class="cave" id="m74"></div><br><br>
                </div>

                <div class="matrix"><br><br>
                    <div class="mSpan">
                        <span> 44. Construir una función que reciba como parámetro una matriz 3x4 entera y retorne la cantidad de veces que se repite el mayor número primo de la matriz. </span>
                    </div>
                    <br><br><br>
                    <div class="cuad" id="cuad75"> <p> <em> dame doble click c: </em> </p> </div>
                    <div class="cave" id="m75"></div><br><br>
                </div>

                <div class="matrix"><br><br>
                    <div class="mSpan">
                        <span> 45. Construir una función que reciba como parámetros una matriz 4x4 entera y un valor entero y retorne la cantidad de veces que se repite dicho valor en la matriz.
                         </span>
                    </div>
                    <input class="matrixInput" onfocus="this.placeholder=''" onblur="this.placeholder='Escribe un múltiplo aquí >:c'" type="text" id="mi76" placeholder="Escribe un múltiplo aquí >:c" title="Escribe un número" maxlength="3" onclick="javascript:select();" onkeypress="return onlyNum(event);" onkeyup="return solveM76();" required> 
                    <div class="cuad" id="cuad76"> <p> <em> dame doble click c: </em> </p> </div>
                    <div class="cave" id="m76"></div><br><br>
                </div>

                <div class="matrix"><br><br>
                    <div class="mSpan">
                        <span> 46. Construir una función que reciba como parámetro una matriz 4x4 entera y retorne el número de la fila en donde se encuentre por primera vez el número mayor de la matriz. </span>
                    </div>
                    <br><br><br>
                    <div class="cuad" id="cuad77"> <p> <em> dame doble click c: </em> </p> </div>
                    <div class="cave" id="m77"></div><br><br>
                </div>

                <div class="matrix"><br><br>
                    <div class="mSpan">
                        <span> 47. Construir una función que reciba como parámetro una matriz 4x4 entera y retorne el número de la columna en donde se encuentre por primera vez el número mayor de la matriz. </span>
                    </div>
                    <br><br><br>
                    <div class="cuad" id="cuad78"> <p> <em> dame doble click c: </em> </p> </div>
                    <div class="cave" id="m78"></div><br><br>
                </div>

                <div class="matrix"><br><br>
                    <div class="mSpan">
                        <span> 48. Construir una función que reciba como parámetro una matriz 4x4 entera y retorne la posición exacta en donde se encuentre almacenado el mayor número primo. </span>
                    </div>
                    <br><br><br>
                    <div class="cuad" id="cuad79"> <p> <em> dame doble click c: </em> </p> </div>
                    <div class="cave" id="m79"></div><br><br>
                </div>

                <div class="matrix"><br><br>
                    <div class="mSpan">
                        <span> 49. Construir una función que reciba una matriz 5x5 y retorne el valor de su moda. La moda de un conjunto de datos es el dato que más se repite. </span>
                    </div>
                    <div class="cuad" id="cuad80"> <p> <em> dame doble click c: </em> </p> </div>
                    <div class="cave" id="m80"></div><br><br>
                </div>

                <div class="matrix" id="matrixFn50"><br><br><br>
                    <div class="mSpan">
                        <span> 50. Construir una función que reciba una matriz 5x5 y retorne la cantidad de veces que se repite su moda. </span>
                    </div>
                    <div class="cuad" id="cuad81"> <p> <em> dame doble click c: </em> </p> </div>
                    <div class="cave" id="m81"></div>
                </div>

                <div class='theEnd'> 
                    <em> <h1> The<em class='endot'>.</em>  <em class='endot'>.</em>end. </h1> </em> 
                    <div id="ripple"></div>
                </div>

            </div> <!-- end of the cradle of Matrixes -->
        </center>
    </details>

</body>
</html>