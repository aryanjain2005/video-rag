# Video-RAG: Video Retrieval-Augmented Generation

## 📌 Introduction

Video-RAG is a retrieval-based pipeline designed to extract insights from YouTube videos. It processes videos by generating transcripts, extracting keyframes, and storing metadata in a vector database for efficient semantic search. The goal is to enable users to ask questions and retrieve relevant video excerpts based on their queries.

🚀 **Current Capabilities:**

- Multilingual queries (queries in multiple languages are supported).
- Video metadata storage using ChromaDB.
- Semantic search to retrieve relevant transcript excerpts.
- Keyframe extraction and description generation.

⚠️ **Future Improvements:**

- **Cross-lingual retrieval:** Currently, queries are processed only in their original language.
- **LLM Integration for refined responses:** Right now, retrieved chunks are returned as-is. In future versions, an LLM will refine responses before returning them.

You can check out the GitHub repository later for updates, including LLM integration. 📌

## 🛠️ Tech Stack

### Backend:

- **Python (Flask)**: API for query processing and retrieval.
- **Whisper (medium model)**: Used for transcript generation.
- **Sentence-BERT (all-mpnet-base-v2)**: Used for embedding video transcripts.
- **BLIP (Salesforce/blip-image-captioning-base)**: Generates descriptions for extracted keyframes.
- **ChromaDB**: Stores and retrieves transcript chunks for semantic search.
- **FFmpeg**: Extracts audio from video for transcription.
- **yt-dlp**: Downloads YouTube videos for processing.

### Frontend:

- **React (TypeScript)**: Handles UI and displays search results.
- **Node.js & npm**: Required for setting up the frontend.

## 🚀 Setup Instructions

### 1️⃣ Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install required Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Install FFmpeg and Chocolatey (required for transcript generation)
   (Giving admin permissions):
   ```bash
   python ffmpeg_installation.py
   ```
4. Start the backend by running the Jupyter Notebook: video_rag.ipynb

   - If transcripts and metadata are already stored, the server will start in **1-2 minutes**.
   - If transcript data is missing, it will take **~10 minutes per video** to generate and store it.

### 2️⃣ Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm i
   ```
   **(Node.js must be installed beforehand)**
3. Run the frontend:
   ```bash
   npm run dev
   ```
4. Open the app in the browser. It will display **predefined questions** relevant to the stored video data.
   - Users can modify/add questions and click **"Ask"** to retrieve relevant responses.

## 📌 How It Works

1. **Video Processing:**
   - Downloads YouTube videos.
   - Extracts audio and generates transcripts.
   - Extracts keyframes and generates descriptions.
   - Stores transcripts as semantic chunks in ChromaDB.
2. **Query Processing:**
   - User inputs a query.
   - The system retrieves relevant chunks from ChromaDB.
   - **(Future Update)**: LLM will refine responses before returning them.
3. **Response Display:**
   - The frontend displays the most relevant transcript excerpts, keyframe descriptions, and video snippets.

## 🌟 Future Enhancements

- **Cross-lingual Retrieval**: Users can query in one language and retrieve results from videos in another language.
- **LLM-Based Refinement**: The current system retrieves raw transcript chunks, but soon an LLM will summarize and improve responses.

Github URL: https://github.com/aryanjain2005/video-rag

Stay tuned for updates! 🚀
