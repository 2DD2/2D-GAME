/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */


/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, SpriteRenderable: false, Camera: false, vec2: false,
  TextureRenderable: false, Renderable: false, SpriteAnimateRenderable, MyScene, gManager, Engine: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {
    this.kBoundBox_Path = "assets/Bound.png";
    this.kSpritesSheet_Path = "assets/spritesheet1.png";
    this.kSceneData_Path = "assets/SceneData/Test_Scene.xml";
}

gEngine.Core.inheritPrototype(MyGame, MyScene);

MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kSpritesSheet_Path);
    gEngine.Textures.loadTexture(this.kBoundBox_Path);
    gEngine.TextFileLoader.loadTextFile(this.kSceneData_Path, gEngine.TextFileLoader.eTextFileType.eXMLFile);
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kSpritesSheet_Path);
    gEngine.Textures.unloadTexture(this.kBoundBox_Path);
    gEngine.TextFileLoader.unloadTextFile(this.kSceneData_Path, gEngine.TextFileLoader.eTextFileType.eXMLFile);
};

MyGame.prototype.initialize = function () {
    MyScene.prototype.initialize.call(this);

    // sprite on the right
    var sprite = new GameObject(new SpriteRenderable(this.kSpritesSheet_Path));
    sprite.getXform().setPosition(0,0);
    sprite.getXform().setSize(40,20);
    sprite.getRenderable().setElementPixelPositions(0,1024,0,512);
    gManager.ObjectPool.addObject(sprite);
    
    // the moving box 
    var box = new BoundBox(this.kBoundBox_Path);
    gManager.ObjectPool.addObject(box.mBoundBox);
    

    // the animation
    var renderSprite = new AnimationBox(this.kSpritesSheet_Path,box);
    gManager.ObjectPool.addObject(renderSprite);

    // For echoing status
    this.mMsg = new FontRenderable("Status Message");
    this.mMsg.setColor([0, 0, 0, 1]);
    this.mMsg.getXform().setPosition(-20, -15);
    this.mMsg.setTextHeight(1);
    gManager.ObjectPool.addObject(this.mMsg);

    // Square outside
    var spriteSquare = new GameObjectSet();
    var Sq1 = new Renderable(gEngine.DefaultResources.getConstColorShader());
    Sq1.setColor([0.1, 0.1, 1, 1]);
    Sq1.getXform().setPosition(-20,10);
    spriteSquare.addToSet(Sq1);
    var Sq2 = new Renderable(gEngine.DefaultResources.getConstColorShader());
    Sq2.setColor([0.3, 0.2, 0.2, 1]);
    Sq2.getXform().setPosition(20,10);
    spriteSquare.addToSet(Sq2);
    var Sq3 = new Renderable(gEngine.DefaultResources.getConstColorShader());
    Sq3.setColor([0.8, 0.6, 0.2, 1]);
    Sq3.getXform().setPosition(-20,-10);
    spriteSquare.addToSet(Sq3);
    var Sq4 = new Renderable(gEngine.DefaultResources.getConstColorShader());
    Sq4.setColor([0.3, 0.2, 0.9, 1]);
    Sq4.getXform().setPosition(20,-10);
    spriteSquare.addToSet(Sq4);
    gManager.ObjectPool.addObject(spriteSquare);
    
    
    /*
     * 移动框事件
     */
    gManager.InputManager.bindCommand("press",gEngine.Input.keys.A,new Move(box,[-0.1,0]));
    gManager.InputManager.bindCommand("press",gEngine.Input.keys.D,new Move(box,[0.1,0]));
    gManager.InputManager.bindCommand("press",gEngine.Input.keys.W,new Move(box,[0,0.1]));
    gManager.InputManager.bindCommand("press",gEngine.Input.keys.S,new Move(box,[0,-0.1]));

    /*
     * 
     * 框缩放事件
     */
    gManager.InputManager.bindCommand("press",gEngine.Input.keys.Left,new ScaleCommand(box,[-0.1,0]));
    gManager.InputManager.bindCommand("press",gEngine.Input.keys.Right,new ScaleCommand(box,[0.1,0]));
    gManager.InputManager.bindCommand("press",gEngine.Input.keys.Up,new ScaleCommand(box,[0,0.1]));
    gManager.InputManager.bindCommand("press",gEngine.Input.keys.Down,new ScaleCommand(box,[0,-0.1]));

    /*
     * 精灵动画更新事件
     */
     var AnimateCommand = new MoveAnimation();
     AnimateCommand.initEvent(box,renderSprite,this.mMsg);
     gManager.InputManager.bindCommand("press",gEngine.Input.keys.A, AnimateCommand);
     gManager.InputManager.bindCommand("press",gEngine.Input.keys.D, AnimateCommand);
     gManager.InputManager.bindCommand("press",gEngine.Input.keys.W, AnimateCommand);
     gManager.InputManager.bindCommand("press",gEngine.Input.keys.S, AnimateCommand);
    

    var loader = new SceneDataLoader(this.kSceneData_Path);
    for(var i = 1; i <= loader.GetNumber("Camera_Num"); i++){
        var camera = loader.LoadCamera("Camera_" + i);
        gManager.CameraManager.registerCamera(camera,i);
    }
    
    var camera = gManager.CameraManager.getCamera(3);
    camera.setTarget(box.mSquare);
    camera = gManager.CameraManager.getCamera(4);
    camera.setTarget(box.mSquare1);
    camera = gManager.CameraManager.getCamera(5);
    camera.setTarget(box.mSquare2);
    camera = gManager.CameraManager.getCamera(6);
    camera.setTarget(box.mSquare3);

    // box.setWidth(10);
    // box.setHeight(10);
    // console.log("w",box.getWidth());
    // console.log("h",box.getHeight());
};


MyGame.prototype.draw = function () {
    MyScene.prototype.draw.call(this);
};

MyGame.prototype.update = function () {
    // update animation
    MyScene.prototype.update.call(this);
};



