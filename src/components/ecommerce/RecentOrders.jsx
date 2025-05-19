  import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
  } from "../ui/table";
  import Badge from "../ui/badge/Badge";
  const BASE_URL =import.meta.env.VITE_REACT_APP_BASE_URL;
  import {useSelector} from "react-redux"
  import {useState,useEffect} from "react"
  import axios from 'axios'

  // Table data (no interface used)
  const tableData = [
    {
      id: 1,
      name: "MacBook Pro 13”",
      variants: "2 Variants",
      category: "Laptop",
      price: "$2399.00",
      status: "Delivered",
      image: "/images/product/product-01.jpg",
    },
    {
      id: 2,
      name: "Apple Watch Ultra",
      variants: "1 Variant",
      category: "Watch",
      price: "$879.00",
      status: "Pending",
      image: "/images/product/product-02.jpg",
    },
    {
      id: 3,
      name: "iPhone 15 Pro Max",
      variants: "2 Variants",
      category: "SmartPhone",
      price: "$1869.00",
      status: "Delivered",
      image: "/images/product/product-03.jpg",
    },
    {
      id: 4,
      name: "iPad Pro 3rd Gen",
      variants: "2 Variants",
      category: "Electronics",
      price: "$1699.00",
      status: "Canceled",
      image: "/images/product/product-04.jpg",
    },
    {
      id: 5,
      name: "AirPods Pro 2nd Gen",
      variants: "1 Variant",
      category: "Accessories",
      price: "$240.00",
      status: "Delivered",
      image: "/images/product/product-05.jpg",
    },
  ];

  export const fetchUserOrders = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/orders/order`, {
      headers: {
        Authorization: `Bearer ${token}`, // Pass JWT or session token if required
      },
    });
    console.log("res",response)
    return response.data.orders;
  } catch (error) {
    console.error('Failed to fetch user orders:', error);
    throw error;
  }
};



  export default function RecentOrders() {
    
     const [orders, setOrders] = useState([]);
 const {token}=useSelector(state=>state.auth);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const userOrders = await fetchUserOrders(token);
        setOrders(userOrders);
      } catch (err) {
        setError('Could not fetch orders.');
      } 
    };
    getOrders();
  }, [token]);
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-[#0E1320] sm:px-6">
        <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Recent Orders
            </h3>
          </div>

        </div>

        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
              <TableRow>
                <TableCell className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Order Id
                </TableCell>
                <TableCell className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Total Price
                </TableCell>
                <TableCell className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Payment Status
                </TableCell>
                <TableCell className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Delivery Status
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {orders.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="py-3">
                    <div className="flex items-center gap-3">
                      <div >
                        <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {product._id}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {product.name}
                        </p>
                        <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                          {product.variants}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {product.totalPrice}
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {product.paymentStatus}
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        product.status === "Delivered"
                          ? "success"
                          : product.status === "Pending"
                          ? "warning"
                          : "error"
                      }
                    >
                      {product.orderStatus}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
