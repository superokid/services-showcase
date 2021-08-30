const { createCanvas, Image } = require('canvas');

const constants = {
  canvasWidth: 300,
  canvasHeight: 300,
  background: {
    width: 150,
    height: 150,
    col: 4,
    offsetWall: 3,
    offsetFloor: 10,
  },
  chair: {
    width: 40,
    height: 60,
    sourceX: 2,
    sourceY: 18,
    croppedWidth: 36,
    croppedHeight: 39,
  },
};
const { background, chair } = constants;
const tileHalfWidth = (background.width - background.offsetWall * 2) / background.col / 2; // 18
const tileHalfHeight = 9;

module.exports = {
  async get(req, res) {
    try {
      const field = () => {
        const canvas = createCanvas(background.width, background.height);
        const ctx = canvas.getContext('2d');

        return {
          twoDToIso(pt) {
            const tempPt = { x: 0, y: 0 };
            tempPt.x = pt.x - pt.y;
            tempPt.y = (pt.x + pt.y) / 2;
            return tempPt;
          },
          placeObj(baseImg, obj, screenX, screenY) {
            ctx.drawImage(
              baseImg,
              obj.sourceX,
              obj.sourceY,
              obj.croppedWidth,
              obj.croppedHeight,
              screenX,
              screenY,
              obj.croppedWidth,
              obj.croppedHeight
            );
          },
          renderLayer() {
            const baseYChair =
              background.height -
              (tileHalfHeight * 2 * (background.col - 1) +
                background.offsetFloor +
                chair.croppedHeight); // 47

            for (let y = 0; y < background.col; y++) {
              for (let x = 0; x < background.col; x++) {
                const screenX = (x - y) * tileHalfWidth + tileHalfWidth * 3 + background.offsetWall;
                const screenY = ((x + y) * tileHalfHeight * 2) / 2 + baseYChair;
                this.placeObj(this.images.chair, chair, screenX, screenY);
              }
            }
          },
          renderBg() {
            ctx.drawImage(this.images.base, 0, 0, background.width, background.height);
          },
          loadImages(allrendered) {
            this.images = {};
            const imagesSrc = {
              base: 'img/room1_base.png',
              chair: 'img/royalchair_SE.png',
            };
            let loadCount = 0;
            const loadtotal = Object.values(imagesSrc).length;
            for (let [key, val] of Object.entries(imagesSrc)) {
              let image = new Image();
              this.images[key] = image;
              image.onload = () => {
                loadCount++;
                if (loadCount === loadtotal) {
                  allrendered();
                }
              };
              image.src = val;
            }
          },
          renderFrame() {
            const primaryCanvas = createCanvas(constants.canvasWidth, constants.canvasHeight);
            const primaryCtx = primaryCanvas.getContext('2d');

            primaryCtx.imageSmoothingEnabled = false;
            primaryCtx.drawImage(canvas, 0, 0, constants.canvasWidth, constants.canvasHeight);
            const buffer = primaryCanvas.toBuffer('image/png');
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.end(buffer, 'binary');
          },
          init() {
            this.loadImages(() => {
              this.renderBg();
              this.renderLayer();
              this.renderFrame();
            });
          },
        };
      };
      field().init();
    } catch (err) {
      res.status(500).json({ message: typeof err === 'string' ? err : err.message });
    }
  },
};
