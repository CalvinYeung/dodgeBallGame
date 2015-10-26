(function(){
var game = new Phaser.Game(1200, 700, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

function preload() {
	game.load.spritesheet('pokeball', "./assets/pokeball.png");
	game.load.spritesheet('pikachu', "./assets/pikachu.png");
	game.load.image('background', "./assets/background.jpg")

}
	var pokeball;
	var pikachu;
function create() {

	background = game.add.sprite(0, 0, 'background')
	background.scale.setTo(3.3, 2.5)


	game.physics.startSystem(Phaser.Physics.ARCADE);
	pokeball = game.add.group()
    pokeball.enableBody = true;
	pokeball = game.add.sprite(10,10, "pokeball");
	game.physics.enable(pokeball, Phaser.Physics.ARCADE);

	pokeball.body.velocity.setTo(1800, 500);
    
    pokeball.body.collideWorldBounds = true;
    
    pokeball.body.bounce.setTo(1, 1);

    pokeball.scale.setTo(.3, .3)

    
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
	game.physics.arcade.overlap(pokeball, pikachu, touchPikachu, null, this);

}


function touchPikachu(pokeball, pikachu){
	pikachu.kill()
}

function render () {

    //debug helper
    game.debug.spriteInfo(pokeball,32,32);

}

})()//end of entire callback