import { daysSinceToday, getRandomSuffix, randomInt } from "../utils";

function mockAdmin() {
  const id = randomInt(2, 50);
  return {
    id,
    username: getRandomSuffix("admin"),
    role: "ADMIN",
    likes: [],
    comments: [],
  };
}

function mockArrayData(count, factory) {
  const data = [];
  for (let i = 0; i < count; i++) {
    const field = factory(i);
    data.push(field);
  }
  return data;
}

function generateTag() {
  return {
    tagName: getRandomSuffix("tag"),
    _count: {
      articles: randomInt(0, 20),
    },
  };
}

function mockTags(count = 5) {
  return mockArrayData(count, generateTag);
}

function mockArticles(count = 10, tags = null, published) {
  return mockArrayData(count, (i) => generateArticle(i, tags, published));
}

function mockComments(count, articleId) {
  return mockArrayData(count, (i) => generateComment(i, articleId));
}

function generateComment(index, articleId = randomInt(0, 10)) {
  return {
    id: `${articleId}-${index}`,
    text: getRandomSuffix("comment"),
    authorId: randomInt(1, 50),
    articleId,
    created: daysSinceToday(index),
    review: false,
    author: {
      username: getRandomSuffix("Guest"),
    },
    article: {
      title: getRandomSuffix("articleTitle"),
    },
  };
}

function generateArticle(id, tags, published) {
  const date = daysSinceToday(id + 1);
  const comments = published ? mockComments(randomInt(0, 5), id) : [];
  return {
    id,
    title: getRandomSuffix("test title"),
    body: `<p>${getRandomSuffix("test body")}</p>`,
    authorId: 1,
    created: date,
    updated: date,
    published,
    author: {
      username: "Admin",
    },
    _count: {
      likes: published ? randomInt(0, 50) : 0,
      comments: comments.length,
    },
    comments,
    tags: tags ? tags : mockTags(randomInt(1, 3)),
  };
}

export { mockAdmin, mockTags, mockArticles, mockComments };
