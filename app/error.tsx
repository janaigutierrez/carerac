'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-primary-white flex items-center justify-center">
      <div className="text-center px-4">
        <h2 className="font-display text-3xl font-bold text-primary-dark mb-4">
          Alguna cosa ha anat malament
        </h2>
        <p className="text-primary-gray font-body mb-8">
          {error.message || "S'ha produit un error inesperat."}
        </p>
        <button
          onClick={reset}
          className="bg-primary-brown text-primary-white px-8 py-3 rounded-full font-medium hover:bg-primary-dark transition-colors"
        >
          Tornar a intentar
        </button>
      </div>
    </div>
  )
}
