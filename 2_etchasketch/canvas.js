const DEFAULT_SIZE=16

function createDiv(size){
    sizePerc=(100/size);
    item = document.createElement("div");
    item.className="item";
    item.style.flex="0 0 "+sizePerc+"%";
    item.style.height=sizePerc+"%";
    item.style.boxSizing = "border-box";
    item.style.border = "1px dotted lightgrey";
    item.style.display = "flex";
    item.style.alignItems = "center";
    item.style.justifyContent = "center";
    item.style.fontSize = "20px";
    return item;
}

function drawGrid(drawArea, size){
    //clean drawArea if not empty
    while (drawArea.firstChild) {
        drawArea.removeChild(drawArea.firstChild);
    }
    //create grid and append items
    grid = document.createElement("div");
    grid.style.display="flex";
    grid.style.flexWrap="wrap"
    grid.style.width="800px";
    grid.style.height="600px";
    grid.style.margin="0 auto"
    grid.style.border="1px solid black"
    for (let i=0; i<size;i++){
        for (let j=0; j<size;j++){
            grid.appendChild(createDiv(size));
        }
    }
    drawArea.appendChild(grid);

    addActionToItems();
}

function validateSize(value){
    let number = parseInt(value);
    if (number<1) number=1;
    if (number>100) number=100;
    return number;
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function addActionToItems(random=false){
    document.querySelectorAll(".item").forEach(item => {
        item.addEventListener("mouseover", () => {
            if (random){
                item.style.backgroundColor=getRandomColor();
            }else{
                item.style.backgroundColor="black"
            }
        });
    });
}

const drawArea = document.querySelector("#canvas")

drawGrid(drawArea, DEFAULT_SIZE);

document.querySelector("#reset").addEventListener("click", () => {
    document.querySelectorAll(".item").forEach(item => {
        item.style.backgroundColor = "white";
    });
});

document.querySelector("#sizechange").addEventListener("click", () => {
    let newSize = validateSize(prompt("Choose grid size [1-100]"));
    drawGrid(canvas, newSize);
})


document.querySelector("#randomize").addEventListener("click", () => {
    addActionToItems(true);
})