import {useState} from "react"

export default function CreateAccountComponent() {

    const urlBase = "https://695f03af7f037703a8128fbf.mockapi.io/api/v1/Account"

    let [accountID, setAccountID] = useState("")
    let [AccountHolderId, setAccountHolderID] = useState("")
    let [selectedType, setSelectedType] = useState("checking")

    var Create = async function() {
        
        let created = new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }).format(Date.now())

        let newObject = {
            createdAt: created,
            balance: 0,
            type: selectedType,
            id: accountID,
            AccountHolderId: AccountHolderId,
        }

        await fetch(urlBase, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(newObject)
        })  

        setAccountID("")
        setAccountHolderID("")

    }

    return (
        <>
        <p>Create an Account</p><br/>

        <input
            placeholder = "Enter Your account ID"
            value={accountID}
            onChange={(e) => {setAccountID(e.target.value)}}
        ></input>

        <input
            placeholder="Enter Your account holder ID"
            value={AccountHolderId}
            onChange={(e) => {setAccountHolderID(e.target.value)}}
        ></input>

        <p>Select your account type</p><br/>
        
        <input
            id="checking"
            type="radio"
            name="accountType"
            value="checking"
            checked={selectedType === "checking"}
            onChange={(e) => setSelectedType(e.target.value)}
        ></input>
        <label htmlFor="checking">Checking</label>

        <input
            id="savings"
            type="radio"
            name="accountType"
            value="savings"
            checked={selectedType === "savings"}
            onChange={(e) => setSelectedType(e.target.value)}
        ></input>
        <label htmlFor="savings">Savings</label>
        <br></br>
        <br></br>
        
        <button
            type="button"
            onClick={Create}
        >Make-a-tha-Account</button>
        </>
    )
}
