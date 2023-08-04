import React, { useState } from 'react';

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
        <div className="spacing">
        <h1>Nutritionix API Integration</h1>
        <div className="row justify-content-center">
            <div className="col-8">
                <input
                className="border border-dark border-2 p-2 mt-2"
                    type="text"
                    placeholder="Enter food type"
                    value={foodType}
                    onChange={(e) => setFoodType(e.target.value)}
                />
            </div>
            
            <br></br>
            <button onClick={handleSearch} className="col-4 btn btn-primary mt-3">Search</button>
        </div>

        {nutritionInfo && (
            <div className="border border-dark border-2 m-4 p-2 mb-5">
                <h2 className="text-center fw-bold">Nutrition facts</h2>
                <hr />
                <div className="row">
                <p className="col text-start text-capitalize fw-bold fs-5">{nutritionInfo.food_name}</p>
                <img className="col text-end" src={nutritionInfo.photo.thumb} alt={`Thumbnail of ${nutritionInfo.food_name}`} />
                </div>
                <hr />
                <div className="row">
                    <p className="col fw-bold text-start">Serving Size:</p>
                    <p className="col text-end">{nutritionInfo.serving_qty} {nutritionInfo.serving_unit}</p>
                </div>
                <hr />
                <div className="row">
                    <div className="col fw-bold text-start">Calories:</div>
                    <div className="col text-end">{nutritionInfo.nf_calories}</div>
                </div>
                <hr />
                <div className="row">
                    <div className="col fw-bold text-start">Dietary Fiber:</div>
                    <div className="col text-end">{nutritionInfo.nf_dietary_fiber} g</div>
                </div>
                <div className="row">
                    <div className="col fw-bold text-start">Carbohydrate:</div>
                    <div className="col text-end">{nutritionInfo.nf_total_carbohydrate} g</div>
                </div>
                <div className="row">
                    <div className="col fw-bold text-start">Sugars:</div>
                    <div className="col text-end">{nutritionInfo.nf_sugars} g</div>
                </div>
                <div className="row">
                    <div className="col fw-bold text-start">Saturated Fat:</div>
                    <div className="col text-end">{nutritionInfo.nf_saturated_fat} g</div>
                </div>
                <div className="row">
                    <div className="col fw-bold text-start">Total Fat:</div>
                    <div className="col text-end">{nutritionInfo.nf_total_fat} g</div>
                </div>
                <div className="row">
                    <div className="col fw-bold text-start">Sodium:</div>
                    <div className="col text-end">{nutritionInfo.nf_sodium} mg</div>
                </div>
                <div className="row">
                    <div className="col fw-bold text-start">Protein:</div>
                    <div className="col text-end">{nutritionInfo.nf_protein} g</div>
                </div>
                <div className="row">
                    <div className="col fw-bold text-start">Potassium:</div>
                    <div className="col text-end">{nutritionInfo.nf_potassium} mg</div>
                </div>
                <div className="row mb-2">
                    <div className="col fw-bold text-start">Cholesterol:</div>
                    <div className="col text-end">{nutritionInfo.nf_cholesterol} mg</div>
                </div>
            </div>
        )}
        </div>
    );
};

export default Nutrition;