export const formatDateToLocale = (IsoDate : string) : string => {
    const parts = IsoDate.split("-");
    return `${parts[2]}/${parts[1]}/${parts[0]}`
}