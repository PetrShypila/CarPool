import React from 'react';
import {Link} from "react-router-dom";

const Index = () => (
  <div className={`body`}>
    <div className={`background`} />
    <div className={`auth-block`}>
      <Link className={`btn btn-info btn-auth`} role={`button`} to={`/login`}>Login</Link>
      <Link className={`btn btn-info btn-auth`} role={`button`} to={`/signup`}>Sign Up</Link>
    </div>
  </div>
);

export default Index;
