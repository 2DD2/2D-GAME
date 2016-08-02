/* 
 * Created by 周玮皓 on 2016/8/1.
 * RunningScene是游戏进行场景
 */

/* global gEngine, Scene, MyScene, DefaultOptions, vec2, gManager */

function RunningScene(){
    this.kBg = "assets/logo.jpg";                  //背景图片
    
    this.kHeroSprite = "assets/logo.jpg";          //主角图片
    this.kObsSprite = "assets/logo.jpg";           //障碍物图片
    this.kPlatFormSprite = "assets/logo.jpg";      //跑道图片
    
    this.mBgSprite = null;
    this.mHeroSprite = null;
    this.mObsSprite = null;
    this.mPlatFormSprite = null;
}

gEngine.Core.inheritPrototype(RunningScene, MyScene);

RunningScene.prototype.initialize = function(){
    MyScene.prototype.initialize.call(this);
    
    this.mBgSprite = new GameObject(new SpriteRenderable(this.kBg));
    this.mBgSprite.getXform().setPosition(0, 0);
    this.mBgSprite.getXform().setSize(1200, 600);
    gManager.ObjectPool.addObject(this.mBgSprite,1);

    this.mHeroSprite = new GameObject(new SpriteRenderable(this.kHeroSprite));
    this.mHeroSprite.getXform().setPosition(0, 0);
    this.mHeroSprite.getXform().setSize(100, 50);
    gManager.ObjectPool.addObject(this.mHeroSprite,1);

    this.mObsSprite = new GameObject(new SpriteRenderable(this.kObsSprite));
    this.mObsSprite.getXform().setPosition(0, 0);
    this.mObsSprite.getXform().setSize(50, 50);
    gManager.ObjectPool.addObject(this.mObsSprite,1);

    this.mPlatFormSprite = new GameObject(new SpriteRenderable(this.kPlatFormSprite));
    this.mPlatFormSprite.getXform().setPosition(0, 0);
    this.mPlatFormSprite.getXform().setSize(40, 10);
    gManager.ObjectPool.addObject(this.mPlatFormSprite,1);
    
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
    
    this.mBgSprite.getXform().setPosition(x - gManager.DefaultOptions.mSpeed, y);
    
    //按 空格 键切换到GameOverScene
    if (gEngine.Input.isKeyReleased(gEngine.Input.keys.Space)) {
        gEngine.GameLoop.stop();
    }
};

RunningScene.prototype.draw = function(){
    MyScene.prototype.draw.call(this);
};
