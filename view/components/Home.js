import React from 'react';
import {Link} from 'react-router-dom';

const Home = () => (
  <div>Hello world: <Link to={'/map'}>Open Map</Link></div>
);

export default Home;
