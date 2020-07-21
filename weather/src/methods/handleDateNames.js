export const getWeekDays = day => {
    switch (day) {
        case 1:
            return "Seg"
        case 2:
            return "Ter"
        case 3:
            return "Qua"
        case 4:
            return "Qui"
        case 5:
            return "Sex"
        case 6:
            return "Sáb"
        default:
            return "Dom"
    }
}

export const getMonthNames = day => {
    switch (day) {
        case 1:
            return "Fev"
        case 2:
            return "Mar"
        case 3:
            return "Abr"
        case 4:
            return "Mai"
        case 5:
            return "Jun"
        case 6:
            return "Jul"
        case 7:
            return "Ago"
        case 8:
            return "Set"
        case 9:
            return "Out"
        case 10:
            return "Nov"
        case 11:
            return "Dez"
        default:
            return "Jan"
    }
}