const TypingText= document.querySelector(".typing__text p")
const InputField = document.querySelector(".input__field")
const Mistakes = document.querySelector(".mistakes span")
const Time = document.querySelector(".time span strong")
const WPM = document.querySelector(".wpm span")
const CPM = document.querySelector(".cpm span")
const TryAgainBtn = document.querySelector("button")
const RefreshBtn = document.querySelector(".refresh")

let charIndex = 0
let mistakes = 0
let timer, maxTime = 60, timeLeft = maxTime
let isTyping = 0

function RandomParagraphs() {
    let randomIndex = Math.floor(Math.random() * Paragraphs.length)
    TypingText.innerHTML = ""
    Paragraphs[randomIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`
        TypingText.innerHTML += spanTag
    })
    TypingText.querySelectorAll("span")[0].classList.add("active")
    document.addEventListener("keydown", () => InputField.focus())
    TypingText.addEventListener("click", () => InputField.focus())
}

function initTyping() {
        const characters = TypingText.querySelectorAll("span")
        let typedChar = InputField.value.split("")[charIndex]
        if(charIndex < characters.length - 1 && timeLeft > 0) {
            if(!isTyping) {
                timer = setInterval(initTimer, 1000)
                isTyping = true
            }
            if(typedChar == null) {
                    charIndex--
                    if(characters[charIndex].classList.contains("incorrect")) {
                        mistakes--
                    }
                    characters[charIndex].classList.remove("correct", "incorrect")
            } else {
                    if(characters[charIndex].innerText === typedChar) {
                    characters[charIndex].classList.add("correct")
            } else {
                    mistakes++
                    characters[charIndex].classList.add("incorrect")
            }
            charIndex++
            }
            
            characters.forEach(span => span.classList.remove("active"))
            characters[charIndex].classList.add("active")

            let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60)
            wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm
            Mistakes.innerText = mistakes
            WPM.innerText = wpm
            CPM.innerText = charIndex - mistakes 
        } else {
            InputField.value = ""
            clearInterval(timer)
        }
    }
function initTimer() {
    if(timeLeft > 0) {
        timeLeft--
        Time.innerText = timeLeft
    } else {
        clearInterval(timer)
    }
}

function reset() {
    RandomParagraphs()
    InputField.value = ""
    clearInterval(timer)
    timeLeft = maxTime
    let isTyping = 0
    Time.innerText = timeLeft
    Mistakes.innerText = 0
    WPM.innerText = 0
    CPM.innerText = 0
}

RandomParagraphs()
TryAgainBtn.addEventListener("click", reset)
InputField.addEventListener("input", initTyping)
RefreshBtn.addEventListener("click", RandomParagraphs)
