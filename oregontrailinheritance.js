class Traveler {
    constructor(name){
        this._name = name
        this._food = 1
        this._healthy = true
    }
    //getters
    get name(){
        return this._name
    }
    get food(){
        return this._food
    }
    get healthy(){
        return this.__healthy
    }
    //setters
    set name(traveler){
        return this._name = traveler
    }
    set food(quantity){
        return this._food = quantity
    }
    set healthy(quantity){
        return this.__healthy = quantity
    }
    hunt(){
        this._food+= 2
    }
    eat(){
        if(this._food-1 < 0){
            this._food = 0
            this._healthy = false
        } else {
            this._food--
        }
    }
}

class Wagon {
    constructor(capacity){
        this._capacity = capacity
        this._passageiros = []
    }
    //getters
    get capacity(){
        return this._capacity
    }
    get passageiros(){
        return this._passageiros
    }
    //setters
    set capacity(quantity){
        return this._capacity = quantity
    }
    getAvailableSeatCount(){
        return this._capacity-this._passageiros.length
    }
    join(traveler){
        if(this.getAvailableSeatCount()>0){
            this._passageiros.push(traveler)
        }
    }
    shouldQuarantine(){
        return this._passageiros.some(({_healthy})=>!_healthy)
    }
    totalFood(){
        return this._passageiros.reduce((acc,{_food})=>acc+_food,0)
    }
}

class Hunter extends Traveler {
    constructor(name){
        super(name)
        this._food = 2
    }
    hunt(){
        this._food+= 5
    }
    eat(){
        if(this._food-2 < 0){
            this._food = 0
            this._healthy = false
        } else {
            this._food-= 2
        }
    }
    giveFood(traveler, numOfFoodUnits){
        if(this._food-numOfFoodUnits >= 0){
            this._food-= numOfFoodUnits
            traveler._food+=numOfFoodUnits
        }
    }
}

class Doctor extends Traveler {
    constructor(name){
        super(name)
    }
    heal(traveler){
        if(!traveler._healthy){
            traveler._healthy = true
        }
    }
}


// Cria uma carroça que comporta 4 pessoas
let wagon = new Wagon(4);
// Cria cinco viajantes
let henrietta = new Traveler('Henrietta');
let juan = new Traveler('Juan');
let drsmith = new Doctor('Dr. Smith');
let sarahunter = new Hunter('Sara');
let maude = new Traveler('Maude');
 
console.log(`#1: There should be 4 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
 
wagon.join(henrietta);
console.log(`#2: There should be 3 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
 
wagon.join(juan);
wagon.join(drsmith);
wagon.join(sarahunter);
 
wagon.join(maude); // Não tem espaço para ela!
console.log(`#3: There should be 0 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
 
console.log(`#4: There should be 5 total food. Actual: ${wagon.totalFood()}`);
 
sarahunter.hunt(); // pega mais 5 comidas
drsmith.hunt();
 
console.log(`#5: There should be 12 total food. Actual: ${wagon.totalFood()}`);
 
henrietta.eat();
sarahunter.eat();
drsmith.eat();
juan.eat();
juan.eat(); // juan agora está doente (sick)
 
console.log(`#6: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#7: There should be 7 total food. Actual: ${wagon.totalFood()}`);
 
drsmith.heal(juan);
console.log(`#8: Quarantine should be false. Actual: ${wagon.shouldQuarantine()}`);
 
sarahunter.giveFood(juan, 4);
sarahunter.eat(); // Ela só tem um, então ela come e fica doente
 
console.log(`#9: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#10: There should be 6 total food. Actual: ${wagon.totalFood()}`);