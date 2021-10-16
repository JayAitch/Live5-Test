/**
 * role a "random" number between a max and min
 * @param min - minimum value to role
 * @param max - maximum value to role 
 * @returns random integer
 */
export function getRandomInt(min, max): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}