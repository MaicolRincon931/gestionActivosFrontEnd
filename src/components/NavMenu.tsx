import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/20/solid'
import { Link, useNavigate } from 'react-router-dom'
import { User } from '../types'

type NavMenuProps = {
  name: User['name'],
  role: User['role'], // Added role prop
}

export default function NavMenu({ name, role }: NavMenuProps) {

  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('AUTH_TOKEN_ACTIVO') // Remove auth token
    navigate('/auth/login') // Redirect to login page
  }

  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 p-1 rounded-lg bg-blue-400">
        <Bars3Icon className="w-8 h-8 text-white " />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen lg:max-w-min -translate-x-1/2 lg:-translate-x-48">
          <div className="w-full lg:w-56 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
            
            {/* Display user name and role */}
            <p className="text-center">
              {name} || {role}
            </p>

            <Link to="/" className="block p-2 hover:text-blue-950">
              Inicio
            </Link>
            <Link to="/assets/create" className="block p-2 hover:text-blue-950">
              Registrar Activo
            </Link>

            {/* Show only if user is an Administrator */}
            {role === "Administrador" && (
              <Link
                to="/auth/register"
                className="block p-2 hover:text-blue-950"
              >
                Registrar Usuario
              </Link>
            )}

            <button
              className="block p-2 hover:text-blue-950"
              type="button"
              onClick={logout}
            >
              Cerrar Sesión
            </button>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
