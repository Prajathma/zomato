import { useState } from "react";
import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";


function Header(props) {
  let navigate = useNavigate();
  let { page } = props;
  let headerClass = "d-flex justify-content-between py-2";
  let initialUserValue = {
    fullName: 'prajathma',
    email: 'prajathma@gmail.com',
    mobile: '1234512345',
    password: 'admin@123',
    confirmPassword: 'admin@123',
    address: 'Bengaluru',
  }

  let [newUser, setNewUser] = useState({ ...initialUserValue });
  let [showPassword, setShowPassword] = useState(false);
  //collect data from local storage
  let data = localStorage.getItem('user');
  //convert string data to JSON DATA ==> JSON.parse()
  data = null ? null : JSON.parse(data);
  let [loginDetails] = useState(data);
  let regModal = useRef();


  let setInputData = (event) => {

    let { value, name } = event.target;
    setNewUser({ ...newUser, [name]: value })
  }


  let saveUser = async () => {
    let sendData = {
      f_name: newUser.fullName,
      address: newUser.address,
      email: newUser.email,
      mobile: newUser.mobile,
      password: newUser.password,
    }
    console.log(sendData);
    let url = "http://localhost:4040/api/save-user-data";
    let { data } = await axios.post(url, sendData)
    console.log(regModal.current);

    if (data.call == true) {
      alert("Registered Successfully");
      // let modal = new window.bootstrap.modal(regModal.current)
      // modal.hide();
      window.location.reload();
    } else {
      alert(data.message);
    }

  }

  let userLogin = async () => {
    let sendData = {
      username: newUser.mobile,
      password: newUser.password,
    }
    let url = "http://localhost:4040/api/login";
    let { data } = await axios.post(url, sendData)
    console.log(data);
    if (data.call === true) {
      alert("user login successful")
      // browse local storage to save the data
      // convert a json to string  ==> JSON.stringify
      localStorage.setItem("user", JSON.stringify(data.user));
      // window.location.assign("/");

    } else {
      alert("Username or password is wrong")
    }
  };

  let logout = () => {
    localStorage.removeItem('user');
    alert('Logout Successfully')
    window.location.assign('/');
  };

  return (
    <>
      <div className="modal fade" id="modalLogin" aria-hidden="true" aria-labelledby="modalLogin" tabindex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Login</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                {/*  */}
                <div className="input-group mb-3">
                  <span className="input-group-text bg-success text-white"><i className="fa fa-phone"></i></span>
                  <input type="number" className="form-control" placeholder="Mobile Number" onChange={setInputData} value={newUser.mobile} name="mobile" />
                </div>
                {/*  */}
                <div className="input-group mb-3">
                  <span className="input-group-text bg-success text-white"><i className="fa fa-key"></i></span>
                  <input type={showPassword ? "TEXT" : "password"} className="form-control" placeholder="Password" onChange={setInputData} value={newUser.password} name="password" />
                  <button type="button" className="input-group-text bg-transparent text-black border-0" onClick={() => setShowPassword(!showPassword)}><i className={showPassword ? "fa fa-eye" : "fa fa-eye-slash"}></i></button>
                </div>
              </form>
            </div>
            <hr className="p-0 m-0" />
            <div className="d-flex justify-content-between">
              <p className="mt-2 ps-2">
                Don't have an account ?
                <a className="btn btn-link text-primary mb-1" data-bs-target="#modalCreateAccount" data-bs-toggle="modal">Create Acc.</a>
              </p>
              <button className="btn btn-success btn-height mt-2 me-2" onClick={userLogin}>Login</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="modalCreateAccount" aria-hidden="true" aria-labelledby="modalCreateAccountLabel" tabindex="-1" ref={regModal}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="modalCreateAccountLabel">Registration</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="input-group mb-3">
                  <span className="input-group-text bg-primary text-white"><i className="fa fa-user-circle-o"></i></span>
                  <input type="text" className="form-control" placeholder="Enter Full Name" onChange={setInputData} value={newUser.fullName} name="fullName" />
                </div>
                {/*  */}
                <div className="input-group mb-3">
                  <span className="input-group-text bg-danger text-white"><i className="fa fa-envelope"></i></span>
                  <input type="email" className="form-control" placeholder="Email Id" onChange={setInputData} value={newUser.email} name="email" />
                </div>
                {/*  */}
                <div className="input-group mb-3">
                  <span className="input-group-text bg-success text-white"><i className="fa fa-phone"></i></span>
                  <input type="number" className="form-control" placeholder="Mobile Number" onChange={setInputData} value={newUser.mobile} name="mobile" />
                </div>
                {/*  */}
                <div className="input-group mb-3">
                  <span className="input-group-text bg-success text-white"><i className="fa fa-key"></i></span>
                  <input type={showPassword ? "TEXT" : "password"} className="form-control" placeholder="Password" onChange={setInputData} value={newUser.password} name="password" />
                  <button type="button" className="input-group-text bg-transparent text-black border-0" onClick={() => setShowPassword(!showPassword)}><i className={showPassword ? "fa fa-eye" : "fa fa-eye-slash"}></i></button>
                </div>
                {/*  */}
                <div className="input-group mb-3">
                  <span className="input-group-text bg-success text-white"><i className="fa fa-key"></i></span>
                  <input type={showPassword ? "TEXT" : "password"} className="form-control" placeholder="Confirm Password" onChange={setInputData} value={newUser.confirmPassword} name="confirmPassword" />
                  <button type="button" className="input-group-text bg-transparent text-black border-0" onClick={() => setShowPassword(!showPassword)}><i className={showPassword ? "fa fa-eye" : "fa fa-eye-slash"}></i></button>
                </div>
                {/*  */}
                <div className="input-group mb-3">
                  <span className="input-group-text bg-warning text-white"><i className="fa fa-address-book-o"></i></span>
                  <textarea className="form-control" placeholder="Address" onChange={setInputData} value={newUser.address} name="address"></textarea>
                </div>
              </form>
            </div>
            <hr className="p-0 m-0" />
            <div className="d-flex justify-content-between">
              <p className="mt-2 ps-2">
                Have an account ?
                <a className="btn btn-link text-primary mb-1" data-bs-target="#modalLogin" data-bs-toggle="modal">Login</a>
              </p>
              <button className="btn btn-success btn-height mt-2 me-2" onClick={saveUser}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>


      <div className={page === "home" ? "row justify-content-center" : "row bg-danger justify-content-center"}>
        <div className={page === "home" ? "col-12 d-flex justify-content-end py-2" : "col-10 " + headerClass}>

          {
            page === "home" ? null : (
              <p className="m-0 brand " style={{ cursor: "pointer" }} onClick={() => navigate("/")}>e!</p>
            )
          }
          <div>
            {
              loginDetails ? (<><span className="text-white fw-bold h3">Welcome  {loginDetails.first_name}</span>
                <button className="btn btn-sm btn-warning text-white ms-2" onClick={logout}>Log Out</button></>) : (<>
                  <button className="btn text-white" data-bs-target="#modalLogin" data-bs-toggle="modal">Login</button>
                  <button className="btn btn-outline-light" data-bs-target="#modalCreateAccount" data-bs-toggle="modal">
                    <i className="fa fa-search" aria-hidden="true"></i>Create a
                    Account
                  </button>
                </>)}
          </div>
        </div>
      </div>
    </>
  )
};

export default Header;
