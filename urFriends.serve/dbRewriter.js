import db from './db.json' with {type: "json"}
const arr = db.phonebook[0].contacts;



console.log(arr)

const newData = []

arr.forEach(person => {
  const rand1 = Math.floor(Math.random() * 50);
  const rand2 = Math.floor(Math.random() * 50);

  const newPerson = {
    ...person,
    lastConvo: person.lastConvo.concat(arr[rand1].lastConvo[0]).concat(arr[rand2].lastConvo[0])
  }

  newData.push(newPerson)

})


console.log(console.log(JSON.stringify(newData, null, "\t")))

