const config = {
  type: Phaser.AUTO,
  width: 850,
  height: 400,
  backgroundColor: "FFFFFF",
    physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          enableBody: true,
        }
    },
  scene:[MainMenu,decideRolesScene]
};

const game = new Phaser.Game(config);

let gameState = {               
   
}