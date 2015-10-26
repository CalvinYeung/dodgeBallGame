(function(){
var game = new Phaser.Game(1200, 700, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

function preload() {
	game.load.spritesheet('pokeball', "./assets/pokeball.png");
	game.load.image('background', "./assets/background.jpg")

}

function create() {

	background = game.add.sprite(0, 0, 'background')
	background.scale.setTo(3.3, 2.5)


	game.physics.startSystem(Phaser.Physics.ARCADE);

	pokeball = game.add.sprite(10,10, "pokeball");
	game.physics.enable(pokeball, Phaser.Physics.ARCADE);

	pokeball.body.velocity.setTo(2800, 1100);
    
    pokeball.body.collideWorldBounds = true;
    
    pokeball.body.bounce.setTo(1, 1);

    pokeball.scale.setTo(.3, .3)

   	
}	

function update() {
}

function render () {

    //debug helper
    game.debug.spriteInfo(pokeball,32,32);

}

})()//end of entire callback