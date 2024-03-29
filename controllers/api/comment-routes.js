const router = require('express').Router();
// const { Comment } = require('../../models');
const { Post, User, Vote, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
router.get('/', (req, res) => {
  Comment.findAll({
    attributes: [
      'id',
      'comment_text',
      // 'title',
      // 'created_at',
      // [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
        order: [['created_at', 'DESC']],
    // attributes: ['id', 'post_url', 'title', 'created_at'],
    // include: [
    //   {
    //     model: User,
    //     attributes: ['user_id']
    //   },
    //   {
    //     model: Post,
    //     attributes: ['post_id']
    //   }
    // ]
  })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
  })
});

router.post('/', withAuth, (req, res) => {
  // check the session
  if (req.session) {
    Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      // use the id from the session
      user_id: req.session.user_id
    })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

router.delete('/:id', withAuth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCommentData => {
      if (!dbCommentData) {
        res.status(404).json({ message: 'No comment found with this id' });
        return;
      }
      res.json(dbCommentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;