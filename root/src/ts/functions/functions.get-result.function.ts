import { GAME_CONFIG } from "../config/game-config.constant";
import { Result } from "../types/types.result.type";
import { getRandomInt } from "./functions.get-random-int.function";

// time to wait for a response
const RESPONSE_TIME = 1000

// amount won when matching numbers
const PAYTABLE = {
    0:0,
    1:0,
    2:0,
    3: 50,
    4: 100,
    5: 200,
    6: 500
}

/**
 * Simulate making a bet request to the backend
 * @param selection_ - selection made by the player
 * @returns Promise inidcating the fake request has finished
 */
export function getResult(selection_: number[]):Promise<Result>{
    return new Promise<Result>(res_=>{
        let matches = 0
        const numbers = roleRandomResult()

        selection_.map(selection=>{
            if(numbers.includes(selection))
                matches++
        })
        // get the players winnings
        const win = PAYTABLE[matches]
        
        const result: Result = {
            win: win,
            balls: numbers
        }
        setTimeout(()=>{
            res_(result)
        }, RESPONSE_TIME)
    })
}
/**
 * Generate a fake result
 * @returns number array of the balls roled
 */
function roleRandomResult():number[]{
    const result = []
    // create a result for each ball
    for(let i = 0; i < GAME_CONFIG.pickAmount; i++){
        let picked = false
        // search for a new number
        while(!picked){
            const int = getRandomInt(1, GAME_CONFIG.balls)
            if(!result.includes(int)){
                picked = true
                result.push(int)
            }
        }     
    }
    return result
}