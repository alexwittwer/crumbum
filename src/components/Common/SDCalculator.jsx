import { useState } from "react";

export default function SDCalculator() {
  const [formData, setFormData] = useState({});
  const [temp, setTemp] = useState();
  const [flour, setFlour] = useState();
  const [water, setWater] = useState();
  const [salt, setSalt] = useState();

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

  return (
    <main className="max-w-3/4 mx-auto">
      <form
        className="grid gap-3"
        action=""
        onSubmit={(e) => e.preventDefault()}
      >
        {" "}
        <div className="grid grid-cols-1 gap-3">
          <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Flour</span> 
</div>
          <input
            className="input"
            type="number"
            placeholder="Flour (grams)"
            onChange={(e) => {
              handleFlour(e.target.value);
            }}
          />
</label>
          <input
            className="input"
            type="number"
            placeholder="Water (grams)"
            onChange={(e) => {
              handleWater(e.target.value);
            }}
          />
            <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Salt</span>
          </div>
            <select id="salt"
              name="salt"
              onChange={(e) => handleSalt(e.target.value)} className="select select-bordered">
                <option disabled selected>Pick one</option>
                <option>None</option>
                <option>2%</option>
              </select>
            </label>
          <input
            className="input"
            type="number"
            placeholder="Temperature (70 f)"
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
