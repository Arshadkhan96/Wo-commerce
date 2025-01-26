import React,{Fragment, useEffect} from 'react'
import Carousel from 'react-material-ui-carousel'
import { useSelector, useDispatch } from 'react-redux';
import { getProductDetail } from '../../../action/productAction';
import Rating from '@mui/material/Rating';
import ReviewCard from './ReviewCard';
import { useParams } from 'react-router-dom'; 
import './ProductDetail.css';


const ProductDetail = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.productDetails || {});

  useEffect(() => {
    if (id) {
      dispatch(getProductDetail(id));
    }
  }, [dispatch, id]); 


  return (
    <Fragment>
      <div className="productDetail">
        <div>   
          <Carousel>
            {
              product.image && product.image.map ((item, index)=>{
                <img className='crousel-image' key={item.url} src='item.url' alt='product-img'/>
              })
            }
          </Carousel>
        </div>
          <div className="Detail-block-1">
            <h2>{product.name}</h2>
            <p>Product #{product._id}</p>
          </div>
          <div className="Detail-block-2">
          <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
          <span>({product.numberOfReviews}Reviews)</span>
          </div>
          <div className="Detail-block-3">
            <h2>{`₹${product.price}`}</h2>

            <div className="Detail-block-3-1">
              <div className="Detail-block-3-1-1">
              <button>-</button>
              <input type="number" value={1} />
              <button>+</button>
              </div>
              <button>ADD To Cart</button>
            </div>

              <p>
                status:
                <b className={product.stock <1?"redColor":"greenColor"}>
                {product.stock>1?"OutOfStock":"InStock"}
                </b>
              </p>
          </div>

          <div className="Detail-block-4">
            Description:
            {product.description} 
          </div>
          <button className='submitReview'>Submit Review</button>
      </div>

      <h3 className="reviewsHeading">REVIEWS</h3>
      {product.reviews && product.reviews[0]?(
        <div className="reviews">
          {product.reviews && 
          product.reviews.map((review)=><ReviewCard review={review} key={review._id}/>)}
        </div>
      ):
      (
        <p className='noReviews'>
         NO REVIEW YET    
        </p>
      )}
    </Fragment>
  )
}

export default ProductDetail
  
