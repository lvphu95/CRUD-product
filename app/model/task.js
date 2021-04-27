//Import fs vào
const fs = require('fs');

//Đọc tất cả sản phẩm
const readAllProduct = () => {
    const buffer = fs.readFileSync('task.json');
    const taskString = buffer.toString();
    const taskJson = JSON.parse(taskString);
    return taskJson;
};

//Đọc sản phẩm theo id
const readDetailProduct = (id) => {
    const productList = readAllProduct();
    const product = productList.find((product) => id === product.id);
    return product;
};

//Thêm sản phẩm mới
const addNewProduct = (name, price, amount, description) => {
    let productList = readAllProduct();
    const newProduct = {
        id: Math.random().toString(),
        name,
        price,
        amount,
        description
    };
    productList = [...productList, newProduct];
    fs.writeFileSync('task.json', JSON.stringify(productList));
    return newProduct;
};

//Cập nhật thông tin của sản phẩm theo id
const updateProduct = (id, name, price, amount, description) => {
    let productList = readAllProduct();
    const index = productList.findIndex((product) => id === product.id);
    if(index !== -1){
        const oldProduct = productList[index];
        const newProduct = {...oldProduct, name, price, amount, description};
        productList[index] = newProduct;
        fs.writeFileSync('task.json', JSON.stringify(productList));
        return newProduct;
    }else{
        return false;
    }
};

//Loại bỏ sản phẩm ra khỏi danh sách
const deleteProduct = (id) => {
    let productList = readAllProduct();
    const index = productList.findIndex((product) => product.id === id);
    if (index !== -1){
        const product = productList[index];
        productList = productList.filter((product) => product.id !== id);
        fs.writeFileSync('task.json', JSON.stringify(productList));
        return product;
    }else{
        return false;
    }
};

//Nhập thêm số lượng hàng
const addAmount = (id) => {
    let productList = readAllProduct();
    const index = productList.findIndex((product) => id === product.id);
    if(index !== -1){
        const product = productList[index];
        product.amount += 50;
        fs.writeFileSync('task.json', JSON.stringify(productList));
        return product;
    }else{
        return false;
    }
};

//Export các hàm xử lý sản phẩm
module.exports = {
    readAllProduct,
    readDetailProduct,
    addNewProduct,
    updateProduct,
    deleteProduct,
    addAmount
};