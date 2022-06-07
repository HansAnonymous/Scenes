// Editable Pixel Canvas
// Language: javascript
// Path: script.js

const numPixelsWidth = parseInt($('#gridSizeX').val());
const numPixelsHeight = parseInt($('#gridSizeY').val());
const pWidth = parseInt($('#pixelSizeX').val());
const pHeight = parseInt($('#pixelSizeY').val());
const cWidth = pWidth * numPixelsWidth + numPixelsWidth;
const cHeight = pHeight * numPixelsHeight + numPixelsHeight;
const grid = new Grid(numPixelsWidth, numPixelsHeight, pWidth, pHeight);
let colorPicker;

function setup() {
    const main = document.getElementById('main');
    // Create Canvas
    const cnv = createCanvas(cWidth, cHeight);
    cnv.parent(main);
    background(255);
    
    // Create Pixels
    grid.initialize(mode="");
    
    const toolbar = document.getElementById('toolbar');
    
    // Create Color Picker
    colorPicker = createColorPicker('#000000')
    colorPicker.parent(toolbar);

    // Create save button withohut gridlines and background
    const saveButton = createButton('Save');
    saveButton.mousePressed(() => grid.saveImage());
    saveButton.parent(toolbar);

    // Create clear button
    const clearButton = createButton('Clear');
    clearButton.mousePressed(() => grid.clear());
    clearButton.parent(toolbar);
}

function draw() {
    if (mouseIsPressed) {
        const x = mouseX;
        const y = mouseY;
        if(x > 0 && x < cWidth && y > 0 && y < cHeight) {
            let [px, py] = PixeneUtils.pix2grid(mouseX, mouseY, 1);
            grid.pixels[px][py].setColor(colorPicker.color());
        }
    }
}