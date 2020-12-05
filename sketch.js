var dog, sadDog, happyDog, database;
var foodS, foodStock;
var fedTime, lastFed;
var feed, addFood;
var foodObj, milk;
var readState, gameState, changeGState, state;
var currentTime, garden, washroom, bedroom;
function preload() {
  sadDog = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
  milk = loadImage("Milk.png");
  washroom = loadImage("washroom.png");
  garden = loadImage("garden.png");
  bedroom = loadImage("bedroom.png");
}

function setup() {
  database = firebase.database();
  createCanvas(800, 600);

  foodObj = new Food();

  foodStock = database.ref("Food");
  foodStock.on("value", readStock);

  dog = createSprite(600, 200, 150, 150);
  dog.scale = 0.15;

  input = createInput();
  input.position(350, 45);

  button = createButton("submit");
  button.position(500, 45, 65);
  button.mousePressed(greet);

  greeting = createElement("h3", " ");
  greeting.position(410, 180);

  feed = createButton("Feed the dog");
  feed.position(600, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(700, 95);
  addFood.mousePressed(addFoods);
}

function draw() {
  background("green");
  console.log("ds");

  fedTime = database.ref("FeedTime");
  fedTime.on("value", function (data) {
    lastFed = data.val();
  });

  readState = database.ref("gameState");
  readState.on("value", function (data) {
    gameState = data.val();
  });

  fill("blue");
  textSize(15);

  text("Your Dog's Name!! ", 350, 40);
  if (lastFed >= 12) {
    text("Last Feed At : " + (lastFed % 12) + " PM", 160, 60);
  } else if (lastFed == 0) {
    text("Last Fed At : 12 AM", 160, 60);
  } else {
    text("Last Fed At : " + lastFed + " AM", 160, 60);
  }

  // currentTime = hour();
  // if (currentTime === lastFed + 1) {
  //   update("Playing");
  //   foodObj.garden();
  // } else if (currentTime === lastFed + 2) {
  //   update("Sleeping");
  //   foodObj.bedroom();
  // } else if (currentTime > lastFed + 2 && currentTime <= lastFed + 4) {
  //   update("Bathing");
  //   foodObj.washroom();
  // } else {
  //   update("Hungry");
  //   foodObj.display();
  // }

  currentTime = hour();
  if (currentTime == lastFed + 1) {
    update("Playing");
    foodObj.garden();
  } else if (currentTime == lastFed + 2) {
    update("Sleeping");
    foodObj.bedroom();
  } else if (currentTime > lastFed + 2 && currentTime <= lastFed + 4) {
    update("Bathing");
    foodObj.washroom();
  } else {
    update("Hungry");
    foodObj.display();
  }

  if (gameState != "Hungry") {
    feed.hide();
    addFood.hide();
    button.hide();
    input.hide();
    greeting.hide();
    dog.remove();
  } else {
    feed.show();
    button.show();
    greeting.show();
    input.show();
    addFood.show();
    dog.addImage(sadDog);
  }

  drawSprites();
}

//function to read food Stock
function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

//function to update food stock and last fed time
function feedDog() {
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
  database.ref("/").update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour(),
  });
}

//function to add food in stock
function addFoods() {
  if (foodObj.foodStock < 20 || foodObj.foodStock > 0) {
    foodS++;
    database.ref("/").update({
      Food: foodS,
    });
  }
}

function update(state) {
  database.ref("/").update({
    gameState: state,
  });
}

function greet() {
  const name = input.value();
  greeting.html(" It's " + name + " ! ");
  input.value("");

  for (let i = 0; i < 200; i++) {
    push();
    fill("red");
    translate(random(width), random(height));
    rotate(random(2 * PI));
    text(name, 0, 0);
    pop();
  }
}

function update(state) {
  database.ref("/").update({
    gameState: state,
  });
}
