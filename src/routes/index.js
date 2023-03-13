const express = require('express')
const { authRouter } = require('../components/auth/auth.routes')
const { companyRouter } = require('../components/company/company.routes')

const router = express.Router()
// Routes
router.use('/auth', authRouter)
router.use("/company", companyRouter)
router.use("/health", (req,res) => {
    console.log("healty")
})

module.exports = { router }
