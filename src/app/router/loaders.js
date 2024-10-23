import { getPublished, getUnpublished } from "../../api/api-article";
import { getAllComments } from "../../api/api-comment";
import {
  getAllTags,
  getMostUsedTags,
  getTaggedArticles,
} from "../../api/api-tag";

async function dashboardLoader(abortSignal) {
  try {
    const articleParams = new URLSearchParams({
      sort: "created",
      limit: 3,
    });

    const res = await Promise.all([
      getPublished(articleParams, abortSignal),
      getUnpublished(articleParams, abortSignal),
      getMostUsedTags(abortSignal),
    ]);

    return {
      articles: {
        published: res[0].articles,
        unpublished: res[1].articles,
      },
      tags: res[2].tags,
    };
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Request aborted");
    } else {
      throw new Response(null, {
        status: error.status || 500,
      });
    }
  }
}

async function articlesLoader(abortSignal) {
  try {
    const res = await Promise.all([
      getPublished(null, abortSignal),
      getUnpublished(null, abortSignal),
    ]);
    const { articles: published } = res[0];
    const { articles: unpublished } = res[1];
    return { published, unpublished };
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Request aborted");
    } else {
      throw new Response(null, {
        status: error.status || 500,
      });
    }
  }
}

async function tagsLoader(abortSignal) {
  const tagData = await getAllTags(abortSignal);

  //render error page when tags null, status truthy
  if (!tagData?.tags && tagData?.status) {
    throw new Response(null, {
      status: tagData.status,
    });
  }

  return tagData?.tags;
}

async function taggedArticles(params, abortSignal) {
  const tagName = params.tagName.split("_").join(" ");
  const articleData = await getTaggedArticles(tagName, abortSignal);

  if (!articleData?.articles && articleData?.status) {
    throw new Response(null, {
      status: articleData.status,
    });
  }

  return articleData?.articles;
}

async function commentsLoader(abortSignal) {
  const commentData = await getAllComments(abortSignal);

  if (!commentData?.comments && commentData?.status) {
    throw new Response("Resource could not be accessed", {
      status: commentData.status,
    });
  }

  return commentData?.comments;
}

export {
  dashboardLoader,
  articlesLoader,
  tagsLoader,
  taggedArticles,
  commentsLoader,
};
