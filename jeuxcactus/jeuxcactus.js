
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
 if(e.keyCode == 39) {
   rightPressed = true;
 }
 else if(e.keyCode == 37) {
   leftPressed = true;
 }
if(e.keyCode == 38) {
   upPressed = true;
 }
 else if(e.keyCode == 40) {
   downPressed = true;
 }


}
function keyUpHandler(e) {
 if(e.keyCode == 39) {
   rightPressed = false;
 }
 else if(e.keyCode == 37) {
   leftPressed = false;
 }
  if(e.keyCode == 38) {
   upPressed = false;
 }
 else if(e.keyCode == 40) {
   downPressed = false;
 }

}
    var rightPressed = false;
    var leftPressed = false;
    var upPressed = false;
    var downPressed = false;

    var jeuxSelectionner ='jeuxcactus';

window.onload = function()
{
    var canvas = document.getElementById("mon_Canvas");
    if(!canvas)
    {
        alert("Impossible de récupérer le canvas");
        return;
    }
    
    var context = canvas.getContext("2d");
    if(!context)
    {
        alert("Impossible de récupérer le context");
        return;
    }



    /*player*/
    canvas.style.backgroundImage= "url(../imagejeux/"+jeuxSelectionner+"/fond.jpg)";
    var cactush = new Image();
    cactush.src = "../imagejeux/"+jeuxSelectionner+"/player.png";

    var Player = cactush;

    /*player touché*/

     var cactust = new Image();
    cactust.src = "../imagejeux/"+jeuxSelectionner+"/player1.png";

     var cactusr = new Image();
    cactusr.src = "../imagejeux/"+jeuxSelectionner+"/player2.png";

    var cactusrip = new Image();
    cactusrip.src = "../imagejeux/"+jeuxSelectionner+"/player3.png";

    var orage = new Image();
    orage.src = "../imagejeux/"+jeuxSelectionner+"/dead.png";



    /*les objet qui descendent du ciel */
    var soleil = new Image();
    soleil.src = "../imagejeux/"+jeuxSelectionner+"/bonus.png";

    var goutte = new Image();
    goutte.src = "../imagejeux/"+jeuxSelectionner+"/malus.png";

    /*omage et vitesse*/
   var animateOrage=0; 
   var vitesseAnim=0;
   var vitesseX = 3;
   var vitesseY = 3;
   var score =0;
   var pv =3;
   var myInterval = setInterval(animate, 1000/30);

   var bonus=[];

    /*mouvement*/

       var move = 370;
       var dernierTemps = 0;
    function deplacement(){
    if(rightPressed ){
        if(move<canvas.width-104){
            move+=16;
        }
        }
            

        if(leftPressed){
         if(move>0){

            move-=16;
        }
        }

    } 
    function createBonus(coord, genderer){
        var obj={};
        obj.coord =coord;
        obj.gender =genderer;
        obj.vitesse =Math.floor(Math.random() * Math.floor(5)+3);
        obj.statut = true;

return obj;
    }
    function randomBonus(){
        if(dernierTemps<calculeTime()){
            var coordX=Math.floor(Math.random() * Math.floor(canvas.width));
            var genderer=Math.floor(Math.random() * Math.floor(2)+1);
            bonus.push(createBonus([coordX, 20], genderer));
            dernierTemps=calculeTime()+Math.floor(Math.random() * Math.floor(3))*800000;
        }

    }
    function detectColision(object1, object2){
 var rect1 = {x: object1[0], y: object1[1], width: object1[2], height: object1[3]};
 var rect2 = {x: object2[0], y: object2[1], width: object2[2], height: object2[3]};

 if (rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.height + rect1.y > rect2.y) {
     return true;
 }else{
         return false;

 }
}
function calculeColisiion(){
            for (var i = 0; i < bonus.length; i++) {
                var result = detectColision([move, 355, 104, 145], [bonus[i].coord[0],bonus[i].coord[1],50,50]);
                if (result==true){
                    if(bonus[i].statut==true){
                    if(bonus[i].gender==2){
                        score+=10;
                    }else{
                        pv--;
                    }
                }
                 bonus[i].statut=false;

                }
            }

}
    function calculeTime(){
     var d = new Date();
     var n = d.getTime();
     var seconde =1000*n;
     return seconde;
    }
           var debutTemps =calculeTime();
           var acceleration=0;
    function moveBonus(){
        for (var i = 0; i < bonus.length; i++) {

bonus[i].coord[1]+=bonus[i].vitesse+acceleration;
        }

    }
    function modifImage(){
     soleil.src = "../imagejeux/"+jeuxSelectionner+"/bonus.png";
     goutte.src = "../imagejeux/"+jeuxSelectionner+"/malus.png";
     orage.src = "../imagejeux/"+jeuxSelectionner+"/dead.png";
     cactusrip.src = "../imagejeux/"+jeuxSelectionner+"/player3.png";
     cactusr.src = "../imagejeux/"+jeuxSelectionner+"/player2.png";
     cactust.src = "../imagejeux/"+jeuxSelectionner+"/player1.png";
     cactush.src = "../imagejeux/"+jeuxSelectionner+"/player.png";
if(jeuxSelectionner=="jeuxvoiture"|| jeuxSelectionner=="jeuxstarswars"){
     canvas.style.backgroundImage= "url(../imagejeux/"+jeuxSelectionner+"/fond.gif)";

}else{
         canvas.style.backgroundImage= "url(../imagejeux/"+jeuxSelectionner+"/fond.jpg)";

}


    }
    function animate()
    {        
        document.getElementById("voiture").addEventListener("click", function(){ jeuxSelectionner="jeuxvoiture"; modifImage();});
        document.getElementById("starswars").addEventListener("click", function(){ jeuxSelectionner="jeuxstarswars"; modifImage();})
        document.getElementById("noel").addEventListener("click", function(){ jeuxSelectionner="jeuxnoel"; modifImage();})
        document.getElementById("southparc").addEventListener("click", function(){ jeuxSelectionner="jeuxsouthparc"; modifImage();})
        document.getElementById("cactus").addEventListener("click", function(){ jeuxSelectionner="jeuxcactus"; modifImage();})
        document.getElementById("simpson").addEventListener("click", function(){ jeuxSelectionner="jeuxsimpson"; modifImage();})


            context.clearRect(0,0,canvas.width,canvas.height);

        if(pv >0){

            deplacement();

            randomBonus();
            moveBonus();
            calculeColisiion();
        }else{
                    move = 346;        
        context.beginPath();
        context.drawImage(orage, animateOrage*280, 0, 280, 344, 100, 20, 600, 600);
        context.fill();
        vitesseAnim++;
        if(vitesseAnim>2){
        animateOrage++;
        vitesseAnim=0;
    }

        if(animateOrage>16){
            animateOrage=0;
        }
        }
acceleration=Math.floor((calculeTime()-debutTemps)/10000000);

        for (var i = 0; i < bonus.length; i++) {
                        context.beginPath();
        if(pv <=0){
            bonus[i].statut=false;
        }

                        if(bonus[i].statut){
            if(bonus[i].gender==1){
         context.drawImage(goutte, 0, 0, 50, 50, bonus[i].coord[0], bonus[i].coord[1], 50, 50);

            }else{
             context.drawImage(soleil, 0, 0, 50, 50, bonus[i].coord[0], bonus[i].coord[1], 50, 50);


            }
        }
        context.fill();

        
}


  
        context.beginPath();
        if(pv ==3)
        context.drawImage(cactush, 0, 0, 312, 436, move, 355, 104, 145);
        if(pv ==2)
        context.drawImage(cactust, 0, 0, 312, 436, move, 355, 104, 145);
        if(pv ==1)
        context.drawImage(cactusr, 0, 0, 312, 436, move, 355, 104, 145);
        if(pv <=0)
        context.drawImage(cactusrip, 0, 0, 312, 436, move, 355, 104, 145);

        context.fill();


context.font = "30px Arial";
context.fillStyle = "white";
context.fillText(score,15,45);

    }

    
}

