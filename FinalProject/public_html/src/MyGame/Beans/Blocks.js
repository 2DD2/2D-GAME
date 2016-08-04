/* File: Blocks.js 
 * Created by Camixxx
 * Obstacle是障碍物对象
 */

/* global GameObject, gEngine, gManager */

function Block(spriteTexture,name) {
    this.mRender = new SpriteRenderable(spriteTexture);
    this.mName = name;
    this.mRotate = 2;
   
    GameObject.call(this,this.mRender);
 
    this.getXform().setPosition(19,0);
    this.getXform().setSize(3,3);
    
    var r = new RigidRectangle(this.mRender.getXform(), 3,3);
    r.setMass(30);  // less dense than Minions
    r.setRestitution(20);
    r.setVelocity([-20,-10]);
    r.setAcceleration([-10,-10]);
    this.setPhysicsComponent(r);
    
}

gEngine.Core.inheritPrototype(Block, GameObject);

Block.prototype.update = function () {
    GameObject.prototype.update.call(this);
    if(this.getXform().getXPos()<-20 || this.getXform().getXPos()>19) {
        if(gManager.DefaultOptions.mLevel% 2 === 0){
            this.getXform().setPosition(18,0);
            this.getPhysicsComponent().setVelocity([-20,-10]);
        }
    }
    this.getXform().incRotationByRad(this.mRotate);
};
Block.prototype.draw = function(camera){
    GameObject.prototype.draw.call(this,camera);
};


function BlockController(blockTexture){
    current = 1;
    var Block1 = new Block(blockTexture);
    var Block2 = new Block(blockTexture);
    var Block3 = new Block(blockTexture);
    
    var mSet = [];
    mSet.push(Block1);
    mSet.push(Block2);
    mSet.push(Block3);
    
    gManager.ObjectPool.addObject(Block1,4);
     
    
    var update = function(){   
         console.log(current,gManager.DefaultOptions.mLevel);
        if(Math.abs(gManager.DefaultOptions.score - 4) < 0.01){
            addNew();
            console.log(current,gManager.DefaultOptions.mLevel);
        }
        if(Math.abs(gManager.DefaultOptions.score - 10) < 0.01){
            addNew();
            console.log(current,gManager.DefaultOptions.mLevel);
        }
    };
    var draw = function(cam){
        
    };
    var addNew = function (){
         if(current < 3){
              gManager.ObjectPool.addObject(mSet[current],4);
              current ++;
         }
        
    };
    var clear = function(){
        mSet = [];
    };
    var mPublic = {
        mSet:mSet,
        update:update,
        draw: draw,
        addNew:addNew,
        clear:clear
    };
    
    
    return mPublic;
}

