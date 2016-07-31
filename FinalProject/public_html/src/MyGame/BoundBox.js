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
    this.x=0;
    this.y=0;
    this.mWidth = 8;
    this.mHeight = 7;
    this.mImgPath = imgPath;
    // The outside boarder
    this.mBoarder = new GameObject(new SpriteRenderable(this.mImgPath));
    this.mBoarder.getXform().setPosition(this.x,this.y);
    this.mBoarder.getXform().setSize(this.mWidth,this.mHeight);
    this.mBoundBox.addToSet(this.mBoarder);
   
   // the square1
    this.mSquare = new Renderable(gEngine.DefaultResources.getConstColorShader());
    this.mSquare.setColor([0.8, 0.2, 0.2, 1]);
    this.mSquare.getXform().setPosition(this.x-this.mWidth/2, this.y+this.mHeight/2);
    this.mSquare.getXform().setSize(1, 1);
  // the square2
    this.mSquare1 = new Renderable(gEngine.DefaultResources.getConstColorShader());
    this.mSquare1.setColor([0.8, 0.2, 0.2, 1]);
    this.mSquare1.getXform().setPosition(this.x+this.mWidth/2, this.y+this.mHeight/2);
    this.mSquare1.getXform().setSize(1, 1);
  // the square3  
    this.mSquare2 = new Renderable(gEngine.DefaultResources.getConstColorShader());
    this.mSquare2.setColor([0.8, 0.2, 0.2, 1]);
    this.mSquare2.getXform().setPosition(this.x-this.mWidth/2, this.y-this.mHeight/2);
    this.mSquare2.getXform().setSize(1, 1);
  // the square4  
    this.mSquare3 = new Renderable(gEngine.DefaultResources.getConstColorShader());
    this.mSquare3.setColor([0.8, 0.2, 0.2, 1]);
    this.mSquare3.getXform().setPosition(this.x+this.mWidth/2, this.y-this.mHeight/2);
    this.mSquare3.getXform().setSize(1, 1);
 
    this.mBoundBox.addToSet(this.mSquare);
    this.mBoundBox.addToSet(this.mSquare1);
    this.mBoundBox.addToSet(this.mSquare2);
    this.mBoundBox.addToSet(this.mSquare3);    
    
    this.changeSquare = function(){
      this.mSquare.getXform().setPosition(this.x-this.mWidth/2, this.y+this.mHeight/2);
      this.mSquare1.getXform().setPosition(this.x+this.mWidth/2, this.y+this.mHeight/2);
      this.mSquare2.getXform().setPosition(this.x-this.mWidth/2, this.y-this.mHeight/2);
      this.mSquare3.getXform().setPosition(this.x+this.mWidth/2, this.y-this.mHeight/2);
      this.mBoarder.getXform().setPosition(this.x, this.y);
  };
  
}

 
  BoundBox.prototype.getWidth= function(){
     return this.mWidth ;
 };
 
 BoundBox.prototype.getHeight= function(){
     return this.mHeight ;
 };
 
 // return the array[x,y] and it is the center position
  BoundBox.prototype.getPos = function(){
      var res=[this.x,this.y];
      return res;
  };
  
  BoundBox.prototype.getXPos = function(){
     return this.x;
  };
  
  BoundBox.prototype.getYPos = function(){
      return this.y;
  };
  
  
 //the change of x pos (The delta)
  BoundBox.prototype.moveX = function(dX){
      var pX=0; 
      this.x = this.x + dX;
      for(var i ;i<this.mBoundBox.size;i++){
          pX = this.mBoundBox.getObjectAt(i).getXform().getXPos();
          this.mBoundBox.getObjectAt(i).getXform().setXPos( pX + dX );
      }
      this.changeSquare();
  };
  
 //the change of y pos
 BoundBox.prototype.moveY = function(dY){
      var pY=0;
      this.y = this.y + dY;
      for(var i =0; i<this.mBoundBox.size;i++){
           pY = this.getObjectAt(i).getXform().getYPos();
           this.getObjectAt(i).getXform().setYPos( dY + pY );
      }
      this.changeSquare();
  };
  
BoundBox.prototype.setPos= function(X,Y){
      if(X){
          this.x=X;
          this.mBoarder.getXform().setXPos(this.x);
      }
      if(Y){
          this.y=Y;
          this.mBoarder.getXform().setYPos(this.x,this.y);
      }
      this.changeSquare();
 };
  
 BoundBox.prototype.setWidth= function(w){
     this.mWidth = w;
     this.mBoarder.getXform().setWidth(w);
     this.changeSquare();
 };
 
  BoundBox.prototype.setHeight= function(h){
     this.mWidth = h;
     this.mBoarder.getXform().setHeight(h);
     this.changeSquare();
 };
  

  
 
