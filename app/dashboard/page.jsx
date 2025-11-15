'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { 
  Image as ImageIcon, 
  Calendar, 
  Trash2, 
  TrendingUp, 
  TrendingDown,
  Clock,
  Filter,
  Search,
  AlertCircle,
  X,
  ZoomIn,
  ExternalLink,
  Download
} from 'lucide-react'
import toast from 'react-hot-toast'
import Navbar from '../components/Navbar'
import ConfirmModal from '../components/ConfirmModal'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const queryClient = useQueryClient()
  
  const [filterType, setFilterType] = useState('all') // all, ai, real
  const [selectedImage, setSelectedImage] = useState(null) // For popup modal
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, itemId: null, itemName: '' }) // For delete confirmation

  // Redirect if unauthenticated
  if (status === 'unauthenticated') {
    router.push('/signin')
    return null
  }

  // Fetch history with TanStack Query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['history'],
    queryFn: async () => {
      const response = await fetch('/api/history?limit=30')
      if (!response.ok) {
        throw new Error('Failed to fetch history')
      }
      return response.json()
    },
    enabled: !!session, // Only fetch when session exists
    staleTime: 60 * 1000, // Fresh for 1 minute
    gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes
  })

  // Calculate stats from data
  const history = data?.data || []
  const stats = {
    total: data?.pagination?.total || 0,
    ai: history.filter(item => item.finalResult === 'AI').length,
    real: history.filter(item => item.finalResult === 'REAL').length,
  }

  // Show error toast once if query fails
  if (isError) {
    toast.error(error?.message || 'Failed to load history')
  }

  const openDeleteModal = (id, fileName = 'this image') => {
    setConfirmModal({ isOpen: true, itemId: id, itemName: fileName })
  }

  const closeDeleteModal = () => {
    setConfirmModal({ isOpen: false, itemId: null, itemName: '' })
  }

  // Delete mutation with optimistic updates
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const response = await fetch(`/api/history?id=${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to delete image')
      }
      return response.json()
    },
    onMutate: async (deletedId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['history'] })

      // Snapshot the previous value
      const previousData = queryClient.getQueryData(['history'])

      // Optimistically update to the new value
      queryClient.setQueryData(['history'], (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter(item => item._id !== deletedId),
          pagination: {
            ...old.pagination,
            total: old.pagination.total - 1,
          },
        }
      })

      // Return context with the snapshot value
      return { previousData }
    },
    onError: (err, deletedId, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      queryClient.setQueryData(['history'], context.previousData)
      toast.error('Failed to delete image')
    },
    onSuccess: () => {
      toast.success('Image deleted successfully')
    },
    onSettled: () => {
      // Always refetch after error or success to sync with server
      queryClient.invalidateQueries({ queryKey: ['history'] })
    },
  })

  const deleteItem = () => {
    const id = confirmModal.itemId
    if (!id) return
    deleteMutation.mutate(id)
  }

  const downloadImage = async (imageUrl, fileName = 'image') => {
    try {
      // Show loading toast
      const loadingToast = toast.loading('Preparing download...')
      
      if (imageUrl.startsWith('data:')) {
        // Base64 image - direct download
        const link = document.createElement('a')
        link.href = imageUrl
        link.download = `${fileName}.jpg`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        toast.success('Image downloaded!', { id: loadingToast })
      } else {
        // URL image - fetch and download
        const response = await fetch(imageUrl)
        const blob = await response.blob()
        const blobUrl = window.URL.createObjectURL(blob)
        
        const link = document.createElement('a')
        link.href = blobUrl
        link.download = `${fileName}.jpg`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        
        // Clean up
        window.URL.revokeObjectURL(blobUrl)
        toast.success('Image downloaded!', { id: loadingToast })
      }
    } catch (error) {
      console.error('Error downloading image:', error)
      toast.error('Failed to download image')
    }
  }

  const filteredHistory = history.filter(item => {
    if (filterType === 'all') return true
    if (filterType === 'ai') return item.finalResult === 'AI'
    if (filterType === 'real') return item.finalResult === 'REAL'
    return true
  })

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen" style={{ background: '#000000' }}>
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="w-16 h-16 border-4 border-[#86F06F] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: '#000000' }}>
      <Navbar />
      
      {/* Full Page Loader */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <div className="text-center">
              {/* Animated Spinner */}
              <div className="relative w-24 h-24 mx-auto mb-6">
                <motion.div
                  className="absolute inset-0 border-4 border-[#86F06F]/20 rounded-full"
                ></motion.div>
                <motion.div
                  className="absolute inset-0 border-4 border-[#86F06F] border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                ></motion.div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <ImageIcon className="w-10 h-10 text-[#86F06F]" />
                </div>
              </div>
              
              {/* Loading Text */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-xl font-semibold text-white mb-2">Loading Dashboard</h3>
                <p className="text-gray-400 text-sm">Fetching your detection history...</p>
              </motion.div>

              {/* Animated Dots */}
              <div className="flex items-center justify-center gap-2 mt-4">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-[#86F06F]"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  ></motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">View your image detection history</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-xl p-6"
            style={{ backgroundColor: '#0a0a0a', border: '1px solid #333333' }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Scans</p>
                <p className="text-3xl font-bold text-white">{stats.total}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#86F06F]/10 flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-[#86F06F]" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-xl p-6"
            style={{ backgroundColor: '#0a0a0a', border: '1px solid #333333' }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">AI Generated</p>
                <p className="text-3xl font-bold text-red-400">{stats.ai}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-red-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-xl p-6"
            style={{ backgroundColor: '#0a0a0a', border: '1px solid #333333' }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Real Images</p>
                <p className="text-3xl font-bold text-[#86F06F]">{stats.real}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#86F06F]/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-[#86F06F]" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-4 mb-6">
          <Filter className="w-5 h-5 text-gray-400" />
          <div className="flex gap-2">
            {['all', 'ai', 'real'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filterType === type
                    ? 'text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
                style={{
                  backgroundColor: filterType === type ? '#86F06F' : '#0a0a0a',
                  border: '1px solid',
                  borderColor: filterType === type ? '#86F06F' : '#333333',
                }}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* History Grid */}
        {filteredHistory.length === 0 && !isLoading ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 rounded-xl"
            style={{ backgroundColor: '#0a0a0a', border: '1px solid #333333' }}
          >
            <ImageIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No scans yet</h3>
            <p className="text-gray-400 mb-6">
              Start by uploading an image on the home page to see your detection history here.
            </p>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-3 rounded-lg font-semibold text-black"
              style={{ backgroundColor: '#86F06F' }}
            >
              Upload Your First Image
            </button>
          </motion.div>
        ) : !isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHistory.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.02, 0.3) }}
                className="rounded-xl p-4 hover:scale-[1.02] transition-transform"
                style={{ backgroundColor: '#0a0a0a', border: '1px solid #333333' }}
              >
                {/* Image Preview - Clickable */}
                <div 
                  className="relative w-full h-48 mb-4 rounded-lg overflow-hidden cursor-pointer group"
                  style={{ backgroundColor: '#1a1a1a' }}
                  onClick={() => setSelectedImage(item)}
                >
                  {item.imageUrl ? (
                    <>
                      <img
                        src={item.imageUrl}
                        alt="Detection"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.nextSibling.style.display = 'flex'
                        }}
                      />
                      {/* Zoom Overlay on Hover */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ZoomIn className="w-8 h-8 text-white" />
                      </div>
                    </>
                  ) : null}
                  <div 
                    className="w-full h-full flex items-center justify-center"
                    style={{ display: item.imageUrl ? 'none' : 'flex' }}
                  >
                    <ImageIcon className="w-12 h-12 text-gray-600" />
                  </div>
                  
                  {/* Result Badge */}
                  <div 
                    className="absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-bold"
                    style={{
                      backgroundColor: item.finalResult === 'AI' ? '#ef4444' : '#86F06F',
                      color: '#000',
                    }}
                  >
                    {item.finalResult}
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">AI Probability</span>
                    <span className="text-sm font-semibold text-white">{item.aiProbability}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Real Probability</span>
                    <span className="text-sm font-semibold text-white">{item.realProbability}%</span>
                  </div>
                  
                  {/* Progress Bars */}
                  <div>
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-400 transition-all"
                        style={{ width: `${item.aiProbability}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-500 pt-2">
                    <Calendar className="w-3 h-3" />
                    {formatDate(item.createdAt)}
                  </div>

                  {item.imageMetadata && (
                    <div className="text-xs text-gray-500">
                      {item.imageMetadata.width} × {item.imageMetadata.height} · {item.imageMetadata.format}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => downloadImage(item.imageUrl, item.imageMetadata?.filename || `image-${item._id}`)}
                    className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-[#86F06F] hover:bg-[#86F06F]/10 transition-colors flex items-center justify-center gap-2"
                    style={{ border: '1px solid #333333' }}
                    disabled={!item.imageUrl}
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button
                    onClick={() => openDeleteModal(item._id, item.imageMetadata?.filename || 'this image')}
                    className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors flex items-center justify-center gap-2"
                    style={{ border: '1px solid #333333' }}
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : null}
      </div>

      {/* Image Popup Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#0a0a0a', border: '2px solid #333333' }}>
                {/* Close Button - Inside Modal */}
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#86F06F] hover:text-black transition-all group"
                >
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                </button>

                {/* Image */}
                <div className="relative bg-black min-h-[300px] flex items-center justify-center">
                  {selectedImage.imageUrl ? (
                    <img
                      src={selectedImage.imageUrl}
                      alt="Full size"
                      className="w-full max-h-[50vh] min-h-[300px] object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.nextSibling.style.display = 'flex'
                      }}
                    />
                  ) : null}
                  <div 
                    className="w-full h-64 flex items-center justify-center"
                    style={{ display: selectedImage.imageUrl ? 'none' : 'flex' }}
                  >
                    <ImageIcon className="w-16 h-16 text-gray-600" />
                  </div>
                  
                  {/* Badge */}
                  <div 
                    className="absolute top-4 left-4 px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                    style={{
                      backgroundColor: selectedImage.finalResult === 'AI' ? '#ef4444' : '#86F06F',
                      color: '#000',
                    }}
                  >
                    {selectedImage.finalResult}
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 space-y-4">
                  {/* Probabilities */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">AI Probability</span>
                        <span className="text-xl font-bold text-white">{selectedImage.aiProbability}%</span>
                      </div>
                      <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-red-400 transition-all"
                          style={{ width: `${selectedImage.aiProbability}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Real Probability</span>
                        <span className="text-xl font-bold text-white">{selectedImage.realProbability}%</span>
                      </div>
                      <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#86F06F] transition-all"
                          style={{ width: `${selectedImage.realProbability}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t" style={{ borderColor: '#333333' }}>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Date</p>
                      <p className="text-sm text-white">{formatDate(selectedImage.createdAt)}</p>
                    </div>
                    {selectedImage.imageMetadata && (
                      <>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Dimensions</p>
                          <p className="text-sm text-white">
                            {selectedImage.imageMetadata.width} × {selectedImage.imageMetadata.height}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Format</p>
                          <p className="text-sm text-white">{selectedImage.imageMetadata.format}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Filename</p>
                          <p className="text-sm text-white truncate">{selectedImage.imageMetadata.filename}</p>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-3 pt-4">
                    {selectedImage.imageUrl && (
                      <>
                        <a
                          href={selectedImage.imageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-3 rounded-lg font-medium text-white hover:bg-[#86F06F]/10 transition-colors flex items-center justify-center gap-2"
                          style={{ border: '1px solid #86F06F', color: '#86F06F' }}
                        >
                          <ExternalLink className="w-4 h-4" />
                          Open Original
                        </a>
                        <button
                          onClick={() => downloadImage(selectedImage.imageUrl, selectedImage.imageMetadata?.filename || `image-${selectedImage._id}`)}
                          className="px-4 py-3 rounded-lg font-medium text-white hover:bg-[#86F06F]/10 transition-colors flex items-center justify-center gap-2"
                          style={{ border: '1px solid #86F06F', color: '#86F06F' }}
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => {
                        openDeleteModal(selectedImage._id, selectedImage.imageMetadata?.filename || 'this image')
                        setSelectedImage(null)
                      }}
                      className="col-span-2 px-4 py-3 rounded-lg font-medium text-red-400 hover:bg-red-500/10 transition-colors flex items-center justify-center gap-2"
                      style={{ border: '1px solid #ef4444' }}
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={deleteItem}
        title="Delete Image?"
        message={`Are you sure you want to delete "${confirmModal.itemName}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  )
}

