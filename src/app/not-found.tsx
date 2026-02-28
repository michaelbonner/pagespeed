import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen">
      <div>
        <h1 className="text-4xl font-bold">404: Not Found</h1>
        <p className="text-lg">Could not find requested page.</p>
      </div>
      <Link className="text-sky-600 underline" href="/">
        Go back to the home page
      </Link>
    </div>
  );
}
