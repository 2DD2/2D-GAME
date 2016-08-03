/* 
 * Created by 周玮皓 on 2016/8/1.
 * WelcomeScene用来加载开场动画
 */

/* global gEngine, Scene, MyScene, vec2, gManager */

function WelcomeScene(){
    

    this.kLogo = "assets/logo.png";
    this.kSceneFile_Path = "assets/SceneData/Welcome_Scene.xml";
    this.kAudio_Path = "assets/Sounds/Intro.mp3";
    
    this.mColor = null;
    this.mEmitter = null;
    
    
    this.mTimeNow = 0;
    this.mTimeShow = 250;
    this.mTimeOff = 400;
    this.mTimeTurn = 450;


    this.mWelSprite = null;
    
    this.myTimer = 1800;


}

gEngine.Core.inheritPrototype(WelcomeScene, MyScene);

WelcomeScene.prototype.initialize = function(){
    MyScene.prototype.initialize.call(this);
    

    var sceneLoader = new SceneDataLoader(this.kSceneFile_Path);
    
    gManager.UIManager.initManager(sceneLoader);
    
    gManager.CameraManager.registerCamera(sceneLoader.LoadCamera("Camera_Main"),1);
    
    this.mEmitter = new SimpleEmitter([-5,0]);
    gManager.ObjectPool.addObject(this.mEmitter,2);
    
    this.mColor = gManager.UIManager.getElementbyNum(0).getRenderable().getColor();
    this.mColor[3] = 1;
    
    gEngine.AudioClips.playBackgroundAudio(this.kAudio_Path);
//=======
//    this.mWelSprite = new GameObject(new SpriteRenderable(this.kWelScene));
//    this.mWelSprite.getXform().setPosition(0, 0);
//    this.mWelSprite.getXform().setSize(512, 256);
//    gManager.ObjectPool.addObject(this.mWelSprite,1);
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
//    
//    this.mColor = this.mWelSprite.getRenderable().getColor();
//>>>>>>> Stashed changes
};

WelcomeScene.prototype.loadScene = function () {
    // 加载场景
    gEngine.Textures.loadTexture(this.kLogo);
    gEngine.TextFileLoader.loadTextFile(this.kSceneFile_Path,gEngine.TextFileLoader.eTextFileType.eXMLFile);
    /*
    加载背景音乐
     */
    gEngine.AudioClips.loadAudio(this.kAudio_Path);
};

WelcomeScene.prototype.unloadScene = function () {
    // 卸载场景

    gEngine.Textures.unloadTexture(this.kLogo);
    gEngine.TextFileLoader.unloadTextFile(this.kSceneFile_Path,gEngine.TextFileLoader.eTextFileType.eXMLFile);
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.unloadAudio(this.kAudio_Path);
    
    gEngine.Core.startScene(new BeginningScene());
//=======
//    gEngine.Textures.unloadTexture(this.kWelScene);
//    
//    var nextScene = new BeginningScene();
//    gEngine.Core.startScene(nextScene);
//>>>>>>> Stashed changes
};

WelcomeScene.prototype.update = function(){
    
    this.mTimeNow++;
    if(this.mTimeShow > this.mTimeNow){
        this.mColor[3] = 1 - (this.mTimeNow / this.mTimeShow);
        this.mEmitter.setAlpha(this.mTimeNow / this.mTimeShow);
    }else if(this.mTimeOff > this.mTimeNow){
        this.mColor[3] = (this.mTimeNow - this.mTimeShow) / (this.mTimeOff - this.mTimeShow);
        this.mEmitter.setAlpha(1 - (this.mTimeNow - this.mTimeShow) / (this.mTimeOff - this.mTimeShow));
    }else if(this.mTimeTurn < this.mTimeNow){
        gEngine.GameLoop.stop();
    }
    
    MyScene.prototype.update.call(this);
    this.myTimer -= 10;
    if(this.myTimer > 0 || this.myTimer <1800){
        if(this.mColor[3]>=0 && this.mColor[3]<=255){
            this.mColor[3] += 1;
        }
    }
};

WelcomeScene.prototype.draw = function(){
    MyScene.prototype.draw.call(this);
};
