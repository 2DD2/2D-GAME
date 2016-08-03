/* 
 * Created by 周玮皓 on 2016/8/1.
 * DefaultOptions用来保存全局参数
 */
var gManager = gManager || {};


gManager.DefaultOptions = (function(){
    var up =2.5;
    var down = -2.5;
    var eObjectType = {
        Hero : "Hero",
        BG : "BG",
        Obstacle : "Obstacle",
        Land : "Land"
    };
    function setUp(x){
        up = x;
    }
    function setDown(y){
        down= y;
    }
    var mPublic = {
        //BackGround
        mSpeed:0.3,
        mBgColor:[1, 1, 1, 0.0],
        
        //Hero
        mGravity:9.8,
        mJumpHeight:5,
        
        //Obstacle
        mFrequency:1.0,
        SCREEN_WIDTH:1200,
        SCREEN_HEIGHT:600,
        FULL_SCREEN_WCWIDTH:40,
        
        eObjectType : eObjectType,
        
        //LAND
        up:up,
        down:down,
        setUp:setUp,
        setDown:setDown,
        
        //Score
        score:0
    };
    return mPublic;
}());

