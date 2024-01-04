/*
https://stackoverflow.com/questions/2106995/how-can-i-perform-flood-fill-with-html-canvas
캔버스 페인트버킷 툴 알고리즘
https://jsgist.org/?src=19f1eb28be5057add25d5fece134d580
ColorString to HexString via 1x1 canvas
https://stackoverflow.com/questions/3099322/how-to-add-undo-functionality-to-html5-canvas
Canvas undo/redo
*/
interface PixelData {
    width: number; height: number; data: Uint32Array;
}
interface Span {
    left: number; right: number; y: number; direction: number;
}

function floodFill(ctx: CanvasRenderingContext2D, x: number, y: number, fillColor: number) {
    function getPixel(pixelData: PixelData, x: number, y: number) {
        if (x < 0 || y < 0 || x >= pixelData.width || y >= pixelData.height) {
            return -1;  // impossible color
        } else {
            return pixelData.data[y * pixelData.width + x];
        }

    }
    // read the pixels in the canvas
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

    // make a Uint32Array view on the pixels so we can manipulate pixels
    // one 32bit value at a time instead of as 4 bytes per pixel
    const pixelData = {
        width: imageData.width,
        height: imageData.height,
        data: new Uint32Array(imageData.data.buffer),
    };

    // get the color we're filling
    const targetColor = getPixel(pixelData, x, y);

    // console.log(targetColor.toString(16), fillColor.toString(16));

    // check we are actually filling a different color
    if (targetColor !== fillColor) {
        const spansToCheck: Span[] = [];

        const addSpan = (left: number, right: number, y: number, direction: number) => {
            spansToCheck.push({ left, right, y, direction });
        }

        const checkSpan = (left: number, right: number, y: number, direction: number) => {
            let inSpan = false;
            let start: number = 0;
            let x;
            for (x = left; x < right; ++x) {
                const color = getPixel(pixelData, x, y);
                if (color === targetColor) {
                    if (!inSpan) {
                        inSpan = true;
                        start = x;
                    }
                } else {
                    if (inSpan) {
                        inSpan = false;
                        addSpan(start, x - 1, y, direction);
                    }
                }
            }
            if (inSpan) {
                inSpan = false;
                addSpan(start, x - 1, y, direction);
            }
        }

        addSpan(x, x, y, 0);

        while (spansToCheck.length > 0) {
            const { left, right, y, direction } = spansToCheck.pop()!;

            // do left until we hit something, while we do this check above and below and add
            let l = left;
            for (; ;) {
                --l;
                const color = getPixel(pixelData, l, y);
                if (color !== targetColor) {
                    break;
                }
            }
            ++l

            let r = right;
            for (; ;) {
                ++r;
                const color = getPixel(pixelData, r, y);
                if (color !== targetColor) {
                    break;
                }
            }

            const lineOffset = y * pixelData.width;
            pixelData.data.fill(fillColor, lineOffset + l, lineOffset + r);

            if (direction <= 0) {
                checkSpan(l, r, y - 1, -1);
            } else {
                checkSpan(l, left, y - 1, -1);
                checkSpan(right, r, y - 1, -1);
            }

            if (direction >= 0) {
                checkSpan(l, r, y + 1, +1);
            } else {
                checkSpan(l, left, y + 1, +1);
                checkSpan(right, r, y + 1, +1);
            }
        }
        // put the data back
        ctx.putImageData(imageData, 0, 0);
    }
}

const c2h = (color: string) => {
    const ctx = document.createElement('canvas').getContext('2d')!;
    ctx.canvas.width = 1;
    ctx.canvas.height = 1;
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    const imgData = ctx.getImageData(0, 0, 1, 1);
    return new Uint32Array(imgData.data.buffer)[0];
}

class CanvasLogs {
    private index = 0;
    private logs: string[] = [];
    private cv: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    constructor(cv: HTMLCanvasElement) {
        this.cv = cv;
        this.ctx = cv.getContext('2d')!;
    }

    private sliceAndPush(img: string) {
        if (this.index === this.logs.length - 1)
            this.logs.push(img);
        else
            this.logs = [...this.logs.slice(0, this.index + 1), img];
        this.index++;
    }

    logDrawing() {
        this.sliceAndPush(this.cv.toDataURL());
    }

    async undo() {
        if (this.index > 0) {
            if (this.index === this.logs.length) --this.index;
            let tmp = this.ctx.globalCompositeOperation;
            this.ctx.globalCompositeOperation = 'source-over';
            await this.showLogAtIndex(--this.index);
            this.ctx.globalCompositeOperation = tmp;
            return true;
        } else {
            this.ctx.clearRect(0, 0, this.cv.width, this.cv.height);
            this.index = -1;
            return false;
        }
    }

    async redo() {
        if (this.index < this.logs.length - 1) {
            let tmp = this.ctx.globalCompositeOperation;
            this.ctx.globalCompositeOperation = 'source-over';
            await this.showLogAtIndex(++this.index);
            this.ctx.globalCompositeOperation = tmp;
            return true;
        } else {
            return false;
        }
    }

    private showLogAtIndex(index: number): Promise<void> {
        return new Promise(r => {
            let img = new Image();
            img.src = this.logs[index];
            img.onload = () => {
                this.ctx.clearRect(0, 0, this.cv.width, this.cv.height);
                this.ctx.drawImage(img, 0, 0);
                r();
            }
        });
    }

    clearLogs() {
        this.index = 0;
        this.logs = [];
    }
}




export { floodFill, c2h, CanvasLogs };

