import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/context/AuthContext'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { Logo } from '@/components/Logo'

export function Navbar() {
  const { t } = useTranslation()
  const { user } = useAuth()
  const router = useRouter()

  const isAdmin = user?.role === 'admin'

  return (
    <header className="w-full bg-purple-900 text-white px-4 py-3 shadow-md">
      <nav className="max-w-screen-xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-bold">
          <Logo />
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link href="/advantages" className="hover:underline">
            {t('mainNavigationContent.advantages')}
          </Link>
          <Link href="/affinities" className="hover:underline">
            {t('mainNavigationContent.affinities')}
          </Link>
          <Link href="/hotel-question" className="hover:underline">
            {t('mainNavigationContent.hotelQuestion')}
          </Link>
          {isAdmin && (
            <Link href="/admin" className="hover:underline">
              Admin
            </Link>
          )}
          <LanguageSwitcher />
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center space-x-3">
          <LanguageSwitcher />
        </div>
      </nav>
    </header>
  )
}

export default Navbar
