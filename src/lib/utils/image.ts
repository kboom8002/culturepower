/**
 * Compresses an image file on the client-side using HTML5 Canvas
 * down to a maximum of 1200px width/height encoded as JPEG (quality score 0.8).
 * This significantly reduces Base64 string payload sizes (e.g. 4MB -> < 400KB) 
 * preventing Server Action '413 Payload Too Large' errors on Vercel.
 */
export async function compressImage(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let { width, height } = img
        
        const MAX_WIDTH = 1200
        const MAX_HEIGHT = 1200
        
        if (width > height) {
          if (width > MAX_WIDTH) { 
            height *= MAX_WIDTH / width
            width = MAX_WIDTH 
          }
        } else {
          if (height > MAX_HEIGHT) { 
            width *= MAX_HEIGHT / height
            height = MAX_HEIGHT 
          }
        }
        
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx?.drawImage(img, 0, 0, width, height)
        
        // JPEG format with 80% quality
        resolve(canvas.toDataURL('image/jpeg', 0.8))
      }
      img.src = e.target?.result as string
    }
    reader.readAsDataURL(file)
  })
}
