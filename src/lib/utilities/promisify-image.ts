export function promisifyImage(url: string) {
	const image = new Image();
	image.src = url;
	return new Promise<string>((resolve, reject) => {
		image.addEventListener("load", () => {
			resolve(url);
		});
		image.addEventListener("error", (error) => {
			reject(error);
		});
	});
}
