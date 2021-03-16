input.onButtonPressed(Button.A, function () {
    h += 1
    if (h > 23) {
        h = h - 24
    }
    display_the_time()
})
input.onButtonPressed(Button.AB, function () {
    basic.pause(5000)
    if (input.buttonIsPressed(Button.AB)) {
        control.reset()
    }
})
input.onButtonPressed(Button.B, function () {
    s = 0
    m += 1
    if (m > 59) {
        m = m - 60
    }
    display_the_time()
})
function display_the_time () {
    ampm = "am"
    qH = h
    if (qH > 12) {
        qH = qH - 12
    }
    if (qH > 11) {
        ampm = "pm"
    }
    if (qH == 0) {
        qH = 12
    }
    if (m < 10) {
        qM = "0" + m
    } else {
        qM = convertToText(m)
    }
    Lcd.showText("" + qH + ":" + qM + " " + ampm + " ", 0, 0)
}
let diff = 0
let new_ms = 0
let qM = ""
let qH = 0
let ampm = ""
let s = 0
let m = 0
let h = 0
Lcd.initDisplay()
led.enable(false)
h = 0
m = 0
s = 0
let old_ms = 0
let mde = 0
control.inBackground(function () {
    new_ms = input.runningTime()
    diff = new_ms - old_ms
    if (diff >= 1000) {
        s += Math.floor(diff / 1000)
        if (s > 59) {
            s = s - 60
            m += Math.floor(s / 60)
            if (mde == 0) {
                display_the_time()
            }
        }
        if (m > 59) {
            m = m - 60
            h += Math.floor(m / 60)
        }
        if (h > 23) {
            h = h - 24
        }
    }
})
