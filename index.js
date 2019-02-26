// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let customerId = 0
let neighborhoodId = 0
let deliveryId = 0
let mealId = 0

class Neighborhood {
  constructor (name) {
    this.name = name
    this.id = ++neighborhoodId
    store.neighborhoods.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery =>  delivery.neighborhoodId === this.id )
  }
  customers() {
    return store.customers.filter(customer => customer.neighborhoodId === this.id)
  }
  meals() {
    let theMeals = this.deliveries().map(delivery => {
      return delivery.meal()
    })
    let unique = [...new Set(theMeals)]
    console.log(unique)
    return unique
  }
}

class Delivery {
  constructor (mealId, neighborhoodId, customerId) {
    this.id = ++deliveryId
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    store.deliveries.push(this)
  }
  meal() {
    let newMeals = store.meals.filter(meal => {
      return meal.id === this.mealId
    })
    return newMeals[0]
  }
  customer() {
    let newCustomer = store.customers.filter(customer => {
      return customer.id === this.customerId
    })
    return newCustomer[0]
  }
  neighborhood() {
    let newNeighborhood = store.neighborhoods.filter(neighborhood => {
      return neighborhood.id === this.neighborhoodId
    })
    return newNeighborhood[0]
  }
}

class Customer {
  constructor (name, neighborhoodId) {
    this.name = name
    this.id = ++customerId
    this.neighborhoodId = neighborhoodId
    store.customers.push(this)
  }
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id
    })
  }
  meals() {
    return this.deliveries().map(delivery => {
      return delivery.meal()
    })
  }
  totalSpent() {
    return this.meals().reduce((total, meal) => total + meal.price, 0)
  }
}

class Meal {
  constructor (title, price) {
    this.title = title
    this.price = price
    this.id = ++mealId
    store.meals.push(this)
  }
  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id
    })
  }
  customers(){
    return this.deliveries().map(delivery => {
      return delivery.customer()
    })
  }
  static byPrice() {
    return store.meals.sort((a, b) => {
      return b.price - a.price
    })
  }
}
