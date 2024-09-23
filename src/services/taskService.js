const API_URL = "http://localhost:5000/api/tasks";

export const getTasks = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};

export const addTask = async (task) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  const data = await response.json();
  return data;
};

export const editTask = async (id, updatedTask) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedTask),
  });
  const data = await response.json();
  return data;
};

export const deleteTask = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
};
