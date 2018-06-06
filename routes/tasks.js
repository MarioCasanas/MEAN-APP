const router = require('express').Router();
const mongojs = require('mongojs');
const db = mongojs('mean-db',['tasks']); //Va la URL de la BASE DE DATOS

router.get('/tasks', (req, res, next) => {
    //res.send('API Here para Tasks');
    db.tasks.find((err, tasks) => {
        if (err) return next(err);
        res.json(tasks);
    });
});

router.get('/tasks/:id', (req, res, next) => {
    //res.send('API Here para Tasks');
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, (err, task) => {
        if (err) return next(err);
        res.json(task);
    });
});

//Almaneno en la BD
router.post('/tasks', (req, res, next) => {
    const task = req.body;
    if (!task.title || !(task.isDone + '')) { // Para pasar una variable a String se usa + ''
        res.status(400).json({
            error: 'Bad Data!!'
        });
    } else {
        db.tasks.save(task, (err, task) => {
            if (err) return next (err);
            res.json(task);
        });
    }
});

router.delete('/tasks/:id', (req, res, next) => {
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, (err, result) => {
        if (err) return next (err);
        res.json(result);
    });
});

//Actualizo 
router.put('/tasks/:id', (req, res, next) => {
    const task = req.body;
    const updateTask = {};

    if (task.isDone){
        updateTask.isDone = task.isDone;
    }
    if (task.title){
        updateTask.title = task.title;
    }

    if (!updateTask){
        res.status(400).json({
            error: 'Bad Request!!'
        });
    } else {
        db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, updateTask, (err, task) => {
            if (err) return next(err);
            res.json(task);
        });
    }
});

module.exports = router;