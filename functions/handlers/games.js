const { db } = require('../util/admin');

exports.getAllGames = (req, res) => {
  db.collection('games')
    .orderBy('createdAt', 'desc')
    .get()
    .then(data => {
      let games = [];
      data.forEach(doc => {
        games.push({
          gameId: doc.id,
          ...doc.data()
        });
      });
      return res.json(games);
    })
    .catch(err => console.error(err));
};

exports.PostAGame = (req, res) => {
  const newGame = {
    body: req.body.body,
    userHandle: req.user.handle,
    createdAt: new Date().toISOString()
  };

  db.collection('games')
    .add(newGame)
    .then(doc => {
      res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch(err => {
      res.status(500).json({ error: 'Something went wrong' });
      console.error(err);
    });
};
