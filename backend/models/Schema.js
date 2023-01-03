import mongoose from "mongoose";
const Schema = mongoose.Schema;


const creditCardStmtSchema = new Schema ({
    description: String,
    category: String
}, {
    collection: 'statements'
});


const Statement = mongoose.model("StatementModel",creditCardStmtSchema )

export default Statement