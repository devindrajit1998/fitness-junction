import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#131824] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md">
        <span className="text-[#6EFF8F] font-heading font-extrabold text-8xl tracking-wider block mb-2">
          404
        </span>
        <h1 className="text-3xl font-heading font-bold uppercase tracking-wide text-white mb-4">
          Page Not Found
        </h1>
        <p className="text-[#A3A3A3] mb-8 text-base">
          The fitness page or resource you are looking for has been moved or does not exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#6EFF8F] text-[#131824] font-heading font-bold uppercase px-8 py-3.5 rounded-lg hover:bg-[#c4e600] transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
