"""Backend API tests for Madio Doors & Windows"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL').rstrip('/')


class TestProductsAPI:
    """Products endpoint tests"""

    def test_get_all_products(self):
        response = requests.get(f"{BASE_URL}/api/products")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) == 18, f"Expected 18 products, got {len(data)}"

    def test_products_have_required_fields(self):
        response = requests.get(f"{BASE_URL}/api/products")
        assert response.status_code == 200
        products = response.json()
        for p in products:
            assert 'id' in p
            assert 'name' in p
            assert 'subtitle' in p
            assert 'category' in p
            assert 'features' in p
            assert 'specs' in p
            assert 'image' in p
            assert '_id' not in p, "MongoDB _id should not be exposed"

    def test_filter_by_sliding_category(self):
        response = requests.get(f"{BASE_URL}/api/products?category=sliding")
        assert response.status_code == 200
        data = response.json()
        assert len(data) == 7
        for p in data:
            assert p['category'] == 'sliding'

    def test_filter_by_casement_category(self):
        response = requests.get(f"{BASE_URL}/api/products?category=casement")
        assert response.status_code == 200
        data = response.json()
        assert len(data) == 2
        for p in data:
            assert p['category'] == 'casement'

    def test_filter_by_partition_category(self):
        response = requests.get(f"{BASE_URL}/api/products?category=partition")
        assert response.status_code == 200
        data = response.json()
        assert len(data) == 8
        for p in data:
            assert p['category'] == 'partition'

    def test_filter_by_hardware_category(self):
        response = requests.get(f"{BASE_URL}/api/products?category=hardware")
        assert response.status_code == 200
        data = response.json()
        assert len(data) == 1
        for p in data:
            assert p['category'] == 'hardware'

    def test_get_single_product(self):
        response = requests.get(f"{BASE_URL}/api/products/madio-slidefold")
        assert response.status_code == 200
        p = response.json()
        assert p['id'] == 'madio-slidefold'
        assert p['name'] == 'Madio SlideFold'
        assert '_id' not in p

    def test_get_invalid_product_returns_404(self):
        response = requests.get(f"{BASE_URL}/api/products/nonexistent-product")
        assert response.status_code == 404

    def test_no_nhpc_branding_in_products(self):
        response = requests.get(f"{BASE_URL}/api/products")
        assert response.status_code == 200
        text = str(response.json()).lower()
        assert 'nhpc' not in text, "NHPC branding found in products"
        assert 'surat' not in text, "Surat location found in products"


class TestContactAPI:
    """Contact form endpoint tests"""

    def test_submit_contact_form(self):
        payload = {
            "name": "TEST_User",
            "email": "test@example.com",
            "phone": "+91 9999999999",
            "message": "TEST_Message from automated test"
        }
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data['success'] is True
        assert 'message' in data

    def test_contact_form_required_fields(self):
        payload = {"name": "TEST_User"}  # missing required fields
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 422  # validation error

    def test_contact_form_optional_phone(self):
        payload = {
            "name": "TEST_NoPhone",
            "email": "test@example.com",
            "message": "TEST_No phone message"
        }
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 200


class TestAPIRoot:
    """API root endpoint"""

    def test_api_root(self):
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert 'message' in data
        assert 'Madio' in data['message']
