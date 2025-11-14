import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const contentType = request.headers.get('content-type')
    
    let imageData = null
    let isUrl = false

    // Handle URL submission
    if (contentType?.includes('application/json')) {
      const body = await request.json()
      imageData = body.url
      isUrl = true
    } 
    // Handle file upload
    else if (contentType?.includes('multipart/form-data')) {
      const formData = await request.formData()
      const file = formData.get('image')
      
      if (!file) {
        return NextResponse.json(
          { error: 'No image file provided' },
          { status: 400 }
        )
      }

      // Convert file to base64 or buffer for API calls
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      imageData = buffer.toString('base64')
    }

    if (!imageData) {
      return NextResponse.json(
        { error: 'No image data provided' },
        { status: 400 }
      )
    }

    // Call your AI detection API
    // Replace this with your actual API call
    const apiResult = await callDetectionAPI(imageData, isUrl)

    // Parse the API response
    console.log('API Response:', JSON.stringify(apiResult, null, 2))
    
    // Remove "%" symbol and parse the float value
    const realPercent = parseFloat(apiResult.results.prediction_info.real.replace('%', ''))
    const artificialPercent = parseFloat(apiResult.results.prediction_info.artificial.replace('%', ''))
    const predictedLabel = apiResult.results.prediction_info.predicted_label
    const processingTime = apiResult.results.prediction_info.processing_time_ms
    const metaInfo = apiResult.results.meta_info

    // Convert to numbers with 2 decimal places
    const aiProb = Number(artificialPercent.toFixed(2))
    const realProb = Number(realPercent.toFixed(2))

    console.log('Parsed values - AI:', aiProb, 'Real:', realProb)

    return NextResponse.json({
      aiProbability: aiProb,
      realProbability: realProb,
      final: predictedLabel === 'artificial' ? 'AI' : 'REAL',
      processingTime,
      metaInfo: {
        filename: metaInfo.filename,
        format: metaInfo.original_format,
        dimensions: metaInfo.size,
        width: metaInfo.size[0],
        height: metaInfo.size[1],
      },
      rawResponse: apiResult,
    })

  } catch (error) {
    console.error('Error processing image:', error)
    console.error('Error stack:', error.stack)
    return NextResponse.json(
      { 
        error: 'Failed to process image',
        details: error.message,
        aiProbability: null,
        realProbability: null,
      },
      { status: 500 }
    )
  }
}

// Main detection API call
async function callDetectionAPI(imageData, isUrl) {
  const BEARER_TOKEN = process.env.API_KEY || 'Bearer e1280fff14f26b246073425df2ff87c9758b5b9a28ad81ecd6142ee767f2d4e4'
  
  if (isUrl) {
    // URL endpoint
    const API_ENDPOINT = 'http://api.deep3d.ai/v1/predict-url'
    
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': BEARER_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: imageData
      }),
    })
    
    if (!response.ok) {
      throw new Error(`API returned ${response.status}`)
    }
    
    return await response.json()
  } else {
    // File upload endpoint
    const API_ENDPOINT = 'http://api.deep3d.ai/v1/predict'
    
    try {
      // Convert base64 back to buffer
      const buffer = Buffer.from(imageData, 'base64')
      
      // Create a Blob from the buffer
      const blob = new Blob([buffer])
      
      const formData = new FormData()
      formData.append('file', blob, 'image.jpg')
      
      console.log('Uploading file to:', API_ENDPOINT)
      
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Authorization': BEARER_TOKEN,
        },
        body: formData,
      })
      
      console.log('Upload response status:', response.status)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('API Error:', errorText)
        throw new Error(`API returned ${response.status}: ${errorText}`)
      }
      
      const result = await response.json()
      console.log('Upload result:', result)
      return result
    } catch (error) {
      console.error('File upload error:', error)
      throw error
    }
  }
}

/* 
  API CONFIGURATION:
  
  Your API is now configured with:
  - File Upload: http://api.deep3d.ai/v1/predict
  - URL Upload: http://api.deep3d.ai/v1/predict-url
  - Bearer Token is included (hardcoded)
  
  SECURITY RECOMMENDATION:
  For production, store your Bearer token in .env.local:
  
  1. Create .env.local in project root
  2. Add: API_KEY=Bearer e1280fff14f26b246073425df2ff87c9758b5b9a28ad81ecd6142ee767f2d4e4
  3. Restart your dev server
  
  The token will be automatically loaded from environment variable.
*/

