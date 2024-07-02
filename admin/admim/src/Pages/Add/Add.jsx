import React, { useEffect, useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from "axios";

const Add = () => {
  const [image,setImage]=useState(false);
  const [data,setData]=useState({
    name:'',
    description:'',
    category:'Salad',
    price:''
  })

  const onChangeHandler=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    setData({...data,[name]:value});
  }

  const onSubmitHandler=async(e)=>{
     e.preventDefault();
     const formData=new FormData();
      formData.append('name',data.name);
      formData.append('description',data.description);
      formData.append('category',data.category);
      formData.append('price',Number(data.price));
      formData.append('image',image);

      const response=await axios.post('http://localhost:4000/api/food/add',formData);

      if(response.data.sucess){
        alert('Data Added Successfully');
        setData({
          name:'',
          description:'',
          category:'Salad',
          price:''
        })
        setImage(false);
      }
      else{

      }

  }

  useEffect(()=>{console.log(data)},[data])
  return (
    <div className="add">
      <form onSubmit={onSubmitHandler}className="flex-col">
        <div className="add-image-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            name=""
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="write content here"
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select
              onChange={onChangeHandler}
              value={data.category}
              name="category"
              id=""
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="CakePure Veg">CakePure Veg</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="Number"
              name="price"
              placeholder="$20"
            />
          </div>
        </div>
        <button type="submit" className="add-button">
          ADD
        </button>
      </form>
    </div>
  );
}

export default Add
