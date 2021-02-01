import { Query } from '../';
import { User } from '../../../utils/models';

const get = async () => await Query('SELECT id, name FROM authors')

const getOneEmail = async (email: string) => await Query('SELECT * FROM authors WHERE email LIKE ? LIMIT 1', [email]);

const getOneId = async (id: number) => await Query('SELECT * FROM authors WHERE id = ? LIMIT 1', [id]);

const post = async (name: string, email: string, password: string) =>  await Query('INSERT INTO authors SET name = ?, email = ?, password = ?', [name, email, password]);

const put = async (user: User) => await Query('UPDATE authors SET (name, email, password) VALUES ? WHERE id = ?', [user]);

const deleter = async (id: number) => await Query('DELETE FROM authors WHERE id = ?', [id]);

export default { get, getOneEmail, getOneId, post, put, deleter };