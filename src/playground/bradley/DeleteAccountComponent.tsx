import { useState } from "react"


export default function DeleteAccount() {
    
        const urlBase = "https://695f03af7f037703a8128fbf.mockapi.io/api/v1/AccountHolder/"
        let [accountHolderID, setAccountHolderID] = useState("")

        var useDelete = async function () {
            
            await fetch(urlBase+Number(accountHolderID), {
                method: "DELETE",
                headers: {'content-type': 'application/json'}
            })
        }

    return(
        <>
        <p>Delete an account</p>
        <input
            placeholder="Enter Account ID"
            value={accountHolderID}
            onChange={(e) => {setAccountHolderID(e.target.value)}}
        ></input>
        
        <button
            type="button"
            onClick={useDelete}
        >Delete</button>
        </>
    )
}