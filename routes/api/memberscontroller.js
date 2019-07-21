const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../members.js');

// Get All Members
// You can test the api below with curl -vG localhost:${PORT}/api/members
router.get('/', (req, res) => {
    res.json(members);
});

// Get Single Member
// You can test the api below with curl -vG localhost:${PORT}/api/members/<any id e.g. 1>
router.get('/:id', (req, res) => {

    // some returns either true or false if the condition is satisfied
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        // standard way of filtering, parseInt is needed because member.id is an integer
        // filter returns the object that satisfy the condition
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({msg: `No member with the id of ${req.params.id}`});
    }
});

// Create a Member
// You can test the api below with curl -vd '{"name":"bob", "email":"bob@email.com"}' -H 'Content-Type: application/json' http://localhost:5000/api/members
// For this enable the comment with *** below
router.post('/', (req, res) => {
    // res.send(req.body); // This will return back the body of the request, so it's purposeless, it's here for testing purposes
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if (!newMember.name || !newMember.email) {
       return res.status(400).json({msg: 'Please include a name and an email!'})
    }

    members.push(newMember);
//    res.json(members); // *** either send the member list as a json back to the user with curl
res.redirect('/');
})

// Update Single Member
// You can test the api below with curl -H 'Content-Type: application/json' -vX PUT -d '{"id":1, "name": "John Johnson", "email": "john@email.com", "status": "inactive"}' http://localhost:${PORT}/api/members/1
router.put('/:id', (req, res) => {

    // some returns either true or false if the condition is satisfied
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        const updMember = req.body;
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email? updMember.email : member.email;
                member.status = updMember.status ? updMember.status : member.status;

                res.json({msg: 'Member updated', member})
            }
        })
        // standard way of filtering, parseInt is needed because member.id is an integer
        // filter returns the object that satisfy the condition
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({msg: `No member with the id of ${req.params.id}`});
    }
});

// Delete Single Member
// You can test the api below with curl -vX DELETE localhost:${PORT}/api/members/<any id e.g. 1>
router.delete('/:id', (req, res) => {

    // some returns either true or false if the condition is satisfied
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        // standard way of filtering, parseInt is needed because member.id is an integer
        // filter returns the object that satisfy the condition
        res.json({
            msg: 'Member deleted',
            members: members.filter(member => member.id !== parseInt(req.params.id))
        });
    } else {
        res.status(400).json({msg: `No member with the id of ${req.params.id}`});
    }
});

module.exports = router;
