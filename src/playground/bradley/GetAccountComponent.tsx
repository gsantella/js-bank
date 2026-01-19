import { useState } from "react";

//check out the router thing later 

export default function GetAccountComponent(){

        const urlBase = "https://695f03af7f037703a8128fbf.mockapi.io/api/v1/Account"
        const [accountID, setAccountID] = useState("")
        const [accountData, setAccountData] = useState<any>(null)
        const [entered, setEntered] = useState(false)
        
        const GrabJson = async function(){
            let res = await fetch(urlBase+"/"+accountID)
            res = await res.json()
            setAccountData(res)
            setEntered(true)
            return res
        }

        const Reset = async function() {
            setAccountID("")
            setAccountData("")
            setEntered(false)
        }

    return (
        <>
                <input 
                    placeholder="Enter your account ID"
                    value={accountID}
                    onChange={(e) => setAccountID(e.target.value)}
                ></input>
                
                <button 
                    type = "button"
                    onClick={GrabJson}
                > GetJson </button>  
                              
                <div>

                    <p>
                        {entered && accountData ? (<p><br/>Account ID: {accountData.id}<br/>Account Holder ID:  {accountData.AccountHolderId}<br/>Balance:    ${accountData.balance}</p>) : null}                
                    </p>

                    {entered ? <button
                                    type = "button"
                                    onClick={Reset}
                                >Reset</button> : null}

                </div>
        </>
    )
}