import SheenaComponent1 from "./playground/sheena/Component1";
import SheenaComponent2 from "./playground/sheena/Component2";
import SheenaComponent3 from "./playground/sheena/Component3";
import DepositComponent from "./playground/bradley/DepositComponent";
import GetAccountComponent from "./playground/bradley/GetAccountComponent";
import WithdrawComponent from "./playground/bradley/WithdrawComponent";
import GuidoComponent1 from "./playground/guido/Component1";
import GuidoComponent2 from "./playground/guido/Component2";
import GuidoComponent3 from "./playground/guido/Component3";
import RandomNumber from "./playground/guido/RandomNumber";

export default function Playground() {
  return (
    <>
    <h1>Playground</h1>
    <div className="grid">
      
      <div>Sheena

        <article>
          <header>Sheena Component 1</header>
          <SheenaComponent1/> 
        </article>

        <article>
          <header>Sheena Component 2</header>
          <SheenaComponent2/> 
        </article>

        <article>
          <header>Sheena Component 3</header>
          <SheenaComponent3/>  
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