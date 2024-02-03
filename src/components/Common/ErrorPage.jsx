import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <main className="flex flex-col justify-center items-center">
      <h1 className="text-8xl font-semibold">404 Not Found</h1>
      <div>Oops, nothing here</div>
      <Link to="/">
        <button>Go back to home page</button>
      </Link>
    </main>
  );
}
