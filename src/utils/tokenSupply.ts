export async function fetchEmptyBottleSupply() {
  try {
    const response = await fetch('https://www.bkcscan.com/api/v2/tokens/0x5BF5eea0CE540db3986fa58ee47D685104b7c2FB');
    const data = await response.json();
    return data.total_supply;
  } catch (error) {
    console.error('Error fetching token supply:', error);
    return 0;
  }
}