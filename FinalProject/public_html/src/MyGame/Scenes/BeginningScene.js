/* 
 * Created by 周玮皓 on 2016/8/1.
 * BeginningScene是开始场景
 */

/* global gEngine, Scene, MyScene, vec2, gManager */

function BeginningScene(){
    this.kTitleSprite = "assets/bg.png";
    this.kStartSprite = "assets/bg.png";
    this.kAboutUsSprite = "assets/bg.png";
    
    this.mTitleSprite = null;
    this.mStartSprite = null;
    this.mAboutUsSprite = null;
}

gEngine.Core.inheritPrototype(BeginningScene, MyScene);

BeginningScene.prototype.initialize = function(){
    MyScene.prototype.initialize.call(this);
    
    this.mTitleSprite = new GameObject(new SpriteRenderable(this.kTitleSprite));
    this.mTitleSprite.getXform().setPosition(0, 20);
    this.mTitleSprite.getXform().setSize(40, 20);
    gManager.ObjectPool.addObject(this.mTitleSprite,1);
    
    this.mStartSprite = new GameObject(new SpriteRenderable(this.kStartSprite));
    this.mStartSprite.getXform().setPosition(0, 0);
    this.mStartSprite.getXform().setSize(20, 10);
    gManager.ObjectPool.addObject(this.mStartSprite,1);
    
    this.mAboutUsSprite = new GameObject(new SpriteRenderable(this.kAboutUsSprite));
    this.mAboutUsSprite.getXform().setPosition(0, -10);
    this.mAboutUsSprite.getXform().setSize(20, 10);
    gManager.ObjectPool.addObject(this.mAboutUsSprite,1);
    
    var camera = new Camera(vec2.fromValues(0,0),
                             20,
                             [20,20,400,400]);
    camera.setBackgroundColor([0.8,0.8,0.8,1]);
    
    gManager.CameraManager.registerCamera(camera,0);
};

BeginningScene.prototype.loadScene = function () {
    // 加载场景
    gEngine.Textures.loadTexture(this.kTitleSprite);
    gEngine.Textures.loadTexture(this.kStartSprite);
    gEngine.Textures.loadTexture(this.kAboutUsSprite);
};

BeginningScene.prototype.unloadScene = function () {
    // 卸载场景
    gEngine.Textures.unloadTexture(this.kTitleSprite);
    gEngine.Textures.unloadTexture(this.kStartSprite);
    gEngine.Textures.unloadTexture(this.kAboutUsSprite);
    
    var nextScene = new RunningScene();
    gEngine.Core.startScene(nextScene);
};

BeginningScene.prototype.update = function(){
    MyScene.prototype.update.call(this);
    //按 空格 键切换到RunningScene
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
        gEngine.GameLoop.stop();
    }
};

BeginningScene.prototype.draw = function(){
    MyScene.prototype.draw.call(this);
};
