export function saveToLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data))
    return true
  } catch (error) {
    console.error('Error saving to localStorage:', error)
    return false
  }
}

export function getFromLocalStorage(key) {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('Error reading from localStorage:', error)
    return null
  }
}

export function removeFromLocalStorage(key) {
  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error('Error removing from localStorage:', error)
    return false
  }
}