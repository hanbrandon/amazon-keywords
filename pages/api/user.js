import dbConnect from '../../lib/dbConnect';
import User from '../../models/user';

import { getSession } from 'next-auth/react';

export const handler = async (req, res) => {
	console.log('hi');

	const { method } = req;
	await dbConnect();
	// switch the methods
	switch (method) {
		case 'GET':
			await getUser(req, res);
			break;
		case 'PUT':
			await updateUser(req, res);
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
};

// };

const getUser = async (req, res) => {
	const session = await getSession({ req });
	if (session) {
		try {
			const user = await User.findById({
				_id: session.user.id,
			});
			return res.status(200).json({
				user: user,
				success: true,
			});
		} catch (error) {
			console.log(error);
			return res.status(400).json({
				message: new Error(error).message,
				success: false,
			});
		}
	} else {
		return res.status(401).send({
			err: 'You need to be signed in.',
		});
	}
};

const updateUser = async (req, res) => {
	const updatedUser = await User.findByIdAndUpdate(req.body._id, req.body, {
		new: true,
		runValidators: true,
		context: 'query',
	});
	if (!updateUser)
		return res.status(400).json({
			message: 'User not found',
			success: false,
		});
	return res.status(200).json({
		user: updatedUser,
		success: true,
	});
};
export default handler;
