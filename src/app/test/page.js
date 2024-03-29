"use client"

import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { GET_ALL_PRODUCTS } from "../graphql/queries";

export default function page() {
    
    const {data: dataInventory, loading: loadingInventory, error: errorInventory} = useQuery(GET_ALL_PRODUCTS); // Corrected: Destructuring object keys
    return (
            <div>
                <h1>Test Page</h1>
                loading: {loadingInventory.toString()} <br />
                error: {JSON.stringify(errorInventory)} <br />
                dataInventory: {JSON.stringify(dataInventory)}
            </div>
    );
}
