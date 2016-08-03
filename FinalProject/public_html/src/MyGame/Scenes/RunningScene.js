/* 
 * Created by 周玮皓 on 2016/8/1.
 * RunningScene是游戏进行场景
 */

/* global gEngine, Scene, MyScene, DefaultOptions, vec2, gManager */

function RunningScene(){
    
    // 背景
    this.kBgPath = "assets/BG_1.jpg";
    this.kFgPath = "assets/FG_1.png";
    this.kSceneDataFile = "assets/SceneData/Running_Scene.xml";
    this.kParticleTexture = "assets/FGP_1.png";
    this.kUIBanner_Path = "assets/UIrunning.png";
    
    // Hero 和障碍物
    this.kHero = "assets/herosheet.png";
    this.kBlock = "assets/Block.png";
    this.kSock = "assets/Sock.png";
    this.kTarget = "assets/Target.png";

    
    this.mWayImg = "assets/landup.png";
    this.mWayImg1 = "assets/landdown.png";
    this.mWayImg2 = "assets/landupnormal.png";
    this.mWayImg3 = "assets/landdownnormal.png";
    this.mWayImg4 = "assets/control.png";
    
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
    gEngine.Textures.loadTexture(this.kTarget); 
    
    gEngine.Textures.loadTexture(this.mWayImg);
    gEngine.Textures.loadTexture(this.mWayImg1);
    gEngine.Textures.loadTexture(this.mWayImg2);
    gEngine.Textures.loadTexture(this.mWayImg3);
    gEngine.Textures.loadTexture(this.mWayImg4);
};


RunningScene.prototype.unloadScene = function(){
    gEngine.Textures.unloadTexture(this.kBgPath);
    gEngine.Textures.unloadTexture(this.kFgPath);
    gEngine.TextFileLoader.unloadTextFile(this.kSceneDataFile);
    gEngine.Textures.unloadTexture(this.kParticleTexture);
    

    gEngine.Textures.unloadTexture(this.kHero);
    gEngine.Textures.unloadTexture(this.kBlock);
    gEngine.Textures.unloadTexture(this.kSock);
    gEngine.Textures.unloadTexture(this.kTarget);
    
    gEngine.Textures.unloadTexture(this.mWayImg);
    gEngine.Textures.unloadTexture(this.mWayImg1);

    gEngine.Textures.unloadTexture(this.mWayImg2);
    gEngine.Textures.unloadTexture(this.mWayImg3);
    gEngine.Textures.unloadTexture(this.mWayImg4);
    
    this.mScore =null;
    
    var nextScene = new GameOverScene();
    gEngine.Core.startScene(nextScene);
};

RunningScene.prototype.initialize = function(){
    MyScene.prototype.initialize.call(this);
    
    /*
     * 
     * 加载UI
     */
    var sceneLoader = new SceneDataLoader(this.kSceneDataFile);
    gManager.UIManager.initManager(sceneLoader);
    var ui = gManager.UIManager.getElementbyNum(0);
    ui.setState(true);
    if(gManager.DefaultOptions.getIsFirst()){
        ui = gManager.UIManager.getElementbyNum(1);
        ui.setState(true);
    }
    
    
    /*
     * 
     * 加载场景，前景后景
     */
    var controller = new BGController(sceneLoader);
    gManager.ObjectPool.addObject(controller,1);
    controller = new FGController(sceneLoader);
    gManager.ObjectPool.addObject(controller,8);
    
    
    /*
     * 加载英雄
     */
    this.mHero = new Hero(new SpriteAnimateRenderable(this.kHero));
    gManager.ObjectPool.addObject(this.mHero,2);
    
    
    
    /*
     * 这个landController随便加哪个层都行
     */
    var light = new MyLight(this.mHero);
    var landController = new LandController(light);
    gManager.ObjectPool.addObject(landController,1);
    gManager.ObjectPool.addObject(light,7);
    
//    this.mBlock = new BlockA(this.kBlock);
//    for(var i = 0 ;i< this.mBlock.length ; i++){
//        gManager.ObjectPool.addObject(this.mBlock[i],4);
//    }
//    
//    this.mDanger = new DangerA(this.kSock);
//    for(var i = 0 ;i< this.mDanger.length ; i++){
//         gManager.ObjectPool.addObject(this.mDanger[i],5);
//    }
//    

    this.block = new Block(this.kTarget);
    gManager.ObjectPool.addObject(this.block,4);
    
    
    gManager.InputManager.initManager();
    
    gManager.InputManager.bindCommand("click",gEngine.Input.keys.Space, new JumpCommand(this.mHero));
    gManager.InputManager.bindCommand("click",gEngine.Input.keys.Up, new AntiCommand(this.mHero));    //反重力
    gManager.InputManager.bindCommand("click",gEngine.Input.keys.H,new ShowControlCommand());
    
    gManager.CameraManager.registerCamera(sceneLoader.LoadCamera("Camera_Main"),1);
};

RunningScene.prototype.draw = function(){
    MyScene.prototype.draw.call(this);
};

RunningScene.prototype.update = function(){
    
     // 分数显示
     gManager.DefaultOptions.score += 1;
     if(gManager.DefaultOptions.score > gManager.DefaultOptions.maxScore){
         gManager.DefaultOptions.maxScore = gManager.DefaultOptions.score;
     }
     if( gManager.DefaultOptions.score % 2000 < 1){
          gManager.DefaultOptions.mLevel +=1;
     }
     
     
   // physics simulation
    this._physicsSimulation();
    
//    console.log(this.block);
//    if(gManager.DefaultOptions.score %20 <1){
//       this.block.update();
//    }

    MyScene.prototype.update.call(this);
    
};

RunningScene.prototype._initText = function (font, posX, posY, color, textH) {
    font.setColor(color);
    font.getXform().setPosition(posX, posY);
    font.setTextHeight(textH);
};
