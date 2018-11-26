
window.onload = function() {
    const VITESSE_APPARITION_BONUS = 60;
    

    var canvas = document.getElementById("mon_Canvas");
    if(!canvas) {
        alert("Impossible de récupérer le canvas");
        return;
    }
    
    var context = canvas.getContext("2d");
    if(!context) {
        alert("Impossible de récupérer le context");
        return;
    }

    var rightPressed = false;
    var leftPressed = false;
    var upPressed = false;
    var downPressed = false;

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    
    function keyDownHandler(e) {
        switch(e.key) {
            case "ArrowRight":
                rightPressed = true;
                break;
            case "ArrowLeft":
                leftPressed = true;
                break;
            case "ArrowUp":
                upPressed = true;
                break;
            case "ArrowDown":
                downPressed = true;
                break;
        }
    }
    
    function keyUpHandler(e) {
        switch(e.key) {
            case "ArrowRight":
                rightPressed = false;
                break;
            case "ArrowLeft":
                leftPressed = false;
                break;
            case "ArrowUp":
                upPressed = false;
                break;
            case "ArrowDown":
                downPressed = false;
                break;
        }
    }

    /*player*/
    function createImage(folderName, imageName) {
        var img = new Image();
        img.src = "../imagejeux/" + folderName + "/" + imageName + ".png";
        return img;
    }
    
    var jeuxSelectionner ='jeuxcactus';
    var cactush = createImage(jeuxSelectionner, "player");
    var cactust = createImage(jeuxSelectionner, "player1");
    var cactusr = createImage(jeuxSelectionner, "player2");
    var cactusrip = createImage(jeuxSelectionner, "player3");
    var orage = createImage(jeuxSelectionner, "dead");
    var soleil = createImage(jeuxSelectionner, "bonus");
    var goutte = createImage(jeuxSelectionner, "malus");

    function modifImage(jeuxSelectionner) {
        soleil.src = "../imagejeux/" + jeuxSelectionner + "/bonus.png";
        goutte.src = "../imagejeux/" + jeuxSelectionner + "/malus.png";
        orage.src = "../imagejeux/" + jeuxSelectionner + "/dead.png";
        cactusrip.src = "../imagejeux/" + jeuxSelectionner + "/player3.png";
        cactusr.src = "../imagejeux/" + jeuxSelectionner + "/player2.png";
        cactust.src = "../imagejeux/" + jeuxSelectionner + "/player1.png";
        cactush.src = "../imagejeux/" + jeuxSelectionner + "/player.png";
        if(jeuxSelectionner=="jeuxvoiture"|| jeuxSelectionner=="jeuxstarswars") {
            canvas.style.backgroundImage = "url(../imagejeux/" + jeuxSelectionner + "/fond.gif)";
        } else {
            canvas.style.backgroundImage = "url(../imagejeux/" + jeuxSelectionner + "/fond.jpg)";
        }
    }

    document.getElementById("voiture").addEventListener("click", function(){
        modifImage("jeuxvoiture");
    });
    
    document.getElementById("starswars").addEventListener("click", function(){
        modifImage("jeuxstarswars");
    });
    
    document.getElementById("noel").addEventListener("click", function(){
        modifImage("jeuxnoel");
    });

    document.getElementById("southparc").addEventListener("click", function(){
        modifImage("jeuxsouthparc");
    });
    document.getElementById("cactus").addEventListener("click", function(){
         modifImage("jeuxcactus");
    });
    document.getElementById("simpson").addEventListener("click", function(){
         modifImage("jeuxsimpson");
    });
    
    









    var Player = cactush;

    /*omage et vitesse*/
    var animateOrage = 0; 
    var vitesseAnim = 0;
    var vitesseX = 3;
    var vitesseY = 3;
    var score = 0;
    var pv = 3;
    var debutTemps = calculeTime();

    var bonus=[];


    var move = 370;
    var dernierTemps = 0;

    var acceleration = 0;

    var randomTimeCreate = getRandom(VITESSE_APPARITION_BONUS);

    var myInterval = setInterval(animate, 1000/30);
    function animate() {        
        dernierTemps++;

        context.clearRect(0,0,canvas.width,canvas.height);
    
        if(pv > 0) {
            move = deplacement(canvas, rightPressed, leftPressed, move);
            var res = randomBonus(canvas, dernierTemps, bonus, randomTimeCreate, VITESSE_APPARITION_BONUS);
            randomTimeCreate = res['randomTimeCreate'];
            dernierTemps = res['dernierTemps'];

            moveBonus(bonus, acceleration);
            calculeColisiion(bonus, move, pv, score);
        } else {
            move = 346;        
            context.beginPath();
            context.drawImage(orage, animateOrage*280, 0, 280, 344, 100, 20, 600, 600);
            context.fill();
            vitesseAnim++;
    
            if(vitesseAnim > 2) {
                animateOrage++;
                vitesseAnim=0;
            }
    
            if(animateOrage > 16){
                animateOrage=0;
            }
        }
        
        acceleration=Math.floor((calculeTime()-debutTemps)/10000000);

        for (var i = 0; i < bonus.length; i++) {
            context.beginPath();
            if(pv <= 0) {
                bonus[i].statut=false;
            }
            if(bonus[i].statut) {
                if(bonus[i].gender==1) {
                    context.drawImage(goutte, 0, 0, 50, 50, bonus[i].coord[0], bonus[i].coord[1], 50, 50);
                } else {
                    context.drawImage(soleil, 0, 0, 50, 50, bonus[i].coord[0], bonus[i].coord[1], 50, 50);
                }
            }
            context.fill();
        }
    
        context.beginPath();
        if(pv == 3)
        context.drawImage(cactush, 0, 0, 312, 436, move, 355, 104, 145);
        if(pv == 2)
        context.drawImage(cactust, 0, 0, 312, 436, move, 355, 104, 145);
        if(pv == 1)
        context.drawImage(cactusr, 0, 0, 312, 436, move, 355, 104, 145);
        if(pv <= 0)
        context.drawImage(cactusrip, 0, 0, 312, 436, move, 355, 104, 145);
        context.fill();
        context.font = "30px Arial";
        context.fillStyle = "white";
        context.fillText(score,15,45);
    }

}

