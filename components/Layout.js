import React, { Fragment, useState, ReactNode } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
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
import toast, { Toaster } from 'react-hot-toast';

import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children }) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	return (
		<div>
			<Toaster position="bottom-right" reverseOrder={false} />
			<div className="h-screen flex overflow-hidden bg-gray-100">
				<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
				<div className="flex flex-col w-0 flex-1 overflow-hidden">
					<div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
						<button
							className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
							onClick={() => setSidebarOpen(true)}
						>
							<span className="sr-only">Open sidebar</span>
							<MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
						</button>
						<Header />
					</div>

					<main className="flex-1 relative overflow-y-auto focus:outline-none">
						<div className="p-4">
							{/* Replace with your content */}
							{children}
							{/* /End replace */}
						</div>
					</main>
				</div>
			</div>
		</div>
	);
};

export default Layout;
