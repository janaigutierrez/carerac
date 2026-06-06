'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function SobreNosaltresPage() {
  return (
    <div className="min-h-screen bg-primary-white flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="font-display text-5xl font-bold text-primary-dark mb-4">Sobre nosaltres</h1>
        <p className="text-primary-gray font-body text-lg mb-8">
          Aviat aqui podras llegir la historia completa de Carerac, els seus orígens i el seu present.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-primary-brown text-primary-white px-6 py-3 rounded-full hover:bg-primary-dark transition-colors font-medium"
        >
          <ArrowLeft size={18} />
          Tornar a l&apos;inici
        </Link>
      </div>
    </div>
  )
}
