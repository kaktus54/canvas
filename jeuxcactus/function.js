function death(context, move, orage, animateOrage, vitesseAnim) {
    move = 346;        
    context.beginPath();
    context.drawImage(orage, animateOrage*280, 0, 280, 344, 100, 20, 600, 600);
    context.fill();
    vitesseAnim++;

    if(vitesseAnim > 2) {
        animateOrage++;
        vitesseAnim = 0;
    }

    if(animateOrage > 16){
        animateOrage=0;
    }
}

function modifImage(jeuxSelectionner, tabImage,  canvas) {
    tabImage['soleil'].src = "../imagejeux/" + jeuxSelectionner + "/bonus.png";
    tabImage['goutte'].src = "../imagejeux/" + jeuxSelectionner + "/malus.png";
    tabImage['orage'].src = "../imagejeux/" + jeuxSelectionner + "/dead.png";
    tabImage['cactusrip'].src = "../imagejeux/" + jeuxSelectionner + "/player3.png";
    tabImage['cactusr'].src = "../imagejeux/" + jeuxSelectionner + "/player2.png";
    tabImage['cactust'].src = "../imagejeux/" + jeuxSelectionner + "/player1.png";
    tabImage['cactush'].src = "../imagejeux/" + jeuxSelectionner + "/player.png";
    if(jeuxSelectionner=="jeuxvoiture"|| jeuxSelectionner=="jeuxstarswars") {
        canvas.style.backgroundImage = "url(../imagejeux/" + jeuxSelectionner + "/fond.gif)";
    } else {
        canvas.style.backgroundImage = "url(../imagejeux/" + jeuxSelectionner + "/fond.jpg)";
    }
}


function initButtonChangeGame(game, canvas, gameName, tabImage, isReset, PV_PLAYER) {
    document.getElementById("voiture").addEventListener("click", function(){
        reset(game, PV_PLAYER);
        modifImage("jeuxvoiture", tabImage, canvas);
    });
    document.getElementById("starswars").addEventListener("click", function() {
        reset(game, PV_PLAYER);
        modifImage("jeuxstarswars", tabImage, canvas);
    });
    document.getElementById("noel").addEventListener("click", function() {
        reset(game, PV_PLAYER);
        modifImage("jeuxnoel", tabImage, canvas);
    });
    document.getElementById("southparc").addEventListener("click", function() {
        reset(game, PV_PLAYER);
        modifImage("jeuxsouthparc", tabImage, canvas);
    });
    document.getElementById("cactus").addEventListener("click", function() {
        reset(game, PV_PLAYER);
        modifImage("jeuxcactus", tabImage, canvas);
    });
    document.getElementById("simpson").addEventListener("click", function() {
        reset(game, PV_PLAYER);
        modifImage("jeuxsimpson", tabImage, canvas);
    });
}

function createImage(folderName, imageName) {
    let img = new Image();
    img.src = "../imagejeux/" + folderName + "/" + imageName + ".png";
    return img;
}

function reset(game, PV_PLAYER, isReset = false) {
    if(isReset) {
        game['bonus'] = [];
        game['dernierTemps'] = 0;
        game['pv'] = PV_PLAYER;
        game['debutTemps'] = calculeTime();;
        game['vitesseAnim'] = 0;
        game['score'] = 0;
    }
}

function deplacement(canvas, rightPressed, leftPressed, move) {
    if(rightPressed) {
        if(move < canvas.width - 104){
            move += 16;
        }
    }

    if(leftPressed) {
        if(move > 0) {
            move -= 16;
        }
    }

    return move;
}

function createBonus(coord, genderer) {
    let obj={};
    obj.coord = coord;
    obj.gender = genderer;
    obj.vitesse = getRandom(4);
    obj.statut = true;
    return obj;
}

function getRandom(max) {
    let res = 0;
    res = Math.floor(Math.random() * Math.floor(max) + 1);
    return res;
}

function randomBonus(game, canvas, randomTimeCreate, VITESSE_APPARITION_BONUS) {
    if(game['dernierTemps'] > randomTimeCreate) {
        let coordX = getRandom(canvas.width);
        let genderer = getRandom(2);
        game['bonus'].push(createBonus([coordX, 20], genderer));
        randomTimeCreate = getRandom(VITESSE_APPARITION_BONUS);
        game['dernierTemps'] = 0;
    }
    return randomTimeCreate;
}

function detectColision(object1, object2){
    let rect1 = {x: object1[0], y: object1[1], width: object1[2], height: object1[3]};
    let rect2 = {x: object2[0], y: object2[1], width: object2[2], height: object2[3]};

    if (rect1.x < rect2.x + rect2.width
    && rect1.x + rect1.width > rect2.x
    && rect1.y < rect2.y + rect2.height
    && rect1.height + rect1.y > rect2.y) {
        return true;
    } else {
        return false;
    }
}
function calculeTime(){
    let d = new Date();
    let n = d.getTime();
    let seconde =1000 * n;
    return seconde;
}

function calculeColisiion(game, move, pv, score) {
    for (let i = 0; i < game['bonus'].length; i++) {
        if (detectColision([move, 355, 104, 145], [game['bonus'][i].coord[0], game['bonus'][i].coord[1], 50, 50])) {
            if(game['bonus'][i].statut == true) {
                if(game['bonus'][i].gender == 2) {
                    game['score'] += 10;
                }else{
                    game['pv']--;
                }
            }
            game['bonus'][i].statut=false;
        }
    }
}

function moveBonus(game, acceleration) {
    for (let i = 0; i < game['bonus'].length; i++) {
        game['bonus'][i].coord[1] += game['bonus'][i].vitesse + acceleration;
    }
}

function createImage(jeuxSelectionner, imageName) {
    let img = new Image();
    img.src = "../imagejeux/" + jeuxSelectionner + "/" + imageName + ".png";
    return img;
}
