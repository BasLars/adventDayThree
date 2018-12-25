const getData = require("./get-data");

getData(3).then(run);

// #1401 @ 432,243: 19x17

function run(data) {
  let fabric = new Fabric(1000);
  const dataArray = data.split(/\n/);
  dataArray.forEach(line => {
    let claim = new Claim(line);
    fabric.claimFabricArea(claim);
  });
  console.log(fabric.countOverlappingArea());
}

class Claim {
  constructor(line) {
    let lineArray = line.split(/\s+/);
    let coordinateArray = lineArray[2].split(",");
    let sizeArray = lineArray[3].split("x");

    this.x = +coordinateArray[0];
    this.y = +coordinateArray[1].slice(0, -1);
    this.sizeX = +sizeArray[0];
    this.sizeY = +sizeArray[1];
  }

  toString() {
    console.log(`${this.x} ${this.y} ${this.sizeX} ${this.sizeY}`);
  }
}

class Fabric {
  constructor(fabricSize) {
    this.matrix = [];
    this.fabricSize = fabricSize;

    for (let i = 0; i < fabricSize; i++) {
      let rarrrght = [];
      for (let j = 0; j < fabricSize; j++) {
        rarrrght.push(0);
      }
      this.matrix.push(rarrrght);
    }
  }

  claimFabricArea(claim) {
    //console.log(claim.toString());

    for (let i = claim.x; i < claim.x + claim.sizeX; i++) {
      for (let j = claim.y; j < claim.y + claim.sizeY; j++) {
        this.matrix[i][j]++;
      }
    }
  }

  countOverlappingArea() {
    let counter = 0;
    for (let i = 0; i < this.fabricSize; i++) {
      for (let j = 0; j < this.fabricSize; j++) {
        if (this.matrix[i][j] > 1) {
          counter++;
        }
      }
    }
    return counter;
  }
}
