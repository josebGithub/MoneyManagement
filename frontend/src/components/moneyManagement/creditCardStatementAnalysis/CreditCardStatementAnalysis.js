import React from 'react'
import '../../../assets/css/bankStatementAnalysis.css'
import '../../../assets/css/main.css'
import {useState} from 'react'
import axios from 'axios';
import {useNavigate} from "react-router-dom"
import Papa from "papaparse"
import Popup from './Popup'
import { useEffect } from 'react';
import Navigation from '../../Navigation';



const CreditCardStatementAnalysis = () => {
   // const [bankName, setBankname] = useState("")
  //  const [creditCardNo, setCreditcardno] = useState("")
    //const [selectedFile, setSelectedFile] = useState("")
   // const [statement, setStatement] = useState("");
    const [nCategory, setNCategory] = useState("");
    const [newCategory, setNewCategory] = useState("")
    const [buttonPopupCategory, setButtonPopupCategory] = useState(false)
    const [buttonPopupDesc, setButtonPopupDesc] = useState(false)
    const [analysisResultByCategory, setAnalysisResultByCategory] = useState("")
    const [analysisResultByDesc, setAnalysisResultByDesc] = useState("")
    const [categoryFile, setCategoryFile] = useState("")
  
    const navigate = useNavigate();

    //After loading the page, click the download button
    useEffect(() => {
        if (document.readyState === 'complete') {
            const downloadButton = document.getElementById('download'); downloadButton.dispatchEvent(new MouseEvent('click', {
                'view': window,
                'bubbles': true,
                 'cancelable': false
             }));
        }  // end if
    }, []);



    /* Handler the csv file against cateogy.json file to do analysis */
    const changeHandler =async (e) => {
       // setSelectedFile(e.target.files[0])
    
      /* Read the csv file */
      const promise = new Promise (async (resolve) => {
        Papa.parse(e.target.files[0], {
             header: true,
             skipEmptyLines: true,
             complete: function (results) {
              //this is where the data is and we are resolving promise with it
              resolve(results.data);
             },
           });
    });
 
    const csvFile = await promise;

    console.log(csvFile)
  

    let entries=[]
    /* Check if the csv entry already has that category in the category.json file */



    for (var i = 0; i < csvFile.length; i++)
    { 
        var obj=csvFile[i]
        console.log(obj.Description)
        console.log("Description: "+obj.Description.substring(0,8))
        
        //Compare the csv file with the category file, prompt the user to enter
        //new category and store name 
        if (nCategory.length > 0){
           console.log("nCategory Length: "+nCategory.length)
           console.log("nCategory: "+nCategory)


           var existCategory= nCategory.some((c) => c.description.
           includes(obj.Description.substring(0,8)));

           /*  If not exist in the category.json file, prompt the user to enter the new category */

 
           if (!existCategory)
            {
                const userInput = prompt('Please enter the category for '+obj.Description +' in this format [category] :')

                setNewCategory(userInput)
                //const temp = userInput.split(':')

                /* store the new category */
                var CObj = {}
                CObj.description=obj.Description.substring(0,15)
                CObj.category=userInput
                nCategory.push(CObj)
                setCategoryFile((nCategory))

                /* Calculate the credit for each category */
                var EnObj = {}
                EnObj.description = obj.Description.substring(0,8);
                EnObj.credit = obj.Credit+obj.Debit;
                EnObj.category = userInput
                entries.push(EnObj)

            } else {

                /* if category already exists, create the object and then put it to the entries */
 
                var EObj = {}
                EObj.description = obj.Description.substring(0,8);
                EObj.credit = obj.Credit+obj.Debit;

                var temp = nCategory.filter((c) => c.description.
                includes(obj.Description.substring(0,8)));

                EObj.category =temp[0].category

                entries.push(EObj)
            }
        }
    }   //for


    /* Reduce and groupBy the catgory and calcalulate the total expense for that category */
 
    var result=[]
    entries.reduce((res, value) => {
        if (!res[value.category]) {
            res[value.category] = {description: value.description, category: value.category, credit: 0}
            result.push(res[value.category])
        }
        
        res[value.category].credit= (parseFloat(value.credit) +
        parseFloat(res[value.category].credit)).toFixed(2)
       
        return res
       
    }, {});


  /* Put the result to the analysisString */
 
   let analysisByCategoryStr = result.map((str) => (
            <div>
                {str.category|| ""} =
                {str.credit|| ""}
            </div>
  ));
 

    setAnalysisResultByCategory(analysisByCategoryStr )

   /* Put the result to the analysisString by Store Name */ 

   var result1=[]
   entries.reduce((res, value) => {
       if (!res[value.description]) {
           res[value.description] = {description: value.description, credit: 0}
           result1.push(res[value.description])
       }
       
       res[value.description].credit= (parseFloat(value.credit) +
       parseFloat(res[value.description].credit)).toFixed(2)
      
       return res
      
   }, {});
  
  

   let analysisByDescStr = result1.map((str) => (
        <div>
            {str.description|| ""} =
            {str.credit|| ""}
        </div>
    ));

    setAnalysisResultByDesc(analysisByDescStr)


 
}  /** end of changeHandler */
   
    

    const saveStmnt = async (e) => {
        e.preventDefault();

        const formData = new FormData();
      //  formData.append('bankName', bankName)
      //  formData.append('creditCardNo', creditCardNo)
      //  formData.append('file', statement)
          
          formData.append('categoryFilename', JSON.stringify(categoryFile))
         

      const config = {
        headers: {
            'content-type': 'application/json'
        }
        
       };

        try {
            await axios.post("http://localhost:3001/statements", formData,
           config, {
        });
        navigate("/");
        } catch (error) {
            console.log(error);
        }
};

const downloadHandler = async (e) => {

    const getNewCategory = async () => {
        await axios({
        method: "GET",
        url: "http://localhost:3001/download",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => {
        setNCategory(res.data)
        console.log("res.data: "+JSON.stringify(res.data));
      });
    }

     getNewCategory()

}

  
return (
   <section id='cardanalysis'>
    <Navigation></Navigation>
    <h4>Credit Card Analysis</h4>
    <form onSubmit={saveStmnt } encType="multipart/form-data">
    
        <div className="field">
            <label className="label">Upload Credit Card Statement</label>
                <div>
                    <input
                    type="file"
                    accept=".csv"
                    className="input"
                    onChange={changeHandler}
                /> 
        </div>
        </div>

        <div className="field">
            <div>
                <div className = "analysis-buttons">
                     <button type="button" onClick={()=> setButtonPopupCategory(true)} className="btn btn-small">
                     Analysis By Category
                    </button>
                    <Popup trigger = {buttonPopupCategory} setTrigger={setButtonPopupCategory}>
                           {analysisResultByCategory}
                    </Popup>
                 
                  
                    <button type="button" onClick={()=> setButtonPopupDesc(true)}  className="btn btn-small">
                     Analysis By Store Name
                    </button>
                    <Popup trigger = {buttonPopupDesc} setTrigger=  {setButtonPopupDesc}>
                       {analysisResultByDesc}
                    </Popup>
                </div>
            </div>
        </div>
        
        <div className="field">
            <div>
                <button id="download" type="button" hidden onClick={downloadHandler} className="btn-small">
                     Download
                    </button>
            </div>
        </div>

        <div>
            <input type="hidden" name="categoryFilename"></input>
        </div>

        
        <div className="field">
            <div className="submit">
                 <button type="submit" className="btn btn-small">
                     Save
                </button>
            </div>
        </div>
    </form>
</section>
    );
};

export default CreditCardStatementAnalysis;