


function Move(){
    
}

gEngine.Core.inheritPrototype(Move,Command);

//Move.prototype.moveTo = function(x,y){
//
//};
//
//Move.prototype.moveBy = function(x,y){
//
//};

Move.prototype.excute = function(){
    console.log("this is move excute");
}