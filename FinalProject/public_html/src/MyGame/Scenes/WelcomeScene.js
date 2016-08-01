/* 
 * Created by 周玮皓 on 2016/8/1.
 * WelcomeScene用来加载开场动画
 */

/* global gEngine, Scene, MyScene, vec2, gManager */

function WelcomeScene(){
    this.kWelScene = "assets/minion_sprite.png";
    
    this.mWelSprite = null;
    
    this.initialize();
}

gEngine.Core.inheritPrototype(WelcomeScene, MyScene);

WelcomeScene.prototype.initialize = function(){
    MyScene.prototype.initialize.call(this);
    
    this.mWelSprite = new SpriteRenderable(this.kWelScene);
    this.mWelSprite.setColor([1, 1, 1, 0.0]);
    this.mWelSprite.getXform().setPosition(0, 0);
    this.mWelSprite.getXform().setSize(1024, 768);
    
    var camera = new Camera(vec2.fromValues(0,0),
                             1024,
                             [20,20,400,400]);
    camera.setBackgroundColor([0.8,0.8,0.8,1]);
    gManager.CameraManager.registerCamera(camera, 0);
};

WelcomeScene.prototype.loadScene = function () {
    // 加载场景
    gEngine.Textures.loadTexture(this.kWelScene);
};

WelcomeScene.prototype.unloadScene = function () {
    // 卸载场景
    gEngine.Textures.unloadTexture(this.kWelScene);
};

WelcomeScene.prototype.update = function(){
    MyScene.prototype.update.call(this);
};

WelcomeScene.prototype.draw = function(){
    MyScene.prototype.draw.call(this);
};
