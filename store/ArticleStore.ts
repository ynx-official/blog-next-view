import { defineStore } from 'pinia';
import {getArticleById, getArticlePage} from "~/api/article";
import type {Ref} from "@vue/reactivity";
import type {IArticle} from "~/api/article/types";

export const useArticleStore = defineStore('articleStore', () => {
	const articles: Ref<IArticle[]> = ref([]);

	const articleMap: Record<string, IArticle> = reactive({});
	async function getAll() {
		const res = await getArticlePage({
			size: 6,
		});
		articles.value = [];
		if (res) {
			res.data.records.forEach((article: any) => {
				articles.value.push(article);
			});
		}
		return articles.value
			.sort((a, b) => {
				return new Date(b.createTime).getTime() - new Date(a.createTime).getTime();
			});
	}

	async function getOne(articleId: number) {
		const  data  = await getArticleById(articleId);
		if (data){
			articleMap[articleId] = data.data;
		}
	}

	async function one(articleId: number): Promise<IArticle> {
		if (!articleMap[articleId]){
			await getOne(articleId);
		}
		return articleMap[articleId];
	}

	return { getAll,one };
});
