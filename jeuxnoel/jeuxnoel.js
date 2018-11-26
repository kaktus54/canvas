
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

    var perenoelh = new Image();
    perenoelh.src = "image/perenoelh.png";

    var Player = perenoelh;

    /*player touché*/

     var perenoelt = new Image();
    perenoelt.src = "image/perenoelt.png";

     var perenoelr = new Image();
    perenoelr.src = "image/perenoelr.png";

    var perenoelrip = new Image();
    perenoelrip.src = "image/perenoelrip.png";

    var plusdecadeaux = new Image();
    plusdecadeaux.src = "image/plusdecadeaux.png";

    var Playertouche = ['perenoelr','perenoelt'];


     /*les objet qui descendent du ciel */

     var cadeaux = new Image();
    cadeaux.src = "image/cadeaux32.png";

     var voleur = new Image();
    voleur.src = "image/voleur32.png";

    /*omage et vitesse*/
   var animateplusdecadeaux=0; 
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
    function animate()
    {        
            context.clearRect(0,0,canvas.width,canvas.height);

        if(pv >0){

            deplacement();

            randomBonus();
            moveBonus();
            calculeColisiion();
        }else{
                    move = 346;        
        context.beginPath();
        context.drawImage(plusdecadeaux, animateplusdecadeaux*0, 0, 280, 344, 100, 20, 600, 600);
        context.fill();
        vitesseAnim++;
        if(vitesseAnim>2){
        animateplusdecadeaux++;
        vitesseAnim=0;
    }

        if(animateplusdecadeaux>16){
            animateplusdecadeaux=0;
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
         context.drawImage(voleur, 0, 0, 50, 50, bonus[i].coord[0], bonus[i].coord[1], 50, 50);

            }else{
             context.drawImage(cadeaux, 0, 0, 50, 50, bonus[i].coord[0], bonus[i].coord[1], 50, 50);


            }
        }
        context.fill();

        
}


  
        context.beginPath();
        if(pv ==3)
        context.drawImage(perenoelh, 0, 0, 312, 436, move, 355, 104, 145);
        if(pv ==2)
        context.drawImage(perenoelt, 0, 0, 312, 436, move, 355, 104, 145);
        if(pv ==1)
        context.drawImage(perenoelr, 0, 0, 312, 436, move, 355, 104, 145);
        if(pv <=0)
        context.drawImage(perenoelrip, 0, 0, 312, 436, move, 355, 104, 145);

        context.fill();


context.font = "30px Arial";
context.fillStyle = "white";
context.fillText(score,15,45);

    }

    
}

