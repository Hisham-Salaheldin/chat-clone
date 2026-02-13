import { useEffect, useState, } from "react";

const PREFIX = "whatsApp-clone-"
export const useLocalStorage = (key,initialValue) => {
    const prefixedKey = PREFIX + key
    const [value, setValue] = useState(() => {
        try{
            const jasonValue = localStorage.getItem(prefixedKey);
            if(jasonValue != null) return JSON.parse(jasonValue)
            return typeof initialValue === 'function'
                ? initialValue()
                :  initialValue;

        }catch(err) {
            console.log(err)
            return typeof initialValue === 'function'
            ? initialValue()
            :  initialValue;
        }
    })

    useEffect(()=>{
        if(value === undefined) return 
        localStorage.setItem(prefixedKey, JSON.stringify(value));
    },[prefixedKey,value])

    return [value,setValue];
}