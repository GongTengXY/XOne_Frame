import { useState } from "react";

function Step2() {
  const [count, setCount] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCount(e.target.value);
  };
  return (
    <div>
      <p>受控组件1212</p>
      <input
        type="text"
        value={count}
        onChange={onChange}
      />
      <br />
      <p>非受控组件</p>
      <input type="text" />
    </div>
  );
}

export default Step2;
