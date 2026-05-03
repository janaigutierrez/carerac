import Link from 'next/link'
import { getSession } from '@/lib/session'
import AdminLoginForm from './AdminLoginForm'
import AdminDashboard from './AdminDashboard'
import LogoutButton from './LogoutButton'

export const metadata = {
  title: 'Admin - Can Carerac',
}

export default async function AdminPage() {
  const session = await getSession()

  if (!session.isAdmin) {
    return <AdminLoginForm />
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdminDashboard />
      </main>
    </div>
  )
}
