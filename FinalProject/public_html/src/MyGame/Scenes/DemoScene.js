///* 
// * To change this license header, choose License Headers in Project Properties.
// * To change this template file, choose Tools | Templates
// * and open the template in the editor.
// */
//
///* global gEngine, MyScene, gManager, vec2 */
//
//function DemoScene(){
//    this.kBgPath = "assets/BG_1.jpg";
//    this.kFgPath = "assets/FG_1.png";
//    this.kSceneDataFile = "assets/SceneData/Test_Scene.xml";
//    
//    this.kUIBanner_Path = "assets/UIBanner.png";
//    this.kHero = "assets/hero.png";
//    this.kObj = "assets/logo.jpg";
//}
//
//gEngine.Core.inheritPrototype(DemoScene,MyScene);
//
//DemoScene.prototype.loadScene = function(){
//    gEngine.Textures.loadTexture(this.kBgPath);
//    gEngine.Textures.loadTexture(this.kFgPath);
//    gEngine.Textures.loadTexture(this.kUIBanner_Path);
//    gEngine.TextFileLoader.loadTextFile(this.kSceneDataFile,gEngine.TextFileLoader.eTextFileType.eXMLFile);
//    
//    gEngine.Textures.loadTexture(this.kHero);
//    gEngine.Textures.loadTexture(this.kObj);
//};
//
//DemoScene.prototype.unloadScene = function(){
//    gEngine.Textures.unloadTexture(this.kBgPath);
//    gEngine.Textures.unloadTexture(this.kFgPath);
//    gEngine.TextFileLoader.unloadTextFile(this.kSceneDataFile);
//    
//    gEngine.Textures.unloadTexture(this.kHero);
//    gEngine.Textures.unloadTexture(this.kObj);
//};
//
//DemoScene.prototype.initialize = function(){
//    MyScene.prototype.initialize.call(this);
//    
//    var sceneLoader = new SceneDataLoader(this.kSceneDataFile);
//    
//    gManager.UIManager.initManager(sceneLoader);
//    
//    var controller = new BGController(sceneLoader);
//    gManager.ObjectPool.addObject(controller,0);
//    
//    gManager.CameraManager.registerCamera(sceneLoader.LoadCamera("Camera_Main"),1);
//
//
//    this.mHero = new Hero(new SpriteAnimateRenderable(this.kHero));
//    gManager.ObjectPool.addObject(this.mHero,0);
//
////    this.mObjs = new Obstacle(this.kObj);
////    gManager.ObjectPool.addObject(this.mObjs,0);
//    
//    this.mOb1 = new Obstacle(this.kObj);
//    gManager.ObjectPool.addObject(this.mOb1,3);
//  
//    gManager.InputManager.initManager();
//   
//    gManager.InputManager.bindCommand("press",gEngine.Input.keys.Space, new JumpPressCom(this.mHero));
//    gManager.InputManager.bindCommand("click",gEngine.Input.keys.Space, new JumpCommand(this.mHero));
//    
//    gManager.InputManager.bindCommand("click",gEngine.Input.keys.Up, new AntiCommand(this.mHero));
//
//    gManager.CameraManager.registerCamera(sceneLoader.LoadCamera("Camera_Main"),1);
//};
//
//DemoScene.prototype.draw = function(){
//    MyScene.prototype.draw.call(this);
//    
//};
//
//DemoScene.prototype.update = function(){
//    
//    var hBbox = this.mHero.getBBox();
//    var check = gManager.ObjectPool.getObjectsByLayer(3).mSet;
//    for(var i =0 ;i < check.length; i++){
//         if(hBbox.intersectsBound(check[i].getBBox())){
//            console.log(hBbox.boundCollideStatus(check[i].getBBox()));
//             this.mHero.getXform().setXPos(check[i].getXform().getXPos()- check[i].getXform().getWidth());
//         }
//     }
//
//    MyScene.prototype.update.call(this);
//};


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global gEngine, MyScene, gManager, vec2 */

