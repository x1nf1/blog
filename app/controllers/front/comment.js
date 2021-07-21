'use strict';
const commentsModel = require('@models/comments');
const postsModel = require('@models/posts');

module.exports.submit = async function(req, res) {
  const postSlug = req.params.postSlug;
  const post = await postsModel.fetchPostBySlug(postSlug);
  if (!post) return res.redirect('/404');
  const { user_name, user_email, user_url, user_comment } = req.body;
  const commentData = {
    post_id: post.id,
    author_id: 'user' in req.session ? req.session.user.id : null,
    user_name,
    user_email,
    user_url: user_url ? user_url : null,
    comment: user_comment
  };
  const result = await commentsModel.createComment(commentData);
  if (result.insertId) {
    req.flash('success', ['نظر شما جهت بررسی مدیر با موفقیت ثبت شد']);
    return res.redirect(`/p/${postSlug}`);
  } else {
    return req.flash('errors', ['در هنگام ثبت نظر شما خطایی رخ داده']);
  }
};
