class PixeneUtils {
    static pix2grid(x, y, adj) {
        let px = floor(x / (pWidth + adj));
        let py = floor(y / (pHeight + adj));
        return [px, py];
    }
    static grid2pix(x, y, adj) {
        let px = x * (pWidth + adj);
        let py = y * (pHeight + adj);
        return [px, py];
    }
}