import React from 'react';
import Productdetails from './Cards/Productdetails';

export default function ProductSection() {

   const PostShowcase = [
      // {
      //    "_id": { "$oid": "66c79b2c974991a6c3849574" },
      //    "title": "Portfolio Website",
      //    "content": "React js with stylist gsap animations",
      //    "projectLink": "www.example.com",
      //    "tags": "Gsap",
      //    "priseBefore": 199,
      //    "priseNow": 0,
      //    "image": "https://res.cloudinary.com/dsfztnp9x/image/upload/v1724357079/zbb7hjxgz9hpnqpskvif.jpg",
      //    "keyWords": "Portfolio",
      //    "publishedAt": null,
      //    "author": { "$oid": "66c640294ce2289ee4e7b895" },
      //    "createdAt": { "$date": "2024-08-22T20:10:20.050Z" },
      //    "updatedAt": { "$date": "2024-08-22T20:10:20.050Z" },
      //    "__v": 0
      // },
      // {
      //    "_id": { "$oid": "66ca096d2f06f7f0e6eb9fe6" },
      //    "title": "Qr attender app",
      //    "content": "Using flutter cloud app",
      //    "projectLink": "www.example.com",
      //    "tags": "java , flutter",
      //    "priseBefore": 2999,
      //    "priseNow": 1999,
      //    "image": "https://res.cloudinary.com/dsfztnp9x/image/upload/v1724357079/zbb7hjxgz9hpnqpskvif.jpg",
      //    "keyWords": "app",
      //    "publishedAt": null,
      //    "author": { "$oid": "66c640294ce2289ee4e7b895" },
      //    "createdAt": { "$date": "2024-08-24T16:25:17.072Z" },
      //    "updatedAt": { "$date": "2024-08-24T16:25:17.072Z" },
      //    "__v": 0
      // },
      // {
      //    "_id": { "$oid": "66ca09802f06f7f0e6eb9fea" },
      //    "title": "Web designing",
      //    "content": "Using flutter cloud app",
      //    "projectLink": "www.example.com",
      //    "tags": "java , flutter",
      //    "priseBefore": 199,
      //    "priseNow": 0,
      //    "image": "https://res.cloudinary.com/dsfztnp9x/image/upload/v1724357079/zbb7hjxgz9hpnqpskvif.jpg",
      //    "keyWords": "app",
      //    "publishedAt": null,
      //    "author": { "$oid": "66c640294ce2289ee4e7b895" },
      //    "createdAt": { "$date": "2024-08-24T16:25:36.636Z" },
      //    "updatedAt": { "$date": "2024-08-24T16:25:36.636Z" },
      //    "__v": 0
      // }
   ];

   return (
      <>
         <div className="product_section_container">
            <h1 className='product_section_title'>
               Products
            </h1>
            <button className='product_section_button'>
               See More
            </button>
         </div>
         <div className="product_list">
            {
               PostShowcase.length ? (
                  PostShowcase && PostShowcase
                     .map((post, index) => (
                        <div key={index} className="product_item">
                           <Productdetails post={post} />
                        </div>
                     ))
               ) : (
                  <div className="product_item_skelliton"></div>
               )
            }
            {/* {
               PostShowcase && PostShowcase
                  .map((post, index) => (
                     <div key={index} className="product_item">
                        <Productdetails post={post} />
                     </div>
                  ))
            } */}
         </div>
      </>
   );
}
