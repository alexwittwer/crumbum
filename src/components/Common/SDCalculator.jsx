import { useState } from "react";
import { sourdough } from "../../utils/calculateSourdoughRise";

export default function SDCalculator() {
  const [formData, setFormData] = useState({});
  const [temp, setTemp] = useState();
  const [flour, setFlour] = useState();
  const [water, setWater] = useState();
  const [salt, setSalt] = useState();
  const [starter, setStarter] = useState();
  const [speed, setSpeed] = useState();

  function handleTemp(input) {
    return setTemp(input);
  }

  function handleFlour(input) {
    return setFlour(input);
  }

  function handleWater(input) {
    return setWater(input);
  }

  function handleSalt(input) {
    return setSalt(input);
  }

  function handleStarter(input) {
    return setStarter(input);
  }

  function handleSpeed(input) {
    return setSpeed(input);
  }

  return (
    <main className="max-w-3/4 mx-auto">
      <form
        className="grid gap-3"
        action=""
        onSubmit={(e) => e.preventDefault()}
      >
        {" "}
        <div className="grid grid-cols-2 gap-3">
          <input
            className="input"
            type="number"
            placeholder="Flour (grams)"
            onChange={(e) => {
              handleFlour(e.target.value);
            }}
          />
          <input
            className="input"
            type="number"
            placeholder="Water (grams)"
            onChange={(e) => {
              handleWater(e.target.value);
            }}
          />{" "}
          <input
            className="input"
            type="number"
            placeholder="Starter (grams)"
            onChange={(e) => {
              handleStarter(e.target.value);
            }}
          />{" "}
          <input
            className="input"
            type="number"
            placeholder="Starter Speed (try 1.23)"
            onChange={(e) => {
              handleSpeed(e.target.value);
            }}
          />
          <div className="flex input justify-between">
            {" "}
            <label className="text-center my-3" htmlFor="salt">
              Salt
            </label>
            <select
              className="bg-opacity-50 my-1 rounded-md px-10"
              id="salt"
              name="salt"
              onChange={(e) => handleSalt(e.target.value)}
            >
              <option className="" value="salt-0">
                0%
              </option>
              <option className="" value="salt-2">
                2%
              </option>
            </select>{" "}
          </div>
          <input
            className="input"
            type="number"
            placeholder="Avg Temp (fahreinheit)"
            onChange={(e) => {
              handleTemp(e.target.value);
            }}
          />{" "}
        </div>
        <div className="flex gap-3 justify-center">
          <button className="btn btn-primary grid" onClick={() => {}}>
            Submit
          </button>
          <input type="reset" className="btn btn-accent"></input>
        </div>
      </form>
    </main>
  );
}