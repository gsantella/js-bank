import { useState } from "react";

//check out the router thing later 

export default function GetUserAccountsComponent(){

        const urlBase = "https://695f03af7f037703a8128fbf.mockapi.io/api/v1/Account"
        const [accountData, setAccountData] = useState<any>([])
        const [AccountHolderId, setAccountHolderId] = useState("")
        const [entered, setEntered] = useState(false)
        
        const GrabJson = async function(){

            let req = await fetch(urlBase)
            let res = await req.json()
            setEntered(true)
            
            let userAccounts = []

            for(let x = 0; x < res.length; x++){

                if(AccountHolderId === res[x].AccountHolderId){
                    userAccounts.push(res[x])
                }

            }
            setAccountData(userAccounts)
        }

    return (
        <>
                <input 
                    placeholder="Enter your User ID"
                    value={AccountHolderId}
                    onChange={(e) => setAccountHolderId(e.target.value)}
                ></input>
                
                <button 
                    type = "button"
                    onClick={GrabJson}
                > GetJson </button>  
                              
                <div>
                    {entered && accountData ?
                        <div>

                            {accountData.map((element: any) => 
                                <p key={element}>Holder ID: {element.AccountHolderId}<br/> Account ID: {element.id} <br/>Balance: {element.balance}</p>)
                            }

                        </div> : null}                
                </div>
        </>
    )
}