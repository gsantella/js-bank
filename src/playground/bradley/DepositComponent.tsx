import { useState } from "react"

//boy i should document more
export default function DepositComponent() {
    
        const urlBase = "https://695f03af7f037703a8128fbf.mockapi.io/api/v1/Account"
        let [accountID, setAccountID] = useState("")
        let [amount, setAmount] = useState("")
        let [entered, setEntered] = useState(false)
        let [accountData, setAccountData] = useState<any>(null)

        var GrabJson = async function(){
            let req = await fetch(urlBase+"/"+accountID)
                let res = await req.json()
            setAccountData(res)
            return res
        }

        var SubmitAccountID = async function () {
            let res = await GrabJson()
            setAccountData(res)
            setAccountID(res.id)
            setEntered(true)
        }

        var SubmitDeposit = async function () {


                let res = await GrabJson()

                let newBalance = Number(res.balance) + Number(amount)

                await fetch(urlBase + "/" + accountID, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify({ balance : newBalance})
                })
                
                setAccountData({...accountData, balance: newBalance})
                setAmount("")
                setEntered(true)
        }

        var Reset = async function() {
            setAccountID("")
            setAmount("")
            setEntered(false)
        }

    return (
        <>
            {entered == false ? (
                <div>
                <input 
                    placeholder="Enter your account ID"
                    value={accountID}
                    onChange={(e) => setAccountID(e.target.value)}
                ></input>

                <button 
                    type= "button"
                    onClick={SubmitAccountID}
                > Submit ID</button>  
                </div>
            ) :   
                <div>
                    {accountData ? (
                        <p><br/>Account ID: {accountData.id}<br/>Account Holder ID:  {accountData.AccountHolderId}<br/>Balance:    ${accountData.balance}
                        </p>) : null}

                    <input 
                        placeholder="Enter Deposit Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    ></input> 
                    <br/>

                    <button
                        type="button"
                        onClick={() => SubmitDeposit()}
                    > Submit Amount</button>
                    <br/>
                    <button
                        type="button"
                        onClick={() => Reset()}
                    > Can i have a Mulligan?</button>
                </div>       
            }
        </>
    )
}