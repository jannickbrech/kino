export async function postSaal (data) {
  try {
    const response = await fetch('/api/saal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export async function getSaele () {
  try {
    const response = await fetch('/api/saal');
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
}
