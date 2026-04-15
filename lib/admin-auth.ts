import bcrypt from 'bcryptjs'

export async function validateAdminCredentials(username: string, password: string): Promise<boolean> {
  const expectedUsername = process.env.ADMIN_USERNAME
  const expectedHash = process.env.ADMIN_PASSWORD_HASH

  if (!expectedUsername || !expectedHash) {
    console.error('Admin credentials not configured')
    return false
  }

  if (username !== expectedUsername) return false

  return bcrypt.compare(password, expectedHash)
}
