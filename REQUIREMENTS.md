# API Requirements

Stakeholders want an online storefront to showcase their products. You must build the API, while a coworker works on the frontend. Notes from a meeting with the frontend dev outline the endpoints and data shapes needed for users to browse products, view product details, add to cart, and view cart..

## API Endpoints

#### Products

- Index `'api/products/' [GET]`
- Show `'api/products/:id' [GET]`
- Create [token required] `'products/' [POST] (token)`
- Delete [token required] `'products/:id' [DELETE] (token)`

#### Users

- Index [token required] `'api/users/' [GET] (token)`
- Show [token required] `'api/users/:id' [GET] (token)`
- Delete [token required] `'api/users/:id' [DELETE] (token)`
- update [token required] `'api/users/:id' [PUT] (token)`
- Create `'api/users/' [POST]`
- login `'api/users/login/' [POST]`

#### Orders

- Index [token required] `'api/orders/' [GET] (token)`
- Show [token required] `'api/orders/:id' [GET] (token)`
- Create [token required] `'api/orders/' [POST] (token)`
- Delete [token required] `'api/orders/:id' [DELETE] (token)`

#### Orders products

- Index [token required] `'api/order_products/' [GET] (token)`
- Show [token required] `'api/order_products/:id' [GET] (token)`
- Create [token required] `'api/order_products/' [POST] (token)`
- Delete [token required] `'api/order_products/:id' [DELETE] (token)`

## Data schema

#### Product

```
products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  category VARCHAR(255)
);
```

#### User

```
users (
id UUID DEFAULT  uuid_generate_v4() PRIMARY KEY,
email VARCHAR(255) NOT NULL UNIQUE,
user_name VARCHAR(50) NOT NULL UNIQUE,
first_name VARCHAR(50) NOT NULL,
last_name VARCHAR(50) NOT NULL,
password VARCHAR(255) NOT NULL,
created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

#### Orders

```
orders (
  id SERIAL PRIMARY KEY,
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'completed')),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);
```

#### Order producrs

```
orders_products (
   id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0)
);
```
