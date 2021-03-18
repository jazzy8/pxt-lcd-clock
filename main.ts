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
    serial.writeLine("cls::all")
    basic.pause(100)
    serial.writeLine("shw::" + qH + ":" + qM + " " + ampm + " ")
}
control.onEvent(EventBusSource.MICROBIT_ID_IO_P12, EventBusValue.MICROBIT_BUTTON_EVT_CLICK, function () {
    if (mde == 1) {
        if (item == 0) {
            mde = 2
            serial.writeLine("cls::all")
            serial.writeLine("shw::Set Hour")
            serial.writeLine("cur::00,1")
            serial.writeLine("shw::" + h)
        } else if (item == 1) {
            mde = 4
            serial.writeLine("cls::all")
            serial.writeLine("shw::Set Brightness")
            serial.writeLine("cur::00,1")
            serial.writeLine("shw::" + h)
        } else if (item == 2) {
            mde = 0
            display_the_time()
        }
    } else if (mde == 2) {
        mde = 3
        serial.writeLine("cls::all")
        serial.writeLine("shw::Set Minute")
        serial.writeLine("cur::00,1")
        serial.writeLine("shw::" + m)
    } else if (mde == 3) {
        mde = 0
        display_the_time()
    } else if (mde == 4) {
        mde = 0
        display_the_time()
    }
})
control.onEvent(EventBusSource.MICROBIT_ID_IO_P8, EventBusValue.MICROBIT_BUTTON_EVT_CLICK, function () {
    if (mde == 0) {
        mde = 1
        item = 0
        serial.writeLine("cls:all")
        basic.pause(100)
        serial.writeLine("shw::Set Time")
    } else {
        mde = 0
        display_the_time()
    }
})
control.onEvent(EventBusSource.MICROBIT_ID_IO_P1, EventBusValue.MICROBIT_BUTTON_EVT_CLICK, function () {
    if (mde == 0) {
        item = item - 1
        if (item < 0) {
            item = 2
        }
        serial.writeLine("cls:all")
        basic.pause(100)
        if (item == 0) {
            serial.writeLine("shw::Set Time")
        } else if (item == 1) {
            serial.writeLine("shw::Set Brightness")
        } else if (item == 2) {
            serial.writeLine("shw::Back")
        }
    } else if (mde == 2) {
        h = h - 1
        if (h < 0) {
            h = 23
        }
        serial.writeLine("cls::all")
        serial.writeLine("shw::Set Hour")
        serial.writeLine("cur::00,1")
        serial.writeLine("shw::" + h)
    } else if (mde == 3) {
        m = m - 1
        s = 0
        if (m < 0) {
            m = 59
        }
        serial.writeLine("cls::all")
        serial.writeLine("shw::Set Minute")
        serial.writeLine("cur::00,1")
        serial.writeLine("shw::" + m)
    } else if (mde == 4) {
        if (bright > 0) {
            bright = bright - 1
            serial.writeLine("cls::all")
            serial.writeLine("shw::Set Brightness")
            serial.writeLine("cur::00,1")
            serial.writeLine("shw::" + bright)
            serial.writeLine("bkl::" + bright)
        }
    }
})
control.onEvent(EventBusSource.MICROBIT_ID_IO_P2, EventBusValue.MICROBIT_BUTTON_EVT_CLICK, function () {
    if (mde == 0) {
        item = item + 1
        if (item > 2) {
            item = 0
        }
        serial.writeLine("cls:all")
        basic.pause(100)
        if (item == 0) {
            serial.writeLine("shw::Set Time")
        } else if (item == 1) {
            serial.writeLine("shw::Set Brightness")
        } else if (item == 2) {
            serial.writeLine("shw::Back")
        }
    } else if (mde == 2) {
        h = h + 1
        if (h > 23) {
            h = 0
        }
        serial.writeLine("cls::all")
        serial.writeLine("shw::Set Hour")
        serial.writeLine("cur::00,1")
        serial.writeLine("shw::" + h)
    } else if (mde == 3) {
        m = m + 1
        if (m > 59) {
            m = 0
        }
        serial.writeLine("cls::all")
        serial.writeLine("shw::Set Minute")
        serial.writeLine("cur::00,1")
        serial.writeLine("shw::" + m)
    } else if (mde == 4) {
        if (bright < 255) {
            bright = bright + 1
            serial.writeLine("cls::all")
            serial.writeLine("shw::Set Brightness")
            serial.writeLine("cur::00,1")
            serial.writeLine("shw::" + bright)
            serial.writeLine("bkl::" + bright)
        }
    }
})
let diff = 0
let new_ms = 0
let qM = ""
let qH = 0
let ampm = ""
let mde = 0
let s = 0
let m = 0
let h = 0
let item = 0
let bright = 0
led.enable(false)
bright = 255
item = 0
h = 0
m = 0
s = 0
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
    if (pins.digitalReadPin(DigitalPin.P8) == 0) {
        control.raiseEvent(
        EventBusSource.MICROBIT_ID_IO_P8,
        EventBusValue.MICROBIT_BUTTON_EVT_CLICK
        )
    }
    if (pins.digitalReadPin(DigitalPin.P1) == 0) {
        control.raiseEvent(
        EventBusSource.MICROBIT_ID_IO_P1,
        EventBusValue.MICROBIT_BUTTON_EVT_CLICK
        )
    }
    if (pins.digitalReadPin(DigitalPin.P2) == 0) {
        control.raiseEvent(
        EventBusSource.MICROBIT_ID_IO_P2,
        EventBusValue.MICROBIT_BUTTON_EVT_CLICK
        )
    }
    if (pins.digitalReadPin(DigitalPin.P12) == 0) {
        control.raiseEvent(
        EventBusSource.MICROBIT_ID_IO_P12,
        EventBusValue.MICROBIT_BUTTON_EVT_CLICK
        )
    }
})
control.inBackground(function () {
    let old_ms = 0
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
