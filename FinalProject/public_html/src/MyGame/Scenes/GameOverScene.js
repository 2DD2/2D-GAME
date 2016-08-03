/* 
 * Created by 周玮皓 on 2016/8/1.
 * GameOverScene是游戏结束场景
 */

/* global gEngine, Scene, MyScene, gManager, vec2, Score */

function GameOverScene(){

    this.kGameOver = "assets/gameover.png";
    this.kRestart = "assets/logo.png";
    
    this.mScore = null;
    this.mRestartButton = null;
    this.mMaxScore = null;
    this.mTextRestart =null;
    
    this.mTurn = 15;            //闪烁帧数
    this.mFrame = 0;            //帧计数
}

gEngine.Core.inheritPrototype(GameOverScene, MyScene);

GameOverScene.prototype.initialize = function(){
    MyScene.prototype.initialize.call(this);

    this.mGameOver = new GameObject(new SpriteRenderable(this.kGameOver));
    this.mGameOver.getXform().setPosition(0, 0);
    this.mGameOver.getXform().setSize(600, 600);
    gManager.ObjectPool.addObject(this.mGameOver,1);
    

    this.mScore = new Score(new FontRenderable(""), 77, -27, [1, 1, 1, 1], 50);
    gManager.ObjectPool.addObject(this.mScore, 1);
    var str = "max:" + String(gManager.DefaultOptions.maxScore);
    this.mMaxScore = new FontRenderable(str);
    this._initText(this.mMaxScore, -60, -100, [1, 1, 1, 1.0], 50);
    gManager.ObjectPool.addObject(new GameObject(this.mMaxScore), 1);

    this.mRestartButton = new UIButton(new SpriteRenderable(this.kRestart), 0, -230, 200, 100);
    gManager.ObjectPool.addObject(this.mRestartButton,1);
    this.mTextRestart = new FontRenderable("Press \"Space\" to Restart");
    this._initText(this.mTextRestart, -210, -190, [1, 1, 1, 1.0], 30);
    gManager.ObjectPool.addObject(new GameObject(this.mTextRestart), 1);

    var camera = new Camera(vec2.fromValues(0,0),
                             1200,
                             [0,0,1200,600]);
    camera.setBackgroundColor([0.1, 0.1, 0.1, 1.0]);
    gManager.CameraManager.registerCamera(camera,0);
    
    var UICamera = new Camera(vec2.fromValues(0,0),
                                40,
                                [20,20,400,400]);
    gManager.UIManager.setRenderringCamera(UICamera);
};

GameOverScene.prototype.loadScene = function () {
    // 加载场景
    gEngine.Textures.loadTexture(this.kGameOver);
    gEngine.Textures.loadTexture(this.kRestart);
};

GameOverScene.prototype.unloadScene = function () {
    // 卸载场景
    gEngine.Textures.unloadTexture(this.kGameOver);
    gEngine.Textures.unloadTexture(this.kRestart);

    gManager.DefaultOptions.score = 0;

    var nextScene = new RunningScene();
    gEngine.Core.startScene(nextScene);
};

GameOverScene.prototype.update = function(){
    MyScene.prototype.update.call(this);
//    gManager.DefaultOptions.score += 1;
    if(this.mFrame >= 0){
        this.mFrame++;
        this.mRestartButton.setVisibility(false);
        if(this.mFrame === this.mTurn){
            this.mFrame = -1;
        }
    }else if (this.mFrame < 0){
        this.mFrame--;
        this.mRestartButton.setVisibility(true);
        if(this.mFrame === -this.mTurn){
            this.mFrame = 0;
        }
    }
    //按 空格 键切换到RunningScene
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
        gEngine.GameLoop.stop();
    }
};

GameOverScene.prototype.draw = function(){
    MyScene.prototype.draw.call(this);
};

GameOverScene.prototype._initText = function (font, posX, posY, color, textH) {
    font.setColor(color);
    font.getXform().setPosition(posX, posY);
    font.setTextHeight(textH);
};
