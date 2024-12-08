
export const Uri = {
    apiInterface: 'http://localhost:5006/',
    apiContent: 'http://localhost:5002/'
}

const red: string = '\x1b[31m%s\x1b[0m';


export const color = {
    reset : '\x1b[0m', // Réinitialise les styles

    // Couleurs pour le texte
    black : '\x1b[30m%s\x1b[0m',
    red : '\x1b[31m%s\x1b[0m',
    green : '\x1b[32m%s\x1b[0m',
    yellow : '\x1b[33m%s\x1b[0m',
    blue : '\x1b[34m%s\x1b[0m',
    magenta : '\x1b[35m%s\x1b[0m',
    cyan : '\x1b[36m%s\x1b[0m',
    white : '\x1b[37m%s\x1b[0m',
    
    // Couleurs pour le fond
    bgBlack : '\x1b[40m%s\x1b[0m',
    bgRed : '\x1b[41m%s\x1b[0m',
    bgGreen : '\x1b[42m%s\x1b[0m',
    bgYellow : '\x1b[43m%s\x1b[0m',
    bgBlue : '\x1b[44m%s\x1b[0m',
    bgMagenta : '\x1b[45m%s\x1b[0m',
    bgCyan : '\x1b[46m%s\x1b[0m',
    bgWhite : '\x1b[47m%s\x1b[0m'
}