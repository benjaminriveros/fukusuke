// Relaciones simples
User.hasOne(Customer, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Customer.belongsTo(User);

Order.hasOne(Sale, { foreignKey: 'order_id', onDelete: 'CASCADE' });
Sale.belongsTo(Order);

// Relaciones 1:N
Customer.hasMany(Order, { foreignKey: 'customer_id', onDelete: 'CASCADE' });
Order.belongsTo(Customer);

Order.hasMany(OrderItem, { foreignKey: 'order_id', onDelete: 'CASCADE' });
OrderItem.belongsTo(Order);

Product.hasMany(OrderItem, { foreignKey: 'product_id', onDelete: 'CASCADE' });
OrderItem.belongsTo(Product);

// Relaciones N:M
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });
