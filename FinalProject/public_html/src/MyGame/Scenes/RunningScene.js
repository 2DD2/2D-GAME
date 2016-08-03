/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global gEngine, MyScene, gManager, vec2 */

function RunningScene(){
    this.kBgPath = "assets/BG_1.jpg";
    this.kFgPath = "assets/FG_1.png";
    this.kSceneDataFile = "assets/SceneData/Test_Scene.xml";
    this.kParticleTexture = "assets/FGP_1.png";
    this.kUIBanner_Path = "assets/UIBanner.png";
    
       
    this.kUIBanner_Path = "assets/UIBanner.png";
    this.kHero = "assets/hero.png";
    this.kBlock = "assets/Block.png";
    this.kSock = "assets/Sock.png";
    
    this.mWayImg = "assets/land.png";

}

gEngine.Core.inheritPrototype(RunningScene,MyScene);

RunningScene.prototype.loadScene = function(){
    gEngine.Textures.loadTexture(this.kBgPath);
    gEngine.Textures.loadTexture(this.kFgPath);
    gEngine.Textures.loadTexture(this.kUIBanner_Path);
    gEngine.Textures.loadTexture(this.kParticleTexture);
    gEngine.TextFileLoader.loadTextFile(this.kSceneDataFile,gEngine.TextFileLoader.eTextFileType.eXMLFile);
    
    gEngine.Textures.loadTexture(this.kHero);
    gEngine.Textures.loadTexture(this.kBlock);
    gEngine.Textures.loadTexture(this.kSock);    
    gEngine.Textures.loadTexture(this.mWayImg);
};

RunningScene.prototype.unloadScene = function(){
    gEngine.Textures.unloadTexture(this.kBgPath);
    gEngine.Textures.unloadTexture(this.kFgPath);
    gEngine.TextFileLoader.unloadTextFile(this.kSceneDataFile);
    gEngine.Textures.unloadTexture(this.kParticleTexture);
    
    gEngine.Textures.unloadTexture(this.kHero);
    gEngine.Textures.unloadTexture(this.kBlock);
    gEngine.Textures.unloadTexture(this.kSock);
    
    gEngine.Textures.unloadTexture(this.mWayImg);
     
       var nextScene = new GameOverScene();
       gEngine.Core.startScene(nextScene);
};

RunningScene.prototype.initialize = function(){
    MyScene.prototype.initialize.call(this);
    
    var sceneLoader = new SceneDataLoader(this.kSceneDataFile);
    
    //gManager.UIManager.initManager(sceneLoader);
    
    var controller = new BGController(sceneLoader);
    gManager.ObjectPool.addObject(controller,1);
    controller = new FGController(sceneLoader);
    gManager.ObjectPool.addObject(controller,8);
    
    
    this.mHero = new Hero(new SpriteAnimateRenderable(this.kHero));
    gManager.ObjectPool.addObject(this.mHero,4);
    
    
    this.mBlock = new BlockA(this.kBlock);
    for(var i = 0 ;i< this.mBlock.length ; i++){
        console.log(this.mBlock[i],i);
         gManager.ObjectPool.addObject(this.mBlock[i],3);
    }
    
    this.mDanger = new DangerA(this.kSock);
    for(var i = 0 ;i< this.mDanger.length ; i++){
         gManager.ObjectPool.addObject(this.mDanger[i],5);
    }
   
    this.mWay = new Way(this.mWayImg,-15);
    this.mWay1 = new Way(this.mWayImg,-5);
    this.mWay2 = new Way(this.mWayImg,5);
    this.mWay3 = new Way(this.mWayImg,15);
    this.mWay4 = new Way(this.mWayImg,25);
    
    gManager.ObjectPool.addObject(this.mWay,1);
    gManager.ObjectPool.addObject(this.mWay1,1);
    gManager.ObjectPool.addObject(this.mWay2,1);
    gManager.ObjectPool.addObject(this.mWay3,1);
    gManager.ObjectPool.addObject(this.mWay4,1);  
  
    gManager.InputManager.initManager();
   
    gManager.InputManager.bindCommand("press",gEngine.Input.keys.Space, new JumpPressCom(this.mHero));
    gManager.InputManager.bindCommand("click",gEngine.Input.keys.Space, new JumpCommand(this.mHero));
    
    gManager.InputManager.bindCommand("click",gEngine.Input.keys.Up, new AntiCommand(this.mHero));
    
    
    gManager.CameraManager.registerCamera(sceneLoader.LoadCamera("Camera_Main"),1);
};

RunningScene.prototype.draw = function(){
    MyScene.prototype.draw.call(this);
};

