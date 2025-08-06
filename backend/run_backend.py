#!/usr/bin/env python3
"""
ShopWise Backend Server
"""

import uvicorn
import os
import sys

# Backend klasörüne geç
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from main import app

if __name__ == "__main__":
    print("🚀 ShopWise Backend Server başlatılıyor...")
    print("📊 API Docs: http://localhost:8000/docs")
    print("🔍 Health Check: http://localhost:8000/health")
    
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    ) 