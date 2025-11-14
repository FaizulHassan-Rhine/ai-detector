'use client'

import { useState, useRef } from 'react'
import { UploadCloud, Link as LinkIcon, Image as ImageIcon, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Progress from './Progress'
import ResultBox from './ResultBox'

export default function UploadBox() {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [result, setResult] = useState(null)
  const [imageUrl, setImageUrl] = useState('')
  const [urlInput, setUrlInput] = useState('')
  const [showUrlModal, setShowUrlModal] = useState(false)
  const fileInputRef = useRef(null)

  const handleDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleFileUpload(files[0])
    }
  }

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const handleFileUpload = async (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file')
      return
    }

    setIsUploading(true)
    setResult(null)

    // Create preview URL
    const previewUrl = URL.createObjectURL(file)
    setImageUrl(previewUrl)

    try {
      const formData = new FormData()
      formData.append('image', file)

      const response = await fetch('/api/detect', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Error analyzing image. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleUrlSubmit = async (e) => {
    e.preventDefault()
    
    if (!urlInput.trim()) {
      alert('Please enter a valid image URL')
      return
    }

    setShowUrlModal(false)
    setIsUploading(true)
    setResult(null)
    setImageUrl(urlInput)

    try {
      const response = await fetch('/api/detect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: urlInput }),
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error('Error analyzing URL:', error)
      alert('Error analyzing image. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  const resetUpload = () => {
    setResult(null)
    setImageUrl('')
    setUrlInput('')
  }

  if (result) {
    return (
      <div>
        <ResultBox result={result} imageUrl={imageUrl} />
        <div className="text-center mt-6">
          <button
            onClick={resetUpload}
            className="px-6 py-3 text-black rounded-lg transition-colors font-semibold"
            style={{ backgroundColor: '#86F06F' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#75df5e'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#86F06F'}
          >
            Analyze Another Image
          </button>
        </div>
      </div>
    )
  }

  if (isUploading) {
    return <Progress status="Analyzing your image..." />
  }

  return (
    <>
      <div className="w-full max-w-[500px] mx-auto">
        {/* Drag & Drop Area */}
        <div
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className="relative border-2 border-dashed rounded-xl p-12 text-center transition-all"
          style={isDragging ? { borderColor: '#86F06F', backgroundColor: '#86F06F20' } : { borderColor: '#333333', backgroundColor: '#0a0a0a' }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          <div className="flex flex-col items-center gap-4">
            <div className="p-4 rounded-full" style={{ backgroundColor: '#86F06F30' }}>
              <UploadCloud className="w-12 h-12" style={{ color: '#86F06F' }} />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Drop your image here
              </h3>
              <p className="text-gray-400 mb-4">
                or click the button below to browse
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-3 text-black rounded-lg transition-colors font-semibold flex items-center gap-2"
                style={{ backgroundColor: '#86F06F' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#75df5e'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#86F06F'}
              >
                <ImageIcon className="w-5 h-5" style={{ color: '#000000' }} />
                Select Image
              </button>

              <button
                onClick={() => setShowUrlModal(true)}
                className="px-6 py-3 rounded-lg transition-colors font-semibold flex items-center gap-2 border-2"
                style={{ borderColor: '#86F06F', color: '#86F06F', backgroundColor: 'transparent' }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#86F06F'
                  e.target.style.color = '#000000'
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent'
                  e.target.style.color = '#86F06F'
                }}
              >
                <LinkIcon className="w-5 h-5" />
                Use URL
              </button>
            </div>

            <p className="text-sm text-gray-500">
              Supports: JPG, PNG, WebP, GIF
            </p>
          </div>
        </div>
      </div>

      {/* URL Modal */}
      <AnimatePresence>
        {showUrlModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowUrlModal(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              {/* Modal */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg rounded-2xl p-6 relative"
                style={{ backgroundColor: '#0a0a0a', border: '2px solid #86F06F' }}
              >
                {/* Close Button */}
                <button
                  onClick={() => setShowUrlModal(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Modal Content */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 rounded-full" style={{ backgroundColor: '#86F06F30' }}>
                      <LinkIcon className="w-6 h-6" style={{ color: '#86F06F' }} />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Analyze from URL</h2>
                  </div>
                  <p className="text-gray-400 ml-14">
                    Enter the URL of an image to analyze
                  </p>
                </div>

                {/* URL Form */}
                <form onSubmit={handleUrlSubmit} className="space-y-4">
                  <div className="relative">
                    <input
                      type="url"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      required
                      autoFocus
                      className="w-full px-4 py-4 rounded-lg focus:outline-none text-white placeholder-gray-500 transition-all"
                      style={{ backgroundColor: '#000000', border: '2px solid #333333' }}
                      onFocus={(e) => e.target.style.borderColor = '#86F06F'}
                      onBlur={(e) => e.target.style.borderColor = '#333333'}
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowUrlModal(false)}
                      className="flex-1 px-6 py-3 rounded-lg transition-colors font-semibold border-2"
                      style={{ borderColor: '#333333', color: '#fff', backgroundColor: 'transparent' }}
                      onMouseEnter={(e) => e.target.style.borderColor = '#555555'}
                      onMouseLeave={(e) => e.target.style.borderColor = '#333333'}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 text-black rounded-lg transition-colors font-semibold"
                      style={{ backgroundColor: '#86F06F' }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#75df5e'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#86F06F'}
                    >
                      Analyze Image
                    </button>
                  </div>
                </form>

                {/* Example URLs */}
                <div className="mt-4 pt-4 border-t" style={{ borderColor: '#333333' }}>
                  <p className="text-xs text-gray-500 mb-2">Supported formats:</p>
                  <div className="flex flex-wrap gap-2">
                    {['JPG', 'PNG', 'WebP', 'GIF'].map((format) => (
                      <span 
                        key={format}
                        className="px-2 py-1 rounded text-xs font-medium"
                        style={{ backgroundColor: '#86F06F20', color: '#86F06F' }}
                      >
                        {format}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

