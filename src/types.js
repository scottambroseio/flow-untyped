// @flow

export type FlowConfig = {
	includes?: { [key: string]: boolean },
	ignore?: { [key: string]: boolean },
	libs?: { [key: string]: boolean },
	options?: { [key: string]: boolean },
	version: { [key: string]: boolean },
};

export type PackageJson = {
	main?: string,
	version: string,
	dependencies?: {},
	devDependencies?: {},
};
