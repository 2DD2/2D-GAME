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


    //Here is the command
    var MoveCommand = [new Move(),new Move(),new Move(),new Move()];
    MoveCommand[0].initEvent(box,[-0.1,0]);
    MoveCommand[1].initEvent(box,[0.1,0]);
    MoveCommand[2].initEvent(box,[0,0.1]);
    MoveCommand[3].initEvent(box,[0,-0.1]);
    gManager.InputManager.bindCommand("press",gEngine.Input.keys.A,MoveCommand[0]);
    gManager.InputManager.bindCommand("press",gEngine.Input.keys.D,MoveCommand[1]);
    gManager.InputManager.bindCommand("press",gEngine.Input.keys.W,MoveCommand[2]);
    gManager.InputManager.bindCommand("press",gEngine.Input.keys.S,MoveCommand[3]);
    
    
    // var UVCommand = new UVChangeCommand();
    // UVCommand.initEvent(box,this.box);
    // gManager.InputManager.bindCommand("press",gEngine.Input.keys.A,UVCommand);
    // gManager.InputManager.bindCommand("press",gEngine.Input.keys.D,UVCommand);
    // gManager.InputManager.bindCommand("press",gEngine.Input.keys.S,UVCommand);
    // gManager.InputManager.bindCommand("press",gEngine.Input.keys.W,UVCommand);
    

    // var AnimateCommand = new MoveAnimation(this.renderSprite);
    // AnimateCommand.initEvent(box,renderSprite,this.mMsg);
    // gManager.InputManager.bindCommand("press",gEngine.Input.keys.A, AnimateCommand);
    // gManager.InputManager.bindCommand("press",gEngine.Input.keys.D, AnimateCommand);
    // gManager.InputManager.bindCommand("press",gEngine.Input.keys.W, AnimateCommand);
    // gManager.InputManager.bindCommand("press",gEngine.Input.keys.S, AnimateCommand);
    
    //以上两个命令由于未完成，所以效率十分低下
    //第二个是加载字的

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
    // update animation
    MyScene.prototype.update.call(this);
};

