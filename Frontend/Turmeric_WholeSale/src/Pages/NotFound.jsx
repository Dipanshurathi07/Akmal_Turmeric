import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-slate-900 dark:bg-black dark:text-white px-4">
      <div className="max-w-xl text-center rounded-3xl border border-slate-200 bg-white p-10 shadow-xl shadow-slate-200/70 dark:border-slate-700 dark:bg-slate-950 dark:shadow-black/25">
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-orange-500">Page Not Found</p>
        <h1 className="mt-6 text-6xl font-bold">404</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
          The page you’re looking for doesn’t exist or you entered the wrong address.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