RunningScene.prototype.update = function(){
    var hBbox = this.mHero.getBBox();
    var block = gManager.ObjectPool.getObjectsByLayer(3).mSet;
    for(var i =0 ;i < block.length; i++){
         if(hBbox.intersectsBound(block[i].getBBox())){
            
             this.mHero.getXform().setXPos(block[i].getXform().getXPos()- block[i].getXform().getWidth());
         }
     }
     var danger = gManager.ObjectPool.getObjectsByLayer(5).mSet;
     
      for(var i =0 ;i < danger.length; i++){
           console.log(hBbox.boundCollideStatus(danger[i].getBBox()));
         if(hBbox.intersectsBound(danger[i].getBBox())){
             alert("You are died");
             this.mHero.Die();
            
         }
     }

    MyScene.prototype.update.call(this);
};





/////* 
// * Created by 周玮皓 on 2016/8/1.
// * RunningScene是游戏进行场景
// */
//
///* global gEngine, Scene, MyScene, DefaultOptions, vec2, gManager */
//
//function RunningScene(){
//    this.kBg = "assets/logo.png";                  //背景图片
//    
//    this.kHeroSprite = "assets/logo.png";          //主角图片
//    this.kObsSprite = "assets/logo.png";           //障碍物图片
//    this.kPlatFormSprite = "assets/logo.png";      //跑道图片
//    
//    this.mBgSprite = null;
//    this.mHeroSprite = null;
//    this.mObsSprite = null;
//    this.mPlatFormSprite = null;
//}
//
//gEngine.Core.inheritPrototype(RunningScene, MyScene);
//
//RunningScene.prototype.initialize = function(){
//    MyScene.prototype.initialize.call(this);
//    
//    this.mBgSprite = new GameObject(new SpriteRenderable(this.kBg));
//    this.mBgSprite.getXform().setPosition(0, 0);
//    this.mBgSprite.getXform().setSize(1200, 600);
//    gManager.ObjectPool.addObject(this.mBgSprite,1);
//
//    this.mHeroSprite = new GameObject(new SpriteRenderable(this.kHeroSprite));
//    this.mHeroSprite.getXform().setPosition(0, 0);
//    this.mHeroSprite.getXform().setSize(100, 50);
//    gManager.ObjectPool.addObject(this.mHeroSprite,1);
//
//    this.mObsSprite = new GameObject(new SpriteRenderable(this.kObsSprite));
//    this.mObsSprite.getXform().setPosition(0, 0);
//    this.mObsSprite.getXform().setSize(50, 50);
//    gManager.ObjectPool.addObject(this.mObsSprite,1);
//
//    this.mPlatFormSprite = new GameObject(new SpriteRenderable(this.kPlatFormSprite));
//    this.mPlatFormSprite.getXform().setPosition(0, 0);
//    this.mPlatFormSprite.getXform().setSize(40, 10);
//    gManager.ObjectPool.addObject(this.mPlatFormSprite,1);
//    
//    var camera = new Camera(vec2.fromValues(0,0),
//                             1200,
//                             [0,0,1200,600]);
//    camera.setBackgroundColor([0.1, 0.1, 0.1, 1.0]);
//    gManager.CameraManager.registerCamera(camera,0);
//    
//    var UICamera = new Camera(vec2.fromValues(0,0),
//                                40,
//                                [20,20,400,400]);
//    gManager.UIManager.setRenderringCamera(UICamera);
//};
//
//RunningScene.prototype.loadScene = function () {
//    // 加载场景
//    gEngine.Textures.loadTexture(this.kBg);
//    gEngine.Textures.loadTexture(this.kHeroSprite);
//    gEngine.Textures.loadTexture(this.kObsSprite);
//    gEngine.Textures.loadTexture(this.kPlatFormSprite);
//};
//
//RunningScene.prototype.unloadScene = function () {
//    // 卸载场景
//    gEngine.Textures.unloadTexture(this.kBg);
//    gEngine.Textures.unloadTexture(this.kHeroSprite);
//    gEngine.Textures.unloadTexture(this.kObsSprite);
//    gEngine.Textures.unloadTexture(this.kPlatFormSprite);
//    
//    //gManager.ObjectPool.initPool();
//    
//    var nextScene = new GameOverScene();
//    gEngine.Core.startScene(nextScene);
//};
//
//RunningScene.prototype.update = function(){
//    MyScene.prototype.update.call(this);
//    var x = this.mBgSprite.getXform().getXPos();
//    var y = this.mBgSprite.getXform().getYPos();
//    
//    this.mBgSprite.getXform().setPosition(x - 10 * gManager.DefaultOptions.mSpeed, y);
//    
//    //按 空格 键切换到GameOverScene
//    if (gEngine.Input.isKeyReleased(gEngine.Input.keys.Space)) {
//        gEngine.GameLoop.stop();
//    }
//};
//
//RunningScene.prototype.draw = function(){
//    MyScene.prototype.draw.call(this);
//};

RunningScene.prototype._initText = function (font, posX, posY, color, textH) {
    font.setColor(color);
    font.getXform().setPosition(posX, posY);
    font.setTextHeight(textH);
};
