const BASE_URL = "https://fenmo-6nos.onrender.com";

const buildIdempotencyKey = (key) => {
  if (key) {
    return key;
  }

  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `idem-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    const message = data?.error?.message || "Request failed";
    throw new Error(message);
  }
  return data;
};

const request = async (url, options) => {
  try {
    const response = await fetch(url, options);
    return await handleResponse(response);
  } catch (error) {
    console.error("API request failed", error);
    throw error;
  }
};

export const getExpenses = async (category) => {
  const url = new URL(`${BASE_URL}/expenses`);
  if (category) {
    url.searchParams.set("category", category);
  }

  return request(url.toString());
};

export const createExpense = async (payload, idempotencyKey) => {
  return request(`${BASE_URL}/expenses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Idempotency-Key": buildIdempotencyKey(idempotencyKey),
    },
    body: JSON.stringify(payload),
  });
};
