import React, { useEffect, useState } from 'react';
import Table from '../components/Table';
import axios from 'axios';
// import { ChevronRightIcon, StarIcon } from '@heroicons/react/20/solid';

const HomePage = () => {
	const [keyword, setKeyword] = useState('');
	const [keywords, setKeywords] = useState([]);

	const onChangeHandler = (e) => {
		console.log(e.target.vaue);
		setKeyword(e.target.value);
	};

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		await fetchData();
	};

	const fetchData = async () => {
		await axios
			.get(`/api/keywords?keyword=${keyword}&marketplace=ATVPDKIKX0DER`)
			.then((res) => {
				console.log(res.data);
				// loop object and push to array order by impressionExact30
				const data = res.data.results.searchResults;
				const arr = [];
				for (const key in data) {
					arr.push(data[key]);
				}
				arr.sort((a, b) => b.impressionExact30 - a.impressionExact30);
				arr.unshift(res.data.results.bestPhrase);
				console.log(arr);
				setKeywords(arr);
			})

			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<div className="bg-white pb-8 sm:pb-12 lg:pb-12">
			<div className="overflow-hidden pt-8 sm:pt-12 lg:relative lg:py-48">
				<div className="mx-auto mb-10 max-w-md px-4 sm:max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-1 lg:gap-24 lg:px-8">
					<div>
						<div className="mt-10 text-center">
							<div>
								<a href="#" className="inline-flex space-x-4">
									<span className="rounded bg-indigo-50 px-2.5 py-1 text-sm font-semibold text-indigo-600">
										Amazon Search Keywords
									</span>
									<span className="inline-flex items-center space-x-1 text-sm font-medium text-indigo-600">
										<span>Beta v1.0</span>
										{/* <ChevronRightIcon className="h-5 w-5" aria-hidden="true" /> */}
									</span>
								</a>
							</div>
							<div className="mt-6 sm:max-w-xl mx-auto">
								<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
									Amazon Keyword Research
								</h1>
							</div>
							<form
								onSubmit={onSubmitHandler}
								className="mt-12 sm:flex sm:w-full sm:max-w-lg mx-auto"
							>
								<div className="min-w-0 flex-1">
									<label htmlFor="keyword" className="sr-only">
										Keyword
									</label>
									<input
										id="keyword"
										type="text"
										className="block w-full rounded-md border border-gray-300 px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
										placeholder="Enter your keyword"
										onChange={(e) => onChangeHandler(e)}
										value={keyword}
										name="keyword"
									/>
								</div>
								<div className="mt-4 sm:mt-0 sm:ml-3">
									<button
										type="submit"
										className="block w-full rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:px-10"
										onClick={(e) => onSubmitHandler(e)}
									>
										Search
									</button>
								</div>
							</form>
						</div>
						<Table keywords={keywords} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
