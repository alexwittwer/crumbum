export default function sourdough({ temp, starter, flour, water }) {
    if (!temp || !starter || !flour || !water) return null
    // converts starter into % of total flour to fermeted flour
    const levainPct = starter / (flour + 0.5 * starter);

    const doubling =
      Math.log(levainPct / 0.894) *
      (-0.0000336713 * Math.pow(temp, 4) +
        0.0105207916 * Math.pow(temp, 3) -
        1.2495985607 * Math.pow(temp, 2) +
        67.0024722564 * temp -
        1374.6540546564);
    const hydration = (water / (flour + starter * 0.5)) * 100;

    const levain = levainPct * 100;

    const fixed = parseFloat(doubling.toFixed(2))
    const hours = Math.floor(fixed)
    const minutes = ((fixed - hours) * 60).toFixed(0)


    return { levain, doubling, hydration, hours, minutes};
  }