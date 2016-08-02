/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global gEngine, MyScene, gManager, vec2 */

function DemoScene(){
    this.kBgPath = "assets/BG_1.jpg";
    this.kHero = "assets/hero.png";
    this.kObj = "assets/minion_sprite.png";
}

gEngine.Core.inheritPrototype(DemoScene,MyScene);

DemoScene.prototype.loadScene = function(){
    gEngine.Textures.loadTexture(this.kBgPath);
    gEngine.Textures.loadTexture(this.kHero);
    gEngine.Textures.loadTexture(this.kObj);
};

DemoScene.prototype.unloadScene = function(){
    gEngine.Textures.unloadTexture(this.kBgPath);
    gEngine.Textures.unloadTexture(this.kHero);
    gEngine.Textures.unloadTexture(this.kObj);
};

DemoScene.prototype.initialize = function(){
    MyScene.prototype.initialize.call(this);
    
    var controller = new BGController(this.kBgPath);
    gManager.ObjectPool.addObject(controller,0);

    var mHero = new Hero(new SpriteAnimateRenderable(this.kHero));
    gManager.ObjectPool.addObject(mHero,0);

//    var mObs = new Obstacle(this.kObj);
//    gManager.ObjectPool.addObject(mObjs,0);
    
//    var mBox = new GameObject(new Renderable());
//    mBox.getXform().setPosition(5,-25);
//    mBox.setCurrentFrontDir(-1,0);
//    console.log(mBox);
//    mBox.setSpeed(1);
//    gManager.ObjectPool.addObject(mBox,0);

    var camera = new Camera(vec2.fromValues(0,0),
                             40,
                             [0,0,1200,600]);
    camera.setBackgroundColor([0.8,0.8,0.8,1]);
    gManager.CameraManager.registerCamera(camera,0);
    
    var UICamera = new Camera(vec2.fromValues(0,0),
                                40,
                                [20,20,400,400]);
    gManager.UIManager.setRenderringCamera(UICamera);

    gManager.InputManager.initManager();
    gManager.InputManager.bindCommand("click",gEngine.Input.keys.Space, new JumpCommand(mHero));
    gManager.InputManager.bindCommand("click",gEngine.Input.keys.Up, new AntiCommand(mHero));

};

DemoScene.prototype.draw = function(){
    MyScene.prototype.draw.call(this);
    
};

DemoScene.prototype.update = function(){
    MyScene.prototype.update.call(this);
};
