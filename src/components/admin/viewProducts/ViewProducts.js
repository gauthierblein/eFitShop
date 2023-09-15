import { useState, useEffect } from "react";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { STORE_PRODUCTS, selectProducts} from '../../../redux/slice/productSlice'
import { db } from "../../../firebase/config";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { deleteDoc, doc } from "firebase/firestore";
import Notiflix from "notiflix";
import { FILTER_BY_SEARCH, SORT_PRODUCTS, selectFilteredProducts } from "../../../redux/slice/filterSlice";
// STYLE
import styles from "./ViewProducts.module.scss";
// ICONS
import { FaEdit, FaTrashAlt } from "react-icons/fa";

// COMPONENTS
import Loader from "../../loader/Loader";
import { ToastContainer, toast } from 'react-toastify';
import Search from "../../search/Search";
import Pagination from "../../pagination/Pagination";

const ViewProducts = () => {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useFetchCollection("products")
  const products = useSelector(selectProducts)
  const filteredProducts = useSelector(selectFilteredProducts)

  const storage = getStorage();
  const dispatch = useDispatch();

    
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage, setProductsPerPage] = useState(6)
  // Get Current Products
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS( {products: data} )
    )
  }, [dispatch, data])

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({products, search}))
}, [dispatch, products, search])
  
  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      'Delete product',
      'You are about to delete this product',
      'Delete',
      'Cancel',
      function okCb () {deleteProduct(id, imageURL)},
      function cancelCb () {alert("deleting cancelled")},
      {width:"320px", borderRadius:"4px",
      titleColor:"orangeRed", okButtonBackground:"orangeRed",
      cssAnimationStyle:"zoom"}
    )
  }

  const deleteProduct = async(id, imageURL) => {
    try {
      await deleteDoc(doc(db, "products", id))
      // Delete file from storage
      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef);
      toast.success("Product deleted successfully")
    } catch(error) {
      toast.error(error.message)
    }
  }

  return (
    <>
      
      {isLoading && <Loader />}
      <ToastContainer />
      <div className={styles.table}>
          <h2>View Products</h2>

          <div className={styles.search}>
            <p><b>{filteredProducts.length}</b>products found</p>
            <Search value={search} onChange={(e) => setSearch(e.target.value)}/>
          </div>

          {filteredProducts.length === 0 ?  (
          <p>No product found.</p>) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {currentProducts.map((product, index) => {
              const {id, name, price, imageURL, category} = product
              return (
                <tr key={id}>
                  <td>{index +1}</td>
                  <td>
                    <img src={imageURL} alt={name} style={{width:"100px"}}/>
                  </td>
                  <td>{name}</td>
                  <td>{category}</td>
                  <td>{`€${price}`}</td>
                  <td className={styles.icons} >

                    <Link to={`/admin/add-product/${id}`}>
                      <FaEdit size={20} color={"green"} />
                    </Link>
                    &nbsp;
                    <FaTrashAlt 
                      size={20} color={"red"}
                      onClick={ () => confirmDelete(id, imageURL)}
                    />
                  </td>
                </tr>
                
              )
            })}
            </tbody>
          </table>
          )}
          <Pagination 
          productsPerPage={productsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalProducts={filteredProducts.length}
      /> 
      </div>
    </>
  );
};

export default ViewProducts;
