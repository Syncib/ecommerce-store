import React, { useEffect, useState } from "react";
import { useUserContext } from "../hooks/useUserContext";

const AdminCoupons = () => {
  const { user } = useUserContext();
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await fetch(
          "https://ecommerce-server-ten-phi.vercel.app/api/admin/viewcoupons",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setCoupons(data.coupons);
        } else {
          setError("Failed to fetch coupons.");
        }
      } catch (error) {
        setError("An error occurred while fetching coupons.");
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, [user.token]);

  if (loading) {
    return <div>Loading coupons...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="admin-coupons">
      <h1>Available Coupons</h1>
      {coupons.length > 0 ? (
        <table className="coupons-table">
          <thead>
            <tr>
              <th>Coupon Code</th>
              <th>Discount (%)</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon._id}>
                <td>{coupon.code}</td>
                <td>{coupon.discount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No coupons available.</p>
      )}
    </div>
  );
};

export default AdminCoupons;
