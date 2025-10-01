export default function Home() {
  return (
    <div className="max-w-screen-2xl mx-auto prose prose-lg">
      <h1>Bootpack PageSpeed Testing</h1>
      <div className="max-w-2xl">
        <p>
          This is a tool to test the PageSpeed of a website. It uses the
          PageSpeed API to get the results and display them in a readable
          format. You can also see a graph of the performance history of the
          site.
        </p>
        <p>Pick a site to test from the list below.</p>
      </div>
    </div>
  );
}
