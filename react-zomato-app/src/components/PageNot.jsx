import { Link } from "react-router-dom";


const PageNotFound = () => {
    return (
        <>
          <h1 className="display-1 text-center">Page Not Found</h1>
          <p className="text-center h1 fw-bold">Click <Link to="/">HERE</Link> to get Home Page</p>
        </>
    );
};

export default PageNotFound;