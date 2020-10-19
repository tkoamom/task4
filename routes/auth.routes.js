const {Router} = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const router = Router()
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')

router.post('/register',
    [
        check('password', 'Incorrect password').isLength({min:1}),
        check('email', 'Incorrect email').isEmail
    ],
    async (req, res) =>{
    try{

        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                massage:'Error in registration',
                errors: errors.array()
            })
        }
        const {email, password} = req.body

        const candidate = await User.findOne({email: email})
        if(candidate){
            return res.status(400).json({massage: 'email is busy'})
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({
            email: email,
            password: hashedPassword
        })
        await user.save()
        res.status(201).json({massage: 'user created'})
    } catch(e){
        res.status(500).json({message: 'something is wrong'})
    }
})

router.post(
    '/login',
    [
        check('email', 'Incorrect email').normalizeEmail().isEmail(),
        check('password', 'Incorrect password').exists()
    ],
    async (req, res) => {
        try{

            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({
                    massage:'Error in login',
                    errors: errors.array()
                })
            }
            const {email, password} = req.body
            const user = User.findOne({email: email})

            if(!user){
                return res.status(400).json({message: 'User not found'})
            }

            const isMatch = bcrypt.compare(password, user.password)
            if(!isMatch){
                return res.status(400).json({message: 'Wrong password'})
            }

            const token = jwt.sign(
                {userid: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )

            res.json({token, userId: user.id})

        } catch(e){
            res.status(500).json({message: 'something is wrong'})
        }
    })

module.exports = router