export default {
    name: "order",
    type: "document",
    title: "Order",
    initialValue: { status: "pending" }, // Initial value correctly set
    fields: [
        { name: "firstName", title: "First Name", type: "string" },
        { name: "lastName", title: "Last Name", type: "string" },
        { name: "address", title: "Address", type: "string" },
        { name: "email", title: "E-mail", type: "string" },
        { name: "phone", title: "Phone Number", type: "string" }, // Fixed
        { name: "city", title: "City Name", type: "string" },
        { name: "zipCode", title: "Zip Code", type: "string" }, // Fixed
        { name: "discount", title: "Discount", type: "string" },
        {
            name: "cartItems",
            title: "Cart Items",
            type: "array",
            of: [{ type: "reference", to: [{ type: "product" }] }] // Fixed
        },
        { name: "total", title: "Total", type: "number" },
        {
            name: "status",
            title: "Order Status",
            type: "string",
            options: {  // Fixed "options"
                list: [
                    { title: "Pending", value: "pending" },
                    { title: "Success", value: "success" },
                    { title: "Dispatch", value: "dispatch" }
                ],
                layout: "radio"
            }
        }
    ]
}
