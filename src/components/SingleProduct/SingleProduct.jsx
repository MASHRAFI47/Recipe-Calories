import PropTypes from 'prop-types'

import { IoMdTime } from "react-icons/io"
import { FaFire } from "react-icons/fa";


const SingleProduct = ({ item, handleCook }) => {
    const { ingredients, preparing_time, calories, recipeimage } = item
    return (
        <div className='mt-4 md:mt-10'>
            <div className="card bg-base-100 shadow-xl">
                <figure><img src={recipeimage} alt="Shoes" className='w-full md:w-[25rem] h-[20rem]' /></figure>
                <div className="card-body">
                    <h2 className="card-title">{item.recipename}</h2>
                    <p className='text-[#878787]'>{item.shortdescription}</p>
                    <hr />
                    <h3 className='text-lg font-semibold'>Ingredients: {ingredients.length}</h3>
                    {ingredients.map((ingredient, index) => (
                        <div key={index}>
                            <ul className='list-disc ml-0 md:ml-5'>
                                <li className='text-[#878787]'>{ingredient}</li>
                            </ul>
                        </div>
                    ))}
                    <hr />
                    <div className='flex justify-between'>
                        <p className='flex items-center gap-2'><IoMdTime /> {preparing_time} minutes</p>
                        <p className='flex items-center gap-2'><FaFire /> {calories} calories</p>
                    </div>
                    <div className="card-actions">
                        <button className="btn btn-success" onClick={() => handleCook(item)}>Want to Cook</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

SingleProduct.propTypes = {
    item: PropTypes.object,
    handleCook: PropTypes.func
}

export default SingleProduct