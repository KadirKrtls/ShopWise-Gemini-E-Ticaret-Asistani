#!/usr/bin/env python3
"""
Database tablolarını oluşturmak için script
"""

import sys
import os

# Backend klasörüne geç
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.models.database import create_tables, engine
from app.core.config import settings

def main():
    print("🔄 Database tabloları oluşturuluyor...")
    
    try:
        # Tabloları oluştur
        create_tables()
        
        print("✅ Database tabloları başarıyla oluşturuldu!")
        print(f"📊 Database URL: {settings.DATABASE_URL}")
        
        # Test bağlantısı
        from sqlalchemy import text
        with engine.connect() as conn:
            result = conn.execute(text("SELECT name FROM sqlite_master WHERE type='table'"))
            tables = [row[0] for row in result]
            print(f"📋 Oluşturulan tablolar: {', '.join(tables)}")
            
    except Exception as e:
        print(f"❌ Hata: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main() 