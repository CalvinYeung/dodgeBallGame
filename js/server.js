(function(){
var game = new Phaser.Game(1000, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

function preload() {
	game.load.spritesheet('pokeBall', "./assets/pokeball.png");
	game.load.spritesheet('blueBall', "./assets/balls.png", 350,350);
	game.load.spritesheet('ultraBall', "./assets/ultraball.png", 350,350);
	game.load.spritesheet('pikachu', "./assets/pikachu.png");
	game.load.image('background', "./assets/background.jpg")

}
	var pokeBall;
	var ultraBall;
	var pikachu;
function create() {

	background = game.add.sprite(0, 0, 'background')
	background.scale.setTo(3.3, 2.5)


	game.physics.startSystem(Phaser.Physics.ARCADE);

	//PokeBall
	pokeBall = game.add.group()
    pokeBall.enableBody = true;
	pokeBall = game.add.sprite(500,10, "pokeBall");
	game.physics.enable(pokeBall, Phaser.Physics.ARCADE);
	pokeBall.body.velocity.setTo(500, 500);
    pokeBall.body.collideWorldBounds = true;
    pokeBall.body.bounce.setTo(1, 1);
    pokeBall.scale.setTo(.3, .3)


    //Random blue ball
    blueBall = game.add.group()
    blueBall.enableBody = true;
    var myBlueBall = setInterval(function(){
    blueBall = game.add.sprite(0,0, "blueBall")
    game.physics.enable(blueBall, Phaser.Physics.ARCADE);
    blueBall.body.velocity.setTo(Math.random()*500, Math.random()*500);
    blueBall.scale.setTo(.4, .4)
    },5000)

    //Random Ultra ball
    ultraBall = game.add.group()
    ultraBall.enableBody = true;
    var myultraBall = setInterval(function(){
    ultraBall = game.add.sprite(game.world.width - 1,game.world.height - 1, "ultraBall")
    game.physics.enable(ultraBall, Phaser.Physics.ARCADE);
    ultraBall.body.velocity.setTo(Math.random()* -500, Math.random()*-500);
    ultraBall.scale.setTo(.4, .4)
    },5000)

    //random Mast

    //Pikachu Cursor Player
    pikachu = game.add.sprite(400,300, 'pikachu');
    game.physics.enable(pikachu, Phaser.Physics.ARCADE);
    pikachu.body.collideWorldBounds = true;
    pikachu.anchor.setTo(0.5,0.5)
    pikachu.scale.setTo(1.5,1.5)
    game.physics.arcade.enable(pikachu);
    pikachu.body.allowRotation = true;
}	

function update() {
	pikachu.rotation = game.physics.arcade.moveToPointer(pikachu, 60, game.input.activePointer, 500);
	game.physics.arcade.overlap(pokeBall, pikachu, touchPikachu, null, this);
	game.physics.arcade.overlap(blueBall, pikachu, touchPikachu, null, this);
	game.physics.arcade.overlap(ultraBall, pikachu, touchPikachu, null, this);
}


function touchPikachu(pokeBall, pikachu){
	pikachu.kill()
}

function touchPikachu(blueBall, pikachu){
	pikachu.kill()
}

function touchPikachu(ultraBall, pikachu){
	pikachu.kill()
}

})()//end of entire callback