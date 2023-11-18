const moment = require('moment')
const { createLogger, transports, format } = require('winston')
const { combine, timestamp, printf, simple, json } = format
const DailyRotateFile = require('winston-daily-rotate-file')
const CryptoJS = require("crypto-js")

const fileLogFormat = printf(({ level, message, timestamp, actor, req }) => {
    const formattedTimestamp = moment(timestamp).format('DD.MM HH:mm:ss')

    let logObject = {}

    if (actor === "SERVER") {
        logObject = {
            timestamp: formattedTimestamp,
            actor: "SERVER",
            level: level.toUpperCase(),
            message: message
        }
    } else {
        const ip = req.headers?.["x-real-ip"] || req.ip || null
        const encryptIP = ip ? CryptoJS.AES.encrypt(ip, process.env.ENCRYPTION_SECRET).toString() : null

        logObject = {
            timestamp: formattedTimestamp,
            actor: "USER",
            account: req.account?._id ?? null,
            ip: encryptIP,
            session: req.sessionID ?? null,
            level: level.toUpperCase(),
            message: message,
            httpmethod: req.method,
            httprequest: req.originalUrl
        }
    }

    return JSON.stringify(logObject)
})

const consoleLogFormat = printf(({ level, message }) => {
    return `${level.toUpperCase()}: ${message}`
})

const logger = createLogger({
    level: 'http',
    transports: [
        new transports.Console({
            format: combine(timestamp(), consoleLogFormat)
        }),
        new DailyRotateFile({
            filename: 'logs/%DATE%/all.log',
            datePattern: 'DDMMYYYY',
            maxFiles: '30d',
            format: combine(timestamp(), fileLogFormat)
        }),
        new DailyRotateFile({
            level: 'error',
            filename: 'logs/%DATE%/error.log',
            datePattern: 'DDMMYYYY',
            maxFiles: '30d',
            format: combine(timestamp(), fileLogFormat)
        })
    ]
})

module.exports = logger