import { useEffect } from 'react'

const useDarkTheme = (checked) => {
    useEffect(() => {
        if (checked) {
            document.body.style.backgroundColor = '#282c34'
            document.body.style.color = '#fff'
        }

        return () => {
            document.body.style.backgroundColor = '#e5e5e5'
            document.body.style.color = '#000'
        }
    })
}

export default useDarkTheme