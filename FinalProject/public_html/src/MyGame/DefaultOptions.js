/* 
 * Created by 周玮皓 on 2016/8/1.
 * DefaultOptions用来保存全局参数
 */
var gManager = gManager || {};

gManager.DefaultOptions = (function(){
    //BackGround
    var mSpeed = 0.1;              //背景移动速度
    var mBgColor = [1, 1, 1, 0.0]; //背景渲染颜色
    
    //Hero
    var mGravity = 9.8;            //重力
    var mJumpHeight = 5;           //跳跃高度
    
    //Obstacle
    var mFrequency = 1.0;          //障碍物刷新频率，1s 刷新 1个
}());