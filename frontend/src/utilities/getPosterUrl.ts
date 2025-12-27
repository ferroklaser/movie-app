const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const getPosterUrl  = (posterPath : string, size : string) : string => {
    return `${TMDB_IMAGE_BASE_URL}${size}${posterPath}`
}