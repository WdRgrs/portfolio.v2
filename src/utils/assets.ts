export const getAssetUrl = (path: string): string => {
  const baseUrl = import.meta.env.VITE_ASSET_BASE_URL || 'assets'
  
  return `${baseUrl}/${path}`
}

/**
 * Generate placeholder for lazy loading
 * @param width 
 * @param height 
 * @returns 
 */
export const getPlaceholder = (width: number = 40, height: number = 40): string => {
  // Simple gray placeholder - can be replaced with blurhash later
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'%3E%3Crect width='${width}' height='${height}' fill='%23f0f0f0'/%3E%3C/svg%3E`
}

