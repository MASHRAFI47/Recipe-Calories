import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar';
import SingleProduct from './components/SingleProduct/SingleProduct';

let i = 0 
let current = 0

function App() {

  const [menu, setMenu] = useState([]);

  const [cart, setCart] = useState([])

  const [cook, setCook] = useState([])

  const [cookingTime, setCookingTime] = useState(0)

  const [calories, setCalories] = useState(0)

  useEffect(() => {
    fetch('fakedata.json')
      .then((res) => res.json())
      .then((data) => setMenu(data))
  }, []);


  const handleCook = (p) => {
    const isExist = cart.find((pd) => pd.id == p.id)
    if (!isExist) {
      //increment of want to cook
      i++;
      //adding to cart
      const newCart = [...cart, p]
      setCart(newCart)
    }
    else {
      alert('already in cart')
    }
  }

  const handlePreparing = (id, item, time, calo) => {
    //decrement of want to cook item
    i--;
    //increment of currently cooking
    current++;

    //delete/prepare item
    const newCart = cart.filter((item) => item.id != id)
    setCart(newCart)

    //currently cooking items
    const newItem = [...cook, item]
    setCook(newItem)

    //cooking time
    setCookingTime(cookingTime + time)

    //total calories
    setCalories(calories + calo)
  }
  return (
    <>
      <div className='container mx-auto'>
        <Navbar />
        <div className='text-center'>
          <h1 className='text-3xl font-bold mt-10'>Our Recipes</h1>
          <p className='mt-2 w-full md:w-[50rem] mx-auto text-[#150B2B99]'>Essence of culinary excellence with our tantalizing array of recipes, meticulously crafted to delight every palate. </p>
        </div>
        <div className='flex flex-col md:flex-row'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full md:w-1/2 lg:w-2/3'>
            {menu.map((item, index) => <SingleProduct key={index} handleCook={handleCook} item={item}></SingleProduct>)}
          </div>
          <div className='w-full md:w-1/2 lg:w-1/3 border p-0 md:p-2 ml-0 md:ml-2 mt-0 md:mt-10 rounded-xl'>
            <h1 className='text-2xl font-semibold mb-2 text-center mt-0 md:mt-5'>Want to Cook {i}</h1>
            <div className='flex justify-around md:justify-between'>
              <h4></h4>
              <h4 className='text-[#878787]'>Name</h4>
              <h4 className='text-[#878787]'>Time</h4>
              <h4 className='text-[#878787]'>Calories</h4>
              <h4 className='text-[#878787]'>Action</h4>
            </div>
            {cart.map((item, index) => (
              <div key={index}>
                <div className='flex justify-between mt-3 ml-3 bg-gray-200 p-1'>
                  <p>{index + 1}.</p>
                  <h5>{item.recipename}</h5>
                  <h5>{item.preparing_time} min</h5>
                  <h5>{item.calories} calories</h5>
                  <button className='btn btn-sm btn-success' onClick={() => handlePreparing(item.id, item, item.preparing_time, item.calories)}>Preparing</button>
                </div>
              </div>
            ))}
            <hr />
            <div className='mt-5 text-2xl font-semibold mb-2 text-center'>Currently Cooking {current}</div>
            <div className='flex justify-around md:justify-between'>
              <h4></h4>
              <h4 className='text-[#878787]'>Name</h4>
              <h4 className='text-[#878787]'>Time</h4>
              <h4 className='text-[#878787]'>Calories</h4>
            </div>
            {/* Currently cooking items */}
            {cook.map((item, index) => (
              <div key={index}>
                <div className='flex justify-between mt-3 ml-0 md:ml-3 bg-gray-200 p-1'>
                  <p>{index + 1}.</p>
                  <h5>{item.recipename}</h5>
                  <h5>{item.preparing_time} min</h5>
                  <h5>{item.calories} calories</h5>
                </div>
              </div>
            ))}
            <hr />

            <div className='flex justify-between mt-3 mb-3'>
              <h4></h4>
              <h4></h4>
              <h4 className='font-semibold'>Total Time: {cookingTime} min</h4>
              <h4 className='font-semibold'>Total Calories: {calories} calories</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
