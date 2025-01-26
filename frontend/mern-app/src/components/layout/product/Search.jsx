// import React,{Fragment,useState} from 'react'


// const Search = ({history}) => {
//     const [keyword,setKeyword] = useState("")
//   console.log(keyword)
//     const searchSubmitHandler=(e)=>{
//         e.preventDefault()
//         if(keyword.trim()){
//           history.push(`/products/${keyword}`)
//         }else{
//           history.push('/products')
//         }
//     }
//   return (
//       <Fragment>
//         <form className='searchBox' onSubmit={searchSubmitHandler}>
//             <input type="text" placeholder='search a product...' onChange={(e)=>setKeyword(e.target.value)} />
//             <input type="submit" value="search" />
//         </form>
//       </Fragment>
//   )
// }

// export default Search;


// // export default Search
import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate(); // Use the navigate hook

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`); // Navigate to the keyword-based route
    } else {
      navigate('/products'); // Navigate to the default products route
    }
  };
  return (
    <Fragment>
      <form className='searchBox' onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a product..."
          value={keyword} // Controlled input
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};


export default Search;
