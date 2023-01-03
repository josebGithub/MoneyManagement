import Statement from "../models/Schema.js"
import multer from "multer"
import express from 'express'
import fs from 'fs'
//import { nextTick } from "process"
//import path from 'path'
//import { exec } from "child_process"

export const getCategories  = async (req, res) => {
    try {
            const categories = await Statement.find()

            if (!categories)
                console.log('No categories found!')

            res.json(categories)
        } catch (error) {
            res.status(500).json({message: error.message});
    }
}

export const getCategoryById = async (req,res) => {
   
    /* Get description and category by Id*/
   
        try {
            const category = await Statement.findById(req.params.id)
            res.json(category)
        } catch (error) {
            res.status(404).json({message: error.message});
        }
  }

 export const downloadCategoryFile = async (req,res) => {
 
    const categories = await Statement.find({})

    try
    {
        res.send(categories)
    } catch (error)
    {
        res.status(400).send(error)
    } 
   
 }

  export const addCategories = async (req,res) => {
  //  console.log(req.body) // form fields
    
    /* Remove all the documents in the DB and then create a new category*/
   
        try {
            await Statement.remove({},) 
            await Statement.create(JSON.parse(req.body.categoryFilename))
        } catch (error) {
            console.log("Error..."+error.message)
            res.status(400).json({message: error.message});
        }
  }
    
  export const updateCategory = async (req,res) => {
   
      /* Update the description and category*/
     
          try {
              const updatecategory = await Statement.updateOne({_id:req.params.id}, {$set:req.body})
              res.status(200).json(updatecategory)
          } catch (error) {
              res.status(400).json({message: error.message});
          }
    }
      
    export const deleteCategory = async (req,res) => {
   
        /* Delete the description and category*/
        console.log("id => "+req.params.id)
            try {
                const deletecategory = await Statement.deleteOne({_id:req.params.id})
                res.status(200).json(deletecategory)
            } catch (error) {
                res.status(400).json({message: error.message});
            }
      }
     
      
    