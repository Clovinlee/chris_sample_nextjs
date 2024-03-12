import Category from "@/db/categorySchema";
import Product from "@/db/productSchema";
import User from "@/db/userSchema";

const resolvers = {
    Query: {
      users: async () => {
        
        try {
            const users = await User.find();
            return users;
        } catch (error) {
            throw new Error(error);
        }
    },

    user: async (_, args) => {
        try{
            const user = await User.findById(args.id);
            return user;
        }catch(error){
            throw new Error(error);
        }
    },

    products: async () => {
            
        try {
            const products = await Product.find();
            return products;
        } catch (error) {
            throw new Error(error);
        }
        
    },

    product: async(_,args) => {
        try{
            const product = await Product.findById(args.id);
            return product;
        }catch(error){
            throw new Error(error);
        }
    },

    categories: async () => {
            
        try {
            const categories = await Category.find();
            return categories;
        } catch (error) {
            throw new Error(error);
        }

    },

    category: async(_, args) => {
        
        try{    
            const category = await Category.findById(args.id);
            return category;
        }catch(error){
            throw new Error(error);
        }

    },
    },

    Product: {
        category: async (parent, args) => {
            try{
                const category = await Category.findById(parent.category_id);
                return category;
            }catch(error){
                throw new Error(error);
            }
        }
    },

    Category:{
        products: async (parent, args) => {
            try{
                const products = await Product.find({category_id: parent._id});
                return products;
            }catch(error){
                throw new Error(error);
            }
        }
    },

    Mutation: {
        createProduct(_, args){
            try{
                const newProduct = new Product({
                    name: args.body.name,
                    stock: args.body.stock,
                    description: args.body.description,
                    image: args.body.imageUrl,
                    category_id: args.body
                });
                return newProduct.save();
            }catch(error){
                throw new Error(error);
            }
        },

        async editProduct(_, args){
           try {
            const idProduct = args.id;
            const body = args.body;

            const product = await Product.findById(idProduct);
            if(!product){
                throw new Error("Product not found");
            }

            product.name = body.name || product.name;
            product.stock = body.stock || product.stock;
            product.description = body.description || product.description;
            product.image = body.imageUrl || product.image;

            return product.save();
            
           } catch (error) {
                throw new Error(error);
           }
        },

        async deleteProduct(_, args){
            try {
                const idProduct = args.id;
                const product = await Product.findById(idProduct);
                if(!product){
                    throw new Error("Product not found");
                }
                await product.deleteOne({_id:idProduct});
                return product;
            } catch (error) {
                throw new Error(error);
            }
        }
    }
};
export default resolvers;