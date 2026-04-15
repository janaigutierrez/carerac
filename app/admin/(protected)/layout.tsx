import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getSession } from '@/lib/session'
import LogoutButton from './LogoutButton'

export const metadata = {
  title: 'Admin - Can Carerac',
}

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  if (!session.isAdmin) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-primary-stone">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="font-display text-xl font-bold text-primary-dark">
            <Link href="/admin">Can Carerac · Admin</Link>
          </h1>
          <LogoutButton />
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  )
}
