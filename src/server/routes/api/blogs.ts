import * as express from 'express';
import db from '../../db';
import { RequestHandler } from 'express-serve-static-core';


const router = express.Router();

const isAdmin: RequestHandler = (req: any, res, next) => {
    if(!req.user || req.user.role !== 'admin') {
        return res.sendStatus(401);
    } else {
        return next();
    }
};


router.get('/:id?', isAdmin, async (req, res, next) => {
    try {
        let id = Number(req.params.id);
        if(id) {
            let blog = await db.Blogs.one(id);
            res.send(blog);
        } else {
            let [blogs] = await db.Blogs.all();
            res.send(blogs);
        }
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/', async (req, res, next) => {
    try {
        let {title, content, author, tags} = req.body;
        let response = await db.Blogs.post(title, content, author, tags);
        res.send(response);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        let {title, content, tags} = req.body;
        let id = Number(req.params.id);
        db.Blogs.put(title, content, tags, id);
        res.send('Blog updated successfully!');
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        let id = Number(req.params.id);
        db.Blogs.deleter(id);
        res.send('Blog deleted successfully!')
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
})

export default router;