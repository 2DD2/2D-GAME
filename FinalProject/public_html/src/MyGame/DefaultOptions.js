/* 
 * Created by 周玮皓 on 2016/8/1.
 * DefaultOptions用来保存全局参数
 */

function DefaultOptions() {
    //BackGround
    this.kBgSprite = "";            //背景图地址
    this.mSpeed = 0.0;              //背景移动速度
    this.mBgColor = [1, 1, 1, 0.0]; //背景渲染颜色
    
    //Hero
    this.mGravity = 9.8;            //重力
    this.mJumpHeight = 5;           //跳跃高度
    
    //Obstacle
    this.mFrequency = 1.0;          //障碍物刷新频率，1s 刷新 1个
}