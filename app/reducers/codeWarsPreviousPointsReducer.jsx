import axios from "axios";

const GET_PREVIOUS_CODEWARS_POINTS = "GET_PREVIOUS_CODEWARS_POINTS"

const ADD_PREVIOUS_CODEWARS_POINTS = "ADD_PREVIOUS_CODEWARS_POINTS"



export function getPreviousPoints(points){
    return {
        type: GET_PREVIOUS_CODEWARS_POINTS,
        points
        
    }
}

export function addPreviousPoints(points){
    return {
        type: ADD_PREVIOUS_CODEWARS_POINTS,
        points
    }
}


export default function reduce(points = 0, action){
    switch(action.type){
        case GET_PREVIOUS_CODEWARS_POINTS:
             return action.points   //dont need to indicate
             break;
        case ADD_PREVIOUS_CODEWARS_POINTS:
             return action.points;   //dont need to indicate
             break;
        default:
            return points;        
    }

}

export function addPreviousCodeWarsPoints(userAccount, newAmountOfPoints){
    return function(dispatch){
        return axios.put('/api/blockchain/previousAmountOfPoints', {account: userAccount, previousAmountOfCodeWarsPoints: newAmountOfPoints})
        .then(res => res.data)
        .then(addedPoints => {
            var addPoints = addPreviousPoints(addedPoints)
            return dispatch(addPoints)
        })
    }
}

export function getPreviousCodeWarsPoints(userAccount){
    return function(dispatch){
         return axios.get('/api/blockchain/previousAmountOfPoints', {
        params: {
         account: userAccount
        }
        })
        .then(res => res.data)
        .then(previousCodeWarsPoints => {
            console.log("Previous CodeWars Points", previousCodeWarsPoints)
            var getAllPoints = getPreviousPoints(previousCodeWarsPoints)
            return dispatch(getAllPoints)
        })
        .catch(console.error)
    }
}