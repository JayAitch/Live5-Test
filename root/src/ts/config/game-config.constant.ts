/**config defining game properties*/
export const GAME_CONFIG = {
    balance: 10000,
    stake: 1,
    balls: 59,
    pickAmount: 6,
    display:{
        buildings:{
            colCount: 7,
            rowCount: 9,
            xGap: 50,
            yGap: 60,
            startX: 35,
            startY: 50,
        },
        buttons:{
            play:{
                asset:"play_icon",
                x: 50,
                y: 600
            },
            luckyDip:{
                asset:"dice_icon",
                x: 324,
                y: 600
            }
        }
    }
}