/* 
 * Created by 周玮皓 on 2016/8/1.
 * GameOverScene是游戏结束场景
 */

/* global gEngine, Scene, MyScene, gManager, vec2 */

function GameOverScene(){
    this.kRank = "assets/bg.png";            //排行榜图片
    this.kMenu = "assets/bg.png";            //主菜单图片
    this.kRestart = "assets/bg.png";         //重新开始图片
    
    this.mRankSprite = null;
    this.mRestartSprite = null;
    this.mMenuSprite = null;
}

gEngine.Core.inheritPrototype(GameOverScene, MyScene);

GameOverScene.prototype.initialize = function(){
    MyScene.prototype.initialize.call(this);
    
    this.mRankSprite = new GameObject(new SpriteRenderable(this.kRank));
    this.mRankSprite.getXform().setPosition(0, 10);
    this.mRankSprite.getXform().setSize(40, 40);
    gManager.ObjectPool.addObject(this.mRankSprite,1);
    
    this.mMenuSprite = new GameObject(new SpriteRenderable(this.kMenu));
    this.mMenuSprite.getXform().setPosition(-10, -10);
    this.mMenuSprite.getXform().setSize(20, 10);
    gManager.ObjectPool.addObject(this.mMenuSprite,1);
    
    this.mRestartSprite = new GameObject(new SpriteRenderable(this.kRestart));
    this.mRestartSprite.getXform().setPosition(10, -10);
    this.mRestartSprite.getXform().setSize(20, 10);
    gManager.ObjectPool.addObject(this.mRestartSprite,1);
    
    var camera = new Camera(vec2.fromValues(0,0),
                             20,
                             [20,20,400,400]);
    camera.setBackgroundColor([0.8,0.8,0.8,1]);
    
    gManager.CameraManager.registerCamera(camera,0);
};

GameOverScene.prototype.loadScene = function () {
    // 加载场景
    gEngine.Textures.loadTexture(this.kRank);
    gEngine.Textures.loadTexture(this.kMenu);
    gEngine.Textures.loadTexture(this.kRestart);
};

GameOverScene.prototype.unloadScene = function () {
    // 卸载场景
    gEngine.Textures.unloadTexture(this.kRank);
    gEngine.Textures.unloadTexture(this.kMenu);
    gEngine.Textures.unloadTexture(this.kRestart);
    
    var nextScene = new RunningScene();
    gEngine.Core.startScene(nextScene);
};

GameOverScene.prototype.update = function(){
    MyScene.prototype.update.call(this);
    //按 空格 键切换到RunningScene
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
        gEngine.GameLoop.stop();
    }
};

GameOverScene.prototype.draw = function(){
    MyScene.prototype.draw.call(this);
};
