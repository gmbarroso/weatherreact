import { useEffect } from 'react'

const useDarkTheme = (checked) => {
    useEffect(() => {
        const stylePeriodArray = document.getElementsByClassName('period')
        if (checked) {
            document.body.style.backgroundColor = '#282c34'
            document.body.style.color = '#fff'
            document.getElementsByClassName('card-size card')[0].style.backgroundColor = '#A9A9A9'
            document.getElementsByClassName('card-size card')[1].style.backgroundColor = '#A9A9A9'
            document.getElementsByClassName('card-size card')[2].style.backgroundColor = '#A9A9A9'
            if (stylePeriodArray.length !== 0) {
                document.getElementsByClassName('period')[0].style.color = '#505050'
                document.getElementsByClassName('period')[1].style.color = '#505050'
                document.getElementsByClassName('period')[2].style.color = '#505050'
                document.getElementsByClassName('subtitle')[0].style.color = '#505050'
                document.getElementsByClassName('subtitle')[1].style.color = '#505050'
                document.getElementsByClassName('subtitle')[2].style.color = '#505050'
                document.getElementsByClassName('weatherState')[0].style.color = '#505050'
                document.getElementsByClassName('weatherState')[1].style.color = '#505050'
                document.getElementsByClassName('weatherState')[2].style.color = '#505050'
                document.getElementsByClassName('min')[0].style.color = '#505050'
                document.getElementsByClassName('min')[1].style.color = '#505050'
                document.getElementsByClassName('min')[2].style.color = '#505050'
            }
        }

        return () => {
            document.body.style.backgroundColor = '#e5e5e5'
            document.body.style.color = '#000'
            document.getElementsByClassName('card-size card')[0].style.backgroundColor = 'white'
            document.getElementsByClassName('card-size card')[1].style.backgroundColor = 'white'
            document.getElementsByClassName('card-size card')[2].style.backgroundColor = 'white'
            if (stylePeriodArray.length !== 0) {
                document.getElementsByClassName('period')[0].style.color = '#6c757d'
                document.getElementsByClassName('period')[1].style.color = '#6c757d'
                document.getElementsByClassName('period')[2].style.color = '#6c757d'
                document.getElementsByClassName('subtitle')[0].style.color = '#6c757d'
                document.getElementsByClassName('subtitle')[1].style.color = '#6c757d'
                document.getElementsByClassName('subtitle')[2].style.color = '#6c757d'
                document.getElementsByClassName('weatherState')[0].style.color = '#505050'
                document.getElementsByClassName('weatherState')[1].style.color = '#505050'
                document.getElementsByClassName('weatherState')[2].style.color = '#505050'
                document.getElementsByClassName('min')[0].style.color = '#505050'
                document.getElementsByClassName('min')[1].style.color = '#505050'
                document.getElementsByClassName('min')[2].style.color = '#505050'
            }

        }
    })
}

export default useDarkTheme