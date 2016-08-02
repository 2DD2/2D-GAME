/* 
 * Created by 周玮皓 on 2016/8/1.
 * WelcomeScene用来加载开场动画
 */

/* global gEngine, Scene, MyScene, vec2, gManager */

function WelcomeScene(){
    
    this.kWelScene = "assets/minion_sprite.png";
    this.mWelSprite = null;
}

gEngine.Core.inheritPrototype(WelcomeScene, MyScene);

WelcomeScene.prototype.initialize = function(){
    MyScene.prototype.initialize.call(this);
    
    this.mWelSprite = new GameObject(new SpriteRenderable(this.kWelScene));
    this.mWelSprite.getXform().setPosition(0, 0);
    this.mWelSprite.getXform().setSize(40, 20);
    gManager.ObjectPool.addObject(this.mWelSprite,1);
    
    var camera = new Camera(vec2.fromValues(0,0),
                             40,
                             [20,20,400,400]);
    camera.setBackgroundColor([0.8,0.8,0.8,1]);
    gManager.CameraManager.registerCamera(camera, 1);
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
