const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let money = 100
let factories = []
let soldiers = []

let territories = [
{x:200,y:300,r:80,owner:"player",troops:20,name:"Russia"},
{x:500,y:200,r:70,owner:"enemy",troops:15,name:"Europe"},
{x:800,y:350,r:70,owner:"enemy",troops:15,name:"Asia"}
]

function updateUI(){
document.getElementById("money").textContent = Math.floor(money)
document.getElementById("factories").textContent = factories.length
document.getElementById("soldiers").textContent = soldiers.length
}

function buildFactory(){
if(money >= 50){
money -= 50

factories.push({
x: territories[0].x + Math.random()*80-40,
y: territories[0].y + Math.random()*80-40
})

updateUI()
}
}

function trainSoldier(){
if(money >= 10){
money -= 10

soldiers.push({
x: territories[0].x,
y: territories[0].y,
target:null
})

updateUI()
}
}

canvas.addEventListener("click",e=>{
const rect = canvas.getBoundingClientRect()
const mx = e.clientX - rect.left
const my = e.clientY - rect.top

territories.forEach(t=>{
const d = Math.hypot(mx-t.x,my-t.y)

if(d < t.r && t.owner !== "player"){
soldiers.forEach(s=>{
s.target = t
})
}
})
})

function drawTerritories(){
territories.forEach(t=>{

ctx.beginPath()
ctx.arc(t.x,t.y,t.r,0,Math.PI*2)

if(t.owner === "player"){
ctx.fillStyle = "#c40000"
}else{
ctx.fillStyle = "#444"
}

ctx.fill()

ctx.fillStyle="white"
ctx.font="14px Arial"
ctx.fillText(t.name,t.x-20,t.y)

})
}

function drawFactories(){

factories.forEach(f=>{

ctx.fillStyle="#777"
ctx.fillRect(f.x-10,f.y-10,20,20)

ctx.fillStyle="#333"
ctx.fillRect(f.x-3,f.y-18,6,8)

ctx.fillStyle="#aaa"
ctx.fillRect(f.x-8,f.y-5,16,5)

})
}

function drawSoldiers(){

soldiers.forEach(s=>{

ctx.beginPath()
ctx.arc(s.x,s.y,5,0,Math.PI*2)
ctx.fillStyle="#00ff88"
ctx.fill()

ctx.fillStyle="#003322"
ctx.fillRect(s.x-4,s.y-2,8,3)

})
}

function moveSoldiers(){

soldiers.forEach(s=>{

if(s.target){

let dx = s.target.x - s.x
let dy = s.target.y - s.y
let dist = Math.hypot(dx,dy)

if(dist > 2){
s.x += dx/dist * 1.2
s.y += dy/dist * 1.2
}else{

s.target.troops -= 1

if(s.target.troops <= 0){
s.target.owner = "player"
}

}
}

})

}

function economy(){

money += factories.length * 0.02

}

function gameLoop(){

ctx.clearRect(0,0,canvas.width,canvas.height)

economy()
moveSoldiers()

drawTerritories()
drawFactories()
drawSoldiers()

updateUI()

requestAnimationFrame(gameLoop)

}

gameLoop()
