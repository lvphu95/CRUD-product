//Import yargs vào
const { number } = require('yargs');
const yargs = require('yargs');

//Import các hàm xử lý từ file task.js trong thư mục model
const {readAllProduct, readDetailProduct, addNewProduct, updateProduct, deleteProduct, addAmount} 
    = require('./model/task');


//Tạo các câu lệnh bằng yargs

//câu lệnh đọc tất cả sản phẩm - node app/index.js readAll
yargs.command({
    command: 'readAll',
    handler: () => {
        const result = readAllProduct();
        console.log(result);
    }
});

//câu lệnh đọc sản phẩm theo id - node app/index.js readDetail --id="1"
yargs.command({
    command: 'readDetail',
    builder: {
        id: {
            type: 'string',
        },
    },
    handler: (args) => {
        const {id} = args;
        product = readDetailProduct(id);
        if(product) {
            console.log("Chi tiết của Product: ", product);
        }else{
            console.log("Không tìm thấy sản phẩm");
        }
    }
});

//Thêm sản phẩm mới -node app/index.js add --name="K" --price=1000 --amount=1 --description="Mặt hàng K"
yargs.command({
    command: 'add',
    builder: {
        name: {
            type: 'string',
        },
        price: {
            type: number
        },
        amount: {
            type: number
        },
        description: {
            type: 'string'
        }
    },
    handler: (args) => {
        const {name, price, amount, description} = args;
        const product = addNewProduct(name, price, amount, description);
        console.log('New Product: ', product);
    }
});

//Cập nhật thông tin của sản phẩm theo id
//node app/index.js update --id="3" --name="C" --price="350" --amount="1" --description="Mặt hàng C"
yargs.command({
    command: 'update',
    builder: {
        id: {
            type: 'string',
        },
        name: {
            type: 'string',
        },
        price: {
            type: number
        },
        amount: {
            type: number
        },
        description: {
            type: 'string'
        }
    },
    handler: (args) => {
        const {id, name, price, amount, description} = args;
        const product = updateProduct(id, name, price, amount, description);
        if(product){
            console.log('New Product: ', product);
        }
        else{
            console.log('Không tìm thấy sản phẩm để cập nhật');
        }
    }
});

//Loại bỏ sản phẩm ra khỏi danh sách theo id - node app/index.js delete --id="1"
yargs.command({
    command: 'delete',
    builder: {
        id: {
            type: 'string',
        },
    },
    handler: (args) => {
        const {id} = args;
        const product = deleteProduct(id);
        if(product){
            console.log('Delete product: ', product);
        }else{
            console.log('Không tìm thấy sản phẩm để loại bỏ');
        }
    }
});

//Thêm 50 amount cho mỗi lần chạy lệnh cho sản phẩm theo id -  node app/index.js addAmount --id="1"
yargs.command({
    command: 'addAmount',
    builder: {
        id: {
            type: 'string',
        },
    },
    handler: (args) => {
        const {id} = args;
        const product = addAmount(id);
        if(product){
            console.log(`Amount of product ${product.name}: `, product.amount);
        }else{
            console.log('Không tồn tại sản phẩm');
        }
    }
});

//Lưu lại các command
yargs.parse();