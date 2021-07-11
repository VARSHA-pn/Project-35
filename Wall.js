class Wall {
    constructor(posX) {
     
      this.rx = posX; 
      this.ry = height - random([400, 600]);   
      this.rw = random(80, 250);
      this.rh = random([120,190,250]);
      this.spt=createSprite(this.rx, this.ry,this.rw,this.rh); 
      this.spt.shapeColor="green";
      this.spt.addAnimation("wall",wallAnimation);
      this.spt.scale=0.10;
    
    }
  
  
}
  


