/**config defining game properties*/
export const GAME_CONFIG = {
    balance: 10000,
    stake: 1,
    balls: 59,
    pickAmount: 6,
    display:{
        app:{
            width:374, 
            height: 667, 
            bg: 0xffffff,
        },
        footer:{
            x: 0,
            y: 634,
            width: 374,
            height: 60,
            colour: 0x1111111,
            balanceText:{
                x: 300,
                y: 650
            },
            stakeText:{
                x: 50, 
                y: 650
            }
        },
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
            reset:{
                asset:"reset_icon",
                x: 187,
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