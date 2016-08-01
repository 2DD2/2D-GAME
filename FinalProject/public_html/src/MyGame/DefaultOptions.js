/* 
 * Created by 周玮皓 on 2016/8/1.
 * DefaultOptions用来保存全局参数
 */
var gManager = gManager || {};

gManager.DefaultOptions = (function(){
    var mPublic = {
        //BackGround
        mSpeed:0.1,
        mBgColor:[1, 1, 1, 0.0],
        
        //Hero
        mGravity:9.8,
        mJumpHeight:5,
        
        //Obstacle
        mFrequency:1.0
    };
    return mPublic;
}());
