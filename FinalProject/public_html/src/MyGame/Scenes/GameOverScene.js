/* 
 * Created by 周玮皓 on 2016/8/1.
 * GameOverScene是游戏结束场景
 */

/* global gEngine, Scene, MyScene, gManager, vec2 */

function GameOverScene(){
    this.kRank = "";            //排行榜图片
    this.kMenu = "";            //主菜单图片
    this.kRestart = "";         //重新开始图片
    
    this.mRankSprite = null;
    this.mRestartSprite = null;
    this.mMenuSprite = null;
    
    this.initialize();
}

gEngine.Core.inheritPrototype(GameOverScene, MyScene);

GameOverScene.prototype.initialize = function(){
    MyScene.prototype.initialize.call(this);
    
    this.mRankSprite = new SpriteRenderable(this.kRank);
    this.mRankSprite.setColor([1, 1, 1, 0]);
    this.mRankSprite.getXform().setPosition(0, 0);
    this.mRankSprite.getXform().setSize(400, 100);
    
    this.mMenuSprite = new SpriteRenderable(this.kMenu);
    this.mMenuSprite.setColor([1, 1, 1, 0]);
    this.mMenuSprite.getXform().setPosition(0, 0);
    this.mMenuSprite.getXform().setSize(200, 100);
    
    this.mRestartSprite = new SpriteRenderable(this.kRestart);
    this.mRestartSprite.setColor([1, 1, 1, 0]);
    this.mRestartSprite.getXform().setPosition(0, 0);
    this.mRestartSprite.getXform().setSize(200, 100);
    
    var camera = new Camera(vec2.fromValues(0,0),
                             20,
                             [20,20,400,400]);
    camera.setBackgroundColor([0.8,0.8,0.8,1]);
    
    gManager.CameraManager.registerCamera(camera,0);
};

GameOverScene.prototype.loadScene = function () {
    // 加载场景
    gEngine.Textures.loadTexture(this.kTitleSprite);
};

GameOverScene.prototype.unloadScene = function () {
    // 卸载场景
    gEngine.Textures.unloadTexture(this.kTitleSprite);
    
    var nextScene = new RunningScene();
    gEngine.Core.startScene(nextScene);
};

GameOverScene.prototype.update = function(){
    MyScene.prototype.update.call(this);
    //按 空格 键切换到RunningScene
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
        unloadScene();
    }
};

GameOverScene.prototype.draw = function(){
    MyScene.prototype.draw.call(this);
};
