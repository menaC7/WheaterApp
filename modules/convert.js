

function convertFahrenToCelsius(temp) {
    let f1 = temp - 32
    let f2 = f1 / 9
    let f3 = f2 * 5

    return Math.floor(f3)
}

export default convertFahrenToCelsius