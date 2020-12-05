class Food {
  constructor() {
    this.foodStock = 20;
    this.lastFed;
    this.image = loadImage("Milk.png");
  }

  updateFoodStock(foodStock) {
    this.foodStock = foodStock;
  }

  getFedTime(lastFed) {
    this.lastFed = lastFed;
  }

  update(state) {
    database.ref("/").update({
      gameState: state,
    });
  }

  // deductFood() {
  //   if (this.foodStock > 0) {
  //     this.foodStock = this.foodStock - 1;
  //   }
  // }

  getFoodStock() {
    return this.foodStock;
  }

  bedroom() {
    background(bedroom, 800, 600);
  }

  garden() {
    background(garden, 800, 600);
  }

  washroom() {
    background(washroom, 800, 600);
  }

  display() {
    var x = 80,
      y = 100;

    imageMode(CENTER);
    //   image(this.image, 720, 220, 70, 70);

    if (this.foodStock != 0) {
      for (var i = 0; i < this.foodStock; i++) {
        if (i % 10 == 0) {
          x = 80;
          y = y + 50;
        }
        image(this.image, x, y, 50, 50);
        x = x + 30;
      }
    }
  }
}