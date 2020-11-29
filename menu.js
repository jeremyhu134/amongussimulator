var rightArrow;
var leftArrow;
var numtext;
var num = 1;
var selectRole;
var selectedRole;
var randoNum;
var countdown;
var back;
var timer;

class MainMenu extends Phaser.Scene {
    constructor() {
		super({ key: 'MainMenu' })
	}
    preload(){
        this.load.image('MenuBackground','images/MenuBackground.png');
        this.load.image('decideRoles','images/decideRoles.png');
        this.load.image('rightArrow','images/rightArrow.png');
    }
    create() {
        this.add.sprite(0,0,'MenuBackground').setOrigin(0,0);
        gameState.decideRoles = this.add.sprite(200,200,'decideRoles').setOrigin(0,0).setInteractive();
        
        
        gameState.decideRoles.on('pointerdown', () => {
			this.scene.stop('MainMenu');
			this.scene.start('decideRolesScene');
		});
	}
    update(){
        
    }
}

class decideRolesScene extends Phaser.Scene {
    constructor() {
		super({ key: 'decideRolesScene' })
	}
    preload(){
        
    }
    create() {
        this.add.sprite(0,0,'MenuBackground').setOrigin(0,0);
        rightArrow = this.add.sprite(200,200,'rightArrow').setOrigin(0,0).setInteractive();
        leftArrow = this.add.sprite(100,200,'rightArrow').setOrigin(0,0).setInteractive().setFlipX(true);
        numtext = this.add.text( 150, 210, `${num}`, {fill: '#FFFFFF', fontSize: '30px'});
        
        back = this.add.text( 10, 350, `|Back|`, {fill: '#FFFFFF', fontSize: '20px'}).setInteractive();
        
        selectRole = this.add.text( 530, 210, `|SELECT ROLE|`, {fill: '#FFFFFF', fontSize: '40px'}).setInteractive();
        selectedRole = this.add.text( 540, 250, `Unknown`, {fill: '#FFFFFF', fontSize: '30px'});
        
        
        leftArrow.on('pointerdown', () => {
            if(num !== 1){
                num -= 1;
                numtext.destroy();
                numtext = this.add.text( 150, 210, `${num}`, {fill: '#FFFFFF', fontSize: '30px'});
                countdown = num;
            }
		});
        rightArrow.on('pointerdown', () => {
            if(num !== 10){
                num += 1;
                numtext.destroy();
                numtext = this.add.text( 150, 210, `${num}`, {fill: '#FFFFFF', fontSize: '30px'});
                countdown = num;
            }
		});
        
        var imposterCount = 0;
        selectRole.on('pointerdown', () => {
            if(timer){
                timer.destroy();
            }
            if(selectedRole){
                selectedRole.destroy();
            }
            countdown -= 1;
            if(countdown >= 0){
                if(countdown == 0 && imposterCount == 0){
                    selectedRole = this.add.text( 540, 250, `Imposter`, {fill: '#FFFFFF', fontSize: '30px'});
                }
                else if(imposterCount == 1){
                    selectedRole = this.add.text( 540, 250, `CrewMate`, {fill: '#FFFFFF', fontSize: '30px'});
                }
                else {
                    randoNum = Math.ceil(Math.random()*4);
                    if(randoNum == 1){
                        imposterCount += 1;
                        selectedRole = this.add.text( 540, 250, `Imposter`, {fill: '#FFFFFF', fontSize: '30px'});
                    }
                    else {
                        selectedRole = this.add.text( 540, 250, `CrewMate`, {fill: '#FFFFFF', fontSize: '30px'});
                    }
                }
            }
            else {
                selectedRole = this.add.text( 540, 250, `All Roles Assigned`, {fill: '#FFFFFF', fontSize: '30px'});
            }
            timer = this.time.addEvent({
                delay: 3000,
                callback: ()=>{
                    if(selectedRole){
                        selectedRole.destroy();
                    }
                },
                startAt: 0,
                timeScale: 1,
            });
		});
        back.on('pointerdown', () => {
            this.scene.stop('decideRolesScene');
			this.scene.start('MainMenu');
		});
	}
    update(){
        
    }
}