import * as express from 'express';
import db from '../../db';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        let authors = await db.Authors.get();
        res.send(authors);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
})

router.put('/:id', (req, res) => {
    try {
        let user = req.body;
        user.id = Number(req.params.id);
        db.Authors.put(user);
        res.send('Author edited!')
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
})

router.delete('/:id', (req, res) => {
    try {
        let id = Number(req.params.id);
        db.Authors.deleter(id);
        res.send('Author removed!')
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
})

export default router;