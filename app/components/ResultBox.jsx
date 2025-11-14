'use client'

import { CheckCircle, AlertTriangle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ResultBox({ result, imageUrl }) {
  const isAI = result.final === 'AI'
  
  return (
    <motion.div 
      className="w-full max-w-2xl mx-auto mt-8"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="rounded-xl shadow-lg overflow-hidden" style={{ backgroundColor: '#0a0a0a', border: '1px solid #333333' }}>
        {/* Image Preview */}
        {imageUrl && (
          <div className="relative w-full h-64" style={{ backgroundColor: '#000000' }}>
            <img 
              src={imageUrl} 
              alt="Analyzed image" 
              className="w-full h-full object-contain"
            />
          </div>
        )}
        
        {/* Results */}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            {isAI ? (
              <AlertTriangle className="w-8 h-8" style={{ color: '#FF6B6B' }} />
            ) : (
              <CheckCircle className="w-8 h-8" style={{ color: '#86F06F' }} />
            )}
            <div>
              <h3 className="text-2xl font-bold text-white">
                {isAI ? 'AI Generated' : 'Real Image'}
              </h3>
              <p className="text-gray-400">Detection complete</p>
            </div>
          </div>

          {/* Probability Bars */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-300">AI Probability</span>
                <span className="text-sm font-bold text-white">
                  {result.aiProbability !== undefined && result.aiProbability !== null ? `${result.aiProbability}%` : 'N/A'}
                </span>
              </div>
              <div className="w-full rounded-full h-3" style={{ backgroundColor: '#333333' }}>
                <div 
                  className="h-3 rounded-full transition-all duration-500"
                  style={{ width: `${result.aiProbability ?? 0}%`, backgroundColor: '#FF6B6B' }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-300">Real Probability</span>
                <span className="text-sm font-bold text-white">
                  {result.realProbability !== undefined && result.realProbability !== null ? `${result.realProbability}%` : 'N/A'}
                </span>
              </div>
              <div className="w-full rounded-full h-3" style={{ backgroundColor: '#333333' }}>
                <div 
                  className="h-3 rounded-full transition-all duration-500"
                  style={{ width: `${result.realProbability ?? 0}%`, backgroundColor: '#86F06F' }}
                ></div>
              </div>
            </div>
          </div>

          {/* Metadata */}
          {result.metaInfo && (
            <div className="mt-6 pt-6" style={{ borderTop: '1px solid #333333' }}>
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Image Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg p-3" style={{ backgroundColor: '#000000' }}>
                  <p className="text-xs font-semibold text-gray-400 mb-1">Filename</p>
                  <p className="text-sm text-gray-200 truncate" title={result.metaInfo.filename}>
                    {result.metaInfo.filename || 'N/A'}
                  </p>
                </div>
                <div className="rounded-lg p-3" style={{ backgroundColor: '#000000' }}>
                  <p className="text-xs font-semibold text-gray-400 mb-1">Format</p>
                  <p className="text-sm text-gray-200">
                    {result.metaInfo.format || 'N/A'}
                  </p>
                </div>
                <div className="rounded-lg p-3" style={{ backgroundColor: '#000000' }}>
                  <p className="text-xs font-semibold text-gray-400 mb-1">Dimensions</p>
                  <p className="text-sm text-gray-200">
                    {result.metaInfo.width} × {result.metaInfo.height} px
                  </p>
                </div>
                {result.processingTime && (
                  <div className="rounded-lg p-3" style={{ backgroundColor: '#000000' }}>
                    <p className="text-xs font-semibold text-gray-400 mb-1">Processing Time</p>
                    <p className="text-sm text-gray-200">
                      {result.processingTime.toFixed(2)} ms
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

