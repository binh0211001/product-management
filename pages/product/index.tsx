import ProductHandle from '@/handles/products/product.handle';
import { ProductRes } from '@/types/page/product.type';
import Link from 'next/link';
import { useEffect } from 'react';
import { lstProducts } from '../../constant/listProduct';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import styles from './index.module.scss';

function ListProduct() {
  const {
    lstProductDataUI = [],
    handleChangeFilterProduct,
    handleEditDeleteProduct,
    handleClearStorage,
    handleCheckDeleteMany,
    handleDeleteProductMulti, 
    setLstProductDataDB,
    setLstProductDataUI,
    listCheckedDeleteProduct
  }: ProductRes = ProductHandle();
  useEffect(() => {
    const dataDBStorage = localStorage.getItem('DataDB');
    const dataUIStorage = localStorage.getItem('DataUI');
    if (!dataDBStorage) {
      localStorage.setItem('DataDB', JSON.stringify(lstProducts));
    } else {
      const dataDBStorageParseToObject = JSON.parse(dataDBStorage)
      setLstProductDataDB(dataDBStorageParseToObject)
      localStorage.setItem('DataDB', JSON.stringify(dataDBStorageParseToObject));
    }
    console.error('first render UI',lstProductDataUI)

    if (!dataUIStorage) {
      localStorage.setItem('DataUI', JSON.stringify(lstProducts));
    } else {
      const dataUIStorageParseToObject = JSON.parse(dataUIStorage)
      setLstProductDataUI(dataUIStorageParseToObject)
      localStorage.setItem('DataUI', JSON.stringify(dataUIStorageParseToObject));

    }
  }, [])




    // modal delete confirm
    const confirmDeleteMulti = () => {
      if(!Object.keys(listCheckedDeleteProduct).length){
        alert('Bạn chưa chọn các sản phẩm để xóa nhiều');
        return;
      }else{
        confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <div className={styles.confirmModal}>
                <h1>Xóa nhiều</h1>
                <p>Bạn có chắc là muốn xóa các sản phẩm này không?</p>
                <button onClick={onClose}>Hủy</button>
                <button onClick={() => {
                    handleDeleteProductMulti();
                    onClose()
                }}>Xóa!</button>
              </div>
            )
          }
        })
      }
    
    }


  return (
    <div className={styles.indexPage}>
      <div  >
        <nav className={styles.menuAction}>
          <div>
          <select onChange={handleChangeFilterProduct}>
            <option value="2" defaultChecked>Tất cả</option>
            <option value="1">Đang kinh doanh</option>
            <option value="0">Ngừng kinh doanh</option>
          </select>
          </div>

         <div>
         <button type="button" onClick={()=>confirmDeleteMulti()}>Tiến hành xóa nhiều</button>
         </div>
          <div>
          <button><Link href="/product/create">Tiến hành add product</Link></button>
          </div>
          <div>
          <button type="button" onClick={handleClearStorage}>Khôi phục data mẫu</button>
          </div>
          

        </nav>
      </div>
      <div className={styles.tableContentWrapper}>
      <table border={1}>
        <tbody>
          <tr>
            <th >STT </th>
            <th >Actions </th>
            <th >Check </th>
            <th >Mã sản phẩm </th>
            <th >Tên sản phẩm </th>
            <th >Giá sản phẩm </th>
            <th > Giá khuyến mại </th>
            <th > Trạng thái </th>
          </tr>
          {lstProductDataUI.map((product: any, index: any) => {
            return (
              <tr key={product.ProductCode}>
                <td>{index + 1}</td>
                <td style={{ padding: '0'}}>
                  <select style={{ fontWeight: 'bold'}} onChange={(e) => handleEditDeleteProduct(e, product.ProductCode)}>
                    <option value=""></option>
                    <option value="edit">Edit</option>
                    <option value="delete">Delete</option>
                  </select>
                </td>
                <td ><input type="checkbox" className="selectsingle" value={product.ProductCode} onChange={() => handleCheckDeleteMany(product.ProductCode)} />
                  &nbsp;&nbsp;
                </td>
                <td>{product.ProductCode}</td>
                <td>{product.ProductName}</td>
                <td>{product.Price}</td>
                <td>{product.UPDc}</td>
                <td>{product.FlagActive}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      </div>
    </div>
  );
}
export default ListProduct;
