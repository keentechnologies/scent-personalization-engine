"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  fetchAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  AddressItem,
  AddressPayload,
} from "@/services/api/address";
import { getCurrentSession } from "@/services/api/session";
import { lookupPincode } from "@/services/api/pincode";
import { getMe } from "@/services/api/auth";

export default function ShippingPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addresses, setAddresses] = useState<AddressItem[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);

  // Form states
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<AddressItem | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const [consigneeName, setConsigneeName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [secondaryPhone, setSecondaryPhone] = useState("");
  const [addressType, setAddressType] = useState("home");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [sessionPincode, setSessionPincode] = useState<string | null>(null);
  const [userPhoneNumber, setUserPhoneNumber] = useState<string>("");

  const loadData = () => {
    setLoading(true);
    fetchAddresses()
      .then((data) => {
        setAddresses(data);
        // By default select the default address
        const def = data.find((a) => a.is_default);
        if (def) {
          setSelectedAddressId(def.id);
        } else if (data.length > 0) {
          setSelectedAddressId(data[0].id);
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
    getCurrentSession()
      .then((session) => {
        if (session && session.pincode) {
          setSessionPincode(session.pincode);
        }
      })
      .catch((e) => console.log("Failed to load active session pincode:", e));

    getMe()
      .then((user) => {
        if (user && user.phone_number) {
          const cleaned = user.phone_number.replace(/\D/g, "");
          const tenDigits = cleaned.length > 10 ? cleaned.slice(-10) : cleaned;
          setUserPhoneNumber(tenDigits);
        }
      })
      .catch((e) => console.log("Failed to fetch user info:", e));
  }, []);

  const openAddForm = async () => {
    setEditingAddress(null);
    setConsigneeName("");
    setPhoneNumber(userPhoneNumber);
    setSecondaryPhone("");
    setAddressType("home");
    setAddressLine1("");
    setAddressLine2("");
    setFormError(null);
    setShowForm(true);

    if (sessionPincode) {
      setPincode(sessionPincode);
      try {
        const res = await lookupPincode(sessionPincode);
        if (res && res.city && res.state) {
          setCity(res.city);
          setState(res.state);
        } else {
          setCity("");
          setState("");
        }
      } catch (e) {
        console.error("Failed to lookup session pincode:", e);
        setCity("");
        setState("");
      }
    } else {
      setPincode("");
      setCity("");
      setState("");
    }
  };

  const handlePincodeChange = async (value: string) => {
    setPincode(value);
    if (value.length === 6 && /^\d{6}$/.test(value)) {
      try {
        const res = await lookupPincode(value);
        if (res && res.city && res.state) {
          setCity(res.city);
          setState(res.state);
        }
      } catch (err) {
        console.log("Pincode not found in mapping table:", err);
        setCity("");
        setState("");
      }
    }
  };

  const openEditForm = (addr: AddressItem) => {
    setEditingAddress(addr);
    setConsigneeName(addr.consignee_name);
    setPhoneNumber(addr.phone_number);
    setSecondaryPhone(addr.secondary_phone_number || "");
    setAddressType(addr.address_type);
    setAddressLine1(addr.address_line_1);
    setAddressLine2(addr.address_line_2 || "");
    setCity(addr.city);
    setState(addr.state);
    setPincode(addr.pincode);
    setFormError(null);
    setShowForm(true);
  };

  // Enforces frontend character limits and phone/pincode constraints
  const validateForm = (): boolean => {
    if (consigneeName.trim().length < 3) {
      setFormError("Consignee name must be at least 3 characters.");
      return false;
    }
    if (!/^[6-9]\d{9}$/.test(phoneNumber)) {
      setFormError("Please enter a valid 10-digit mobile number.");
      return false;
    }
    if (secondaryPhone && !/^[6-9]\d{9}$/.test(secondaryPhone)) {
      setFormError("Secondary phone number must be a valid 10-digit number.");
      return false;
    }
    if (addressLine1.trim().length < 3) {
      setFormError("Address Line 1 must be at least 3 characters.");
      return false;
    }
    if (city.trim().length < 3) {
      setFormError("City must be at least 3 characters.");
      return false;
    }
    if (state.trim().length < 3) {
      setFormError("State must be at least 3 characters.");
      return false;
    }
    if (!/^\d{6}$/.test(pincode)) {
      setFormError("Pincode must be exactly 6 digits.");
      return false;
    }
    return true;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload: AddressPayload = {
      consignee_name: consigneeName.trim(),
      phone_number: phoneNumber,
      secondary_phone_number: secondaryPhone ? secondaryPhone : undefined,
      address_type: addressType,
      address_line_1: addressLine1.trim(),
      address_line_2: addressLine2.trim() ? addressLine2.trim() : undefined,
      city: city.trim(),
      state: state.trim(),
      pincode: pincode,
    };

    try {
      if (editingAddress) {
        await updateAddress(editingAddress.id, payload);
      } else {
        await addAddress(payload);
      }
      setShowForm(false);
      loadData();
    } catch (e: any) {
      setFormError(e.message);
    }
  };

  const handleDelete = async (addressId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (!confirm("Are you sure you want to delete this address?")) return;
    try {
      await deleteAddress(addressId);
      loadData();
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleProceedToPayment = () => {
    alert("Moving to payments with Address ID: " + selectedAddressId);
    // Proceed to payments routing will happen here in future
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#151311", color: "#6b6057" }}>
        Loading addresses...
      </div>
    );
  }

  return (
    <main style={{ minHeight: "100vh", background: "#151311", paddingBottom: "120px" }}>
      {/* Header */}
      <div style={{ borderBottom: "1px solid #1d1a17", padding: "28px 32px 24px", background: "rgba(21,19,17,0.95)", position: "sticky", top: 0, zIndex: 10 }}>
        <h1 className="heading-serif" style={{ fontSize: "28px", marginBottom: "4px" }}>
          Shipping Address
        </h1>
        <p style={{ color: "#6b6057", fontSize: "13px" }}>
          Choose your delivery destination
        </p>
      </div>

      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "32px 24px" }}>
        {error && <p style={{ color: "#b94a48", marginBottom: "16px" }}>{error}</p>}

        {/* Addresses list */}
        {!showForm && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {addresses.map((addr) => (
              <div
                key={addr.id}
                onClick={() => setSelectedAddressId(addr.id)}
                style={{
                  background: "#1d1a17",
                  border: selectedAddressId === addr.id ? "1.5px solid #c4823a" : "1px solid #332d28",
                  borderRadius: "16px",
                  padding: "20px",
                  cursor: "pointer",
                  position: "relative",
                  transition: "all 0.2s ease",
                }}
              >
                {/* Default indicator */}
                {addr.is_default && (
                  <span style={{ position: "absolute", top: "16px", right: "16px", fontSize: "9px", background: "rgba(196,130,58,0.12)", color: "#c4823a", border: "1px solid rgba(196,130,58,0.2)", borderRadius: "4px", padding: "2px 8px", fontWeight: 700 }}>
                    DEFAULT
                  </span>
                )}

                <h3 className="heading-serif" style={{ fontSize: "18px", color: "#f3efe8", marginBottom: "4px" }}>
                  {addr.consignee_name}
                </h3>
                <span style={{ fontSize: "10px", color: "#6b6057", background: "rgba(255,255,255,0.04)", borderRadius: "4px", padding: "2px 6px", textTransform: "uppercase", fontWeight: 600 }}>
                  {addr.address_type}
                </span>

                <p style={{ color: "#b8aea1", fontSize: "14px", marginTop: "12px", lineHeight: "1.5" }}>
                  {addr.address_line_1}
                  {addr.address_line_2 && `, ${addr.address_line_2}`}
                  <br />
                  {addr.city}, {addr.state} - {addr.pincode}
                </p>

                <p style={{ color: "#6b6057", fontSize: "13px", marginTop: "10px" }}>
                  Phone: {addr.phone_number} {addr.secondary_phone_number && `/ ${addr.secondary_phone_number}`}
                </p>

                {/* Edit / Delete footer */}
                <div style={{ display: "flex", gap: "16px", marginTop: "16px", borderTop: "1px solid #332d28", paddingTop: "12px" }}>
                  <button
                    onClick={(e) => { e.stopPropagation(); openEditForm(addr); }}
                    style={{ background: "transparent", border: "none", color: "#c4823a", cursor: "pointer", fontSize: "13px" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => handleDelete(addr.id, e)}
                    style={{ background: "transparent", border: "none", color: "#b94a48", cursor: "pointer", fontSize: "13px" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            <button className="btn-outline" onClick={openAddForm} style={{ height: "54px", borderRadius: "16px" }}>
              + Add New Address
            </button>
          </div>
        )}

        {/* Address edit/add form */}
        {showForm && (
          <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <h2 className="heading-serif" style={{ fontSize: "22px", color: "#f3efe8" }}>
              {editingAddress ? "Edit Shipping Address" : "New Shipping Address"}
            </h2>

            {formError && <p style={{ color: "#b94a48", fontSize: "13px" }}>{formError}</p>}

            <div>
              <label style={{ display: "block", fontSize: "12px", color: "#6b6057", marginBottom: "6px" }}>Consignee Name</label>
              <input
                type="text"
                required
                value={consigneeName}
                onChange={(e) => setConsigneeName(e.target.value)}
                style={{ width: "100%", height: "48px", background: "#1d1a17", border: "1px solid #332d28", borderRadius: "10px", padding: "0 16px", color: "#f3efe8" }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", color: "#6b6057", marginBottom: "6px" }}>Phone Number</label>
                <input
                  type="text"
                  required
                  placeholder="10-digit number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  style={{ width: "100%", height: "48px", background: "#1d1a17", border: "1px solid #332d28", borderRadius: "10px", padding: "0 16px", color: "#f3efe8" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "12px", color: "#6b6057", marginBottom: "6px" }}>Secondary Phone (Optional)</label>
                <input
                  type="text"
                  placeholder="10-digit number"
                  value={secondaryPhone}
                  onChange={(e) => setSecondaryPhone(e.target.value)}
                  style={{ width: "100%", height: "48px", background: "#1d1a17", border: "1px solid #332d28", borderRadius: "10px", padding: "0 16px", color: "#f3efe8" }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", color: "#6b6057", marginBottom: "6px" }}>Address Type</label>
              <select
                value={addressType}
                onChange={(e) => setAddressType(e.target.value)}
                style={{ width: "100%", height: "48px", background: "#1d1a17", border: "1px solid #332d28", borderRadius: "10px", padding: "0 16px", color: "#f3efe8" }}
              >
                <option value="home">Home</option>
                <option value="work">Work</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", color: "#6b6057", marginBottom: "6px" }}>Address Line 1</label>
              <input
                type="text"
                required
                placeholder="House / Flat no, Building name"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                style={{ width: "100%", height: "48px", background: "#1d1a17", border: "1px solid #332d28", borderRadius: "10px", padding: "0 16px", color: "#f3efe8" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", color: "#6b6057", marginBottom: "6px" }}>Address Line 2</label>
              <input
                type="text"
                placeholder="Area, Street, Sector"
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
                style={{ width: "100%", height: "48px", background: "#1d1a17", border: "1px solid #332d28", borderRadius: "10px", padding: "0 16px", color: "#f3efe8" }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", color: "#6b6057", marginBottom: "6px" }}>City</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  style={{ width: "100%", height: "48px", background: "#1d1a17", border: "1px solid #332d28", borderRadius: "10px", padding: "0 16px", color: "#f3efe8" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "12px", color: "#6b6057", marginBottom: "6px" }}>State</label>
                <input
                  type="text"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  style={{ width: "100%", height: "48px", background: "#1d1a17", border: "1px solid #332d28", borderRadius: "10px", padding: "0 16px", color: "#f3efe8" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "12px", color: "#6b6057", marginBottom: "6px" }}>Pincode</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="6 digits"
                  value={pincode}
                  onChange={(e) => handlePincodeChange(e.target.value)}
                  style={{ width: "100%", height: "48px", background: "#1d1a17", border: "1px solid #332d28", borderRadius: "10px", padding: "0 16px", color: "#f3efe8" }}
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
              <button type="submit" className="btn-gold" style={{ flex: 1, height: "50px", borderRadius: "12px" }}>
                {editingAddress ? "Save Changes" : "Save Address"}
              </button>
              <button type="button" className="btn-outline" onClick={() => setShowForm(false)} style={{ height: "50px", borderRadius: "12px" }}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Sticky Bottom Actions */}
      {!showForm && addresses.length > 0 && (
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: "20px 24px", background: "rgba(21,19,17,0.97)", borderTop: "1px solid #332d28", backdropFilter: "blur(12px)", zIndex: 10 }}>
          <div style={{ maxWidth: "600px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button className="btn-outline" onClick={() => router.push("/cart")} style={{ height: "48px", borderRadius: "10px", padding: "0 24px" }}>
              ← Cart
            </button>
            <button className="btn-gold" onClick={handleProceedToPayment} style={{ height: "48px", borderRadius: "10px", padding: "0 28px" }} disabled={!selectedAddressId}>
              Proceed to Payment →
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
