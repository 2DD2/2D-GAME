/* 
 * Created by 周玮皓 on 2016/8/1.
 * GameOverScene是游戏结束场景
 */

/* global gEngine, Scene, MyScene, gManager, vec2 */

function GameOverScene(){
    this.kRank = "assets/logo.png";            //排行榜图片
    this.kMenu = "assets/logo.png";            //主菜单图片
    this.kRestart = "assets/logo.png";         //重新开始图片
    //字体
    this.kFont = "assets/fonts/system-default-font";
    this.mRankSprite = null;
    this.mRestartSprite = null;
    this.mMenuSprite = null;
}

gEngine.Core.inheritPrototype(GameOverScene, MyScene);

GameOverScene.prototype.initialize = function(){
    MyScene.prototype.initialize.call(this);
    
    this.mRankSprite = new GameObject(new SpriteRenderable(this.kRank));
    this.mRankSprite.getXform().setPosition(0, 10);
    this.mRankSprite.getXform().setSize(800, 800);
    gManager.ObjectPool.addObject(this.mRankSprite,1);
    this.mTextSysFont = new FontRenderable("Rank");
    this.mTextSysFont.setColor([1, 1, 1, 1.0]);
    this.mTextSysFont.getXform().setPosition(0, 240);
    this.mTextSysFont.setTextHeight(50);
    gManager.ObjectPool.addObject(new GameObject(this.mTextSysFont), 1);
    
    this.mMenuSprite = new UIButton(new SpriteRenderable(this.kMenu), this.kFont, -400, -200, 200, 100);
    gManager.ObjectPool.addObject(this.mMenuSprite,1);
    this.mTextSysFont = new FontRenderable("MainMenu");
    this.mTextSysFont.setColor([1, 1, 1, 1.0]);
    this.mTextSysFont.getXform().setPosition(-400, -200);
    this.mTextSysFont.setTextHeight(50);
    gManager.ObjectPool.addObject(new GameObject(this.mTextSysFont), 1);
    
    this.mRestartSprite = new UIButton(new SpriteRenderable(this.kMenu), this.kFont, 300, -200, 200, 100);
    gManager.ObjectPool.addObject(this.mRestartSprite,1);
    this.mTextSysFont = new FontRenderable("Restart");
    this.mTextSysFont.setColor([1, 1, 1, 1.0]);
    this.mTextSysFont.getXform().setPosition(300, -200);
    this.mTextSysFont.setTextHeight(50);
    gManager.ObjectPool.addObject(new GameObject(this.mTextSysFont), 1);
    
    var camera = new Camera(vec2.fromValues(0,0),
                             1200,
                             [0,0,1200,600]);
    camera.setBackgroundColor([0.1, 0.1, 0.1, 1.0]);
    gManager.CameraManager.registerCamera(camera,0);
    
    var UICamera = new Camera(vec2.fromValues(0,0),
                                40,
                                [20,20,400,400]);
    gManager.UIManager.setRenderringCamera(UICamera);
};

GameOverScene.prototype.loadScene = function () {
    // 加载场景
    gEngine.Textures.loadTexture(this.kRank);
    gEngine.Textures.loadTexture(this.kMenu);
    gEngine.Textures.loadTexture(this.kRestart);
    
    gEngine.Fonts.loadFont(this.kFont);
};

GameOverScene.prototype.unloadScene = function () {
    // 卸载场景
    gEngine.Textures.unloadTexture(this.kRank);
    gEngine.Textures.unloadTexture(this.kMenu);
    gEngine.Textures.unloadTexture(this.kRestart);
    
    gEngine.Fonts.unloadFont(this.kFont);
    
    //gManager.ObjectPool.initPool();
    
    var nextScene = new RunningScene();
    gEngine.Core.startScene(nextScene);
};

GameOverScene.prototype.update = function(){
    MyScene.prototype.update.call(this);
    //按 空格 键切换到RunningScene
    if (gEngine.Input.isKeyReleased(gEngine.Input.keys.Space)) {
        gEngine.GameLoop.stop();
    }
};

GameOverScene.prototype.draw = function(){
    MyScene.prototype.draw.call(this);
};
