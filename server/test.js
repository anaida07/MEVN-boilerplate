const mongoose = require('mongoose')
const Post = require('./models/post')
const db = require('./src/mongodbConnModule')

const expect = require('chai').expect
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./src/app');
const should = require('should');

chai.use(chaiHttp);
mongoose.Promise = global.Promise

process.env.NODE_ENV = 'test'

describe('Testing posts',()=>{
  beforeEach((done)=>{
    Post.remove({},(err)=>{
      if(err) {throw err}
      done();
    });
  });

  describe('/POST',()=>{
    it('Posts the post',(done)=>{
      let post = new Post({
        title: 'Testing',
        description: 'This is a test'
      })

      chai.request(server)
      .post('/add_post')
      .send(post)
      .end((err,res)=>{
        expect(res.statusCode).to.equal(200)
        expect(res.body).to.be.an('object')
        expect(res.body.success).to.equal(true)
        done();
      });
    });
  });

  describe('/PUT',()=>{
    it('Updates the post',(done)=>{

      let post = new Post({
        title: 'Testing',
        description: 'This is a test'
      })

      post.save((err,post)=>{
        chai.request(server)
        .put('/posts/'+ post.id)
        .send({title:'Testing',description:'description changed'})
        .end((err,res)=>{
          res.status.should.equal(200)
          expect(res.body).to.be.an('object')
          res.should.have.property('error', false)
          expect(res.body.success).to.equal(true)
          done()
        });
      });
    });
  });

  describe('/GET',()=>{

    it('Gets all posts',(done)=>{

      let post = new Post({
        title: 'Testing',
        description: 'This is another test'
      })
      post.save((err,post)=>{
        chai.request(server)
        .get('/posts')
        .end((err,res)=>{
          res.status.should.equal(200)
          expect(res.body).to.be.an('object')
          res.should.have.property('error',false)
          done()
        });
      });
    });

    it('Gets post by ID',(done)=>{
      let post = new Post({
        title: 'Testing',
        description: 'Yet another test'
      })
      post.save((err,post)=>{
        chai.request(server)
        .get('/post/' + post.id)
        .end((err,res)=>{
          res.status.should.equal(200)
          expect(res.body).to.be.an('object')
          res.should.have.property('error',false)
          done()
        });
      });
    });
  });

  describe('/DELETE',()=>{

    it('Deletes post',(done)=>{
      let post = new Post({
        title: 'Testing',
        description: 'Final test'
      })
      post.save((err,post)=>{
        chai.request(server)
        .delete('/posts/' + post.id)
        .end((err,res)=>{
          expect(res.statusCode).to.equal(200)
          done()
        });
      });
    });
  });
});
