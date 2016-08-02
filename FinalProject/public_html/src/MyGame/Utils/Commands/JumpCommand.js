
function JumpCommand(hero) {
    this.mHero = hero;
}

gEngine.Core.inheritPrototype(JumpCommand, Command);

JumpCommand.prototype.excute = function(){
    console.log("hero is Jump");
    this.mHero.Jump();
}