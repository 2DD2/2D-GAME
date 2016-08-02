/* 
 * Created by 周玮皓 on 2016/8/1.
 * WelcomeScene用来加载开场动画
 */

/* global gEngine, Scene, MyScene, vec2, gManager */

function WelcomeScene(){
    
    this.kLogo = "assets/logo.png";
    this.mWelSprite = null;
    
    this.mColor = null;
}

gEngine.Core.inheritPrototype(WelcomeScene, MyScene);

WelcomeScene.prototype.initialize = function(){
    MyScene.prototype.initialize.call(this);
    
    this.mWelSprite = new GameObject(new SpriteRenderable(this.kLogo));
    this.mWelSprite.getXform().setPosition(0, 0);
    this.mWelSprite.getXform().setSize(512, 256);
    gManager.ObjectPool.addObject(this.mWelSprite,1);
    
    var camera = new Camera(vec2.fromValues(0,0),
                             1200,
                             [0,0,1200,600]);
    camera.setBackgroundColor([0.1, 0.1, 0.1, 1.0]);
    gManager.CameraManager.registerCamera(camera,0);
    
    var UICamera = new Camera(vec2.fromValues(0,0),
                                40,
                                [20,20,400,400]);
    gManager.UIManager.setRenderringCamera(UICamera);
    
    this.mColor = this.mWelSprite.getRenderable().getColor();
};

WelcomeScene.prototype.loadScene = function () {
    // 加载场景
    gEngine.Textures.loadTexture(this.kLogo);
};

WelcomeScene.prototype.unloadScene = function () {
    // 卸载场景
    gEngine.Textures.unloadTexture(this.kLogo);
    
    var nextScene = new BeginningScene();
    gEngine.Core.startScene(nextScene);
};

WelcomeScene.prototype.update = function(){
    MyScene.prototype.update.call(this);
    
    if (gEngine.Input.isKeyReleased(gEngine.Input.keys.Space)) {
        this.mColor[3] = 1;
        gEngine.GameLoop.stop();
    }
    if(this.mColor[3]>=0 && this.mColor[3]<=1){
        this.mColor[3] += 0.01;
    }
};

WelcomeScene.prototype.draw = function(){
    MyScene.prototype.draw.call(this);
};
