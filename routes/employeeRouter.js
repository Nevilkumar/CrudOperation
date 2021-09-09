const express = require('express');
const router = express.Router();
const employeeModel = require('../models/employeeModel');

router.get('/', async(req, res) => {
    const employees = await employeeModel.find({});
    res.render('employee/index',{ employees:employees });
});

router.get('/new', (req, res) => {
    res.render('employee/new',{ employee: new employeeModel() });
});

router.post('/new', async (req,res)=>{
    let data = new employeeModel({
        fullName:req.body.fullName,
        email:req.body.email,
        mobile:req.body.mobile,
        city:req.body.city
    });
    try{
        const newData = await data.save();
        res.redirect('/');
    }
    catch{
        res.render('employee/new',{ employee:data });
    }

});

router.get('/:id', async(req,res) => {

    let employee = await employeeModel.findById(req.params.id);
    try{
        res.render('employee/edit',{employee:employee});
    }
    catch{
        res.redirect('/');
    }

});

router.put('/:id', async (req,res) => {

    let employee;
    try{    
        employee = await employeeModel.findById(req.params.id);
        employee.fullName=req.body.fullName;
        employee.email=req.body.email;
        employee.mobile=req.body.mobile;
        employee.city=req.body.city;

        await employee.save();
        res.redirect('/');
    }
    catch{
        res.render('employee/edit',{employee:employee});
    }
    

});

router.delete('/:id', async(req, res) => {

    let employee = employeeModel.findById(req.params.id);
    try{
        await employee.remove();
        res.redirect('/');
    }
    catch{
        res.redirect('/');
    }

});


module.exports = router;