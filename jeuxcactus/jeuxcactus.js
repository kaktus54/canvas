
window.onload = function() {
    const VITESSE_APPARITION_BONUS = 60;
    const PV_PLAYER = 3;

    let canvas = document.getElementById("mon_Canvas");
    if(!canvas) {
        alert("Impossible de récupérer le canvas");
        return;
    }
    
    let context = canvas.getContext("2d");
    if(!context) {
        alert("Impossible de récupérer le context");
        return;
    }

    let game = [];
    game['bonus'] = [];
    game['dernierTemps'];
    game['pv'];
    game['debutTemps'];
    game['vitesseAnim'];
    game['score'];

    let isReset = false;

    reset(game, PV_PLAYER, true);

    let rightPressed = false;
    let leftPressed = false;
    let upPressed = false;
    let downPressed = false;

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

    let jeuxSelectionner ='jeuxcactus';

    let tabImage = [];
    tabImage['soleil'] = createImage(jeuxSelectionner, "bonus");
    tabImage['goutte'] = createImage(jeuxSelectionner, "malus");
    tabImage['orage'] = createImage(jeuxSelectionner, "dead");
    tabImage['cactusrip'] = createImage(jeuxSelectionner, "player3");
    tabImage['cactusr'] = createImage(jeuxSelectionner, "player2");
    tabImage['cactust'] = createImage(jeuxSelectionner, "player1");
    tabImage['cactush'] = createImage(jeuxSelectionner, "player");

    initButtonChangeGame(canvas, "jeuxvoiture", tabImage, game, isReset, PV_PLAYER)

    /*omage et vitesse*/
    let animateOrage = 0; 
    let vitesseX = 3;
    let vitesseY = 3;
    let score = 0;
    let debutTemps = calculeTime();

    let move = 370;

    let acceleration = 0;
    let randomTimeCreate = getRandom(VITESSE_APPARITION_BONUS);

    let myInterval = setInterval(animate, 1000/30);
    function animate() {        
        reset(game, PV_PLAYER);
        
        game['dernierTemps']++;

        context.clearRect(0,0,canvas.width,canvas.height);
    
        acceleration = Math.floor((calculeTime() - debutTemps) / 10000000);

        if(game['pv'] > 0) {
            move = deplacement(canvas, rightPressed, leftPressed, move);
            randomTimeCreate = randomBonus(game, canvas, randomTimeCreate, VITESSE_APPARITION_BONUS);
            moveBonus(game, acceleration);
            calculeColisiion(game, move);
        } else {
            death(context, move, tabImage['orage'], animateOrage);
        }
        
        for (let i = 0; i < game['bonus'].length; i++) {
            context.beginPath();
            if(game['pv'] <= 0) {
                game['bonus'][i].statut=false;
            }
            if(game['bonus'][i].statut) {
                if(game['bonus'][i].gender == 1) {
                    context.drawImage(tabImage['goutte'], 0, 0, 50, 50, game['bonus'][i].coord[0], game['bonus'][i].coord[1], 50, 50);
                } else {
                    context.drawImage(tabImage['soleil'], 0, 0, 50, 50, game['bonus'][i].coord[0], game['bonus'][i].coord[1], 50, 50);
                }
            }
            context.fill();
        }
    
        context.beginPath();
        if(game['pv'] == 3)
        context.drawImage(tabImage['cactush'], 0, 0, 312, 436, move, 355, 104, 145);
        if(game['pv'] == 2)
        context.drawImage(tabImage['cactust'], 0, 0, 312, 436, move, 355, 104, 145);
        if(game['pv'] == 1)
        context.drawImage(tabImage['cactusr'], 0, 0, 312, 436, move, 355, 104, 145);
        if(game['pv'] <= 0)
        context.drawImage(tabImage['cactusrip'], 0, 0, 312, 436, move, 355, 104, 145);
        context.fill();
        context.font = "30px Arial";
        context.fillStyle = "white";
        context.fillText(score,15,45);
    }
}

