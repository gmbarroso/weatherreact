const token = process.env.REACT_APP_ACCUWEATHER_API_KEY
const br = 'pt-br'
const translate = lang => {
    if (lang === 'br') {
        return 'pt-br'
    }
    if (lang === 'en') {
        return 'en-US'
    }
    if (lang === 'es') {
        return 'es-ES'
    }
}
const details = 'true'
const metric = 'true'

export {
    token,
    br,
    translate,
    details,
    metric,
}