import { useState } from "react"


export default function DeleteAccount() {
    
        const urlBase = "https://695f03af7f037703a8128fbf.mockapi.io/api/v1/Account"
        let [accountID, setAccountID] = useState("")

        var useDelete = async function () {
            
            await fetch(urlBase+"/"+accountID, {
                method: "DELETE"
            }) 
        }

    return(
        <>
        <p>Delete an account</p>
        <input
            placeholder="Enter Account ID"
            value={accountID}
            onChange={(e) => {setAccountID(e.target.value)}}
        ></input>
        
        <button
            type="button"
            onClick={useDelete}
        >Delete</button>
        </>
    )
}