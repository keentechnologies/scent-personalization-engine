const API_BASE_URL = "http://localhost:8000";

export interface AddressItem {
  id: string;
  consignee_name: string;
  phone_number: string;
  secondary_phone_number?: string;
  address_type: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  pincode: string;
  is_default: boolean;
}

export interface AddressPayload {
  consignee_name: string;
  phone_number: string;
  secondary_phone_number?: string;
  address_type: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  pincode: string;
}

function getHeaders() {
  const token = localStorage.getItem("jwt_token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function fetchAddresses(): Promise<AddressItem[]> {
  const res = await fetch(`${API_BASE_URL}/addresses`, {
    method: "GET",
    headers: getHeaders(),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData?.detail || "Failed to fetch addresses.");
  }
  return res.json();
}

export async function addAddress(payload: AddressPayload): Promise<AddressItem> {
  const res = await fetch(`${API_BASE_URL}/addresses`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData?.detail?.[0]?.msg || errorData?.detail || "Failed to save address."
    );
  }
  return res.json();
}

export async function updateAddress(
  addressId: string,
  payload: AddressPayload
): Promise<AddressItem> {
  const res = await fetch(`${API_BASE_URL}/addresses/${addressId}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData?.detail?.[0]?.msg || errorData?.detail || "Failed to update address."
    );
  }
  return res.json();
}

export async function deleteAddress(addressId: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/addresses/${addressId}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData?.detail || "Failed to delete address.");
  }
}
