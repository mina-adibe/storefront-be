import { Product } from "../../types/product";
import db from "../../database";
import ProductsModel from "../../models/products";

describe("ProductsModel", () => {
  let productsModel: ProductsModel;

  beforeEach(() => {
    productsModel = new ProductsModel();
  });

  describe("create a Product", () => {
    afterEach(async () => {
      const connection = await db.connect();
      await connection.query("DELETE FROM products");
      connection.release();
    });

    it("should create a product", async () => {
      // @ts-ignore

      const newProduct: Product = {
        name: "Test Product",
        price: 99.99,
        category: "Test Category",
      };

      const result = await productsModel.createProduct(newProduct);

      expect(result.name).toEqual(newProduct.name);
      expect(Number(result.price)).toEqual(newProduct.price);
      expect(result.category).toEqual(newProduct.category);
    });

    it("should throw an error if product name is missing", async () => {
      // @ts-ignore
      const newProduct: Product = {
        price: 99.99,
        category: "Test Category",
      };

      try {
        await productsModel.createProduct(newProduct);
        fail("Error not thrown");
      } catch (error: any) {
        expect(error.message).toContain(
          'null value in column "name" of relation "products" violates not-null constraint'
        );
      }
    });

    it("should throw an error if product price is missing", async () => {
      // @ts-ignore
      const newProduct: Product = {
        name: "Test Product",
        category: "Test Category",
      };

      try {
        await productsModel.createProduct(newProduct);
        fail("Error not thrown");
      } catch (error: any) {
        expect(error.message).toContain(
          'null value in column "price" of relation "products" violates not-null constraint'
        );
      }
    });
  });
});

describe("get all Products", () => {
  beforeEach(async () => {
    // Create test products to be returned by the getProducts function
    const testProducts: Product[] = [
      { id: "1", name: "Product 1", price: 100, category: "Category 1" },
      { id: "2", name: "Product 2", price: 200, category: "Category 2" },
      { id: "3", name: "Product 3", price: 300, category: "Category 3" },
    ];

    // Mock the connection.query method to return the test products
    // @ts-ignore
    spyOn(db, "connect").and.returnValue({
      query: () => ({
        rows: testProducts,
      }),
      release: () => {},
    });
  });

  it("should return an array of products", async () => {
    const productsModel = new ProductsModel();
    const products = await productsModel.getProducts();
    expect(products).toEqual([
      { id: "1", name: "Product 1", price: 100, category: "Category 1" },
      { id: "2", name: "Product 2", price: 200, category: "Category 2" },
      { id: "3", name: "Product 3", price: 300, category: "Category 3" },
    ]);
  });
});

describe(" get Product by id ", () => {
  let productsModel: ProductsModel;

  beforeAll(async () => {
    await db.connect();
    productsModel = new ProductsModel();
  });

  it("should get a product by id", async () => {
    // @ts-ignore
    const newProduct: Product = {
      name: "Test Product",
      price: 50,
      category: "test",
    };
    const createdProduct = await productsModel.createProduct(newProduct);

    const product = await productsModel.getProduct(createdProduct.id);

    expect(product.name).toEqual(newProduct.name);
    expect(Number(product.price)).toEqual(newProduct.price);
    expect(product.category).toEqual(newProduct.category);
  });
});

describe("delete Product  ", () => {
  let productsModel: ProductsModel;

  beforeAll(async () => {
    await db.connect();
    productsModel = new ProductsModel();
  });

  it("should delete product by id", async () => {
    // Create a product to delete
    // @ts-ignore
    const product = await productsModel.createProduct({
      name: "Product 1",
      price: 10,
      category: "Category 1",
    });

    // Delete the product and expect it to return the deleted product's id
    const deletedProduct = await productsModel.deleteProduct(product.id);

    expect(deletedProduct.id).toBeDefined();

    // Try to get the deleted product and expect it to throw an error
    try {
      await productsModel.getProduct(deletedProduct.id);
    } catch (error) {
      // @ts-ignore
      expect(error.message).toContain(product.id);
    }
  });
});
