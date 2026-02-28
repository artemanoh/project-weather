const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

const requestJson = async (url, options = {}) => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
};

export const signUpUser = async ({ name, email, password }) => {
  const users = await requestJson(`${API_BASE_URL}/users`);
  const lowerName = name.toLowerCase();
  const lowerEmail = email.toLowerCase();

  const existingUser = users.find(
    (user) =>
      (user.name || "").toLowerCase() === lowerName ||
      (user.email || "").toLowerCase() === lowerEmail,
  );

  if (existingUser) {
    throw new Error("Користувач з таким іменем або email вже існує");
  }

  return requestJson(`${API_BASE_URL}/users`, {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });
};

export const loginUser = async ({ usernameOrEmail, password }) => {
  const users = await requestJson(`${API_BASE_URL}/users`);
  const normalizedValue = usernameOrEmail.toLowerCase();

  const foundUser = users.find((user) => {
    const sameName = (user.name || "").toLowerCase() === normalizedValue;
    const sameEmail = (user.email || "").toLowerCase() === normalizedValue;

    return (sameName || sameEmail) && user.password === password;
  });

  if (!foundUser) {
    throw new Error("Невірний логін або пароль");
  }

  return foundUser;
};

export const getCitiesByUserId = (userId) =>
  requestJson(`${API_BASE_URL}/cities?userId=${userId}`);

export const createCity = (city) =>
  requestJson(`${API_BASE_URL}/cities`, {
    method: "POST",
    body: JSON.stringify(city),
  });

export const updateCity = (cityDbId, payload) =>
  requestJson(`${API_BASE_URL}/cities/${cityDbId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

export const deleteCity = async (cityDbId) => {
  await requestJson(`${API_BASE_URL}/cities/${cityDbId}`, {
    method: "DELETE",
  });
};
