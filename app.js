// STUB upgrades
let pointerUpgrades = [
  {name: "Hand", quantity: 0, cost: 200, costAddition: 200,
   quanityCheck: [5, 15, 25, 40, 70],
   costCheck: [1000, 2500, 5000, 10000, 15000]},

  {name: "Oven Mitt", quantity: 0, cost: 200},
]

let automaticUpgrades = [
  {name: "Microwave", quantity: 0, cost: 40},
  {name: "Grandma", quantity: 0, cost: 300},
  {name: "Oven", quantity: 0, cost: 2000},
  {name: "Food Truck", quantity: 0, cost: 5000},
  {name: "Factory", quantity: 0, cost: 10000},
]

// SECTION element selectors
let cupcakeElem = document.querySelector("#cupcake")
let cupcakeBankElem = document.querySelector("#total-cupcakes-in-bank")
let handMadeCupcakesElem = document.querySelector("#hand-made-cupcakes")
let totalClicksElem = document.querySelector("#total-clicks")
let totalCupcakesMadeElem = document.querySelector("#total-cupcakes-made")
let cupcakePerClickElem = document.querySelector("#cupcakes-per-click")
let upgradesOwnedElem = document.querySelector("#upgrades-owned")
// ANCHOR - element selectors for UPGRADES
let handUpgrade = document.querySelector("#hand-upg")
let ovenMittUpgrade = document.querySelector("#oven-mitt-upg")
let microwaveUpgrade = document.querySelector("#microwave-upg")
// SECTION game mechanical variables
let manualClicksMultiplier = 1
let manualClicks = 1
let automaticClicks = 0
let handObj = pointerUpgrades[0]
let ovenMittObj = pointerUpgrades[1]
let microwaveObj = automaticUpgrades[0]
let grandmaObj = automaticUpgrades[1]
let ovenObj = automaticUpgrades[2]
let foodTruckObj = automaticUpgrades[3]
let factoryObj = automaticUpgrades[4]


// SECTION informational variables
let totalClicks = 0
let cupcakeBank = 0
let totalHandMadeCupcakes = 0
let totalCupcakesMade = 0
let totalUpgrades = 0

// SECTION Toast Config

const Toast = Swal.mixin({
  toast: true,
  position: 'bottom',
  showConfirmButton: false,
  timer: 5000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})


// SECTION functions

function clickCupcake(){
  totalClicks++
  cupcakeBank++
  totalHandMadeCupcakes += manualClicks
  totalCupcakesMade += manualClicks
  totalCupcakesMadeElem.innerText = `All time cupcakes baked: ${totalCupcakesMade}`
  cupcakeBankElem.innerText = `Cupcakes in the bank: ${cupcakeBank}`
  handMadeCupcakesElem.innerText = `Handmade cupcakes: ${totalHandMadeCupcakes}`
  totalClicksElem.innerText = `All time Cupcake clicks: ${totalClicks}`
  if(totalClicks == 10){
    handUpgrade.removeAttribute("hidden")
    Toast.fire({
      title: 'Unlocked Hand',
    })
  }
}

function updateInfo(){
  cupcakePerClickElem.innerText = `Cupcakes per click: ${manualClicks}`
  upgradesOwnedElem.innerText = `Upgrades owned: ${totalUpgrades}`
}

function checkUpgrade(upgrade, upgradesElem){
  console.log(upgrade.quantityCheck, "a")
  if(cupcakeBank >= upgrade.cost){
    upgrade.quantity++
    if(upgrade.quanity == upgrade.quantityCheck[0]){
      upgrade.costAddition = costCheck[0]
      upgrade.quantityCheck.splice(0, 1)
      upgrade.costCheck.splice(0, 1)
      if(upgrade.quantityCheck.length == 0){
        upgrade.quantityCheck.push(99999999999999999999999999999)
      }
    }
    upgrade.cost += upgrade.costAddition
    upgradesElem.title = `Cost: ${Math.ceil(upgrade.cost)}`
  }
  console.log(upgrade, "b")
}

// SECTION EVENT LISTENERS
cupcakeElem.addEventListener("click", clickCupcake)
microwaveUpgrade.addEventListener("click", function(){
  checkUpgrade(microwaveObj, microwaveUpgrade)
})

updateInfo()


