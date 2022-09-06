/**
 * Customizable game options
 */
 let gameOptions = {
    // Color of background
    bgColor1: 0x151820,
    bgColor2: 0x3b446c,
    bgColor3: 0x3b446c,
    bgColor4: 0x6d759e,
    bgColor5: 1,

    // Board scale
    boardScale: 2,

    // Buttons style
    btnScale: 1.3,
    btnTintColor: 0x9E9E9E,
    btnTintGray: 0x373737,
    btnTextTintColor: 0x9E9E9E,

    // Text font family
    titleColor: '#fff',
    titleFontSize: '70px',
    textFontFamily: 'Arial',
    textFontStyle: 'bold',
    textColor: '#fff',
    textFontSize: '25px',

    // Color of board background
    boardBackgroundColor: 0xC5C5C5,

    // Text content
    titleText: '4 IMAGES 1 MOT',
    btnText: 'Jouer',
}


/**
 * Class scene in start view
 */
export default class StartScene extends Phaser.Scene {
    /**
     * Constructor
     */
    constructor() {
        super('StartScene');
    }
    preload() {
        this.load.svg('btnClassic', 'assets/btnClassic.svg');
        this.load.svg('btnClassicHover', 'assets/btnClassicHover.svg');
        this.load.svg('board', 'assets/board.svg');
        this.load.audio('start',['./sounds/start.wav']);
    }

    /**
     * Create and init game assets
     */
    create() {
        this.add.graphics()
            .fillGradientStyle(gameOptions.bgColor1, gameOptions.bgColor2, gameOptions.bgColor3, gameOptions.bgColor4, gameOptions.bgColor5)
            .fillRect(0, 0, this.game.config.width, this.game.config.height)
        this.startSound = this.sound.add('start');
        this.startSound.play();

        //  Sound Delays
        this.time.addEvent({
            delay: 90000,
            callback: () => {
                this.startSound.stop();
                this.startSound = this.sound.add('start');
                this.startSound.play();
            },
            loop: true
        })

         // Init border menu
        this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'board')
        .setScale(gameOptions.boardScale);

        let titleMenu = this.add.text(null, null, gameOptions.titleText, {
            fontFamily: gameOptions.textFontFamily,
            fontStyle: gameOptions.textFontStyle,
            fontSize: gameOptions.titleFontSize,
            fill: gameOptions.titleColor,
        })

        titleMenu.x = this.game.config.width / 2 - titleMenu.width / 2;
        titleMenu.y = this.game.config.height * 0.09 - titleMenu.height / 2;

        // Init player vs player button
        let btn = this.add.image(this.game.config.width / 2, (this.game.config.height) * 0.40, 'btnClassic')
            .setScale(gameOptions.btnScale)
            .setInteractive()
            .on('pointerover', () => {
                btn.setTint(gameOptions.btnTintColor)
                fourimg1mot.setTint(gameOptions.btnTextTintColor)
            })
            .on('pointerout', () => {
                btn.clearTint()
                fourimg1mot.clearTint()
            })

        let fourimg1mot = this.add.text(null, null, gameOptions.btnText)
            .setPadding(10)
            .setStyle({
                fontFamily: gameOptions.textFontFamily,
                color: gameOptions.textColor,
                fontSize: gameOptions.textFontSize
            });

        fourimg1mot.x = this.game.config.width / 2 - fourimg1mot.width / 2;
        fourimg1mot.y = this.game.config.height * 0.40 - fourimg1mot.height / 2;

        // Manage mode choice
        //btn.on('pointerdown', () => this.goToGameScene('playerVsComputer'));
        //btn2.on('pointerdown', () => this.goToGameScene('computerVsPlayer'));
        btn.on('pointerdown', () => this.goToGameScene() );

      // TODO Init assets
    }

    /**
     * Go to Main scene
     */
    goToGameScene() {
        // Go to game scene
        this.scene.start('GameScene');
    }
}