const fs = require("fs")

const data = fs.readFileSync("./input1.txt", "utf-8")


const passwords = data.split("\n")


const correctPassword = "1-3 a: abcaade"
const incorrectPassword = "1-3 b: cfefg"



const splitter = toSplit =>{
    const split1 =  toSplit.split(":")

    const expression = split1[0]
    const passwordWithSpace = split1[1]

    const password = passwordWithSpace.trim()
    const split2 = expression.split(" ")

    const numbers = split2[0]
    const letter = split2[1]

    const maxMin = numbers.split("-")

    const min = maxMin[0]
    const max = maxMin[1]

    return [password, letter, min, max]
}

const alternateChecker = passwordArray =>{

    const pass = passwordArray[0]
    const letter = passwordArray[1]
    const position1 = passwordArray[2] -1
    const position2 = passwordArray[3] -1

    if (pass.charAt(position1) == letter){
        if (pass.charAt(position2) == letter){
            console.log(`Password ${pass} is invalid`)
            return false
        }
        console.log(`Password ${pass} is valid`)
        return true
    }
    if (pass.charAt(position2) == letter){
        if (pass.charAt(position1) == letter){
            console.log(`Password ${pass} is invalid`)
            return false
        }
        console.log(`Password ${pass} is valid`)
        return true
    }

}

const passwordChecker = passwordArray =>{

    const pass = passwordArray[0]
    const letter = passwordArray[1]
    const min = passwordArray[2]
    const max = passwordArray[3]
    
    let letterCount = 0

    for (let index in pass){
        if (pass.charAt(index) == letter){
            letterCount = letterCount + 1
        }
    }
    if (min <= letterCount){
        if (max >= letterCount){
            console.log(`Password ${pass} is valid`)
            console.log(`Number of valid passwords: ${correctCount}`);
            
            return true
        }
    }
    console.log(`Password ${pass} is invalid.`)
    return false    
}


let correctCount = 0
passwords.forEach(password =>{
    const splitPass = splitter(password)
    if (alternateChecker(splitPass)){
        correctCount =  correctCount + 1
    }
})

console.log(`The total number of valid passwords is ${correctCount}`)


