import Head from 'next/head';
import Link from 'next/link';

import { useRouter } from 'next/router';
import axios from 'axios';
import toast from 'react-hot-toast';

import { useCallback, useEffect, useRef, useState } from 'react';

const ForgotPasswordPage = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const nameRef = useRef();

	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			setIsLoading(true);
			const response = await axios.post('/api/auth/reset', {
				email: emailRef.current.value,
			});
			toast.success('Check your email for a reset link');
		} catch (e) {
			toast.error(e.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Head>
				<title>Forget password</title>
			</Head>
			<div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-md">
					<Link href="/" passHref>
						<a>
							<img
								className="mx-auto h-12 w-auto"
								src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
								alt="Workflow"
							/>
						</a>
					</Link>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Forgot Password
					</h2>
				</div>

				<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
					<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
						<form className="space-y-4" onSubmit={onSubmit}>
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium text-gray-700"
								>
									Email address
								</label>
								<div className="mt-1">
									<input
										ref={emailRef}
										id="email"
										name="email"
										type="email"
										autoComplete="email"
										required
										className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									/>
								</div>
							</div>

							<div>
								<button
									type="submit"
									className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
									loading={isLoading}
								>
									Reset Password
								</button>
							</div>
							<div className="flex items-center justify-between">
								<div className="flex items-center">
									{/* <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember_me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label> */}
								</div>
								<div className="text-sm">
									<Link href="/login" passHref>
										<a className="font-medium text-indigo-600 hover:text-indigo-500">
											Want to go back to login?
										</a>
									</Link>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default ForgotPasswordPage;
