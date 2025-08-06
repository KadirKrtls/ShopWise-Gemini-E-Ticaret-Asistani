"""
Test cases for authentication endpoints
"""
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_register_user():
    """Test user registration"""
    user_data = {
        "email": "test@example.com",
        "password": "testpass123",
        "username": "testuser",
        "full_name": "Test User",
        "phone": "1234567890",
        "role": "customer"
    }
    
    response = client.post("/api/v1/auth/register", json=user_data)
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert "user" in data
    assert data["user"]["email"] == user_data["email"]


def test_login_user():
    """Test user login"""
    # First register a user
    user_data = {
        "email": "login_test@example.com",
        "password": "testpass123",
        "username": "loginuser",
        "full_name": "Login User",
        "phone": "1234567890",
        "role": "customer"
    }
    client.post("/api/v1/auth/register", json=user_data)
    
    # Then try to login
    login_data = {
        "email": "login_test@example.com",
        "password": "testpass123"
    }
    
    response = client.post("/api/v1/auth/login", json=login_data)
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert "user" in data


def test_login_invalid_credentials():
    """Test login with invalid credentials"""
    login_data = {
        "email": "nonexistent@example.com",
        "password": "wrongpassword"
    }
    
    response = client.post("/api/v1/auth/login", json=login_data)
    assert response.status_code == 401
    data = response.json()
    assert "detail" in data


def test_get_current_user():
    """Test getting current user info"""
    # Register and login to get token
    user_data = {
        "email": "current_test@example.com",
        "password": "testpass123",
        "username": "currentuser",
        "full_name": "Current User",
        "phone": "1234567890",
        "role": "customer"
    }
    
    register_response = client.post("/api/v1/auth/register", json=user_data)
    token = register_response.json()["access_token"]
    
    # Get current user
    headers = {"Authorization": f"Bearer {token}"}
    response = client.get("/api/v1/auth/me", headers=headers)
    
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == user_data["email"]
    assert data["role"] == user_data["role"]


def test_get_current_user_no_token():
    """Test getting current user without token"""
    response = client.get("/api/v1/auth/me")
    assert response.status_code == 401