import { getAverageStock } from "@/utils/sampleFunction";

let mockProductResponse = [
    {
        "_id": "65d85088bf04d6831684015c",
        "name": "ABC Ketchup Sauce",
        "stock": 87,
        "createdAt": "2024-02-23T08:00:08.706Z",
        "updatedAt": "2024-02-23T08:00:08.706Z",
        "description": "ABC Ketchup Sauce lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac purus nec tortor vestibulum semper lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac purus nec tortor vestibulum semper. Sauce Sauce Ketchup Sauce Ketchup",
        "image": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//88/MTA-13216453/abc_abc-sauce-tomat-335ml_full01.jpg"
      },
      {
        "_id": "65d8x0z8bf04a6831684015c",
        "name": "Different Ketchup Sauce",
        "stock": 11,
        "createdAt": "2024-02-23T08:00:08.706Z",
        "updatedAt": "2024-02-23T08:00:08.706Z",
        "description": "Different Ketchup Sauce lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac purus nec tortor vestibulum semper lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac purus nec tortor vestibulum semper. Sauce Sauce Ketchup Sauce Ketchup",
        "image": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//88/MTA-13216453/abc_abc-sauce-tomat-335ml_full01.jpg"
      }
]

describe("sample test getAverageStock", () => {
    let originalFetch;
    let products;

    beforeEach(async () => {
        originalFetch = global.fetch;
        
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve(mockProductResponse)
        }));

        const response = await fetch("https://api.com");
        products = await response.json();
    });

    afterEach(() => {
        global.fetch = originalFetch;
    });

    test('Average stock', () => {
        // const mock = jest.fn().mockImplementation(() => "bar");
        // const mock = jest.fn().mockImplementationOnce(() => "bar");

        // const mock = jest.fn();
        // mock.mockReturnValue("bar");
        
        expect(getAverageStock(products)).toBe(49);
    });

    test('null and empty fetch on sample test', () => {
        expect(getAverageStock(null)).toBe(0);
        expect(getAverageStock([])).toBe(0);
    });

});

// Unit test used for logic (+ Mock if needed)
// Integration test used for API security response 401 402 etc 
// e2e test used for UI and user interaction

// describe("test api calls to inventory", () => {
//     let originalFetch;

//     beforeEach(() => {
//         originalFetch = global.fetch;
        
//         global.fetch = jest.fn(() => Promise.resolve({
//             json: () => Promise.resolve(mockProductResponse)
//         }));
//     });

//     afterEach(() => {
//         global.fetch = originalFetch;
//     });

//     it('Data fetch', async () => {

//         const response = await fetch(`https://api.com`);
//         const responseJson = await response.json();

//         expect(responseJson).toBe(mockProductResponse);
//     });
// });