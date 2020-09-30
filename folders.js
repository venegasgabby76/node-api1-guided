//This "require" synatx is another way to import a thrid-party library 
//fs is short for FILE SYSTEM

const fs = require("fs")

//create a new folder called "data"
//make a directory synchronous
fs.mkdirSync("data")

//create a new folder for each letter of the alphabet,
//inside the "data" folder that weas created above
for (let i = 97; i <= 122; i++) {
    const letter = String.fromCharCode(i)
    fs.mkdirSync(`data/${letter}`)
}
