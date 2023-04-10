
const statusAction = {
    EDIT:'edit',
    DELETE:'delete'
}

const lstBrands = [
    {
        BrandCode: 'IPHONE',
        BrandName: 'iPhone',
        FlagActive: 1,
    },
    {
        BrandCode: 'SAMSUNG',
        BrandName: 'Samsung',
        FlagActive: 1,
    },
    {
        BrandCode: 'OPPO',
        BrandName: 'Oppo',
        FlagActive: 1,
    },
    {
        BrandCode: 'XIAOMI',
        BrandName: 'Xiaomi',
        FlagActive: 1,
    },
];
const lstCatePros = [
    {
        CateProCode: 'DIENTHOAI',
        CateProName: 'Điện thoại',
        FlagActive: 1,
    },
    {
        CateProCode: 'MAYTINH',
        CateProName: 'Máy tính',
        FlagActive: 1,
    },
    {
        CateProCode: 'DONGHO',
        CateProName: 'Đồng hồ',
        FlagActive: 1,
    },
];
const lstProducts = [
    {
       
        ProductCode: 'GALAXYS22ULTRA',
        ProductName: 'GALAXYS22ULTRA',
        Price: 27000000,
        UPDc: 2000000,
        FlagActive: 0,
    },
    {
        ProductCode: 'GALAXYZFLIP3',
        ProductName: 'GALAXYZFLIP3',
        Price: 17000000,
        UPDc: 1700000,
        FlagActive: 1,
    },
    {
        ProductCode: 'IPHONE13PROMAX',
        ProductName: 'IPHONE13PROMAX',
        Price: 29000000,
        UPDc: 2900000,
        FlagActive: 1,
    },
    {
        ProductCode: 'IPHONE13MINI',
        ProductName: 'IPHONE13MINI',
        Price: 24000000,
        UPDc: 3000000,
        FlagActive: 0,
    },
    {
        ProductCode: 'OPPORENO7',
        ProductName: 'OPPORENO7',
        Price: 9990000,
        UPDc: 1500000,
        FlagActive: 1,
    },
    {
        ProductCode: 'XIAOMIREDMINOTE11',
        ProductName: 'XIAOMIREDMINOTE11',
        Price: 4490000,
        UPDc: 449000,
        FlagActive: 1,
    },
];
export {
    lstBrands,
    lstCatePros,
    lstProducts,
    statusAction
}