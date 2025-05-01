const request = require('supertest');
const app = require('../app');

beforeEach(() => {
  app.resetTodos();
});

describe('ToDo App (EJS)', () => {
  it('renders the homepage with no todos', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('<ul>');
    expect(res.text).not.toContain('<li>');
  });

  it('adds a todo item', async () => {
    await request(app)
      .post('/add')
      .send('todo=Buy%20milk') // URL-encoded form submission

    const res = await request(app).get('/');
    expect(res.text).toContain('Buy milk');
  });

  it('deletes a todo item by index', async () => {
    // Add 2 todos
    await request(app).post('/add').send('todo=Buy%20milk');
    await request(app).post('/add').send('todo=Read%20book');

    // Delete first one (index 0)
    await request(app)
      .post('/delete')
      .send('index=0');

    const res = await request(app).get('/');
    expect(res.text).not.toContain('Buy milk');
    expect(res.text).toContain('Read book');
  });
});

