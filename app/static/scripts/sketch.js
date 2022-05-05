var x;

function preload() {
    for (obj in objects){
        if(objects[obj].type == 'image') {
            objects[obj].img = loadImage(objects[obj].file);
        }
        if(DEBUG == true) {
            if(objects[obj].description != null) {
                console.log("Loaded " + objects[obj].description);
            }
        }
    }
}
function setup() {
    config = objects["config"];
    if(DEBUG == true) {
        createCanvas(config.general.debugWindow.width, config.general.debugWindow.height);
        config.general.renderWindow.renderScaleX = 1;
        config.general.renderWindow.renderScaleY = 1;
    } else {
        createCanvas(windowWidth, windowHeight);
        // We use the same height ratio so we don't get weird horizontal scaling.
        config.general.renderWindow.renderScaleX = windowHeight / config.general.debugWindow.height;
        config.general.renderWindow.renderScaleY = windowHeight / config.general.debugWindow.height;
    }
    stroke(255);
    frameRate(30);
    x = width;
    if(DEBUG == true) {
        genConfig = createDiv();
        for (object in config.general) {
            obj = config.general[object];
            if(obj.type == 'slider') {
                sliderParent = createDiv();
                sliderParent.parent(genConfig);
                sliderParent.class("config");
                sliderParent.style("background-color", "grey");
                sliderParent.style("display", "inline-block");
                sliderParent.style("border", "1px solid black");
                sliderParent.style("padding", "5px");
                sliderParent.style("margin", "5px");
                sliderDescription = createP(obj.description);
                sliderDescription.parent(sliderParent);
                sliderValue = createP(obj.value);
                sliderValue.id(object + "_value");
                sliderValue.parent(sliderParent);
                if(obj.mutable == true) {
                    slider = createSlider(obj.min, obj.max, obj.value, obj.step);
                    slider.id(object);
                    slider.parent(sliderParent);
                    let thisSlider = document.getElementById(object);
                    thisSlider.oninput = function() {
                        let obj = config.general[this.id];
                        let sliderValue = document.getElementById(this.id + "_value");
                        let slider = document.getElementById(this.id);
                        obj.value = slider.value;
                        sliderValue.innerHTML = obj.value;
                    }
                }
            }
        }
        objConfig = createDiv();
        for (object in objects) {
            obj = objects[object];
            if(obj.type != "config") {
                objectParent = createDiv();
                objectParent.parent(objConfig);
                objectParent.class("objectConfig");
                objectParent.style("background-color", "grey");
                objectParent.style("display", "inline-block");
                objectParent.style("border", "1px solid black");
                objectParent.style("padding", "5px");
                objectParent.style("margin", "5px");
                objectDescription = createP(obj.description);
                objectDescription.parent(objectParent);
                for(property in config.object_properties) {
                    prop = config.object_properties[property];
                    if(prop.type == 'slider') {
                        sliderParent = createDiv();
                        sliderParent.parent(objectParent);
                        sliderParent.class("config");
                        sliderParent.style("background-color", "grey");
                        sliderParent.style("display", "inline-block");
                        sliderParent.style("margin", "5px");
                        sliderParent.style("vertical-align", "top");
                        sliderDescription = createP(prop.description);
                        sliderDescription.parent(sliderParent);
                        sliderValue = createP(obj[property]);
                        sliderValue.id(object + "_" + property + "_value");
                        sliderValue.parent(sliderParent);
                        if(prop.mutable == true) {
                            slider = createSlider(prop.min, prop.max, obj[property], prop.step);
                            slider.id(object + "_" + property);
                            slider.parent(sliderParent);
                            let thisSlider = document.getElementById(object + "_" + property);
                            thisSlider.oninput = function() {
                                let obj = objects[this.id.split("_")[0]];
                                let sliderValue = document.getElementById(this.id + "_value");
                                obj[this.id.split("_")[1]] = this.value;
                                sliderValue.innerHTML = this.value;
                            }
                        }
                    } else if (prop.type == "detail") {
                        detailParent = createDiv();
                        detailParent.parent(objectParent);
                        detailParent.class("config");
                        detailParent.style("background-color", "grey");
                        detailParent.style("display", "inline-block");
                        detailParent.style("margin", "5px");
                        detailParent.style("vertical-align", "top");
                        detailDescription = createP(prop.description);
                        detailDescription.parent(detailParent);
                        detailValue = createP(prop.value);
                        detailValue.id(object + "_" + property + "_value");
                        detailValue.parent(detailParent);
                    } else if (prop.type == "toggleVal") {
                        toggleParent = createDiv();
                        toggleParent.parent(objectParent);
                        toggleParent.class("config");
                        toggleParent.style("background-color", "grey");
                        toggleParent.style("display", "inline-block");
                        toggleParent.style("margin", "5px");
                        toggleDescription = createP(prop.description);
                        toggleDescription.parent(toggleParent);
                        toggleValue = createP( (obj[property] == 1) ? "Right" : "Left");
                        toggleValue.id(object + "_" + property + "_value");
                        toggleValue.parent(toggleParent);
                        if(prop.mutable == true) {
                            toggle = createCheckbox("", (obj[property] == 1) ? true : false);
                            toggle.id(object + "_" + property);
                            toggle.parent(toggleParent);
                            let thisToggle = document.getElementById(object + "_" + property);
                            thisToggle.oninput = function() {
                                let newVal = document.getElementById(this.id).firstChild.firstChild.checked;
                                let obj = objects[this.id.split("_")[0]];
                                let prop = this.id.split("_")[1];
                                let toggleValue = document.getElementById(this.id + "_value");
                                obj[prop] = (newVal == true) ? 1 : -1;
                                toggleValue.innerHTML = (obj[prop] == 1) ? "Right" : "Left";
                            }
                        }
                    } else if (prop.type == "toggleBool") {
                        toggleParent = createDiv();
                        toggleParent.parent(objectParent);
                        toggleParent.class("config");
                        toggleParent.style("background-color", "grey");
                        toggleParent.style("display", "inline-block");
                        toggleParent.style("margin", "5px");
                        toggleDescription = createP(prop.description);
                        toggleDescription.parent(toggleParent);
                        toggleValue = createP( (obj[property] == true) ? "True" : "False");
                        toggleValue.id(object + "_" + property + "_value");
                        toggleValue.parent(toggleParent);
                        if(prop.mutable == true) {
                            toggle = createCheckbox("", obj[property]);
                            toggle.id(object + "_" + property);
                            toggle.parent(toggleParent);
                            let thisToggle = document.getElementById(object + "_" + property);
                            thisToggle.oninput = function() {
                                let newVal = document.getElementById(this.id).firstChild.firstChild.checked;
                                let obj = objects[this.id.split("_")[0]];
                                let prop = this.id.split("_")[1];
                                let toggleValue = document.getElementById(this.id + "_value");
                                obj[prop] = newVal;
                                toggleValue.innerHTML = (obj[prop] == true) ? "True" : "False";
                            }
                        }
                    }
                }
            }
        }
    }
}

