// Pixel Class
class Pixel {
    constructor(x, y, w, h, color, content) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        this.content = content;
    }

    draw() {
        if(this.color !== null) {
            stroke(this.color);
            fill(this.color);
            let [px, py] = PixeneUtils.grid2pix(this.x, this.y, 1);
            rect(px+1, py+1, this.w-1, this.h-1);
        }
    }

    setColor(color) {
        this.color = color;
        if(this.color != null) {
            this.draw();
        }
    }
}

class Grid {
    constructor(sizeX, sizeY, pWidth, pHeight) {
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.pWidth = pWidth;
        this.pHeight = pHeight;
        this.pixels = [...Array(sizeX)].map(() => Array(sizeY));
    }

    initialize(mode="") {
        for(let i = 0; i < this.sizeX; i++) {
            for(let j = 0; j < this.sizeY; j++) {
                if(mode == 'random') {
                    const c = color(random(0, 255), random(0, 255), random(0, 255));
                    this.pixels[i][j] = new Pixel(i, j, this.pWidth, this.pHeight, c, "");
                } else {
                    this.pixels[i][j] = new Pixel(i, j, this.pWidth, this.pHeight, null, "");
                }
            }
        }
        this.redraw();
    }

    setSize() {
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        // increase array size
    }

    clear() {
        clear();
        for(let i = 0; i < this.sizeX; i++) {
            for(let j = 0; j < this.sizeY; j++) {
                this.pixels[i][j].setColor(null);
            }
        }
        this.drawGrid();
    }

    redraw() {
        clear();
        for(let i = 0; i < this.sizeX; i++) {
            for(let j = 0; j < this.sizeY; j++) {
                this.pixels[i][j].draw();
            }
        }
        this.drawGrid();
    }

    drawGrid() {
        for(let i = 0; i <= this.sizeX; i++) {
            for(let j = 0; j <= this.sizeY; j++) {
                let x = i * this.pWidth + i;
                let y = j * this.pHeight + j;
                stroke(0);
                line(x, y, x + this.pWidth, y);
                line(x, y, x, y + this.pHeight);
            }
        }
    }

    saveImage() {
        const pg = createGraphics(this.sizeX * this.pWidth, this.sizeY * this.pHeight);
        //console.log(this.sizeX, this.pWidth, this.sizeY, this.pHeight);
        //pg.background('hsla(0, 0%, 0%, 0)');
        for(let i = 0; i < this.sizeX; i++) {
            for(let j = 0; j < this.sizeY; j++) {
                const p = this.pixels[i][j];
                let [px, py] = PixeneUtils.grid2pix(p.x, p.y, 0);
                if(p.color != null) {
                    pg.stroke(p.color);
                    pg.fill(p.color);
                    pg.rect(px, py, p.w, p.h);
                }
            }
        }
        saveCanvas(pg, 'image', 'png');
    }
}