import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import useFetchDocument from "../../../customHooks/useFetchDocument";
import useFetchCollection from '../../../customHooks/useFetchCollection'
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART, DECREASE_CART, CALCULATE_TOTAL_QUANTITY,
        selectCartItems } from "../../../redux/slice/cartSlice";
// COMPONENTS
import Card from '../../../components/card/Card'
import StarsRating from "react-star-rate";
// ASSETS
import spinnerImg from "../../../assets/spinner.jpg";
// STYLE
import styles from "./ProductDetails.module.scss";

const ProductDetails = () => {
  const {id} = useParams()
  const [product, setProduct] = useState(null)
  const dispatch = useDispatch()

  const { data } = useFetchCollection("reviews")
  const filteredReviews = data.filter((review) => review.productID === id)

  const cartItems = useSelector(selectCartItems)
  const cart = cartItems.find((cartItem) => cartItem.id === id)
  const isCartAdded = cartItems.findIndex((cart) => {
    return cart.id === id;
  });

  const { document } = useFetchDocument("products", id)


  useEffect(() => {
    setProduct(document)
  }, [document])

  const addToCart = (product) => {
      dispatch(ADD_TO_CART(product))
      dispatch(CALCULATE_TOTAL_QUANTITY())
  }

  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product))
    dispatch(CALCULATE_TOTAL_QUANTITY())
  }

  return (
    <section>
      <ToastContainer />
      <div className={ `container ${styles.product}` }>
      <h2>Product Details</h2>
      <Link to="/#product"> 
        &larr; Back To Products
      </Link>
      {!product ? (
        <img src={spinnerImg} alt="loading..." style={{ width: "50px" }} />
      ) : (
        <>
          <div className={styles.details}>
            <div className={styles.img}>
              <img src={product.imageURL} alt={product.name} />
            </div>
            <div className={styles.content}>
              <h3>{product.name}</h3>
              <p className={styles.price}>{`$${product.price}`}</p>
              <p>{product.desc}</p>
              <p>
                  <b>SKU</b> {product.id}
                </p>
                <p>
                  <b>Brand</b> {product.brand}
                </p>
                <div className={styles.count}>
                {isCartAdded < 0 ? null : (
                    <>
                      <button
                        className="--btn"
                        onClick={() => decreaseCart(product)}
                      >
                        -
                      </button>
                      <p>
                        <b>{cart.cartQuantity}</b>
                      </p>
                      <button
                        className="--btn"
                        onClick={() => addToCart(product)}
                      >
                        +
                      </button>
                    </>
                  )}
                </div>
                <button
                  className="--btn --btn-danger"
                  onClick={() => addToCart(product)}
                  >ADD TO CART
                </button>
            </div>
          </div>
        </>
      )}
      <Card cardClass={styles.card}>
          <h3>Product Reviews</h3>
          <div>
            {filteredReviews.length === 0 ? (
              <p>There are no reviews for this product yet.</p>
            ) : (
              <>
                {filteredReviews.map((item, index) => {
                  const { rate, review, reviewDate, userName } = item;
                  return (
                    <div key={index} className={styles.review}>
                      <StarsRating value={rate} />
                      <p>{review}</p>
                      <span>
                        <b>{reviewDate}</b>
                      </span>
                      <br />
                      <span>
                        <b>by: {userName}</b>
                      </span>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </Card>
      </div>
    </section>
  );

};



export default ProductDetails;
