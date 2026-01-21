import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchAllProducts = createAsyncThunk('/fetch/products', async () => {
    try {
        let res = await axios.get('http://localhost:8080/api/product/getAll')
        // console.log(res.data)

        return res.data.product
    } catch (error) {
        console.error(error);
    }
});

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        allProducts: [],
        loading: false,
        error: ''
    },
    reducers: {
        filterByInput: (state, action) => {
            let search = action.payload.toLowerCase()

            if (search === '') {
                state.products = state.allProducts
            } else {
                state.products = state.allProducts.filter((product) =>
                    product.name.toLowerCase().includes(search)
                );
            }
        },
        filterbyCategory: (state, action) => {
            let cate = action.payload

            if (cate === 'all') {
                state.products = state.allProducts
            } else {
                state.products = state.allProducts.filter((produt) =>
                    produt.cate === action.payload
                )
            }
        },
        filterByPrice: (state, action) => {
            const price = action.payload;

            if (price === "all") {
                state.products = state.allProducts;
            } else {
                const maxPrice = Number(price);

                state.products = state.allProducts.filter(
                    (prod) => Number(prod.price) <= maxPrice
                );
            }
        },

    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllProducts.pending, (state, action) => {
            state.loading = true
            state.error = ""
        })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload
                state.allProducts = action.payload
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.err = action.payload
            })
    }
})

export const { filterByInput, filterbyCategory, filterByPrice } = productSlice.actions
export default productSlice.reducer