function DemoScene(){
    this.kBgPath = "assets/BG_1.jpg";
    this.kFgPath = "assets/FG_1.png";
    this.kSceneDataFile = "assets/SceneData/Test_Scene.xml";
    this.kParticleTexture = "assets/FGP_1.png";
    this.kUIBanner_Path = "assets/UIBanner.png";
    
       
    this.kUIBanner_Path = "assets/UIBanner.png";
    this.kHero = "assets/hero.png";
    this.kObj = "assets/logo.jpg";
}

gEngine.Core.inheritPrototype(DemoScene,MyScene);

DemoScene.prototype.loadScene = function(){
    gEngine.Textures.loadTexture(this.kBgPath);
    gEngine.Textures.loadTexture(this.kFgPath);
    gEngine.Textures.loadTexture(this.kUIBanner_Path);
    gEngine.Textures.loadTexture(this.kParticleTexture);
    gEngine.TextFileLoader.loadTextFile(this.kSceneDataFile,gEngine.TextFileLoader.eTextFileType.eXMLFile);
    
    gEngine.Textures.loadTexture(this.kHero);
    gEngine.Textures.loadTexture(this.kObj);
};

DemoScene.prototype.unloadScene = function(){
    gEngine.Textures.unloadTexture(this.kBgPath);
    gEngine.Textures.unloadTexture(this.kFgPath);
    gEngine.TextFileLoader.unloadTextFile(this.kSceneDataFile);
    gEngine.Textures.unloadTexture(this.kParticleTexture);
    
    gEngine.Textures.unloadTexture(this.kHero);
    gEngine.Textures.unloadTexture(this.kObj);
    
};

DemoScene.prototype.initialize = function(){
    MyScene.prototype.initialize.call(this);
    
    var sceneLoader = new SceneDataLoader(this.kSceneDataFile);
    
    //gManager.UIManager.initManager(sceneLoader);
    
    var controller = new BGController(sceneLoader);
    gManager.ObjectPool.addObject(controller,1);
    controller = new FGController(sceneLoader);
    gManager.ObjectPool.addObject(controller,8);
    
    
    this.mHero = new Hero(new SpriteAnimateRenderable(this.kHero));
    gManager.ObjectPool.addObject(this.mHero,0);

    // 加载场景
    var lander = new BGController(sceneLoader);
    gManager.ObjectPool.addObject(lander,0);

    this.mHero = new Hero(new SpriteAnimateRenderable(this.kHero));
    gManager.ObjectPool.addObject(this.mHero,0);

    this.mObjs = new Obstacle(this.kObj);
    gManager.ObjectPool.addObject(this.mObjs,0);
    
    this.mOb1 = new Obstacle(this.kObj);
    gManager.ObjectPool.addObject(this.mOb1,3);
  
    gManager.InputManager.initManager();
   
    gManager.InputManager.bindCommand("press",gEngine.Input.keys.Space, new JumpPressCom(this.mHero));
    gManager.InputManager.bindCommand("click",gEngine.Input.keys.Space, new JumpCommand(this.mHero));
    
    gManager.InputManager.bindCommand("click",gEngine.Input.keys.Up, new AntiCommand(this.mHero));
    
    
    gManager.CameraManager.registerCamera(sceneLoader.LoadCamera("Camera_Main"),1);
};

DemoScene.prototype.draw = function(){
    MyScene.prototype.draw.call(this);
};

DemoScene.prototype.update = function(){

     var hBbox = this.mHero.getBBox();
    var check = gManager.ObjectPool.getObjectsByLayer(3).mSet;
    for(var i =0 ;i < check.length; i++){
         if(hBbox.intersectsBound(check[i].getBBox())){
            console.log(hBbox.boundCollideStatus(check[i].getBBox()));
             this.mHero.getXform().setXPos(check[i].getXform().getXPos()- check[i].getXform().getWidth());
         }
     }

    MyScene.prototype.update.call(this);
};



