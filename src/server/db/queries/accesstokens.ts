import { Query } from '../';

const getOne = async (id: number, token: string) => Query('SELECT * FROM accesstokens WHERE id = ? AND token = ?', [id, token]);

const insert = async (userid: number) => Query('INSERT INTO accesstokens SET userid = ?', [userid]);

const update = async (id: number, token: string) => Query('UPDATE accesstokens SET token = ? WHERE id = ?', [token, id]);

export default { getOne, insert, update };