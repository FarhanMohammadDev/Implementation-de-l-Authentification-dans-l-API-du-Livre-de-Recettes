// npm install mongoose     ( to connect express whit mongoDB  we use mongoose  )
const mongoose = require("mongoose");

 class Database {
    constructor(url){
        this.url =url
    }
     async connect(){
        try {
            await mongoose.connect(this.url)
            console.log("Connected To MongoDB")
        } catch (error) {
            console.log("Connection Flailed To MongoDB." , error)
        }
    }
    
}
module.exports=Database;