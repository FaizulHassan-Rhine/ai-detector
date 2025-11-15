import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import connectDB from '@/lib/mongodb'
import ImageHistory from '@/models/ImageHistory'

export async function GET(request) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Connect to database
    await connectDB()

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit')) || 50
    const skip = parseInt(searchParams.get('skip')) || 0

    // Fetch user's image history - only necessary fields for better performance
    const history = await ImageHistory.find({ userEmail: session.user.email })
      .select('imageUrl finalResult aiProbability realProbability createdAt imageMetadata imageType')
      .sort({ createdAt: -1 }) // Most recent first
      .limit(limit)
      .skip(skip)
      .lean() // Convert to plain JS objects for better performance

    // Get total count (cached for 1 minute in production)
    const total = await ImageHistory.countDocuments({ userEmail: session.user.email })

    return NextResponse.json({
      success: true,
      data: history,
      pagination: {
        total,
        limit,
        skip,
        hasMore: total > skip + limit,
      },
    })
  } catch (error) {
    console.error('Error fetching history:', error)
    return NextResponse.json(
      { error: 'Failed to fetch history' },
      { status: 500 }
    )
  }
}

export async function DELETE(request) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'History ID is required' },
        { status: 400 }
      )
    }

    // Connect to database
    await connectDB()

    // Delete only if it belongs to the user
    const result = await ImageHistory.findOneAndDelete({
      _id: id,
      userEmail: session.user.email,
    })

    if (!result) {
      return NextResponse.json(
        { error: 'History not found or unauthorized' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'History deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting history:', error)
    return NextResponse.json(
      { error: 'Failed to delete history' },
      { status: 500 }
    )
  }
}

