import {useState} from "react"

export default function CreateUserComponent() {

    const urlBase = "https://695f03af7f037703a8128fbf.mockapi.io/api/v1/AccountHolder"

    let [AccountHolderId, setAccountHolderID] = useState("")
    let [firstName, setFirstName] = useState("")
    let [lastName, setLastName] = useState("")

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
            firstName: firstName,
            lastName: lastName,
            id: AccountHolderId,
        }

        await fetch(urlBase, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(newObject)
        })  

        setAccountHolderID("")
        setFirstName("")
        setLastName("")

    }

    return (
        <>
        <p>Create an Account</p><br/>

        <input
            placeholder = "Enter Your Desired Account ID"
            value={AccountHolderId}
            onChange={(e) => {setAccountHolderID(e.target.value)}}
        ></input>

        <input
            placeholder="Enter Your First name"
            value={firstName}
            onChange={(e) => {setFirstName(e.target.value)}}
        ></input>

        <input
            placeholder="Enter Your Last Name"
            value={lastName}
            onChange={(e) => {setLastName(e.target.value)}}
        ></input>

        <button
            type="button"
            onClick={Create}
        >Create yo user</button>
        </>
    )
}
