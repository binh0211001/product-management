import { lstProducts, statusAction } from "@/constant/listProduct";
import { ProductRes } from "@/types/page/product.type";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
/**
 * ProductHandle: Function để xử lý logic chung cho việc create,update,delete,filter của Product
 * @returns 
 */
export default function ProductHandle(): ProductRes {
  const router = useRouter()
  // Data sản phẩm gốc dùng để filter product
  const [lstProductDataDB, setLstProductDataDB] = useState<any>([])
  // Data hiển thị ra UI
  const [lstProductDataUI, setLstProductDataUI] = useState(lstProductDataDB)
  // Danh sách checkbox xóa nhiều
  const [listCheckedDeleteProduct, setListCheckedDeleteProduct] = useState<any>({})
  useEffect(() => {
    const dataDB: any = localStorage.getItem('DataDB');
    const dataUI: any = localStorage.getItem('DataDB');
    
    // gán danh sách product UI
    const dataDBParse = JSON.parse(dataDB)
    if (dataDBParse) {
      console.log('co chay effect useEffect', dataDBParse)
      setLstProductDataDB(dataDBParse);
      console.log('UI effect',lstProductDataUI)
      setLstProductDataUI(lstProductDataDB)
    } else {
      setLstProductDataDB(lstProducts)
    }
  }, [])

  


  // Xử lý filter product khi chọn dropdown
  const handleFilterListProduct = (flagActive: number) => {
    if (flagActive == 2) {
      setLstProductDataUI(lstProductDataDB);
    } else {
      const listProductFilter = lstProductDataDB.filter((item: any) => item.FlagActive == flagActive)
      setLstProductDataUI(listProductFilter)
      console.log('listProductFilter+++++++',listProductFilter)
    }
  }

  // xử lý thay đổi trạng thái filter product dropdown
  const handleChangeFilterProduct = (e: any) => {
    const valueStatusProduct = e.target.value;
    if (valueStatusProduct == "") return;
    handleFilterListProduct(valueStatusProduct);
  }

  // xử lý xóa sản phẩm
  const handleEditDeleteProduct = (e: any, productCode: any) => {
    const valueStatusAction = e.target.value;
    if (valueStatusAction == "") {
      return;
    }
    if (valueStatusAction == statusAction.EDIT) {
      // Tiến hành edit
      router.push(`/product/${productCode}/edit`)

    } else if (valueStatusAction == statusAction.DELETE) {
      // Tiến hành xóa
      handleDeleteProductSingle(productCode)
    }
  }

  // clear data storage
  const handleClearStorage = () => {
    localStorage.clear();
    setLstProductDataDB(lstProducts);
    setLstProductDataUI(lstProducts);
  }

  // xử lý xóa product single
  const handleDeleteProductSingle = (productCode: string) => {
    const listProductFilterUI = lstProductDataUI.filter((item: any) => item.ProductCode != productCode)
    const listProductFilterDB = lstProductDataDB.filter((item: any) => item.ProductCode != productCode)
    // gán danh sách product UI
    localStorage.setItem('DataUI', JSON.stringify(listProductFilterUI));
    setLstProductDataUI(listProductFilterUI);

    // gán danh sách product gốc
    localStorage.setItem('DataDB', JSON.stringify(listProductFilterDB));
    setLstProductDataDB(listProductFilterDB);

  }

  //Xử lý gán sản phẩm để xóa nhiều 
  const handleCheckDeleteMany = (productCode: string) => {
    let data: any = {
      ...listCheckedDeleteProduct,
    }

    if (listCheckedDeleteProduct[productCode]) {
      delete listCheckedDeleteProduct[productCode];
      data = {
        ...listCheckedDeleteProduct,
      }
    } else {
      data = {
        ...listCheckedDeleteProduct,
        [productCode]: productCode
      }
    }
    setListCheckedDeleteProduct(data);

  }

  // Tiến hành xóa nhiều sản phẩm
  const handleDeleteProductMulti = () => {
    let productCodeDeletes = Object.keys(listCheckedDeleteProduct);
    // Biến tạm danh sách sản phẩm
    let dataTempProductUI = lstProductDataUI;
    let dataTempProductDB = lstProductDataDB;
    for (const productCode of productCodeDeletes) {
      dataTempProductUI = dataTempProductUI.filter((item: any) => item.ProductCode != productCode)
      dataTempProductDB = dataTempProductDB.filter((item: any) => item.ProductCode != productCode)
    }
    console.log('dataTempProductUI----handledeletemany', dataTempProductUI)
    console.log('lstProductDataDB----handledeletemany', dataTempProductDB)

        // gán danh sách product gốc
        localStorage.setItem('DataDB', JSON.stringify(dataTempProductDB));
        setLstProductDataDB(dataTempProductDB);
        // gán danh sách product UI
        localStorage.setItem('DataUI', JSON.stringify(dataTempProductUI));
        setLstProductDataUI(dataTempProductUI);
  }

  // Kiểm tra xem sản phẩm đã tồn tại trong danh sách chưa
  const checkProdutExit = (newProduct:any) =>{
    const productCode =  newProduct?.ProductCode;
    const exitProduct = lstProductDataDB.find(((item:any)=>item.ProductCode == productCode));
    return exitProduct;
  }
  // Tiến hành tạo product
  const handleCreateProduct = (data: any) => {
    //productExit:true=> sản phẩm đã tồn tại,!true => chưa tồn tại
    const productExit = checkProdutExit(data);
    if(productExit){
      alert('Mã sản phẩm đã tồn tại, vui lòng nhập lại!! ')
      return;
    }

    //Nếu trạng thái được check sẽ gán giá trị 1, ngược lại sẽ là 0
    if (data.FlagActive == true){
      data.FlagActive = 1;
    }else{
      data.FlagActive = 0;
    }
    // gán danh sách product gốc
    localStorage.setItem('DataDB', JSON.stringify([...lstProductDataDB, data]));
    setLstProductDataDB([...lstProductDataDB, data]);
    // gán danh sách product UI
    localStorage.setItem('DataUI', JSON.stringify([...lstProductDataDB, data]));
    setLstProductDataUI([...lstProductDataDB, data]);
    router.push(`/product`);

    
  }

  // Tiến hành update product
  const handleUpdateProduct = (data: any) => {
    //Biến ghi tạm danh sách sản phẩm
    let dataTempProduct = lstProductDataDB
    const dataMap: any = []
    dataTempProduct.map(
      (product: any, index: number) => {
        let obj: any;
        if (product.ProductCode.trim() == data.ProductCode.trim()) {
          obj = {
            ProductCode: data.ProductCode,
            ...data
          }
        } else {
          obj = product
        }
        dataMap.push(obj)
      }
    )

    // gán danh sách product gốc
    localStorage.setItem('DataDB', JSON.stringify(dataMap));
    setLstProductDataDB(dataMap);
    // gán danh sách product UI
    localStorage.setItem('DataUI', JSON.stringify(dataMap));
    setLstProductDataUI(dataMap);
    router.push(`/product`);

  }

  return {
    lstProductDataUI,
    lstProductDataDB,
    handleChangeFilterProduct,
    handleEditDeleteProduct,
    handleClearStorage,
    handleCheckDeleteMany,
    handleDeleteProductMulti,
    setLstProductDataDB,
    setLstProductDataUI,
    setListCheckedDeleteProduct,
    handleCreateProduct,
    handleUpdateProduct,
    listCheckedDeleteProduct
  }
}