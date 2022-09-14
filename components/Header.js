import React, {
  Fragment,
  useState,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  getCsrfToken,
} from 'next-auth/react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  BellIcon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  MenuAlt2Icon,
  UsersIcon,
  XIcon,
} from '@heroicons/react/outline';
import { SearchIcon } from '@heroicons/react/solid';

const userNavigation = [
  { name: '내 프로필', href: '/user/my-profile' },
  { name: '계정 설정', href: '/user/my-account' },
];

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

const Header = () => {
  const { data: session } = useSession();
  const menuRef = useRef();
  const avatarRef = useRef();

  const router = useRouter();

  return (
    <div className="flex-1 px-4 flex justify-between">
      <div className="flex-1 flex">
        <form className="w-full flex md:ml-0" action="#" method="GET">
          <label htmlFor="search_field" className="sr-only">
            Search
          </label>
          <div className="relative w-full text-gray-400 focus-within:text-gray-600">
            <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            <input
              id="search_field"
              className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
              placeholder="Search"
              type="search"
              name="search"
            />
          </div>
        </form>
      </div>
      <div className="ml-4 flex items-center md:ml-6">
        {/* Profile dropdown */}{' '}
        {session ? (
          <>
            <button className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <Menu as="div" className="ml-3 relative">
              {({ open }) => (
                <>
                  <div>
                    <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <span className="sr-only">Open user menu</span>
                      {session ? (
                        <img
                          className="h-8 w-8 rounded-full"
                          src={session.user.image}
                          alt=""
                        />
                      ) : (
                        ''
                      )}
                    </Menu.Button>
                  </div>
                  <Transition
                    show={open}
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items
                      static
                      className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.href}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                      <Menu.Item key={'logout'}>
                        {({ active }) => (
                          <a
                            onClick={(e) => signOut()}
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            로그아웃
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>
          </>
        ) : (
          <Link href="/login">
            <a>
              <button
                type="button"
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Login
              </button>
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
