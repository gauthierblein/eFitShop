import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts, STORE_PRODUCTS, } from "../../../redux/slice/productSlice";
import {
  CALC_TOTAL_ORDER_AMOUNT,
  selectOrderHistory,
  selectTotalOrderAmount,
  STORE_ORDERS, } from "../../../redux/slice/orderSlice";
import useFetchCollection from '../../../customHooks/useFetchCollection'
// COMPONENTS
import InfoBox from "../../infoBox/InfoBox";
import Chart from "../../chart/Chart"

//STYLE
import styles from "./Home.module.scss";
//ICONS
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa";
const earningIcon = <AiFillDollarCircle size={30} color="#b624ff" />;
const productIcon = <BsCart4 size={30} color="#1f93ff" />;
const ordersIcon = <FaCartArrowDown size={30} color="orangered" />;

const Home = () => {
  const totalProducts = useSelector(selectProducts)
  const totalOrders = useSelector(selectOrderHistory)
  const totalOrderAmount = useSelector(selectTotalOrderAmount)

  const firebaseProducts = useFetchCollection("products");
  const { data } = useFetchCollection("orders");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: firebaseProducts.data,
      })
    );

    dispatch(STORE_ORDERS(data));

    dispatch(CALC_TOTAL_ORDER_AMOUNT());
  }, [dispatch, data, firebaseProducts]);

  return (
    <div className={styles.home}>
      <h2>Admin Home</h2>
      <div className={styles["info-box"]}>
        <InfoBox
          cardClass={`${styles.card} ${styles.card1}`}
          title={"earnings"}
          count={totalOrderAmount}
          icon={earningIcon}
        />
        <InfoBox
          cardClass={`${styles.card} ${styles.card2}`}
          title={"Products"}
          count={totalProducts.length}
          icon={productIcon}
        />
        <InfoBox
          cardClass={`${styles.card} ${styles.card3}`}
          title={"Orders"}
          count={totalOrders.length}
          icon={ordersIcon}
        />
      </div>
      <div>
        <Chart />
      </div>
    </div>
  );
};

export default Home;
