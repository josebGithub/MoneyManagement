import express from "express"
import multer from 'multer'
const  router = express.Router();

import {getCategories, getCategoryById, addCategories, downloadCategoryFile, updateCategory, deleteCategory} from "../controllers/CreditCardAnalysis.js"

router.get('/statements', getCategories)
//router.post('/statements', upload.single('file'), addStatements)
router.get('/statements/:id', getCategoryById)
router.post('/statements', addCategories)
router.patch('/statements/:id', updateCategory)
router.get('/download', downloadCategoryFile)
router.delete('/statements/delete/:id', deleteCategory)


export default router;