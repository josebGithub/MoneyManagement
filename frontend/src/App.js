import Home from './components/Home'
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import CreditCardStatementAnalysis from './components/moneyManagement/creditCardStatementAnalysis/CreditCardStatementAnalysis';
import EditCategories from './components/moneyManagement/creditCardStatementAnalysis/EditCategories';
import ListCategories from './components/moneyManagement/creditCardStatementAnalysis/ListCategories';


const App = () => {
  return (

  <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="list" element={<ListCategories/>} />
          <Route path="add" element={<CreditCardStatementAnalysis />} />
          <Route path="edit/:id" element={<EditCategories/>} />
          </Routes>
          </div>
          </BrowserRouter>
          );
}

export default App