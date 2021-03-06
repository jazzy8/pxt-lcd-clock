function display_the_time () {
    ampm = "am"
    qH = h
    if (qH > 11) {
        ampm = "pm"
    }
    if (qH > 12) {
        qH = qH - 12
    }
    if (qH == 0) {
        qH = 12
    }
    if (m < 10) {
        qM = "0" + m
    } else {
        qM = convertToText(m)
    }
    serial.writeLine("cls::all")
    basic.pause(100)
    serial.writeLine("shw::" + qH + ":" + qM + " " + ampm + " ")
}
input.onButtonPressed(Button.A, function () {
	
})
function getHour (hh: number) {
    xhh = hh
    xam = "am"
    if (xhh > 11) {
        xam = "pm"
    }
    if (xhh > 12) {
        xhh = xhh - 12
    }
    if (xhh == 0) {
        xhh = 12
    }
    return "" + xhh + xam
}
control.onEvent(EventBusSource.MICROBIT_ID_IO_P8, EventBusValue.MICROBIT_BUTTON_EVT_CLICK, function () {
    if (mde == 0) {
        mde = 1
        serial.writeLine("cls::all")
        basic.pause(100)
        item = 0
        serial.writeLine("shw::set time")
    } else {
    	
    }
})
function ok () {
    if (mde == 1) {
        mde = 2
        serial.writeString("cls::all")
        basic.pause(100)
        serial.writeLine("shw::set hour")
        basic.pause(300)
        serial.writeLine("cur::00,1")
        basic.pause(100)
        serial.writeLine("shw::" + getHour(h))
    } else if (mde == 2) {
        mde = 3
        serial.writeString("cls::all")
        basic.pause(100)
        serial.writeLine("shw::set minute")
        basic.pause(300)
        serial.writeLine("cur::00,1")
        basic.pause(100)
        serial.writeLine("shw::" + m)
    } else if (mde == 3) {
        mde = 0
        display_the_time()
    } else {
    	
    }
}
radio.onReceivedString(function (receivedString) {
    if (receivedString == "next") {
        next()
    } else if (receivedString == "prev") {
        prev()
    } else if (receivedString == "ok") {
        ok()
    }
})
function prev () {
    if (mde == 2) {
        h = h - 1
        if (h < 0) {
            h = 23
        }
        serial.writeLine("cur::00,1")
        basic.pause(100)
        serial.writeLine("shw::" + getHour(h))
    } else if (mde == 3) {
        s = 0
        m = m - 1
        if (m < 0) {
            m = 59
        }
        serial.writeLine("cur::00,1")
        basic.pause(100)
        serial.writeLine("shw::" + m)
    }
}
function next () {
    if (mde == 2) {
        h = h + 1
        if (h > 23) {
            h = 0
        }
        serial.writeLine("cur::00,1")
        basic.pause(100)
        serial.writeLine("shw::" + getHour(h))
    } else if (mde == 3) {
        s = 0
        m = m + 1
        if (m > 59) {
            m = 0
        }
        serial.writeLine("cur::00,1")
        basic.pause(100)
        serial.writeLine("shw::" + m)
    }
}
function update_the_time () {
    ampm = "am"
    qH = h
    if (qH > 11) {
        ampm = "pm"
    }
    if (qH > 12) {
        qH = qH - 12
    }
    if (qH == 0) {
        qH = 12
    }
    if (m < 10) {
        qM = "0" + m
    } else {
        qM = convertToText(m)
    }
    serial.writeLine("cur::00,0")
    basic.pause(100)
    serial.writeLine("shw::" + qH + ":" + qM + " " + ampm + " ")
}
let old_ms = 0
let diff = 0
let new_ms = 0
let s = 0
let xam = ""
let xhh = 0
let qM = ""
let qH = 0
let ampm = ""
let mde = 0
let m = 0
let h = 0
let item = 0
led.enable(false)
let bright = 255
item = 0
radio.setGroup(72)
h = 0
m = 0
mde = 0
serial.redirect(
SerialPin.P14,
SerialPin.P15,
BaudRate.BaudRate9600
)
basic.pause(1000)
serial.writeLine("bkl::255")
basic.pause(500)
display_the_time()
basic.forever(function () {
    new_ms = input.runningTime()
    diff = new_ms - old_ms
    if (diff >= 1000) {
        old_ms = new_ms
        s += Math.floor(diff / 1000)
        if (s > 59) {
            m += Math.floor(s / 60)
            s = s - 60
            if (mde == 0) {
                update_the_time()
            }
        }
        if (m > 59) {
            h += Math.floor(m / 60)
            m = m - 60
        }
        if (h > 23) {
            h = h - 24
        }
    }
})
basic.forever(function () {
    if (pins.digitalReadPin(DigitalPin.P8) == 0) {
        control.raiseEvent(
        EventBusSource.MICROBIT_ID_IO_P8,
        EventBusValue.MICROBIT_BUTTON_EVT_CLICK
        )
    }
})
