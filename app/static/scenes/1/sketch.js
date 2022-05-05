let x;

function preload() {
    for (obj in objects){
        if(objects[obj].type == 'image') {
            objects[obj].img = loadImage(objects[obj].file);
        }
        if(objects[obj].description != null) {
            console.log("Loaded " + objects[obj].description);
        }
    }
}
function setup() {
    createCanvas(960, 540);
    stroke(255);
    frameRate(30);
    x = width;
}

function draw() {
    for (obj in objects){
        if(objects[obj].type == 'gradient') {
            createGradient(objects[obj].x, objects[obj].y, objects[obj].scale_width * width, objects[obj].scale_height * height, color(objects[obj].color1), color(objects[obj].color2), objects[obj].axis);
        }
        if(objects[obj].type == 'image') {

            image(objects[obj].img, objects[obj].x, objects[obj].y);

            if(objects[obj].scale_width == null) {
                objects[obj].scale_width = objects[obj].img.width * objects[obj].scale;
                objects[obj].scale_height = objects[obj].img.height * objects[obj].scale;
                objects[obj].img.resize(objects[obj].scale_width, objects[obj].scale_height);
            }

            // vertical reflection
            if(objects[obj].reflection) {
                push();
                translate(objects[obj].x, objects[obj].y+objects[obj].img.height);
                scale(1, -1);
                let c = get(objects[obj].x, objects[obj].y+objects[obj].img.height);
                tint(255, 127);
                image(objects[obj].img, 0, -objects[obj].img.height);
                pop();
            }
            // Draw copy one width apart
            if(objects[obj].direction == 1) {
                image(objects[obj].img, objects[obj].x - width , objects[obj].y);
                if(objects[obj].reflection) {
                    push();
                    translate(objects[obj].x - width, objects[obj].y+objects[obj].img.height);
                    scale(1, -1);
                    let c = get(objects[obj].x - width, objects[obj].y+objects[obj].img.height);
                    tint(255, 127);
                    image(objects[obj].img, 0, -objects[obj].img.height);
                    pop();
                }
            }
        }
    }

    progressScenes();
}

function createGradient(x, y, w, h, c1, c2, axis) {
    noFill();
    if(axis == 'y') {
        for(let i = y; i <= y + h; i++) {
            let inter = map(i, y, y + h, 0, 1);
            let c = lerpColor(c1, c2, inter);
            stroke(c);
            line(x, i, x + w, i);
        }
    } else if(axis == 'x') {
        for(let i = x; i <= x + w; i++) {
            let inter = map(i, x, x + w, 0, 1);
            let c = lerpColor(c1, c2, inter);
            stroke(c);
            line(i, y, i, y + h);
        }
    }
}

function progressScenes() {
    for (obj in objects) {
        objects[obj].x += objects[obj].direction*objects[obj].speed;
        if(objects[obj].direction == 1) {
            if (objects[obj].x > width) {
                objects[obj].x = 0;
            }
        } else {
            if (objects[obj].x < 0) {
                objects[obj].x = width+objects[obj].img.width;
            }
        }
    }
}