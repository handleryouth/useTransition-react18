import { useCallback, useState, useTransition } from "react";

import "./styles.css";

export default function App() {
  const [isPending, startTransition] = useTransition();
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);

  const LIST_SIZE = 10001;

  /*
The useTransition hook allows us to specify some state
 updates as not as important. 
 These state updates will be executed in parallel with other state updates, 
 but the rendering of the component will not wait for these less important state updates.

*/

  const handleChange = useCallback(
    (e) => {
      setInput(e.target.value);

      //do remember by making this, you will increase amount of the re-render ocurred.
      startTransition(() => {
        const l = [];
        for (let i = 0; i < LIST_SIZE; i++) {
          l.push(e.target.value);
        }
        setList(l);
      });
    },
    [startTransition]
  );

  console.log("rendering");

  return (
    <>
      <input type="text" value={input} onChange={handleChange} />
      {isPending
        ? "loading"
        : list.map((item, index) => <div key={index}>{item}</div>)}
    </>
  );
}
