/* 
 * Created by 周玮皓 on 2016/8/1.
 * RunningScene是游戏进行场景
 */

/* global gEngine, Scene, MyScene, DefaultOptions, vec2, gManager */

function RunningScene(){
    
    // 背景
    this.kBgPath = "assets/BG_1.jpg";
    this.kFgPath = "assets/FG_1.png";
    this.kSceneDataFile = "assets/SceneData/Test_Scene.xml";
    this.kParticleTexture = "assets/FGP_1.png";
    this.kUIBanner_Path = "assets/UIBanner.png";
    
    // Hero 和障碍物
    this.kHero = "assets/hero.png";
    this.kBlock = "assets/Block.png";
    this.kSock = "assets/Sock.png";

    
    this.mWayImg = "assets/land.png";
    
    this.mScore =null;
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
    gManager.UIManager.initManager(sceneLoader);
    
    var controller = new BGController(sceneLoader);
    gManager.ObjectPool.addObject(controller,1);
    controller = new FGController(sceneLoader);
    gManager.ObjectPool.addObject(controller,8);
    
    
    this.mHero = new Hero(new SpriteAnimateRenderable(this.kHero));
    gManager.ObjectPool.addObject(this.mHero,4);
    
    /*
     * 这个landController随便加哪个层都行
     */
    var landController = new LandController();
    gManager.ObjectPool.addObject(landController,1);
    
    /*
    this.mBlock = new BlockA(this.kBlock);
    for(var i = 0 ;i< this.mBlock.length ; i++){
        console.log(this.mBlock[i],i);
        gManager.ObjectPool.addObject(this.mBlock[i],3);
    }
    
    this.mDanger = new DangerA(this.kSock);
    for(var i = 0 ;i< this.mDanger.length ; i++){
         gManager.ObjectPool.addObject(this.mDanger[i],5);
    }
   
    this.mScore = new Score(new FontRenderable(""), 0, -7, [1, 1, 1, 1], 1);
    gManager.ObjectPool.addObject(this.mScore, 6);
   
    // 跳
    gManager.InputManager.bindCommand("press",gEngine.Input.keys.Space, new JumpPressCom(this.mHero));
    gManager.InputManager.bindCommand("click",gEngine.Input.keys.Space, new JumpCommand(this.mHero));
    
    //反重力
    gManager.InputManager.bindCommand("click",gEngine.Input.keys.Up, new AntiCommand(this.mHero));
    */
    
    gManager.CameraManager.registerCamera(sceneLoader.LoadCamera("Camera_Main"),1);
};

RunningScene.prototype.draw = function(){
    MyScene.prototype.draw.call(this);
};

RunningScene.prototype.update = function(){
    var hBbox = this.mHero.getBBox();
    var block = gManager.ObjectPool.getObjectsByLayer(3).mSet;
    for(var i =0 ;i < block.length; i++){
          var offsetX =  block[i].getXform().getWidth();
          var offsetY =  block[i].getXform().getHeight();
         if(hBbox.boundCollideStatus(block[i].getBBox())=== 2){
             this.mHero.getXform().setXPos(block[i].getXform().getXPos() - offsetX);
         }else if(hBbox.boundCollideStatus(block[i].getBBox())=== 4){
              this.mHero.getXform().setPosistion(block[i].getXform().getXPos(),block[i].getXform().getYPos()+offsetY);
         }
     }
     var danger = gManager.ObjectPool.getObjectsByLayer(5).mSet;
     
      for(var i =0 ;i < danger.length; i++){
         if(hBbox.intersectsBound(danger[i].getBBox())){
             alert("You are died");
             this.mHero.Die();
            
         }
     }
     
     // 分数显示
     gManager.DefaultOptions.score += 1;
     if(gManager.DefaultOptions.score > gManager.DefaultOptions.maxScore){
         gManager.DefaultOptions.maxScore = gManager.DefaultOptions.score;
     }

    MyScene.prototype.update.call(this);
    
};

RunningScene.prototype._initText = function (font, posX, posY, color, textH) {
    font.setColor(color);
    font.getXform().setPosition(posX, posY);
    font.setTextHeight(textH);
};
