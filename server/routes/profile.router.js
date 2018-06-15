const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

router.get('/', (req, res) => {
    
});


router.post('/', (req, res) => {
    console.log('profile', req.body)
    if (req.isAuthenticated()){
    let userProfile = req.body;
    const sqlText = `INSERT INTO profile (user_id, first_name, last_name, email, phone_number, linked_in) 
    VALUES ($1, $2, $3, $4, $5, $6);`;
    console.log(userProfile.firstName);
    pool.query(sqlText, [req.user.id, userProfile.firstName, userProfile.lastName, userProfile.email, userProfile.phoneNumber, userProfile.linkedIn])
    .then((result) => {
        console.log('profile update');
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log('did not add');
        res.sendStatus(500);
    })
    }else {
        response.sendStatus(403);
    }
});

module.exports = router;