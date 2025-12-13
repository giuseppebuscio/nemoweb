import { useState, useEffect, useRef } from 'react'

const CustomCursor = () => {
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const requestRef = useRef()
  const previousTimeRef = useRef()

  useEffect(() => {
    let mouseX = 0
    let mouseY = 0
    let currentX = 0
    let currentY = 0

    const updateCursor = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      setIsVisible(true)

      // Verifica se il cursore è su un elemento cliccabile
      const target = e.target
      const isClickable = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.onclick !== null ||
        window.getComputedStyle(target).cursor === 'pointer'

      setIsPointer(isClickable)
    }

    const animate = (timestamp) => {
      if (previousTimeRef.current !== undefined) {
        // Interpolazione smooth usando lerp
        const speed = 0.2 // Valore più basso = movimento più smooth (0.1 è molto smooth)
        currentX += (mouseX - currentX) * speed
        currentY += (mouseY - currentY) * speed

        setSmoothPosition({ x: currentX, y: currentY })
      }
      
      previousTimeRef.current = timestamp
      requestRef.current = requestAnimationFrame(animate)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    // Aggiungi listener solo su desktop
    if (window.matchMedia('(pointer: fine)').matches) {
      requestRef.current = requestAnimationFrame(animate)
      window.addEventListener('mousemove', updateCursor)
      document.addEventListener('mouseenter', handleMouseEnter)
      document.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
      window.removeEventListener('mousemove', updateCursor)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  // Non mostrare su dispositivi touch
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      {/* Cursore principale - cerchio che segue il cursore */}
      <div
        className={`fixed pointer-events-none z-[9999] transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          left: `${smoothPosition.x}px`,
          top: `${smoothPosition.y}px`,
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
          filter: 'drop-shadow(0 0 4px rgba(0, 0, 0, 0.3))',
        }}
      >
        <div
          className={`rounded-full border-2 transition-all duration-300 ${
            isPointer 
              ? 'w-10 h-10 border-[#ff7351] bg-[#ff7351]/10' 
              : 'w-8 h-8 border-white bg-white/10'
          }`}
        />
      </div>
    </>
  )
}

export default CustomCursor
