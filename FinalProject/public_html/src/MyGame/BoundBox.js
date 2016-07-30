/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global gEngine, GameObjectSet */

// A square
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function BoundBox(imgPath) {
    
    this.mBoundBox= new GameObjectSet();
    this.mWidth = 10;
    this.mHeight = 10;
    this.mImgPath = imgPath;
    
    // The outside boarder
    this.mBoarder = new GameObject(new TextureRenderable(this.mImgPath));
    this.mBoarder.getXform().setPosition(0,0);
    this.mBoarder.getXform().setSize(this.mWidth,this.mHeight);
    this.mBoundBox.addToSet(this.mBoarder);
   
   // the square1
    this.mSquare = new Renderable(gEngine.DefaultResources.getConstColorShader());
    this.mSquare.setColor([0.8, 0.2, 0.2, 1]);
    this.mSquare.getXform().setPosition(-5, 5);
    this.mSquare.getXform().setSize(1.5, 1.5);
  // the square2
    this.mSquare1 = new Renderable(gEngine.DefaultResources.getConstColorShader());
    this.mSquare1.setColor([0.8, 0.2, 0.2, 1]);
    this.mSquare1.getXform().setPosition(5, 5);
    this.mSquare1.getXform().setSize(1.5, 1.5);
  // the square3  
    this.mSquare2 = new Renderable(gEngine.DefaultResources.getConstColorShader());
    this.mSquare2.setColor([0.8, 0.2, 0.2, 1]);
    this.mSquare2.getXform().setPosition(-5, -5);
    this.mSquare2.getXform().setSize(1.5, 1.5);
  // the square4  
    this.mSquare3 = new Renderable(gEngine.DefaultResources.getConstColorShader());
    this.mSquare3.setColor([0.8, 0.2, 0.2, 1]);
    this.mSquare3.getXform().setPosition(5, -5);
    this.mSquare3.getXform().setSize(1.5, 1.5);
 
    this.mBoundBox.addToSet(this.mSquare);
    this.mBoundBox.addToSet(this.mSquare1);
    this.mBoundBox.addToSet(this.mSquare2);
    this.mBoundBox.addToSet(this.mSquare3);    

    
    return this.mBoundBox;
}

//GameObjectSet.prototype.getXform = function(){
//       if(this.size > -1){
//            var ob = this.getObjectAt[0];
//            
//            ob = ob.mSet[0];
//            console.log(ob);
//            return ob.getXform();
//        }else{
//            console.log("There is nothing in the objectSet");
//            return null
//        }
//            
//};
