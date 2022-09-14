/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
	HomeIcon,
	InboxIcon,
	UsersIcon,
	XIcon,
	PencilAltIcon,
} from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
const navigation = [
	{
		name: '메뉴1',
		href: '/menu1',
		icon: HomeIcon,
	},
	{
		name: '메뉴2',
		href: '/menu2',
		icon: InboxIcon,
	},
];

const classNames = (...classes) => {
	return classes.filter(Boolean).join(' ');
};

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
	const router = useRouter();
	const currentPath = router.pathname;
	return (
		<>
			<Transition.Root show={sidebarOpen} as={Fragment}>
				<Dialog
					as="div"
					static
					className="fixed inset-0 flex z-40 md:hidden"
					open={sidebarOpen}
					onClose={setSidebarOpen}
				>
					<Transition.Child
						as={Fragment}
						enter="transition-opacity ease-linear duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-opacity ease-linear duration-300"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
					</Transition.Child>
					<Transition.Child
						as={Fragment}
						enter="transition ease-in-out duration-300 transform"
						enterFrom="-translate-x-full"
						enterTo="translate-x-0"
						leave="transition ease-in-out duration-300 transform"
						leaveFrom="translate-x-0"
						leaveTo="-translate-x-full"
					>
						<div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
							<Transition.Child
								as={Fragment}
								enter="ease-in-out duration-300"
								enterFrom="opacity-0"
								enterTo="opacity-100"
								leave="ease-in-out duration-300"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<div className="absolute top-0 right-0 -mr-12 pt-2">
									<button
										className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
										onClick={() => setSidebarOpen(false)}
									>
										<span className="sr-only">Close sidebar</span>
										<XIcon className="h-6 w-6 text-white" aria-hidden="true" />
									</button>
								</div>
							</Transition.Child>
							<div className="flex-shrink-0 flex items-center px-4">
								<Link href="/" passHref>
									<a>
										<Image
											layout="fixed"
											width={125.13}
											height={28}
											className="h-8 w-auto"
											src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
											alt="Workflow"
										/>
									</a>
								</Link>
							</div>
							<div className="mt-5 flex-1 h-0 overflow-y-auto">
								<nav className="px-2 space-y-1">
									{navigation.map((item) => (
										<Link key={item.name} href={item.href}>
											<a
												className={classNames(
													item.href === currentPath
														? 'bg-gray-100 text-gray-900'
														: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
													'group flex items-center px-2 py-2 text-base font-medium rounded-md'
												)}
											>
												<item.icon
													className={classNames(
														item.href === currentPath
															? 'text-gray-500'
															: 'text-gray-400 group-hover:text-gray-500',
														'mr-4 flex-shrink-0 h-6 w-6'
													)}
													aria-hidden="true"
												/>
												{item.name}
											</a>
										</Link>
									))}
								</nav>
							</div>
						</div>
					</Transition.Child>
					<div className="flex-shrink-0 w-14" aria-hidden="true">
						{/* Dummy element to force sidebar to shrink to fit close icon */}
					</div>
				</Dialog>
			</Transition.Root>

			{/* Static sidebar for desktop */}
			<div className="hidden md:flex md:flex-shrink-0">
				<div className="flex flex-col w-64">
					{/* Sidebar component, swap this element with another sidebar if you like */}
					<div className="flex flex-col flex-grow border-r border-gray-200 pt-5 pb-4 bg-white overflow-y-auto">
						<div className="flex items-center flex-shrink-0 px-4">
							<Link href="/" passHref>
								<a>
									<Image
										layout="fixed"
										width={125.13}
										height={28}
										className="h-8 w-auto"
										src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
										alt="Workflow"
									/>
								</a>
							</Link>
						</div>
						<div className="mt-5 flex-grow flex flex-col">
							<nav className="flex-1 px-2 bg-white space-y-1">
								{navigation.map((item) => (
									<Link key={item.name} href={item.href} passHref>
										<a
											className={classNames(
												item.href === currentPath
													? 'bg-gray-100 text-gray-900'
													: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
												'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
											)}
										>
											<item.icon
												className={classNames(
													item.href === currentPath
														? 'text-gray-500'
														: 'text-gray-400 group-hover:text-gray-500',
													'mr-3 flex-shrink-0 h-6 w-6'
												)}
												aria-hidden="true"
											/>
											{item.name}
										</a>
									</Link>
								))}
							</nav>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Sidebar;
