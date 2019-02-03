let date = new Date()
let h = date.getHours()
let m = date.getMinutes()
if(m<10)
m = "0" + m
console.log(`${h}:${m}`)