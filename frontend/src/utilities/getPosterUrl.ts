const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
const IMAGE_FILE_SIZE = '/w500'

export const getPosterUrl  = (posterPath : string) : string => {
    return `${TMDB_IMAGE_BASE_URL}${IMAGE_FILE_SIZE}${posterPath}`
}