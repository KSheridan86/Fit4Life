import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltDown } from '@fortawesome/free-solid-svg-icons';

const Nutrition = () => {
    const [foodType, setFoodType] = useState('');
    const [nutritionInfo, setNutritionInfo] = useState(null);
    const apiKey = 'ea0f0eff98a1a9e86e859c075afe7746';

    const handleSearch = async () => {
        try {
        const response = await fetch(
            `https://trackapi.nutritionix.com/v2/natural/nutrients`,
            {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-app-id': '88f90da2',
                'x-app-key': apiKey,
            },
            body: JSON.stringify({ query: foodType }),
            }
        );

        if (response.ok) {
            const data = await response.json();
            setNutritionInfo(data.foods[0]);
        } else {
            console.error('Error fetching data');
        }
        } catch (error) {
        console.error('Error:', error);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                <div className="">
                    <h1 className="glass-box m-3 fw-bold p-4 text-center nasa-black text-uppercase">Find the food that's right for you!</h1>
                    <div className="glass-box m-3 p-3 text-center">
                        <p>
                            Whether you're planning your meals, making healthier choices, or simply curious about 
                            the calorific content of your favorite foods, our carefully curated database provides 
                            you with instant access to the vital data you need.
                        </p>
                        <hr />
                        <p>
                            Uncover the calories, macronutrients, vitamins, and minerals 
                            present in various food items, empowering you to make well-informed decisions that align 
                            with your health and fitness objectives.
                        </p>
                        <hr />
                        <p className="hand-writing fs-4">
                            Simply input the food you're looking for below and we'll do the rest!
                        </p>
                        <div className="d-flex justify-content-evenly align-items-center mt-3">
                            <FontAwesomeIcon icon={faLongArrowAltDown} />
                            <FontAwesomeIcon icon={faLongArrowAltDown} />
                        </div>
                    </div>
                    <div className="glass-box m-3 p-3 d-flex justify-content-center align-items-center">
                        <div className="row">
                            <div className="col-12">
                                <input
                                    className="text-center border border-dark border-2 p-2 form-control mb-2 hand-writing"
                                    type="text"
                                    placeholder="Enter food/ingredient"
                                    value={foodType}
                                    onChange={(e) => setFoodType(e.target.value)}
                                />
                            </div>
                            <div className="col-12 text-center hand-writing">
                                <button 
                                    onClick={handleSearch} 
                                    className="btn btn-warning border-dark border-2 mt-3 col-6">
                                        Search
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="d-lg-none big-arrow d-flex justify-content-evenly align-items-center mt-5">
                        <FontAwesomeIcon icon={faLongArrowAltDown} />
                        <FontAwesomeIcon icon={faLongArrowAltDown} />
                    </div>
                </div>
                </div>
                <div className="col-md-6">
                    {nutritionInfo && (
                    <div className="nutrition-box border border-dark rounded border-2 m-3 p-2 mb-5">
                        <h2 className="text-center fw-bold border-bottom border-5">Nutrition Facts</h2>
                        <p className="col text-center text-capitalize fw-bold fs-5 border-bottom border-4">
                            {nutritionInfo.food_name}
                        </p>
                        {/* desktop image */}
                        <div className="d-none d-lg-block row w-50 justify-content-center m-auto">
                            <img 
                            className="col text-end" 
                            src={nutritionInfo.photo.highres} 
                            alt={`Thumbnail of ${nutritionInfo.food_name}`} 
                            />
                        </div>
                        {/* mobile image */}
                        <div className="d-lg-none row justify-content-center m-auto">
                            <img 
                            className="col text-end" 
                            src={nutritionInfo.photo.highres} 
                            alt={`Thumbnail of ${nutritionInfo.food_name}`} 
                            />
                        </div>
                        <hr />
                        <div className="row m-auto">
                            <p className="col fw-bold text-start">Serving Size:</p>
                            <p className="col text-end">{nutritionInfo.serving_qty} {nutritionInfo.serving_unit}</p>
                        </div>
                        <hr />
                        <div className="row m-auto">
                            <div className="col fw-bold text-start">Calories:</div>
                            <div className="col text-end">{nutritionInfo.nf_calories}</div>
                        </div>
                        <hr />
                        <div className="row m-auto border-bottom">
                            <div className="col fw-bold text-start">Dietary Fiber:</div>
                            <div className="col text-end">{nutritionInfo.nf_dietary_fiber} g</div>
                        </div>
                        <div className="row m-auto border-bottom">
                            <div className="col fw-bold text-start">Carbohydrate:</div>
                            <div className="col text-end">{nutritionInfo.nf_total_carbohydrate} g</div>
                        </div>
                        <div className="row m-auto border-bottom">
                            <div className="col fw-bold text-start">Sugars:</div>
                            <div className="col text-end">{nutritionInfo.nf_sugars} g</div>
                        </div>
                        <div className="row m-auto border-bottom">
                            <div className="col fw-bold text-start">Saturated Fat:</div>
                            <div className="col text-end">{nutritionInfo.nf_saturated_fat} g</div>
                        </div>
                        <div className="row m-auto border-bottom">
                            <div className="col fw-bold text-start">Total Fat:</div>
                            <div className="col text-end">{nutritionInfo.nf_total_fat} g</div>
                        </div>
                        <div className="row m-auto border-bottom">
                            <div className="col fw-bold text-start">Sodium:</div>
                            <div className="col text-end">{nutritionInfo.nf_sodium} mg</div>
                        </div>
                        <div className="row m-auto border-bottom">
                            <div className="col fw-bold text-start">Protein:</div>
                            <div className="col text-end">{nutritionInfo.nf_protein} g</div>
                        </div>
                        <div className="row m-auto border-bottom">
                            <div className="col fw-bold text-start">Potassium:</div>
                            <div className="col text-end">{nutritionInfo.nf_potassium} mg</div>
                        </div>
                        <div className="row m-auto border-bottom mb-2">
                            <div className="col fw-bold text-start">Cholesterol:</div>
                            <div className="col text-end">{nutritionInfo.nf_cholesterol} mg</div>
                        </div>
                    </div>
                    )}
                </div>
            </div>
            <div style={{height: "100px"}}></div>
        </div>
    );
};

export default Nutrition;