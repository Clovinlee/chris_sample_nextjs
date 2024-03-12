"use client"

import getApolloClient from "@/db/apolloClient";
import { ApolloProvider, useQuery } from "@apollo/client";
import { GET_ALL_PRODUCTS } from "@/app/graphql/queries";

export default function TestComponent() {

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
