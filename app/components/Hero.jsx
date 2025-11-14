'use client'

import UploadBox from './UploadBox'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="flex-1" style={{ background: '#000000' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Main Hero Content */}
        <div className="text-center mb-12">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            AI Image Detection
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover whether an image is AI-generated or real using advanced detection algorithms
          </motion.p>
        </div>

        {/* GIF and Upload Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-16">
          {/* Left Side - Image */}
          <motion.div
            className="flex justify-center lg:justify-start"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="relative w-full">
              <div className="rounded-2xl overflow-hidden border-2 shadow-2xl" style={{ borderColor: '#86F06F' }}>
                <img 
                  src="/images/hero.webp"
                  alt="AI Detection"
                  className="w-full h-full object-cover"
                  style={{ minHeight: '500px', maxHeight: '600px' }}
                />
              </div>
              {/* Glow effect */}
              <div 
                className="absolute -inset-1 rounded-2xl blur-2xl opacity-40 -z-10"
                style={{ background: '#86F06F' }}
              ></div>
            </div>
          </motion.div>

          {/* Right Side - Upload Box */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col items-center justify-center"
          >
            <div className="w-full">
              <UploadBox />
            </div>
            
            {/* Feature Badges */}
            <motion.div
              className="flex flex-wrap gap-4 justify-center mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#86F06F' }}></div>
                <span className="text-sm">Fast Analysis</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#86F06F' }}></div>
                <span className="text-sm">99% Accurate</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#86F06F' }}></div>
                <span className="text-sm">Privacy First</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {[
            {
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />,
              title: "Fast Analysis",
              description: "Get results in seconds with our optimized detection pipeline",
              delay: 0.7
            },
            {
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
              title: "Accurate Detection",
              description: "Powered by multiple AI detection APIs for reliable results",
              delay: 0.8
            },
            {
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />,
              title: "Privacy Focused",
              description: "Your images are processed securely and never stored",
              delay: 0.9
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: feature.delay }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#86F06F30' }}>
                <svg className="w-6 h-6" style={{ color: '#86F06F' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {feature.icon}
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
