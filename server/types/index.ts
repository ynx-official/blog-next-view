export interface IUser {
	_id: string;
	nickname: string;
	password: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface IArticle {
	_id?: string;
	shortLink: string;
	title: string;
	description?: string;
	cover?: string;
	category?: string;
	tags: string[];
	content?: string;
	authorId: string;
	status?: string;
	views?: number;
	likes?: number;
	ogImage?: string;
	link?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface IFriend {
	_id?: string;
	title: string;
	bio: string;
	avatar: string;
	url: string;
	email?: string;
	screenShot?: string;
	status?: string;
	createdAt?: Date;
	updatedAt?: Date;
}
