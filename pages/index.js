import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { getSession, useSession } from 'next-auth/react';
import axios from 'axios';

const HomePage = () => {
	const { data: session, status } = useSession();
	const router = useRouter();
	console.log(session);
	// useEffect(() => {
	// 	if (status === 'unauthenticated') {
	// 		router.push('/login');
	// 	}
	// }, [status, router]);

	return <Layout>HomePage</Layout>;
};

export const getServerSideProps = async (ctx) => {
	const session = await getSession(ctx);
	const headers = ctx.req.headers;
	console.log(process.env.NEXTAUTH_URL);
	if (session) {
		const response = await axios.get(`${process.env.NEXTAUTH_URL}/api/user`, {
			headers: { Cookie: headers.cookie },
		});
		return {
			props: {
				user: response.data,
			},
		};
	} else {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}
};

export default HomePage;
