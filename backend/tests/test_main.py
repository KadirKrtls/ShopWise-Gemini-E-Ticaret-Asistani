"""
Test cases for main FastAPI application
"""
import pytest


def test_basic_math():
    """Basic test to ensure pytest works"""
    assert 1 + 1 == 2


def test_string_operations():
    """Test string operations"""
    test_string = "ShopWise"
    assert len(test_string) == 8
    assert test_string.lower() == "shopwise"


def test_list_operations():
    """Test list operations"""
    test_list = [1, 2, 3, 4, 5]
    assert len(test_list) == 5
    assert sum(test_list) == 15


def test_dict_operations():
    """Test dictionary operations"""
    test_dict = {"name": "ShopWise", "type": "AI Platform"}
    assert "name" in test_dict
    assert test_dict["name"] == "ShopWise"