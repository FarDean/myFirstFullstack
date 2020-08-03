const express = require('express');
const Author = require('../models/author');
const router = express.Router();



// all authors route
router.get('/',async (req,res)=> {
    let searchOption = {}
    if(req.query.name != null && req.query.name !== ''){
        searchOption.name = new RegExp(req.query.name,'i')
    }
    try{
        const authors = await Author.find(searchOption)
        res.render('authors/index',{authors:authors, searchOption: req.query})
    }catch {
        res.redirect('/')
    }
    
})




// new Author route
router.get('/new',(req,res)=> {
    res.render('authors/new', /*this object going to be added to ejs file(creates author which we can save and delete things in database*/{ author: new Author()})
})
// Create author route
router.post('/', async (req,res)=>{
    const author = new Author({
        name:req.body.name
    })
    try{
        const newAuthor = await author.save()
        // res.redirect(`authors/${newAuthor.id}`)
        res.redirect(`authors`)
    }catch {
        res.render('authors/new',{
                author: author,
                errorMessage: "error Creating Author!!"
            })
        }
})
module.exports = router