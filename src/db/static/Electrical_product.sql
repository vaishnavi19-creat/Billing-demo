CREATE TABLE electrical_products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    product_code VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(100) NOT NULL,
    manufacturer VARCHAR(255) NOT NULL,
    model_number VARCHAR(100) NOT NULL,
    voltage VARCHAR(50) NOT NULL,          
    power_rating VARCHAR(50) NOT NULL,     
    quantity INT NOT NULL,                 
    purchase_price DECIMAL(10, 2) NOT NULL, 
    selling_price DECIMAL(10, 2) NOT NULL,  
    stock_threshold INT NOT NULL,           
    warranty_period VARCHAR(50),            
    supplier_id INT,
    created_by INT,                         
    updated_by INT,                         
    
);
