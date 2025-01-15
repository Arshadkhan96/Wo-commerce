import { Rating } from '@mui/material'
import React from 'react'

const ReviewCard = ({review}) => {
  return (
    <div className='reviewCard'>
      <img src="./short-1.png" alt="user" />
      <p>{review.name}</p>
      <Rating/>
    </div>
  )
}

export default ReviewCard