const router = require('express').Router();

router.get ('/', (req, res, next) => {
    //res.send('hello world');
    //Renderizamos un HTML}
    res.render('index.html');
});

module.exports = router;