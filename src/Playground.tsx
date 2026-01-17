import RandomNumber from "./playground/guido/RandomNumber";
import SheenaComponent1 from "./playground/sheena/Component1";
import SheenaComponent2 from "./playground/sheena/Component2";
import SheenaComponent3 from "./playground/sheena/Component3";
import BradleyComponent1 from "./playground/bradley/Component1";
import BradleyComponent2 from "./playground/bradley/Component2";
import BradleyComponent3 from "./playground/bradley/Component3";
import GuidoComponent1 from "./playground/guido/Component1";
import GuidoComponent2 from "./playground/guido/Component2";

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
          <BradleyComponent1/> 
        </article>

        <article>
          <header>Bradley Component 2</header>
          <BradleyComponent2/> 
        </article>

        <article>
          <header>Bradley Component 3</header>
          <BradleyComponent3/> 
        </article>

      </div>
      <div>Guido

        <article>
          <header>Guido Component 1</header>
          <GuidoComponent1/> 
        </article>

        <article>
          <header>Guido Component 1</header>
          <GuidoComponent2 /> 
        </article>

        <article>
          <header>Random Number Component</header>
          <RandomNumber/> 
        </article>

      </div>
    </div>
      
    </>
  )
}