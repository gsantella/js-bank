//number of account holders
//total money in the bank
//make a new account
//deleting account
//updating account

import {useState} from "react"

export default function GetAllAccounts() {

    const urlBase = "https://695f03af7f037703a8128fbf.mockapi.io/api/v1/Account"

    let [count, setCount] = useState(Number)

    var GrabJson = async function(){

        let req = await fetch(urlBase)
        let res = await req.json()
        setCount(res.length)
    }

    return(
        <>
            <button
            type="button"
            onClick={GrabJson}
            >Get all Accounts</button>

            {count? (<p><br/>Total Bank Accounts: {count}</p>):null}
        </>
    )
}