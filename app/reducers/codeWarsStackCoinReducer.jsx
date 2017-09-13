import axios from "axios";

const GET_CODE_WARS_STACK_COIN_AMOUNT = "GET_CODE_WARS_STACK_COIN_AMOUNT"

const ADD_CODE_WARS_STACK_COIN = "ADD_CODE_WARS_STACK_COIN"

export function getCodeWarsStackCoinAmount(points){
    return {
        type: GET_CODE_WARS_STACK_COIN_AMOUNT,
        points
        
    }
}

export function addCodeWarsStackCoinAmount(points){
    return {
        type: ADD_CODE_WARS_STACK_COIN,
        points
    }
}

export default function reduce(points = 0, action){
    switch(action.type){
        case GET_CODE_WARS_STACK_COIN_AMOUNT:
             return action.points   //dont need to indicate
             break;
        case ADD_CODE_WARS_STACK_COIN:
             return action.points;   //dont need to indicate
             break;
        default:
            return points;        
    }

}

export function addCodeWarsStackCoin(userAccount){
    return function(dispatch){
        return axios.put('/api/blockchain/codeWarsStackCoinAmount', {account: userAccount})
        .then(res => res.data)
        .then(addedPoints => {
            var addPoints = addCodeWarsStackCoinAmount(addedPoints)
            return dispatch(addPoints)
        })
    }
}

export function getCodeWarsStackCoin(userAccount){
    return function(dispatch){
         return axios.get('/api/blockchain/codeWarsStackCoinAmount', {
        params: {
         account: userAccount
        }
        })
        .then(res => res.data)
        .then(codeWarsPoints => {
            console.log("Previous CodeWars Points", codeWarsPoints)
            var getAllPoints = getCodeWarsStackCoinAmount(codeWarsPoints)
            return dispatch(getAllPoints)
        })
        .catch(console.error)
    }
}

