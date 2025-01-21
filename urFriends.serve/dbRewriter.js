//There should be an array of the original JSON objects named arr
arr = [
  //This is empty, put JSON here...
];

const newData = []

arr.forEach(person => {
  const rand1 = Math.floor(Math.random() * 50);
  const rand2 = Math.floor(Math.random() * 50);

  const newPerson = {
    ...person,
    //Put whatever changes need to be applied to the newData array of JSON objects
  }

  newData.push(newPerson)

})

console.log(console.log(JSON.stringify(newData, null, "\t")))

