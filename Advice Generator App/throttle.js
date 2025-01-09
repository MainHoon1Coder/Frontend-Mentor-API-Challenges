const adviceNumber = document.querySelector('.advice-number')
const adviceQuote = document.querySelector('.advice-quote')
const adviceButton = document.querySelector('.advice-button')


function adviceGenerator(adviceObj) {
    // console.log(adviceObj.slip)
    adviceNumber.innerHTML = adviceObj.slip.id
    adviceQuote.innerHTML = adviceObj.slip.advice
}


// Throttle function to limit how often the API call is made
const throttle = (func, delay) => {
    let isClicked = true

    return function (...args) {
        if (isClicked) {
            func.apply(this, args)
            isClicked = false
            setTimeout(() => {
                isClicked = true
            }, delay)
        }
    }
}

// Apply throttling to the click event listener
adviceButton.addEventListener('click', throttle(() => {
    fetch('https://api.adviceslip.com/advice')
        .then(res => res.json())
        .then(data => adviceGenerator(data))
}, 3000)) // Throttle with 3-second delay
