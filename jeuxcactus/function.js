function deplacement(canvas, rightPressed, leftPressed, move) {
    if(rightPressed ) {
        if(move<canvas.width-104){
            move += 16;
        }
    }
    if(leftPressed) {
        if(move>0) {
            move -= 16;
        }
    }
    return move;
}

function createBonus(coord, genderer) {
    var obj={};
    obj.coord = coord;
    obj.gender = genderer;
    obj.vitesse = getRandom(4);
    obj.statut = true;
    return obj;
}

function getRandom(max) {
    var res = 0;
    res = Math.floor(Math.random() * Math.floor(max) + 1);
    return res;
}

function randomBonus(canvas, dernierTemps, bonus, randomTimeCreate, VITESSE_APPARITION_BONUS) {
    if(dernierTemps > randomTimeCreate) {
        var coordX = getRandom(canvas.width);
        var genderer = getRandom(2);
        bonus.push(createBonus([coordX, 20], genderer));

        randomTimeCreate = getRandom(VITESSE_APPARITION_BONUS);
        dernierTemps = 0;
    }
    var res = [];
    res['randomTimeCreate'] = randomTimeCreate;
    res['dernierTemps'] = dernierTemps;
    return res;
}

function detectColision(object1, object2){
    var rect1 = {x: object1[0], y: object1[1], width: object1[2], height: object1[3]};
    var rect2 = {x: object2[0], y: object2[1], width: object2[2], height: object2[3]};

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
    var d = new Date();
    var n = d.getTime();
    var seconde =1000*n;
    return seconde;
   }
function calculeColisiion(bonus, move, pv, score) {
    for (var i = 0; i < bonus.length; i++) {
        if (detectColision([move, 355, 104, 145], [bonus[i].coord[0],bonus[i].coord[1],50,50])) {
            if(bonus[i].statut==true) {
                if(bonus[i].gender == 2) {
                    score += 10;
                    console.log('putain de merde sa me fait chier!');
                }else{
                    pv--;
                }
            }
            bonus[i].statut=false;
        }
    }
}

function moveBonus(bonus, acceleration) {
    for (var i = 0; i < bonus.length; i++) {
        bonus[i].coord[1] += bonus[i].vitesse + acceleration;
    }
}

function createImage(jeuxSelectionner, imageName) {
    var img = new Image();
    img.src = "../imagejeux/" + jeuxSelectionner + "/" + imageName + ".png";
    return img;
}
