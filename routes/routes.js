// const controller = require('../controllers/controller.js')
 
import  controller  from '../controllers/controller.js'
 
//const express = require('express')
 
import express from 'express'
 
// const isValid = require('../middleware/validator.js')
 
import isValid from '../middleware/validator.js'
 
const router = express.Router()


router.get('/hom',controller.home_get)

router.get('/signup',controller.signup_get)

router.post('/signup',controller.signup_post)

router.get('/login',controller.login_get)

router.post('/login',controller.login_post)

router.get('/dashboard',isValid,controller.dashboard_get)

router.post('/logout',controller.logout_post)

export default router