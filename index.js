const { parse } = require("csv-parse")
const fs = require("fs")

const habitablePlanets = []

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  )
}

//create a readStream by using the file system module
//we pipe our pass parse function to the stream
fs.createReadStream("kepler_data.csv")
  .pipe(
    parse({
      comment: "#",
      columns: true
    })
  )
  .on("data", (data) => {
    if (isHabitablePlanet(data)) {
      habitablePlanets.push(data)
    }
  })
  .on("error", () => {
    console.log(err)
  })
  .on("end", () => {
    console.log(
      habitablePlanets.map((planet) => {
        return planet.kepler_name
      })
    )
    console.log(`${habitablePlanets.length} habitable planets found!✨`)
  })

//we get buffer of data but we need to parse it
