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
    // this is the path of the box
    this.kBoundBox_Path = "assets/Bound.png";
    // this is the path of the sprite
    this.kSpritesSheet_Path = "assets/minion_sprite.png";
    this.kSpritesSheet2_Path = "assets/Consolas-72.png";
    // the setting of camera
    this.kSceneData_Path = "assets/SceneData/Test_Scene.xml";
}

gEngine.Core.inheritPrototype(MyGame, MyScene);

MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kSpritesSheet_Path);
    gEngine.Textures.loadTexture(this.kSpritesSheet2_Path);
    gEngine.Textures.loadTexture(this.kBoundBox_Path);
    gEngine.TextFileLoader.loadTextFile(this.kSceneData_Path, gEngine.TextFileLoader.eTextFileType.eXMLFile);
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kSpritesSheet_Path);
    gEngine.Textures.unloadTexture(this.kSpritesSheet2_Path);
    gEngine.Textures.unloadTexture(this.kBoundBox_Path);
    gEngine.TextFileLoader.unloadTextFile(this.kSceneData_Path, gEngine.TextFileLoader.eTextFileType.eXMLFile);
};

MyGame.prototype.initialize = function () {
    MyScene.prototype.initialize.call(this);

    // 0:sprite on the right
    var sprite = new GameObject(new SpriteRenderable(this.kSpritesSheet_Path));
    sprite.getXform().setPosition(0,0);
    sprite.getXform().setSize(40,20);
    sprite.getRenderable().setElementPixelPositions(0,1024,0,512);
    gManager.ObjectPool.addObject(sprite);
    
    // 1:borderline of the sprite
    var border =new BorderLine(sprite,0.1);
    gManager.ObjectPool.addObject(border);
    
    // 2:the moving box 
    var box = new BoundBox(this.kBoundBox_Path);
    gManager.ObjectPool.addObject(box.mBoundBox);
   
    // 3:the animation
    var renderSprite = new AnimationBox(this.kSpritesSheet_Path,box);
    gManager.ObjectPool.addObject(renderSprite);
    
    var renderSprite2 = new AnimationBox(this.kSpritesSheet2_Path,box);
    
    var renderSprite1 = new GameObject(new SpriteRenderable(this.kSpritesSheet2_Path));
    renderSprite1.getXform().setPosition(-15,-5);
    renderSprite1.getXform().setSize(10,10);
    renderSprite1.getRenderable().setElementPixelPositions(0,256,0,265);

    //gManager.ObjectPool.addObject(renderSprite);

    // 4:For echoing status
    this.mMsg = new FontRenderable("Status Message");
    this.mMsg.setColor([0, 0, 0, 1]);
    this.mMsg.getXform().setPosition(-20, -15);
    this.mMsg.setTextHeight(1);
    gManager.ObjectPool.addObject(this.mMsg);

    // 5:Square outside
    var squareOut = new OutSq();
    gManager.ObjectPool.addObject(squareOut);

    // 6: Press Q and some box will show
    //resetState to false
//    var frame = new FrameBox(this.kBoundBox_Path)
//    gManager.ObjectPool.addObject(frame.mFrameBox); 
   
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
     gManager.InputManager.bindCommand("press",gEngine.Input.keys.Up, AnimateCommand);
     gManager.InputManager.bindCommand("press",gEngine.Input.keys.Down, AnimateCommand);
     gManager.InputManager.bindCommand("press",gEngine.Input.keys.Right, AnimateCommand);
     gManager.InputManager.bindCommand("press",gEngine.Input.keys.Left, AnimateCommand);
     
     var AnimateCommand2 = new MoveAnimation();
     AnimateCommand2.initEvent(box,renderSprite2,this.mMsg);
     gManager.InputManager.bindCommand("press",gEngine.Input.keys.A, AnimateCommand2);
     gManager.InputManager.bindCommand("press",gEngine.Input.keys.D, AnimateCommand2);
     gManager.InputManager.bindCommand("press",gEngine.Input.keys.W, AnimateCommand2);
     gManager.InputManager.bindCommand("press",gEngine.Input.keys.S, AnimateCommand2);
     gManager.InputManager.bindCommand("press",gEngine.Input.keys.Up, AnimateCommand2);
     gManager.InputManager.bindCommand("press",gEngine.Input.keys.Down, AnimateCommand2);
     gManager.InputManager.bindCommand("press",gEngine.Input.keys.Right, AnimateCommand2);
     gManager.InputManager.bindCommand("press",gEngine.Input.keys.Left, AnimateCommand2);
     
    
    var FrameShow = new Show(renderSprite1,sprite,renderSprite2,renderSprite);
    gManager.InputManager.bindCommand("click",gEngine.Input.keys.Q, FrameShow);
  
  
  
  
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

/////////////////////////////////////////
// Here is some definition of object set
////////////////////////////////////////

function BorderLine(obj,width){
    this.mBorderLine = new GameObjectSet();
    this.target = obj;
    this.mW = width;
    this.color = [0.2,0.2,0.1,1];
    
    this.mLine1 = new Renderable(gEngine.DefaultResources.getConstColorShader());
    this.mLine1.setColor(this.color);
    this.mLine1.getXform().setPosition(0,10);
    this.mLine1.getXform().setSize(40,this.mW);
    this.mBorderLine.addToSet(this.mLine1);
    
    this.mLine2 = new Renderable(gEngine.DefaultResources.getConstColorShader());
    this.mLine2.setColor(this.color);
    this.mLine2.getXform().setPosition(0,-10);
    this.mLine2.getXform().setSize(40,this.mW);
    this.mBorderLine.addToSet(this.mLine2);
    
    this.mLine3 = new Renderable(gEngine.DefaultResources.getConstColorShader());
    this.mLine3.setColor(this.color);
    this.mLine3.getXform().setPosition(20,0);
    this.mLine3.getXform().setSize(this.mW,20);
    this.mBorderLine.addToSet(this.mLine3);
    
    this.mLine4 = new Renderable(gEngine.DefaultResources.getConstColorShader());
    this.mLine4.setColor(this.color);
    this.mLine4.getXform().setPosition(-20,0);
    this.mLine4.getXform().setSize(this.mW,20);
    this.mBorderLine.addToSet(this.mLine4);

    return this.mBorderLine;
}

// Sprite 四角的方块
function OutSq(){
    
    this.spriteSquare = new GameObjectSet();
    
    var Sq1 = new Renderable(gEngine.DefaultResources.getConstColorShader());
    Sq1.setColor([0.1, 0.1, 1, 1]);
    Sq1.getXform().setPosition(-20,10);
    this.spriteSquare.addToSet(Sq1);
    
    var Sq2 = new Renderable(gEngine.DefaultResources.getConstColorShader());
    Sq2.setColor([0.3, 0.2, 0.2, 1]);
    Sq2.getXform().setPosition(20,10);
    this.spriteSquare.addToSet(Sq2);
    
    var Sq3 = new Renderable(gEngine.DefaultResources.getConstColorShader());
    Sq3.setColor([0.8, 0.6, 0.2, 1]);
    Sq3.getXform().setPosition(-20,-10);
    this.spriteSquare.addToSet(Sq3);
    
    var Sq4 = new Renderable(gEngine.DefaultResources.getConstColorShader());
    Sq4.setColor([0.3, 0.2, 0.9, 1]);
    Sq4.getXform().setPosition(20,-10);
    this.spriteSquare.addToSet(Sq4);
    gManager.ObjectPool.addObject(Sq4);

    return this.spriteSquare;
}
// 绘制Frame
function FrameBox(bindObj,p,animationBox){
    this.mFrameBox = new GameObjectSet(); 
    this.mFrameCount=0;

    this.bindBox=bindObj;   //box
    this.path = p;          //render path
    
    this.frame= animationBox;// to get number of frame
   
}
FrameBox.prototype.setVisibility = function(bool){
    console.log("visible");
    for(var i =1 ;i<this.mFrameBoxCount;i++){
        this.mFrameBox[i].setVisibility(bool);
    }
};
FrameBox.prototype.setCount= function(){
    //获取 动画的帧数 然后 根据帧数来重新生成方块
    //this.mFrameBox.mSet = []; //清空

    this.mFrameCount=this.frame.getFrameNum(); //获取
    this.xPos = this.bindBox.getXPos();
    this.yPos = this.bindBox.getYPos();
    this.fWid = this.bindBox.getWidth(); //frame width
    this.fHei = this.bindBox.getHeight();//frame higth
    
    // console.log("frame number is",this.mFrameCount);
    // for(var i=0 ; i<this.mFrameCount ;i++){
    //      var i =1;     
    //       var tempFrame = new TextureRenderable(this.path);
    //      this.mFrameBox.addToSet(this.tempFrame);
    //      console.log(tempFrame.getXform()); //an object
    //      tempFrame.getXform().setPosition(this.xPos + i*this.fWid,this.yPos);
    //      tempFrame.getXform().setSize(this.fWid,this.fHei);
    // // }
 
};

