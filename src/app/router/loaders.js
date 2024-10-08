import { getPublished, getUnpublished } from "../../api/api-article";
import { getAllComments } from "../../api/api-comment";
import {
  getAllTags,
  getMostUsedTags,
  getTaggedArticles,
} from "../../api/api-tag";
import { getUser } from "../../api/api-user";

async function validateUser() {
  const { user, status } = await getUser();
  if (!user) {
    throw new Response(null, { status });
  }
  return true;
}

async function dashboardLoader() {
  try {
    const validUser = await validateUser();
    if (validUser) {
      const articleParams = new URLSearchParams({
        sort: "created",
        limit: 3,
      });

      const res = await Promise.all([
        getPublished(articleParams),
        getUnpublished(articleParams),
        getMostUsedTags(),
      ]);

      return {
        articles: {
          published: res[0].articles,
          unpublished: res[1].articles,
        },
        tags: res[2].tags,
      };
    }
  } catch (error) {
    throw new Response(null, {
      status: error.status || 500,
    });
  }
}

async function articlesLoader() {
  try {
    const validUser = await validateUser();
    if (validUser) {
      const res = await Promise.all([getPublished(), getUnpublished()]);
      const { articles: published } = res[0];
      const { articles: unpublished } = res[1];
      return { published, unpublished };
    }
  } catch (error) {
    throw new Response(null, {
      status: error.status || 500,
    });
  }
}

async function tagsLoader() {
  const validUser = await validateUser();
  if (validUser) {
    const { tags, status } = await getAllTags();

    if (!tags) {
      throw new Response(null, {
        status,
      });
    }

    return tags;
  }
}

async function taggedArticles({ params }) {
  const tagName = params.tagName.split("_").join(" ");
  const { articles, status } = await getTaggedArticles(tagName);

  if (!articles) {
    throw new Response(null, {
      status,
    });
  }

  return articles;
}

async function commentsLoader() {
  const { comments, status } = await getAllComments();

  if (!comments) {
    throw new Response("Resource could not be accessed", {
      status,
    });
  }

  return comments;
}

export {
  dashboardLoader,
  articlesLoader,
  tagsLoader,
  taggedArticles,
  commentsLoader,
};
