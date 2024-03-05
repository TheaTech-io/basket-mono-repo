## BE

1.  Use yarn or npm to install packages. `npm install`
2.  Make sure that redis default port is unused, app is using default connection. If you want to connect another port go to redis.service.ts file and add a new port `this.redisClient = new Redis({ port: 1234 }); `
3.  App uses 3001 port it self, you can also change it from main.ts file. Run ` npm run start:dev` :dev prefix will run the app on watch mode. changes will make the app reload
4.  Simply we have redis as database, at start redis writes all products and coupons to the database as hsets. which is written in redis.service.ts.
5.  In products service we have getProducts method which gets hsets written products at redis. for example: `product:0` product indicates index name, and 0 indicates it's id.
6.  Products service also have add to cart method which allows user to add products to his cart. When he does add to cart action, Method firstly checks whether that product exist in redisdb or not, then checks for stock. If these two pipelines are not return as html exception it reduces the stock and adds to user's cart as `cart:userId`.
7.  Remove from cart work part is almost same but reversed. increases stock and erases stock and lowers the quantity from the cart, if quantity is 1 then erases from the cart.
8.  Cart module has two modules which are gets items within cart and checking the coupon whether it is exist in db or not.

## FE

1.  Use yarn or npm to install packages. `npm install`
2.  Again you can use yarn or npm to run the app `npm start`
3.  App uses 3000 port if you want to change it, after the changes you have to allow from BE as well in main.ts.
4.  Redux saga is the statemanagement and works with only 1 store, if you want to change api url enviroment, it is at store.
5.  There are 3 main Saga file within pages as Dashboard we have Saga.ts, which holds all the actions (functions), second is Slice.ts which holds the states for the Redux, and types.ts for the types of the actions and distribution along the app.
6.  Main folders are:

- Components : Holds the components that are being used by the app. For example forms, inputs, buttons. Main feature of the app which is Cart is at Components.
- Layout : Layout has the layout of the app, which is navbar, and below content.
- Pages : Contains Content of the page. Dashboard etc.
- Router: Has url routing for the app.

7. App doens't have that much css, it uses a library called Material UI. and lastly, app is responsive.

> > Coupons that you can use

```
{
      id: 0,
      coupon: 'XXXXX',
      discountValue: 10,
      discountType: 'discount',
    },
    {
      id: 1,
      coupon: 'YYYYY',
      discountValue: 20,
      discountType: 'discount',
    },
    {
      id: 3,
      coupon: 'ZZZZZ',
      discountValue: 30,
      discountType: 'discount',
    },
    {
      id: 4,
      coupon: 'XYXYX',
      discountValue: 'Falaka',
      discountType: 'buyoneandgetonefree',
    },
```

Currently buy one and get one free coupon only works for `Falaka` product.
