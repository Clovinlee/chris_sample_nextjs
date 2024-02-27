describe("Product API Testing", () => {

    const testToken = "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..pUqG4fqcCx_NbNs7.Dn_CIcD0YFS00jVQUUxp2kJ8lkIDJO7pULcKr0GyhuwCy2UXmrZrYyp893BigHgljz4jneibdWssegeK2DjQVoL3CwdalCSqASJtf_z1wYiuT4xyXMuTbXmqMVU7wnfhf_aDupSyBu-AhuFSNs2NUMx42MhSetsSeshsKk3oEmFdVMxAbJahERocdp39vif3Sui4xblbYDqijjXmZB0Sg6ZmnEdcUkBN83QaLTtz1DWKrg_NLF7tpD4U_dVsqganlgx81lS69TGZ1Q.zYSvw-_6CmVxN7RLh2o3tw";

    test("success fetch | statusCode 200", async() => {
        const fetchAllUrl = process.env.NEXT_PUBLIC_PRODUCT_API_URL + "/all";
        console.log(fetchAllUrl)
        const response = await fetch(fetchAllUrl,{
            method: "GET",
            headers: {
                "Authorization": "Bearer "+testToken,
                "Content-Type": "application/json",
            },
        });


        expect(response.status).toBe(200);
    });
});