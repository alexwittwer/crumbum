import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <>
      <div className="mockup-code">
        <pre data-prefix="1">
          <code>const name: "alex"</code>
        </pre>
        <pre data-prefix="2">
          <code>installing...</code>
        </pre>
        <pre data-prefix="3" className="bg-warning text-warning-content">
          <code>Error!</code>
        </pre>
      </div>
    </>
  );
}
