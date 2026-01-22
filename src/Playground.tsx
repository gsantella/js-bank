import { useState } from "react";
import SheenaComponent1 from "./playground/sheena/Component1";
import SheenaComponent2 from "./playground/sheena/Component2";
import SheenaComponent3 from "./playground/sheena/Component3";
import BankAccounts from "./playground/sheena/Component1";
import Pending from "./playground/sheena/Pending";
import NewUser from "./playground/sheena/NewUser";
import UpdateUser from "./playground/sheena/UpdateUser";
import Withdrawal from "./playground/sheena/Withdrawal";
import DeleteAccounts from "./playground/sheena/Delete";
import CreateJointAccount from "./playground/sheena/JointAccount";
import AccountPage from "./playground/sheena/AccountPage";
import DepositComponent from "./playground/bradley/DepositComponent";
import GetAccountComponent from "./playground/bradley/GetAccountComponent";
import WithdrawComponent from "./playground/bradley/WithdrawComponent";
import GuidoComponent1 from "./playground/guido/Component1";
import GuidoComponent2 from "./playground/guido/Component2";
import GuidoComponent3 from "./playground/guido/Component3";
import RandomNumber from "./playground/guido/RandomNumber";
import GetAllAccounts from "./playground/bradley/GetAllAccountsComponent";
import CreateAccountComponent from "./playground/bradley/CreateAccountComponent";
import GetBankBalance from "./playground/bradley/GetBankBalanceComponenet";
import GetUserAccountsComponent from "./playground/bradley/GetUserAccountsComponent";
import DeleteAccount from "./playground/bradley/DeleteAccountComponent";

export default function Playground() {
  //  Add balances state here
  const [balances, setBalances] = useState({
    savings: 2450.75,
    checking: 820.32,
  });

  return (
    <>
      <h1>Playground</h1>
      <div className="grid">
        <div>Sheena
          <article>
            <header>Seaarch Component</header>
            <BankAccounts /> 
          </article>

          <article>
            <header>Deposit Component</header>
            {/* Render as JSX and pass balances */}
            <SheenaComponent2 balances={balances} />
          </article>

          <article>
            <header>User Transfer Comp</header>
            {/* Render as JSX and pass balances + setBalances */}
            <SheenaComponent3 balances={balances} setBalances={setBalances} />
          </article>

          <article>
            <header>Pending Withdrawals</header>
            <Pending />  
          </article>

          <article>
            <header>New User Lay</header>
            <NewUser />  
          </article>

          <article>
            <header>Update user Lay</header>
            <UpdateUser />  
          </article>\
          
          <article>
            <header>Withdrawal Lay</header>
            <Withdrawal/>  
          </article>
            <article>
            <header>Delete Lay</header>
            <DeleteAccounts/>  
          </article>
          <article>
          <header>JointAccount Lay</header>
            <CreateJointAccount/>  
          </article>
            <article>
          <header>Totals Lay</header>
            <AccountPage/>  
          </article>
        </div>
      <div>Bradley


        <article>
          <header>Bradley Component 1</header>
          <GetAccountComponent/> 
        </article>

        <article>
          <header>Bradley Component 2</header>
          <DepositComponent/> 
        </article>

        <article>
          <header>Bradley Component 3</header>
          <WithdrawComponent/> 
        </article>

        <article>
          <header>Bradley Component 4</header>
          <GetAllAccounts/> 
        </article>

        <article>
          <header>Bradley Component 5</header>
          <CreateAccountComponent/>
        </article>

        <article>
          <header>Bradley Component 6</header>
          <GetBankBalance/>
        </article>

        <article>
          <header>Bradley Component 7</header>
          <GetUserAccountsComponent/>
        </article>
        
        <article>
          <header>Bradley Component 8</header>
          <DeleteAccount/>
        </article>
        


      </div>
      <div>Guido

        <article>
          <header>Guido Component 1</header>
          <GuidoComponent1/> 
        </article>

        <article>
          <header>Guido Component 2</header>
          <GuidoComponent2 /> 
        </article>

        <article>
          <header>Random Number Component</header>
          <RandomNumber/> 
        </article>

        <article>
          <header>Guido Component 3</header>
          <GuidoComponent3 /> 
        </article>

      </div>
    </div>
      
    </>
  )
}