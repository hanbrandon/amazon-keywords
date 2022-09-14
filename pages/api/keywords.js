const axios = require('axios');

const handler = async (req, res) => {
	const { method } = req;
	switch (method) {
		case 'GET':
			return await getKeywords(req, res);
		default:
			return res.status(405).json({ message: 'Method not allowed' });
	}
};

const getKeywords = async (req, res) => {
	const { keyword, marketplace } = req.query;
	const url = `https://members.helium10.com/api/v1/cerebro/product/magnet-demo-search`;
	const data = {
		keyword: keyword,
		marketplace: marketplace,
	};
	await axios
		.post(url, data)
		.then((response) => {
			res.status(200).json(response.data);
		})
		.catch((err) => {
			console.log(err);
		});
};

export default handler;
