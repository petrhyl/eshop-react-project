# Eshop project in React
## Web page for picking and ordering some goods from an eshop

### Using
+ responsive design
+ react-router
+ consuming api from back-end
+ auto loading the data from back-end
+ user's input validation
+ default error page

### Pages
1. "eshop" - all products
  + a list of items
  + counter and buttom to add the item to the cart
  + sticky cart buttom with indicator of amount of items in the cart
2. "eshop/item/:id" - details of the particular pruduct
  + carousel with item's pictures
  + item's name, price and description
  + amount counter and button to add the item to the cart
3. "cart" - products to order
  + picked items and an amount and a total price of each item
  + button to remove an item from the cart
  + total price of all order
  + button with link to "order" page 
4. "order" - form to customer's details
  + inputs to fill in customer's details and address
  + button to send the order
5. "confirmation" - message with confirmation of the order and the order number