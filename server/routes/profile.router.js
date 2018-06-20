const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

router.get('/get', (req, res) => {
    if (req.isAuthenticated()){
    console.log('getting profile');
    const sqlText = `SELECT * FROM profile WHERE user_id = ($1);`;
    pool.query(sqlText, [req.user.id])
    .then(result => {
        console.log('Got profile', req.user.id);
        res.send(result.rows);
    })
    .catch(error => {
        console.log('Get profile error', error);
        res.sendStatus(500); 
    })
    }else {
        res.sendStatus(403);
    }
});


router.post('/post', (req, res) => {
    console.log('profile', req.body)
    if (req.isAuthenticated()){
    let userProfile = req.body;
    const sqlText = `INSERT INTO profile (user_id, first_name, last_name, email, phone_number, linked_in) 
    VALUES ($1, $2, $3, $4, $5, $6);`;
    console.log(req.user.id, userProfile.firstName, userProfile.lastName, userProfile.email, userProfile.phoneNumber, userProfile.linkedIn);
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