import { useState } from 'react';


export const useCounter = ( initialValue = 1 ) => {

    const [ counter, setCounter ] = useState ( initialValue );

    const increment = ( valor = 1 ) => {
        setCounter (  (current)  => current + valor );
    }

    const decrement = ( valor = 1 ) => {
        setCounter ( (current)  => current - valor );
    }    

    const reset = () => {
        setCounter ( initialValue );
    }

    return {
        counter,
        increment,
        decrement,
        reset,
    };
};