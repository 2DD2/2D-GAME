/* 
 * Created by 周玮皓 on 2016/8/1.
 * BeginningScene是开始场景
 */

/* global gEngine, Scene, MyScene, vec2, gManager */

function BeginningScene(){
    this.kTitleSprite = "assets/logo.png";
    this.kStartSprite = "assets/logo.png";
    this.kAboutUsSprite = "assets/logo.png";
    
    this.mTitleSprite = null;
    this.mStartSprite = null;
    this.mAboutUsSprite = null;
    this.mTextSysFont = null;
}

gEngine.Core.inheritPrototype(BeginningScene, MyScene);

BeginningScene.prototype.initialize = function(){
    MyScene.prototype.initialize.call(this);
    
    this.mTitleSprite = new GameObject(new SpriteRenderable(this.kTitleSprite));
    this.mTitleSprite.getXform().setPosition(0, 200);
    this.mTitleSprite.getXform().setSize(400, 200);
    gManager.ObjectPool.addObject(this.mTitleSprite,1);
    
    this.mStartSprite = new UIButton(new SpriteRenderable(this.kStartSprite), 0, 0, 200, 100);
    gManager.ObjectPool.addObject(this.mStartSprite,1);
    this.mTextStart = new FontRenderable("Start");
    this._initText(this.mTextStart, -60, 10, [0, 0, 0, 1.0], 50);
    gManager.ObjectPool.addObject(new GameObject(this.mTextStart), 1);
    this.mTextStartHint = new FontRenderable("Press \"Space\" to start");
    this._initText(this.mTextStartHint, -120, -30, [0, 0, 0, 1.0], 20);
    gManager.ObjectPool.addObject(new GameObject(this.mTextStartHint), 1);
    
    this.mAboutUsSprite = new UIButton(new SpriteRenderable(this.kAboutUsSprite), 0, -200, 200, 100);
    gManager.ObjectPool.addObject(this.mAboutUsSprite,1);
    this.mTextCredit = new FontRenderable("Credits");
    this._initText(this.mTextCredit, -90, -190, [0, 0, 0, 1.0], 50);
    gManager.ObjectPool.addObject(new GameObject(this.mTextCredit), 1);
    
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
    if (gEngine.Input.isKeyReleased(gEngine.Input.keys.Space)) {
        gEngine.GameLoop.stop();
    }
};

BeginningScene.prototype.draw = function(){
    MyScene.prototype.draw.call(this);
};

BeginningScene.prototype._initText = function (font, posX, posY, color, textH) {
    font.setColor(color);
    font.getXform().setPosition(posX, posY);
    font.setTextHeight(textH);
};

