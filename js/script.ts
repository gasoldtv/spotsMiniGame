class spotField {

    constructor(public cellNumXY: number, public arr: number[][] = [[],[]]) {
        let templArr: number[] = [],
        rndNum: number

        for (let i = 0; i < this.cellNumXY * this.cellNumXY; i++) {
            templArr.push(i)
        }

        for (let j = 0; j < this.cellNumXY; j++) {
            this.arr[j] = []
            for (let k = 0; k < this.cellNumXY; k++) {
                rndNum = Math.floor(Math.random() * (Math.floor(templArr.length - 1) - Math.ceil(0) + 1)) + Math.ceil(0)
                this.arr[j][k] = templArr[rndNum]
                templArr.splice(rndNum, 1)
            }
        }
    }

    public refreshField(xVal: number, yVal: number) {
        console.log({x: xVal, y: yVal})
        
        let findedX = null, findedY = null
        if (this.arr[yVal].indexOf(0) !== -1) {
            findedX = this.arr[yVal].indexOf(0) 
            if (xVal < findedX) {
                for (let l = findedX; l > xVal ; l--) {
                    this.arr[yVal][l] = this.arr[yVal][l - 1]
                }
                this.arr[yVal][xVal] = 0
            }else{
                if (xVal > findedX) {
                    for (let l = findedX; l < xVal ; l++) {
                        this.arr[yVal][l] = this.arr[yVal][l + 1]
                    }
                    this.arr[yVal][xVal] = 0
                }
            }
        }
        
        for (let l = 0; l < this.cellNumXY; l++) {
            if (this.arr[l][xVal] === 0) {
                findedY = l
            }
        }
        if (findedY !== null) {
            if (yVal < findedY) {
                for (let l = findedY; l > yVal ; l--) {
                    this.arr[l][xVal] = this.arr[l - 1][xVal]
                }
                this.arr[yVal][xVal] = 0
            }else{
                if (yVal > findedY) {
                    for (let l = findedY; l < yVal ; l++) {
                        this.arr[l][xVal] = this.arr[l + 1][xVal]
                    }
                    this.arr[yVal][xVal] = 0
                }
            }
        }

        console.log(this.arr)
        console.log(`Finded: x: ${findedX}, y: ${findedY}`)
    }
}

const spotMatrix = new spotField(4);

const destructField = () => {
    if (document.querySelector('#field')) {
        var fieldDOM = document.querySelector('#field')
        fieldDOM.innerHTML = '';
    } 
}

const initGameField = () => {
    if (document.querySelector('#field')) {
        var fieldDOM = document.querySelector('#field')
    }

    spotMatrix.arr.forEach((row, y) => {
        let rowDOM = fieldDOM.appendChild(document.createElement('div'))
        rowDOM.classList.add('s-row')
        row.forEach((item, x) => {
            if (rowDOM !== undefined) {
                rowDOM.innerHTML += `<div class="s-cell" data-x="${x}" data-y="${y}">${item === 0 ? '' : item}</div>`
            }
        })
    })

    document.querySelectorAll('.s-cell').forEach((el) => {
        el.addEventListener('click', () => {
            spotMatrix.refreshField(Number(el.getAttribute('data-x')), Number(el.getAttribute('data-y')))
            destructField()
            initGameField()
        })
    })
}

initGameField()

console.log(spotMatrix.arr)