'use client'

import { motion } from 'framer-motion'
import { Copy, Check, Upload, Link as LinkIcon, Key, FileCode } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function ApiDocs() {
  const [copiedText, setCopiedText] = useState('')

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopiedText(id)
    setTimeout(() => setCopiedText(''), 2000)
  }

  const CodeBlock = ({ code, language, id }) => (
    <div className="relative rounded-lg overflow-hidden" style={{ backgroundColor: '#0a0a0a', border: '1px solid #333333' }}>
      <div className="flex items-center justify-between px-4 py-2" style={{ backgroundColor: '#000000', borderBottom: '1px solid #333333' }}>
        <span className="text-xs text-gray-400 font-mono">{language}</span>
        <button
          onClick={() => copyToClipboard(code, id)}
          className="flex items-center gap-2 text-xs transition-colors"
          style={{ color: copiedText === id ? '#86F06F' : '#888888' }}
        >
          {copiedText === id ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm text-gray-300 font-mono">{code}</code>
      </pre>
    </div>
  )

  const EndpointCard = ({ icon: Icon, title, description, endpoint, method, children }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl p-6"
      style={{ backgroundColor: '#0a0a0a', border: '1px solid #333333' }}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 rounded-lg" style={{ backgroundColor: '#86F06F30' }}>
          <Icon className="w-6 h-6" style={{ color: '#86F06F' }} />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
          <p className="text-gray-400 text-sm mb-3">{description}</p>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="px-3 py-1 rounded-lg text-xs font-bold" style={{ backgroundColor: '#86F06F', color: '#000000' }}>
              {method}
            </span>
            <span className="text-sm font-mono text-gray-300">{endpoint}</span>
          </div>
        </div>
      </div>
      {children}
    </motion.div>
  )

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#000000' }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: '#333333' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              ← Back to Home
            </Link>
            <div className="flex items-center gap-2">
              <FileCode className="w-5 h-5" style={{ color: '#86F06F' }} />
              <span className="text-white font-bold">API Documentation</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-4">API Documentation</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Integrate AI image detection into your applications with our simple REST API
          </p>
        </motion.div>

        {/* Authentication Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Key className="w-6 h-6" style={{ color: '#86F06F' }} />
            <h2 className="text-3xl font-bold text-white">Authentication</h2>
          </div>
          <div className="rounded-xl p-6 mb-6" style={{ backgroundColor: '#0a0a0a', border: '1px solid #333333' }}>
            <p className="text-gray-300 mb-4">
              Include your API token in the <code className="px-2 py-1 rounded text-sm" style={{ backgroundColor: '#000000', color: '#86F06F' }}>Authorization</code> header for all requests.
            </p>
            <CodeBlock
              id="auth"
              language="Header"
              code="Authorization: Bearer YOUR_TOKEN"
            />
            <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: '#86F06F20', border: '1px solid #86F06F40' }}>
              <p className="text-sm" style={{ color: '#86F06F' }}>
                <strong>Public Test Token:</strong> Bearer e1280fff14f26b246073425df2ff87c9758b5b9a28ad81ecd6142ee767f2d4e4
              </p>
            </div>
          </div>
        </motion.div>

        {/* Endpoints */}
        <div className="space-y-8">
          {/* Upload Image File */}
          <EndpointCard
            icon={Upload}
            title="Upload Image File"
            description="Detect AI-generated images via file upload"
            endpoint="http://api.deep3d.ai/v1/predict"
            method="POST"
          >
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-300 mb-2">Request Example</h4>
                <CodeBlock
                  id="upload-curl"
                  language="bash"
                  code={`curl -X POST \\
  http://api.deep3d.ai/v1/predict \\
  -H "Authorization: Bearer e1280fff14f26b246073425df2ff87c9758b5b9a28ad81ecd6142ee767f2d4e4" \\
  -F "file=@image.jpg"`}
                />
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#000000' }}>
                <p className="text-xs text-gray-400">
                  📁 Supports PNG, JPG, JPEG, WEBP up to 10MB
                </p>
              </div>
            </div>
          </EndpointCard>

          {/* Detect via URL */}
          <EndpointCard
            icon={LinkIcon}
            title="Detect via URL"
            description="Analyze images from public URLs"
            endpoint="http://api.deep3d.ai/v1/predict-url"
            method="POST"
          >
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-300 mb-2">Request Example</h4>
                <CodeBlock
                  id="url-curl"
                  language="bash"
                  code={`curl -X POST \\
  http://api.deep3d.ai/v1/predict-url \\
  -H "Authorization: Bearer e1280fff14f26b246073425df2ff87c9758b5b9a28ad81ecd6142ee767f2d4e4" \\
  -H "Content-Type: application/json" \\
  -d '{"url": "https://example.com/image.jpg"}'`}
                />
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#000000' }}>
                <p className="text-xs text-gray-400">
                  🔗 Image must be publicly accessible via URL
                </p>
              </div>
            </div>
          </EndpointCard>
        </div>

        {/* Response Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Response Format</h2>
          <div className="rounded-xl p-6" style={{ backgroundColor: '#0a0a0a', border: '1px solid #333333' }}>
            <p className="text-gray-300 mb-4">
              Returns JSON with AI probability, classification, and metadata.
            </p>
            <CodeBlock
              id="response"
              language="json"
              code={`{
  "api_version": "v1",
  "results": {
    "prediction_info": {
      "real": "14.58%",
      "artificial": "85.42%",
      "predicted_label": "artificial",
      "processing_time_ms": 1288.52
    },
    "meta_info": {
      "filename": "image.jpg",
      "original_format": "JPEG",
      "size": [800, 1066]
    }
  },
  "message": "Prediction completed successfully.",
  "status": "success",
  "status_code": 200
}`}
            />
          </div>
        </motion.div>

        {/* Rate Limits & Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="rounded-xl p-6" style={{ backgroundColor: '#0a0a0a', border: '1px solid #333333' }}>
            <h3 className="text-lg font-bold text-white mb-3">📊 Rate Limits</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>• Test Token: 100 requests/day</li>
              <li>• Production: Custom limits</li>
              <li>• Max file size: 10MB</li>
            </ul>
          </div>

          <div className="rounded-xl p-6" style={{ backgroundColor: '#0a0a0a', border: '1px solid #333333' }}>
            <h3 className="text-lg font-bold text-white mb-3">💡 Best Practices</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>• Use production tokens in .env</li>
              <li>• Handle errors gracefully</li>
              <li>• Cache results when possible</li>
            </ul>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Link href="/">
            <button
              className="px-8 py-4 rounded-lg font-semibold text-black transition-all inline-flex items-center gap-2"
              style={{ backgroundColor: '#86F06F' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#75df5e'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#86F06F'}
            >
              Try It Now
              <span>→</span>
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

