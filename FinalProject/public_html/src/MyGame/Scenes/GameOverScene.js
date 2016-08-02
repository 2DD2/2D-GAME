/* 
 * Created by 周玮皓 on 2016/8/1.
 * GameOverScene是游戏结束场景
 */

/* global gEngine, Scene, MyScene, gManager, vec2, Score */

function GameOverScene(){

    this.kGameOver = "assets/gameover.png";
    
    this.mScore = null;
}

gEngine.Core.inheritPrototype(GameOverScene, MyScene);

GameOverScene.prototype.initialize = function(){
    MyScene.prototype.initialize.call(this);

    this.mGameOver = new GameObject(new SpriteRenderable(this.kGameOver));
    this.mGameOver.getXform().setPosition(0, 0);
    this.mGameOver.getXform().setSize(600, 600);
    gManager.ObjectPool.addObject(this.mGameOver,1);
    
    this.mScore = new Score(new FontRenderable(String(this.mScore)));
    gManager.ObjectPool.addObject(this.mScore, 1);
//    this.mRank1 = new FontRenderable("1.    300");
//    this._initText(this.mRank1, -100, 0, [1, 1, 1, 1], 30);
//    gManager.ObjectPool.addObject(new GameObject(this.mRank1), 1);
//    this.mRank2 = new FontRenderable("2.    200");
//    this._initText(this.mRank2, -100, -60, [1, 1, 1, 1], 30);
//    gManager.ObjectPool.addObject(new GameObject(this.mRank2), 1);
//    this.mRank3 = new FontRenderable("3.    100");
//    this._initText(this.mRank3, -100, -120, [1, 1, 1, 1], 30);
//    gManager.ObjectPool.addObject(new GameObject(this.mRank3), 1);
    
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
};

GameOverScene.prototype.unloadScene = function () {
    // 卸载场景
    gEngine.Textures.unloadTexture(this.kGameOver);

    var nextScene = new RunningScene();
    gEngine.Core.startScene(nextScene);
};

GameOverScene.prototype.update = function(){
    MyScene.prototype.update.call(this);
    gManager.DefaultOptions.score += 1;
    //按 空格 键切换到RunningScene
    if (gEngine.Input.isKeyReleased(gEngine.Input.keys.Space)) {
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
