import React from "react";
import { useImmer } from "use-immer";
import sourdough from "../../utils/sourdough";

export default function SourdoughCalculator() {
  const [data, updateData] = useImmer({
    temp: null,
    flour: null,
    water: null,
    starter: null,
  });
  const [results, updateResults] = useImmer(null);

  function updateFormData(field, value) {
    updateData((draft) => {
      draft[field] = value;
    });
  }

  return (
    <main className="max-w-3/4 mx-auto">
      {results !== null ? (
        <div className="flex flex-col gap-3 justify-center">
          <div className="min-w-3/4 flex flex-col gap-5 ">
            <div className="flex p-5 justify-between bg-slate-700 rounded-lg">
              <p>Starter: </p>
              <p>{results.levain.toFixed(2)}%</p>
            </div>
            <div className="flex p-5 bg-slate-700 rounded-lg justify-between">
              <p>Hydration: </p>
              <p>{results.hydration.toFixed(2)}%</p>
            </div>
            <div className="flex bg-slate-700 gap-5 rounded-lg p-5 justify-between">
              <p>Time to Double: </p>
              <p>
                {results.hours}h {results.minutes}m
              </p>
            </div>
          </div>
          <button
            className="btn btn-primary self-center"
            onClick={() => updateResults(null)}
          >
            Reset
          </button>
        </div>
      ) : (
        <form
          className="grid gap-3"
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            updateResults(sourdough(data));
          }}
        >
          <div className="grid grid-cols-1 gap-3">
            <p className="text-center max-w-72">
              <p className="text-red-600">Warning:</p> Results are just an
              estimate and this is a work in progress
            </p>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Flour</span>
              </div>
              <input
                className="input"
                defaultValue={data.flour}
                type="number"
                placeholder="in grams"
                onChange={(e) => {
                  updateFormData("flour", parseInt(e.target.value));
                }}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Water</span>
              </div>
              <input
                className="input"
                type="number"
                defaultValue={data.water}
                placeholder="in grams"
                onChange={(e) => {
                  updateFormData("water", parseInt(e.target.value));
                }}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Starter</span>
              </div>
              <input
                className="input"
                type="number"
                placeholder="grams"
                defaultValue={data.starter}
                onChange={(e) => {
                  updateFormData("starter", parseInt(e.target.value));
                }}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Temperature</span>
              </div>
              <input
                className="input"
                type="number"
                defaultValue={data.temp}
                placeholder="in Fahreinheit"
                onChange={(e) => {
                  updateFormData("temp", parseFloat(e.target.value));
                }}
              />
            </label>
          </div>
          <div className="flex gap-3 justify-center">
            <button
              className="btn btn-primary grid"
              disabled={
                !(data.flour && data.water && data.starter && data.temp)
              }
              onClick={() => {}}
            >
              Submit
            </button>
            <input type="reset" className="btn btn-accent"></input>
          </div>
        </form>
      )}
    </main>
  );
}
