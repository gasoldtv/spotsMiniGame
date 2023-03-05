var spotField = /** @class */ (function () {
    function spotField(cellNumXY, arr) {
        if (arr === void 0) { arr = [[], []]; }
        this.cellNumXY = cellNumXY;
        this.arr = arr;
        var templArr = [], rndNum;
        for (var i = 0; i < this.cellNumXY * this.cellNumXY; i++) {
            templArr.push(i);
        }
        for (var j = 0; j < this.cellNumXY; j++) {
            this.arr[j] = [];
            for (var k = 0; k < this.cellNumXY; k++) {
                rndNum = Math.floor(Math.random() * (Math.floor(templArr.length - 1) - Math.ceil(0) + 1)) + Math.ceil(0);
                this.arr[j][k] = templArr[rndNum];
                templArr.splice(rndNum, 1);
            }
        }
    }
    spotField.prototype.refreshField = function (xVal, yVal) {
        console.log({ x: xVal, y: yVal });
        var findedX = null, findedY = null;
        if (this.arr[yVal].indexOf(0) !== -1) {
            findedX = this.arr[yVal].indexOf(0);
            if (xVal < findedX) {
                for (var l = findedX; l > xVal; l--) {
                    this.arr[yVal][l] = this.arr[yVal][l - 1];
                }
                this.arr[yVal][xVal] = 0;
            }
            else {
                if (xVal > findedX) {
                    for (var l = findedX; l < xVal; l++) {
                        this.arr[yVal][l] = this.arr[yVal][l + 1];
                    }
                    this.arr[yVal][xVal] = 0;
                }
            }
        }
        for (var l = 0; l < this.cellNumXY; l++) {
            if (this.arr[l][xVal] === 0) {
                findedY = l;
            }
        }
        if (findedY !== null) {
            if (yVal < findedY) {
                for (var l = findedY; l > yVal; l--) {
                    this.arr[l][xVal] = this.arr[l - 1][xVal];
                }
                this.arr[yVal][xVal] = 0;
            }
            else {
                if (yVal > findedY) {
                    for (var l = findedY; l < yVal; l++) {
                        this.arr[l][xVal] = this.arr[l + 1][xVal];
                    }
                    this.arr[yVal][xVal] = 0;
                }
            }
        }
        console.log(this.arr);
        console.log("Finded: x: ".concat(findedX, ", y: ").concat(findedY));
    };
    return spotField;
}());
var spotMatrix = new spotField(4);
var destructField = function () {
    if (document.querySelector('#field')) {
        var fieldDOM = document.querySelector('#field');
        fieldDOM.innerHTML = '';
    }
};
var initGameField = function () {
    if (document.querySelector('#field')) {
        var fieldDOM = document.querySelector('#field');
    }
    spotMatrix.arr.forEach(function (row, y) {
        var rowDOM = fieldDOM.appendChild(document.createElement('div'));
        rowDOM.classList.add('s-row');
        row.forEach(function (item, x) {
            if (rowDOM !== undefined) {
                rowDOM.innerHTML += "<div class=\"s-cell\" data-x=\"".concat(x, "\" data-y=\"").concat(y, "\">").concat(item === 0 ? '' : item, "</div>");
            }
        });
    });
    document.querySelectorAll('.s-cell').forEach(function (el) {
        el.addEventListener('click', function () {
            spotMatrix.refreshField(Number(el.getAttribute('data-x')), Number(el.getAttribute('data-y')));
            destructField();
            initGameField();
        });
    });
};
initGameField();
console.log(spotMatrix.arr);
