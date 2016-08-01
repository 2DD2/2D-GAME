/* 
 * Created by 周玮皓 on 2016/8/1.
 * RunningScene是游戏进行场景
 */

/* global gEngine, Scene, MyScene, DefaultOptions, vec2, gManager */

function RunningScene(){
    this.kBg = "";                  //背景图片
    
    this.kHeroSprite = "";          //主角图片
    this.kObsSprite = "";           //障碍物图片
    this.kPlatFormSprite = "";      //跑道图片
    
    this.mBgSprite = null;
    this.mHeroSprite = null;
    this.mObsSprite = null;
    this.mPlatFormSprite = null;
    
    initialize();
}

gEngine.Core.inheritPrototype(RunningScene, MyScene);

RunningScene.prototype.initialize = function(){
    MyScene.prototype.initialize.call(this);
    
    this.mBgSprite = new SpriteRenderable(this.kBg);
    this.mBgSprite.setColor([1, 1, 1, 0]);
    this.mBgSprite.getXform().setPosition(0, 0);
    this.mBgSprite.getXform().setSize(1024, 768);
    
    this.mHeroSprite = new SpriteRenderable(this.kHeroSprite);
    this.mHeroSprite.setColor([1, 1, 1, 0]);
    this.mHeroSprite.getXform().setPosition(0, 0);
    this.mHeroSprite.getXform().setSize(400, 100);
    
    this.mObsSprite = new SpriteRenderable(this.kObsSprite);
    this.mObsSprite.setColor([1, 1, 1, 0]);
    this.mObsSprite.getXform().setPosition(0, 0);
    this.mObsSprite.getXform().setSize(200, 100);
    
    this.mPlatFormSprite = new SpriteRenderable(this.kPlatFormSprite);
    this.mPlatFormSprite.setColor([1, 1, 1, 0]);
    this.mPlatFormSprite.getXform().setPosition(0, 0);
    this.mPlatFormSprite.getXform().setSize(200, 100);
    
    var camera = new Camera(vec2.fromValues(0,0),
                             20,
                             [20,20,400,400]);
    camera.setBackgroundColor([0.8,0.8,0.8,1]);
    
    gManager.CameraManager.registerCamera(camera,0);
};

RunningScene.prototype.loadScene = function () {
    // 加载场景
    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.kHeroSprite);
    gEngine.Textures.loadTexture(this.kObsSprite);
    gEngine.Textures.loadTexture(this.kPlatFormSprite);
};

RunningScene.prototype.unloadScene = function () {
    // 卸载场景
    gEngine.Textures.unloadTexture(this.kBg);
    gEngine.Textures.unloadTexture(this.kHeroSprite);
    gEngine.Textures.unloadTexture(this.kObsSprite);
    gEngine.Textures.unloadTexture(this.kPlatFormSprite);
    
    var nextScene = new GameOverScene();
    gEngine.Core.startScene(nextScene);
};

RunningScene.prototype.update = function(){
    MyScene.prototype.update.call(this);
    var x = this.mBgSprite.getXform().getXPos();
    var y = this.mBgSprite.getXform().getYPos();
    
    this.mBgSprite.getXform().setPosition(x + DefaultOptions.mSpeed, y);
    
    //按 空格 键切换到GameOverScene
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
        unloadScene();
    }
};

RunningScene.prototype.draw = function(){
    MyScene.prototype.draw.call(this);
};
