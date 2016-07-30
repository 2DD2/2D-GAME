/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */


/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, SpriteRenderable: false, Camera: false, vec2: false,
  TextureRenderable: false, Renderable: false, SpriteAnimateRenderable, MyScene, gManager: false */
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
    
    var sprite = new GameObject(new TextureRenderable(this.kSpritesSheet_Path));
    sprite.getXform().setPosition(0,0);
    sprite.getXform().setSize(40,20);
    gManager.ObjectPool.addObject(sprite);
    
    var box = new BoundBox(this.kBoundBox_Path);
    gManager.ObjectPool.addObject(box.mBoundBox);
    
    var renderSprite = new SpriteAnimateRenderable(this.kSpritesSheet_Path);
    renderSprite.getXform().setPosition(100,100);
    renderSprite.getXform().setSize(10,10);
    gManager.ObjectPool.addObject(renderSprite);

    
    var MoveCommand = [new Move(),new Move(),new Move(),new Move()];
    MoveCommand[0].initEvent(box,[-0.1,0]);
    MoveCommand[1].initEvent(box,[0.1,0]);
    MoveCommand[2].initEvent(box,[0,0.1]);
    MoveCommand[3].initEvent(box,[0,-0.1]);
    gManager.InputManager.bindCommand("press",gEngine.Input.keys.A,MoveCommand[0]);
    gManager.InputManager.bindCommand("press",gEngine.Input.keys.D,MoveCommand[1]);
    gManager.InputManager.bindCommand("press",gEngine.Input.keys.W,MoveCommand[2]);
    gManager.InputManager.bindCommand("press",gEngine.Input.keys.S,MoveCommand[3]);
    
    
    var UVCommand = new UVChangeCommand();
    UVCommand.initEvent(box,renderSprite);
    gManager.InputManager.bindCommand("press",gEngine.Input.keys.A,UVCommand);
    gManager.InputManager.bindCommand("press",gEngine.Input.keys.D,UVCommand);
    gManager.InputManager.bindCommand("press",gEngine.Input.keys.S,UVCommand);
    gManager.InputManager.bindCommand("press",gEngine.Input.keys.W,UVCommand);
    
    
    
    
    
    
    
    
    var loader = new SceneDataLoader(this.kSceneData_Path);
    for(var i = 1; i <= loader.GetNumber("Camera_Num"); i++){
        var camera = loader.LoadCamera("Camera_" + i);
        gManager.CameraManager.registerCamera(camera,i);
    }
};


MyGame.prototype.draw = function () {
    MyScene.prototype.draw.call(this);
};

MyGame.prototype.update = function () {
    MyScene.prototype.update.call(this);
};