module.exports={
    createDate: (date) =>{
        if(date){
          return date
        }
        return Date.now()
    }
}