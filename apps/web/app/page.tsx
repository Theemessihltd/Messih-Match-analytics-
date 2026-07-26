export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <section className="flex flex-col items-center justify-center py-20">
        <h1 className="text-5xl font-bold text-green-400">
          Messih Match Analytics
        </h1>

        <p className="mt-4 max-w-2xl text-center text-gray-300">
          AI-powered football match analysis and prediction platform.
        </p>

        <button className="mt-8 rounded-lg bg-green-500 px-6 py-3 font-semibold hover:bg-green-600">
          Get Predictions
        </button>
      </section>

      <section className="px-8 py-12">
        <h2 className="mb-6 text-3xl font-bold">
          Today's Featured Matches
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-gray-800 p-6">
            <h3 className="text-xl font-bold">Liverpool vs Arsenal</h3>
            <p className="text-gray-400">Premier League</p>
          </div>

          <div className="rounded-lg bg-gray-800 p-6">
            <h3 className="text-xl font-bold">Barcelona vs Real Madrid</h3>
            <p className="text-gray-400">La Liga</p>
          </div>

          <div className="rounded-lg bg-gray-800 p-6">
            <h3 className="text-xl font-bold">PSG vs Marseille</h3>
            <p className="text-gray-400">Ligue 1</p>
          </div>
        </div>
      </section>
    </main>
  );
}
