const fs = require("fs")

const data = fs.readFileSync("./input2.txt", "utf-8")

const rows = data.split("\n")

const xMax = 30
const yMax = rows.length - 1
console.log(rows[0].charAt(30))
console.log(`This should be a hash: ${rows[1].charAt(2)} of type ${typeof rows[1].charAt(2)}.`);


console.log(`X:${rows[0].length}`)
console.log(`Y: ${rows.length}`)

let Xco = 0
let Yco = 0

const readCell = (X, Y) =>{
    return rows[Y].charAt(X)
}
console.log(`readCell function: ${readCell(2,1)}`)
const moveOne = () =>{
    Xco = Xco + 3
    if (Xco > xMax){
        Xco = Xco - xMax
    }
    Yco = Yco + 1
}

let hashCount = 0
while (Yco < yMax){
    moveOne()
    let currentValue = readCell(Xco,Yco)
    if (currentValue == "#"){
        hashCount = hashCount + 1
    }
}
console.log(`The number of trees is ${hashCount}`)