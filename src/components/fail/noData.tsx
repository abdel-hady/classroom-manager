import Image from "next/image";

export default function NoData() {
	return (
		<div className="w-full flex justify-center h-[35vh] sm:h-[35vh] lg:h-[45vh]">
			<div className="text-center w-[90%] flex h-[100%] flex-col justify-center items-center gap-5 text-xl text-gray-500 py-8 lg:py-4">
				<Image
					src="/no_data.svg"
					alt="No Data"
					width={1000}
					height={1000}
					className=" bg-opacity-50 object-cover w-64 h-64"
				/>
				<div>There are no data to display it</div>
			</div>
		</div>
	);
}
