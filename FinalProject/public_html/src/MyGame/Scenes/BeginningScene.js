/* 
 * Created by 周玮皓 on 2016/8/1.
 * BeginningScene是开始场景
 */

/* global gEngine, Scene, MyScene, vec2, gManager */

function BeginningScene(){
    
    this.kSceneFile_Path = "assets/SceneData/Start_Scene.xml";
    
    this.kUIRes_1 = "assets/aboutusbtn.png";
    this.kUIRes_2 = "assets/startbtn.png";
    this.kUIRes_3 = "assets/startscene.png";

}

gEngine.Core.inheritPrototype(BeginningScene, MyScene);

BeginningScene.prototype.initialize = function(){
    MyScene.prototype.initialize.call(this);

    var sceneLoader = new SceneDataLoader(this.kSceneFile_Path);
    
    
    
    gManager.UIManager.initManager(sceneLoader);
    gManager.CameraManager.registerCamera(sceneLoader.LoadCamera("Camera_Main"));
        
//=======
//    this.mTitleSprite = new GameObject(new SpriteRenderable(this.kTitleSprite));
//    this.mTitleSprite.getXform().setPosition(0, 200);
//    this.mTitleSprite.getXform().setSize(400, 200);
//    gManager.ObjectPool.addObject(this.mTitleSprite,1);
//    
//    this.mStartSprite = new UIButton(new SpriteRenderable(this.kStartSprite), this.kFont, 0, 0, 200, 100);
//    gManager.ObjectPool.addObject(this.mStartSprite,1);
//    this.mTextSysFont = new FontRenderable("Start");
//    this.mTextSysFont.setColor([0, 0, 0, 1.0]);
//    this.mTextSysFont.getXform().setPosition(-60, 10);
//    this.mTextSysFont.setTextHeight(50);
//    gManager.ObjectPool.addObject(new GameObject(this.mTextSysFont), 1);
//    this.mTextSysFont = new FontRenderable("Press \"Space\" to start");
//    this.mTextSysFont.setColor([0, 0, 0, 1.0]);
//    this.mTextSysFont.getXform().setPosition(-120, -30);
//    this.mTextSysFont.setTextHeight(20);
//    gManager.ObjectPool.addObject(new GameObject(this.mTextSysFont), 1);
//    
//    this.mAboutUsSprite = new UIButton(new SpriteRenderable(this.kAboutUsSprite), this.kFont, 0, -200, 200, 100);
//    gManager.ObjectPool.addObject(this.mAboutUsSprite,1);
//    this.mTextSysFont = new FontRenderable("Credits");
//    this.mTextSysFont.setColor([0, 0, 0, 1.0]);
//    this.mTextSysFont.getXform().setPosition(-90, -190);
//    this.mTextSysFont.setTextHeight(50);
//    gManager.ObjectPool.addObject(new GameObject(this.mTextSysFont), 1);
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
//>>>>>>> Stashed changes
};

BeginningScene.prototype.loadScene = function () {
    // 加载场景

    gEngine.TextFileLoader.loadTextFile(this.kSceneFile_Path,gEngine.TextFileLoader.eTextFileType.eXMLFile);
    gEngine.Textures.loadTexture(this.kUIRes_1);
    gEngine.Textures.loadTexture(this.kUIRes_2);
    gEngine.Textures.loadTexture(this.kUIRes_3);

//=======
//    gEngine.Textures.loadTexture(this.kTitleSprite);
//    gEngine.Textures.loadTexture(this.kStartSprite);
//    gEngine.Textures.loadTexture(this.kAboutUsSprite);
//    
//    gEngine.Fonts.loadFont(this.kFont);
//>>>>>>> Stashed changes
};

BeginningScene.prototype.unloadScene = function () {
    // 卸载场景
    gEngine.TextFileLoader.unloadTextFile(this.kSceneFile_Path);
    gEngine.Textures.unloadTexture(this.kUIRes_1);
    gEngine.Textures.unloadTexture(this.kUIRes_2);
    gEngine.Textures.unloadTexture(this.kUIRes_3);
    
    gEngine.Core.startScene(new RunningScene());
//=======
//    gEngine.Fonts.unloadFont(this.kFont);
//    
//    var nextScene = new RunningScene();
//    gEngine.Core.startScene(nextScene);
//>>>>>>> Stashed changes
};

BeginningScene.prototype.update = function(){
    MyScene.prototype.update.call(this);


//=======
//    //按 空格 键切换到RunningScene
//    if (gEngine.Input.isKeyReleased(gEngine.Input.keys.Space)) {
//        gEngine.GameLoop.stop();
//    }
//>>>>>>> Stashed changes
};

BeginningScene.prototype.draw = function(){
    MyScene.prototype.draw.call(this);
};


