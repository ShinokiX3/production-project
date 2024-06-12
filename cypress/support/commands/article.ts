/* eslint-disable @typescript-eslint/no-namespace */
import { Article } from '../../../src/entities/Article/model/types/article';

const defaultArticle = {
	id: '777',
	title: 'Test Article',
	subtitle: 'Test Article Subtitle',
	img: 'https://avatars.mds.yandex.net/'
	+ 'get-zen_doc/2746556/pub_5f50dd7e1a1ddf4776aa5569_5f50decd2506f211d1de6284/scale_1200',
	views: 1022,
	createdAt: '26.02.2022',
	userId: '1',
	type: [
		'SCIENCE'
	],
	blocks: [
		{
			id: '1',
			type: 'TEXT',
			title: 'Block title',
			paragraphs: [
				'Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!»',
				'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и',
				'на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
				'Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript,',
				'они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением',
				'.js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с',
				'помощью тега <script>. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте',
				'w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом',
				' ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе.',
				'А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html',
				', и добавим в него следующий код:'
			]
		}
	]
};

export const createArticle = (article?: Article) => cy.request({
	method: 'POST',
	url: 'http://localhost:8000/articles',
	headers: { Authorization: 'Bearer' },
	body: article ?? defaultArticle
}).then((data) => data.body);

export const removeArticle = (articleId: string) => cy.request({
	method: 'DELETE',
	url: `http://localhost:8000/articles/${articleId}`,
	headers: {
		Authorization: 'Bearer'
	}
});

declare global {
	namespace Cypress {
		interface Chainable {
			createArticle(article?: Article): Chainable<Article>,
			removeArticle(articleId: string): Chainable<void>,
		}
	}
}
