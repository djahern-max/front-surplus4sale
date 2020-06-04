import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import Search from './Search';

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts('sold').then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts('createdAt').then((data) => {
      console.log(data);
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <Layout
      title='Surplus Inventory & Equipment'
      description='Please search our surplus inventory below'
      className='container-fluid'
    >
      <Search />

      <div className='row'>
        <div className='container mb-2'>
          <div className='container-fluid mb-3'>
            {/* <h2 className='mb-4'>New Arrivals</h2> */}
            {productsByArrival.map((product, i) => (
              <div key={i} className=''>
                <Card product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <br />

      {/* <div className='row'>
        <div className='container mb-3'>
          <div className='container-fluid mb-3'>
            <h2 className='mb-4'>Best Sellers</h2>
            {productsBySell.map((product, i) => (
              <div key={i} className=''>
                <Card product={product} />
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* 
<div className="container">
      <div className='row'>



        {productsBySell.map((product, i) => (
          <div key={i} className='col-4 mb-3'>
            <Card product={product} />
          </div>
        ))}
      </div>

      </div> */}
    </Layout>
  );
};

export default Home;
