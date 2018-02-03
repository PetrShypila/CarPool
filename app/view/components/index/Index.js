import React from 'react';
import {Link} from "react-router-dom";

const Index = () => (
  <div>
    <Link className={`btn btn-info`} role={`button`} to={`/login`}>Login</Link>
    <Link className={`btn btn-info`} role={`button`} to={`/signup`}>Sign Up</Link>
  </div>
);

export default Index;
