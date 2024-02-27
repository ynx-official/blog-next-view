import { defineStore } from 'pinia';
import {getMenuInfo} from "~/api/article";
import type {Ref} from "@vue/reactivity";
import type {IArticle} from "~/api/article/types";

export const useArticleStore = defineStore('articleStore', () => {
	const articles: Ref<IArticle[]> = ref([]);

	const article: Record<string, IArticle> = reactive({});
	async function getAll() {
		const res = await getMenuInfo({
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

	async function getOne(shortLink: number) {
		const { data } = await useFetch<IArticle>(`/api/article/${shortLink}`);
		if (data.value) article[shortLink] = data.value;
	}

	async function one(id: number): Promise<IArticle> {
		if (!article[id]) await getOne(id);
		return article[id];
	}

	return { getAll,one };
});
