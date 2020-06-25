const app = require("../index.js")
const supertest = require("supertest")
const request = supertest(app)

describe('Verify Query cases', () => {

  test("Verify query all books", (done) => {
    request
      .post("/graphql")
      .send({
        query: `
        { 
          books{ 
            id , name 
            author{
              name
            }
          }}`,
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err)
        expect(res.body).toBeInstanceOf(Object)
        expect(res.body.data.books).not.toBe(null)
        expect(res.body.data.books.length).toBe(8)
        done()
      })
  })

  test("Verify valid Author name and valid Author id from books", (done) => {
    request
      .post("/graphql")
      .send({
        query: `{ 
          books{ 
            id 
            name 
            author{
              id
              name
            }
          }}`,
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err)
        expect(res.body.data.books[0].author.id).toBe(1)
        expect(res.body.data.books[0].author.name).toMatch(/J. K. Rowling/)
        done()
      })
  })

})






