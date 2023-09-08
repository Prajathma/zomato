import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { restaurant } from './Restaurant';
import Header from "./Header";

function Home() {
  let navigate = useNavigate()
  let initData = {
    _id: "",
    name: "",
    city_id: 0,
    location_id: 0,
    city: "",
    country_name: "",
  }
  let [meals, setMeals] = useState([]);
  let [hideLocation, setHideLocation] = useState(true);
  let [locations, setLocations] = useState([]);
  let [selectLocation, setSelectLocation] = useState({ ...initData });
  let [restaurant_list, setRestaurantList] = useState({ list: [], message: "0 restaurant found" })


  let setASelectedLocation = (id) => {
    setSelectLocation(locations[id]);
    setHideLocation(true);
  };


  let getMealTypeList = async () => {
    try {
      let url = 'http://localhost:4040/api/get-meal-type-list';
      let response = await axios.get(url);
      let data = response.data;
      setMeals(data.result);
    } catch (error) {
      alert('Server Error');
      console.log(error);
    }

  };
  let getLocationList = async () => {
    try {
      let url = 'http://localhost:4040/api/get-location-list';
      let response = await axios.get(url);
      let data = response.data;
      setLocations(data.result);
    } catch (error) {
      alert('Server Error');
      console.log(error);
    }

  };
  let getRestaurantListByLocationId = async () => {
    let url = 'http://localhost:4040/api/get-restaurant-list-by-loc-id/' + selectLocation.location_id;
    let { data } = await axios.get(url)
    setRestaurantList({ list: data.result, message: data.result.length + ' restaurant found', });
  }


  // only on page load

  useEffect(() => {
    getMealTypeList();
    getLocationList();
  }, []);// on mount

  useEffect(() => {
    if (selectLocation.location_id !== 0) {
      getRestaurantListByLocationId();
    }
  }, [selectLocation])


  return <>
    <section className="row main-section align-content-start">
      {/* <header className="col-12 py-3">
        <div className="container d-lg-flex justify-content-lg-end d-flex justify-content-between">
          <button className="btn text-white me-3">Login</button>
          <button className="btn text-white border border-white">
            Create an account
          </button>
        </div>
      </header> */}
      <Header page={"home"} />
      <section className="col-12 d-flex flex-column align-items-center justify-content-center">
        <p className="brand-name fw-bold ">e!</p>
        <p className="h1 text-white my-3 text-center">
          Find the best restaurants, cafés, and bars
        </p>
        <div className="search gap-lg-3  d-lg-flex align-items-start mt-3 search-div">
          <div className="w-50 me-lg-0 position-relative">
            <input
              type="text"
              className="form-control  set-100 mb-lg-1 w-100 me-lg-0 py-lg-2 py-2 px-3"
              placeholder="Please type a location"
              readOnly
              value={selectLocation.name === "" ? "" : `${selectLocation.name},${selectLocation.city}`}
              onClick={() => setHideLocation(false)}
            />
            {
              hideLocation ? null : (
                <ul className="list-group me-lg-0 position-absolute top-100 w-100 " >
                  {
                    locations.map((location, index) => {
                      return (
                        <li key={location._id} className="list-group-item z-100" onClick={() => setASelectedLocation(index)}>{location.name},{location.city}</li>
                      )
                    })
                  }
                </ul>
              )}
          </div>

          <div className="w-75 position-relative">
            <div className="w-100 input-group">
              <span className="input-group-text bg-white react-search">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" ></path></svg>
              </span>
              <input
                type="text"
                className="form-control py-lg-2 py-2 px-3 mb-lg-1"
                placeholder={restaurant_list.message}
                onChange={() => { }}
                readOnly
              />
            </div>


            <ul className="list-group  position-absolute top-100 w-100 " >
              {
                restaurant_list.list.map((restaurant, index) => {
                  return (
                    <li key={restaurant._id} className="list-group-item " onClick={() => navigate('/Restaurant-details/' + restaurant._id)}> <img style={{ width: '50px', height: '50px', 'borderRadius': '50px' }} src={'images/' + restaurant.image} className="me-2" /> <span>{restaurant.name},{restaurant.city}</span></li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </section>
    </section>
    <section className="row justify-content-center">
      <section className="col-10 mt-3">
        <h3 className="fw-bold text-navy">Quick Searches</h3>
        <p className="text-secondary">Discover restaurants by Searches</p>
      </section>
      <section className="col-10">
        <section className="row py-2">
          <section className="col-12 px-0 d-flex justify-content-between flex-wrap">
            {meals.map((meal) => {
              return (
                <>
                  <section key={meal._id} className="px-0 d-flex border border-1 quick-search-item"
                    onClick={() => navigate(`/search/${meal.meal_type}/${meal.name}`)}>
                    <img
                      src={"/images/" + meal.image}
                      alt=""
                      className="image-item"
                    />
                    <div className="pt-3 px-2">
                      <h4 className="text-navy">{meal.name}</h4>
                      <p className="small text-muted">
                        {meal.content}
                      </p>
                    </div>
                  </section >
                </>
              )
            })}
          </section>
        </section>
      </section>
    </section >
  </>
}

export default Home;