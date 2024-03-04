describe("Product API Testing", () => {

    const testToken = "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..pUqG4fqcCx_NbNs7.Dn_CIcD0YFS00jVQUUxp2kJ8lkIDJO7pULcKr0GyhuwCy2UXmrZrYyp893BigHgljz4jneibdWssegeK2DjQVoL3CwdalCSqASJtf_z1wYiuT4xyXMuTbXmqMVU7wnfhf_aDupSyBu-AhuFSNs2NUMx42MhSetsSeshsKk3oEmFdVMxAbJahERocdp39vif3Sui4xblbYDqijjXmZB0Sg6ZmnEdcUkBN83QaLTtz1DWKrg_NLF7tpD4U_dVsqganlgx81lS69TGZ1Q.zYSvw-_6CmVxN7RLh2o3tw";
    const searchProduct = "65d897ac41d34d566dcfa93e"; //id
    const insertProduct = {
        "name": "Test Product",
        "stock": 100,
        "description": "A test description",
        "image": "https://www.test.com/test.jpg",
    };

    const timeoutLimit = 15000;

    test("success fetch All | statusCode 200", async() => {
        const fetchAllUrl = process.env.NEXT_PUBLIC_PRODUCT_API_URL + "/all";
        const response = await fetch(fetchAllUrl,{
            method: "GET",
            headers: {
                "Authorization": "Bearer "+testToken,
                "Content-Type": "application/json",
            },
        });


        expect(response.status).toBe(200);
    }, timeoutLimit);

    test("success fetch certain product | statusCode 200", async() => {
        const fetchUrl = process.env.NEXT_PUBLIC_PRODUCT_API_URL + "/"+searchProduct;
        const response = await fetch(fetchUrl,{
            method: "GET",
            headers: {
                "Authorization": "Bearer "+testToken,
                "Content-Type": "application/json",
            },
        });

        expect(response.status).toBe(200);

    }, timeoutLimit);

    test("failed fetch certain product invalid ID / bad ID format", async() => {
        const fetchUrl = process.env.NEXT_PUBLIC_PRODUCT_API_URL + "/"+"randomID";
        const response = await fetch(fetchUrl,{
            method: "GET",
            headers: {
                "Authorization": "Bearer "+testToken,
                "Content-Type": "application/json",
            },
        });

        expect(response.status).toBe(400);

    }, timeoutLimit);

    test("Unauthorized fetch | statusCode 401", async() => {
        const fetchAllUrl = process.env.NEXT_PUBLIC_PRODUCT_API_URL + "/all";
        const response = await fetch(fetchAllUrl,{
            method: "GET",
            headers: { "Content-Type": "application/json" }, //without token
        });

        expect(response.status).toBe(401);
    }, timeoutLimit);

    var idProductAdded;

    test("Store product | statusCode 201", async() => {
        const storeUrl = process.env.NEXT_PUBLIC_PRODUCT_API_URL;
        const response = await fetch(storeUrl,{
            method: "POST",
            headers: {
                "Authorization": "Bearer "+testToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(insertProduct),
        });

        expect(response.status).toBe(201);

        if(response.status == 201){
            idProductAdded = (await response.json())._id;
        }
    }, timeoutLimit);

    test("Edit Product", async () => {
        if(idProductAdded == null){
            throw new Error("EDIT TEST FAIL | Previous product store test failed")
        }

        const editUrl = process.env.NEXT_PUBLIC_PRODUCT_API_URL+"/"+idProductAdded;
        const editedName = "(Edited) Test Product";
        const response = await fetch(editUrl,{
            method: "PUT",
            headers: {
                "Authorization": "Bearer "+testToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name:editedName}),
        });

        expect(response.status).toBe(200);

        const productEdited = await response.json();
        expect(productEdited.name).toBe(editedName);
        expect(productEdited.description).toBe(insertProduct.description); //ensure only 1 field is edited
    }, timeoutLimit);

    test("SUCCESS Delete Product", async () => {
        let deleteUrl = process.env.NEXT_PUBLIC_PRODUCT_API_URL+"/"+idProductAdded;
        if(idProductAdded == null){
            throw new Error("DELETE TEST FAIL | Previous product store test failed")
        }
        const response = await fetch(deleteUrl,{
            method: "DELETE",
            headers: {
                "Authorization": "Bearer "+testToken,
                "Content-Type": "application/json",
            },
        });
        
        expect(response.status).toBe(200);
    }, timeoutLimit);

   
    test("NOTFOUND Delete Product", async () => {
        let randomID = "61b96842a5bc5a82f7d527f3";
        let deleteUrl = process.env.NEXT_PUBLIC_PRODUCT_API_URL+"/";
        const response = await fetch(deleteUrl+randomID,{
            method: "DELETE",
            headers: {
                "Authorization": "Bearer "+testToken,
                "Content-Type": "application/json",
            },
        });

        expect(response.status).toBe(404);

    }, timeoutLimit);

    // 65da7a70ad40419401d1ada5
});