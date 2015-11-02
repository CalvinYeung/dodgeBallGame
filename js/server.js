(function(){

var game = new Phaser.Game("100%","100%", Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

function preload() {
	game.load.spritesheet('pokeBall', "./assets/pokeball.png");
	game.load.spritesheet('blueBall', "./assets/balls.png", 350,320);
    game.load.spritesheet('ultraball', "./assets/ultraball.png", 350,320);
	
    game.load.spritesheet('rareCandy', "./assets/rareCandy.png", 350,320);
    game.load.spritesheet('pikachu', "./assets/pikachu.png");
	game.load.image('background', "./assets/background.jpg")

}
	var pokeBall;
	var ultraball;
	var blueBall;
    var pikachu;
    var highScore;
    var timer;
    var rareCandy;
function create() {
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
	background = game.add.sprite(0, 0, 'background')
	background.scale.setTo(3.3, 2.5)
    //highScore
    highScoreText = game.add.text(0, 0, "High Score:0")
    //timer
    timerText = game.add.text(0, 25, "Current Score:0")

	game.physics.startSystem(Phaser.Physics.ARCADE);

    game.time.events.repeat(Phaser.Timer.SECOND *2.5,
        1000, createBlueBall,this);

    game.time.events.repeat(Phaser.Timer.SECOND *3.5,
        1000, createUltraball,this);

	// PokeBall
	pokeBall = game.add.group()
    pokeBall.enableBody = true;
	pokeBall = game.add.sprite(50,100, "pokeBall");
	game.physics.enable(pokeBall, Phaser.Physics.ARCADE);
	pokeBall.body.velocity.setTo(550, 500);
    pokeBall.body.collideWorldBounds = true;
    pokeBall.body.bounce.setTo(1, 1);
    pokeBall.scale.setTo(.3, .3)

    //Pikachu Cursor Player
    pikachu = game.add.sprite(800,200, 'pikachu');
    game.physics.enable(pikachu, Phaser.Physics.ARCADE);
    pikachu.body.collideWorldBounds = true;
    pikachu.anchor.setTo(0.5,0.5)
    pikachu.scale.setTo(1.5,1.5)
    game.physics.arcade.enable(pikachu);
    pikachu.body.allowRotation = true;

    //rareCandy
    rareCandy = game.add.group();
    rareCandy.enableBody = true; 
    rareCandy = game.add.sprite(Math.random()*1150, Math.random()*550, 'rareCandy')
    rareCandy.scale.setTo(0.5,0.5)
    game.physics.enable(rareCandy, Phaser.Physics.ARCADE);

}

function gofull() {

    if (game.scale.isFullScreen)
    {
        game.scale.stopFullScreen();
    }
    else
    {
        game.scale.startFullScreen(false);
    }
}

function createBlueBall(){
     blueBall = game.add.sprite(0,200, "blueBall")
        game.physics.enable(blueBall, Phaser.Physics.ARCADE);
        blueBall.body.velocity.setTo((Math.random() * 900) + 850, (Math.random() * 200) + 100);
        blueBall.scale.setTo(.4, .4)
}

function createUltraball(){
     ultraball = game.add.sprite(game.world.width - 1,game.world.height - 300, "ultraball")
        game.physics.enable(ultraball, Phaser.Physics.ARCADE);
        ultraball.body.velocity.setTo((Math.random() * -900) + -850, Math.random()*-800);
        ultraball.scale.setTo(.4, .4)
}


var leaderScore = 0 
var secondsAlive = 0;
function update() {
    game.input.onDown.add(gofull, this);
	pikachu.rotation = game.physics.arcade.moveToPointer(pikachu, 0, game.input.activePointer, 150);
	
    //maybe try implementig a boost or sound for a click
    // if(game.input.activePointer.isDown){
    //        console.log("it worked")
    //    }
    if(!rareCandy.alive){
        rareCandy = game.add.group();
    rareCandy.enableBody = true; 
    rareCandy = game.add.sprite(Math.random()*1150, Math.random()*550, 'rareCandy')
    rareCandy.scale.setTo(0.5,0.5)
    game.physics.enable(rareCandy, Phaser.Physics.ARCADE);
    }
    if(pikachu.alive){
        setInterval(function(){
            secondsAlive++
            timerText.text= "Current Score: "+secondsAlive
            if(secondsAlive > leaderScore){
                leaderScore = secondsAlive
                highScoreText.text = "High Score: "+ leaderScore
            }
        },1000)
    } else {
        secondsAlive = 0
        timerText.text = "Current Score: 0"
    }

    game.physics.arcade.overlap(pokeBall, pikachu, touchPikachu, null, this);
	game.physics.arcade.overlap(blueBall, pikachu, touchPikachu, null, this);
    game.physics.arcade.overlap(ultraball, pikachu, touchPikachu, null, this);
	game.physics.arcade.overlap(pikachu, rareCandy, pikachuEatsRareCandy, null, this);
}



function pikachuEatsRareCandy(pikachu, rareCandy){
    rareCandy.kill();
    secondsAlive += 1000

}

function touchPikachu(pokeBall, pikachu){
	pikachu.kill();
    setTimeout(function(){
        pikachu.revive()
    },2000);
}

function touchPikachu(blueBall, pikachu){
	pikachu.kill();
    setTimeout(function(){
        pikachu.revive()
    },2000);
}

function touchPikachu(ultraball, pikachu){
	pikachu.kill();
    setTimeout(function(){
        pikachu.revive()
    },2000);
}

})()//end of entire callback