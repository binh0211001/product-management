import ProductHandle from "@/handles/products/product.handle";
import { ProductRes } from "@/types/page/product.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from 'next/router';
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import styles from './index.module.scss';


// validate Form
const validateSchemaProduct = yup.object().shape({
  ProductName: yup.string().required("Tên sản phẩm là bắt buộc").max(30,"Tên sản phẩm nhỏ hơn 30 ký tự"),
  Price: yup.number()
  .required("Giá vui lòng nhập số")
  .transform((value) => (isNaN(value) || value === null || value === undefined) ? null : value)
  .min(0,"Giá trị nhập lớn hơn 0").max(999999999,"Giá trị nhập nhỏ hơn 999999999"),
  UPDc: yup.number()
  .required("Giá khuyến mại vui lòng nhập số")
  .transform((value) => (isNaN(value) || value === null || value === undefined) ? null : value)
  .min(0,"Giá trị nhập lớn hơn 0").max(999999999,"Giá trị nhập nhỏ hơn 999999999"),
  FlagActive: yup.bool().required(),
});

function ProductForm({ isUpdateMode = false }: any) {
  // Các hàm của next giúp lấy id trên trình duyệt
  const router = useRouter()
  const { id } = router.query

  // Các hàm xử lý create + update product
  const {
    handleCreateProduct,
    handleUpdateProduct,
    lstProductDataDB,
  }: ProductRes = ProductHandle();
  // Các hàm của react-hook-form
  const {
    register,//hàm theo dõi thay đổi của field
    handleSubmit,//hàm để xử lý submit form
    setValue,//Để set giá trị của từng field của form,
    getValues,
    formState: { errors } //quản lý lỗi của form
  } = useForm({
    resolver: yupResolver(validateSchemaProduct)
  });
  // Tiến hành submit form
  const onSubmit = (data: any) => {
    // Nếu là page edit thì tiến hành update product
    if (isUpdateMode) {
      handleUpdateProduct(data);
    } else {
      // Nếu là page create 
      handleCreateProduct(data)
    }
  };

  // Tiến hành check chế độ page(create hay update) + id là mã sản phẩm để lấy ra thông tin của product để fill vào form khi tiến hành edit
  useEffect(() => {
    if (isUpdateMode) {
      if (id && lstProductDataDB.length) {
        // dựa vào id trên trình duyệt lấy ra thông tin product
        const productInfo = lstProductDataDB.find((item: any) => item.ProductCode.trim() == id);
        // Danh sách các field của form
        const fields = ['ProductCode', 'ProductName', 'Price', 'UPDc', 'FlagActive'];
        // Tiến hành set value vào form khi edit
        fields.forEach(field => setValue(field, productInfo[field]));
      }
    }
  }, [lstProductDataDB, id]);

  //Tiến hành set value của mã sản phẩm khi onChange
  const onChangeProductName = (e:any) =>{
    // Khi là màn update sẽ ko tiến hành gán lại Product Code
    if (isUpdateMode) {
       return
    }else{
    // Khi là màn tạo sẽ tiến hành gán lại Product Code
      const productName = e?.target?.value;
      const productCode =  productName.toUpperCase().replace(/ /g, "");
      setValue('ProductCode',productCode)
    }
  
  }

  return (
    <>
      <div className={styles.createPageWrapper}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.createPage}>
          <div className={styles.rowInput}>
            <label className={styles.title}>Mã Sản Phẩm</label>
            <div className={styles.inputWrapper}>
              <input className={styles.input} disabled={true} {...register("ProductCode")}/>
              {errors.ProductCode && <span className={styles.error}>{errors?.ProductCode?.message?.toString()}</span>}
            </div>
          </div>
          <div className={styles.rowInput}>
            <label className={styles.title}>Tên Sản Phẩm</label>
            <div className={styles.inputWrapper}>
              <input className={styles.input} {...register("ProductName")}  onChange={(e) => onChangeProductName(e)}/>
              {errors.ProductName && <span className={styles.error}>{errors?.ProductName?.message?.toString()}</span>}
            </div>
          </div>
          <div className={styles.rowInput}>
            <label className={styles.title}>Giá</label>
            <div className={styles.inputWrapper}>
            <input className={styles.input} {...register("Price")}/>
            {errors.Price && <span className={styles.error}>{errors?.Price?.message?.toString()}</span>}
            </div>
           
          </div>
          <div className={styles.rowInput}>
            <label className={styles.title}>Giá Khuyến Mại</label>
            <div className={styles.inputWrapper}>
            <input className={styles.input} {...register("UPDc")}/>
            {errors.UPDc && <span className={styles.error}>{errors?.UPDc?.message?.toString()}</span>}
            </div>

           
          </div>
          <div className={styles.rowInput}>
            <label className={styles.title}>Trạng Thái</label>
            <div className={styles.inputWrapper}>
            <input className={styles.inputCheckBox} type="checkbox" {...register("FlagActive")} />
            {errors.FlagActive && <span className={styles.error}>{errors?.FlagActive?.message?.toString()}</span>}
            </div>

           
          </div>
          <div>
            {isUpdateMode ?
              <input className={styles.btnSubmit} type="submit" value="Cập nhật" /> : <input className={styles.btnSubmit} type="submit" value="Tạo mới" />}
            <button className={styles.btnBack} onClick={() => { router.push(`/product`) }} type="button">Back</button>
          </div>
        </form>
      </div>
    </>
  );
}
export default ProductForm
