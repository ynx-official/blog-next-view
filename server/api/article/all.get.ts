import { ArticleSchema } from '~/server/models/article.schema';

export default defineEventHandler(async event => {
	try {
		return await ArticleSchema.find({}, { content: 0 });
	} catch (error) {
		return error;
	}
});