function draw() {
    background(255);
    for (obj in objects){
        if(objects[obj].type == 'gradient') {
            createGradient(objects[obj].x, objects[obj].y, objects[obj].scale_width * width, objects[obj].scale_height * height, color(objects[obj].color1), color(objects[obj].color2), objects[obj].axis);
        }
        if(objects[obj].type == 'image' && objects[obj].display == true) {

            image(objects[obj].img, objects[obj].x, objects[obj].y);

            if(objects[obj].scale_width == null) {
                objects[obj].init_width = objects[obj].img.width;
                objects[obj].init_height = objects[obj].img.height;
                objects[obj].scale_width = objects[obj].img.width * objects[obj].scale * config.general.renderWindow.renderScaleX;
                objects[obj].scale_height = objects[obj].img.height * objects[obj].scale * config.general.renderWindow.renderScaleY;
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
                image(objects[obj].img, objects[obj].x - objects[obj].scale_width , objects[obj].y);
                if(objects[obj].reflection) {
                    push();
                    translate(objects[obj].x - width, objects[obj].y+objects[obj].img.height);
                    scale(1, -1);
                    let c = get(objects[obj].x - width, objects[obj].y+objects[obj].img.height);
                    tint(255, 127);
                    image(objects[obj].img, 0, -objects[obj].img.height);
                    pop();
                }
            } else if(objects[obj].direction == -1) {
                image(objects[obj].img, objects[obj].x + objects[obj].scale_width , objects[obj].y);
                if(objects[obj].reflection) {
                    push();
                    translate(objects[obj].x + width, objects[obj].y+objects[obj].img.height);
                    scale(1, -1);
                    let c = get(objects[obj].x + width, objects[obj].y+objects[obj].img.height);
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
        if(objects[obj].type != 'config') {
            objects[obj].x += objects[obj].direction*objects[obj].speed*config.general.speed_factor.value;
            if(objects[obj].direction == 1) {
                if (objects[obj].x > width) {
                    objects[obj].x = -objects[obj].scale_width + width;
                }
            } else {
                if (objects[obj].x+objects[obj].scale_width <= 0) {
                    objects[obj].x = 0;
                }
            }
            if(DEBUG == true) {
                elementX = document.getElementById(obj + "_x_value");
                elementX.innerHTML = int(objects[obj].x);
                elementY = document.getElementById(obj + "_y_value");
                elementY.innerHTML = int(objects[obj].y);
            }
        }
    }
}