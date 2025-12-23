export const formatDateToIso = (localeDate : string) : string => {
    const parts = localeDate.split("/");
    const day = parts[0]
    const month = parts[1]
    const year = parts[2]
    return `${year}-${month}-${day}`;
}