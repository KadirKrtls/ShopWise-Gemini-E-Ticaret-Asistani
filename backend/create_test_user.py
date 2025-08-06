#!/usr/bin/env python3
"""
Test kullanıcısı oluşturmak için script
"""

import sys
import os

# Backend klasörüne geç
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.models.database import SessionLocal, User, UserRole
from app.services.auth_service import AuthService

def create_test_users():
    """Test kullanıcıları oluştur"""
    db = SessionLocal()
    
    try:
        # Test müşterisi
        customer_data = {
            "email": "customer@test.com",
            "username": "testcustomer",
            "full_name": "Test Müşteri",
            "password": "123456",
            "role": UserRole.CUSTOMER,
            "phone": "0555 123 4567"
        }
        
        # Test satıcısı
        seller_data = {
            "email": "seller@test.com", 
            "username": "testseller",
            "full_name": "Test Satıcı",
            "password": "123456",
            "role": UserRole.SELLER,
            "phone": "0555 987 6543",
            "company_name": "Test Şirketi",
            "tax_number": "1234567890",
            "address": "İstanbul, Türkiye"
        }
        
        # Kullanıcıları oluştur
        print("🔄 Test kullanıcıları oluşturuluyor...")
        
        # Müşteri oluştur
        try:
            customer = AuthService.create_user(db=db, **customer_data)
            print(f"✅ Müşteri oluşturuldu: {customer.email}")
        except Exception as e:
            print(f"⚠️ Müşteri zaten mevcut: {customer_data['email']}")
        
        # Satıcı oluştur
        try:
            seller = AuthService.create_user(db=db, **seller_data)
            print(f"✅ Satıcı oluşturuldu: {seller.email}")
        except Exception as e:
            print(f"⚠️ Satıcı zaten mevcut: {seller_data['email']}")
        
        print("\n📋 Test Kullanıcı Bilgileri:")
        print("=" * 50)
        print("👤 Müşteri:")
        print(f"   Email: {customer_data['email']}")
        print(f"   Şifre: {customer_data['password']}")
        print(f"   Rol: {customer_data['role'].value}")
        print()
        print("🏪 Satıcı:")
        print(f"   Email: {seller_data['email']}")
        print(f"   Şifre: {seller_data['password']}")
        print(f"   Rol: {seller_data['role'].value}")
        print(f"   Şirket: {seller_data['company_name']}")
        print("=" * 50)
        
    except Exception as e:
        print(f"❌ Hata: {str(e)}")
    finally:
        db.close()

if __name__ == "__main__":
    create_test_users() 