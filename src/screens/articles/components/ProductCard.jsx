import { IoMdHeart } from "react-icons/io";
import { IoCart } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { BodyOne } from "./CustomComponents";
import { useState } from "react";
import CardDetails from "../../../modal/CardDetails";  // Importez le nouveau composant
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { CartActions } from "@/redux/slice/cartSlice";

export const RenderRatingStars = (rating) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const hasHalfstars = rating % 1 !== 0;
  const stars = [];

  for (let i = 1; i <= totalStars; i++) {
    if (i <= fullStars) {
      stars.push(<FaStar key={i} color="#ff8a00" />);
    } else if (hasHalfstars && i === fullStars + 1) {
      stars.push(<FaStarHalfAlt key="half-star" color="#ff8a00" />);
    } else {
      stars.push(<FaRegStar key={i} color="#ff8a00" />);
    }
  }
  return stars;
};

export const ProductCard = ({
  id,
  key,
  title,
  description,
  images,
  price,
  discount,
  rating,
  featured,
  category,
  color,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch =useDispatch ()

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

const discountPrice = price[0].value - (price[0].value * discount)/100;


const addToCart = () => {
  dispatch(
    CartActions.addToCart({id, title, price: discountPrice, images }))
    console.log("🚀 ~ addToCart ~ id, title, price:", id, title, price)
};
  return (
    <>
      <div className="product Card ">
        <div className="images h-96 ">
          {images.map((cover, index) => (
            <img key={index} src={cover?.image} alt={id} className="w-full h-full object-cover" />
          ))}
          <div className="flex justify-between w-full p-5 absolute top-0 left-0">
            {discount && <button className="discount-btn">{discount}%</button>}
            {featured && <button className="feature-btn">{featured === true && "Featured"}</button>}
          </div>
          <div className="overlay flex items-center gap-2 justify-center absolute bottom-0 left-0 right-0 m-5">
            <button onClick={openModal} className="quick-view-btn product-btn primary-btn ">
              Quick View
            </button>
            <button onClick={addToCart} className="add-to-cart-btn product-btn primary-btn ">
              <IoCart size={23} />
            </button>
            {/* <button className="love-btn product-btn primary-btn ">
              <IoMdHeart size={23} />
            </button> */}
          </div>
        </div>
        <div className="deatils flex items-center flex-col bg-white pt-6">
          <NavLink to={`/product-details/${id}`}>
            <BodyOne>{title}</BodyOne>
          </NavLink>
          <div className="text-black flex items-center gap-2 -mt-2 mb-2">{RenderRatingStars(rating)}</div>
          <div className="flex items-center gap-3 ">
            {price.slice(0, 1).map((priceItem, index) => (
              <>
                <BodyOne className="line-through" key={index}>
                  {priceItem.value}DA
                </BodyOne>
                <BodyOne className="text-primary-green">
                  {(priceItem.value - (priceItem.value * discount) / 100).toFixed(2)}DA
                </BodyOne>
              </>
            ))}
          </div>
        </div>
      </div>

      <CardDetails isOpen={isModalOpen} onClose={closeModal} product={{ images, id, discount, title, rating, price, description, category }} />
    </>
  );
};
