import Step1 from "./Step1";
import Step2 from "./Step2";
import memberList from "./test.json";

function App() {
  console.log("memberList", memberList);

  return (
    <>
      <h2>Hello, Welcome to xOne_Frame</h2>
      <Step1 />
      <Step2 />
    </>
  );
}

export default App;
