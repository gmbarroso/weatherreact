const token = 'IuVWje9ULZCICrZhuBv4PCuLF4sGEX6P'
const br = 'pt-br'
const details = 'true'
const metric = 'true'
const location = '45881'
const forecast = async () => {
  const result = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${location}?apikey=${token}&language=${br}&details=${details}&metric=${metric}`)
  return result.json()
  // return console.log('Batida')
}

export default forecast