
function JumpCommand(hero) {
    this.mHero = hero;
}

gEngine.Core.inheritPrototype(Jump, Command);

Jump.prototype.excute = function(){
    console.log("hero is Jump");
    this.mHero.jump();
}