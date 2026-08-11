import pytest
from fastapi.testclient import TestClient
from server import app

client = TestClient(app)

def test_root():
    response = client.get("/api/")
    assert response.status_code == 200
    data = response.json()
    assert data["brand"] == "Morvan Essence"
    assert "Vrindavan" in data["tagline"]

def test_create_enquiry():
    payload = {
        "enquiry_type": "sample",
        "company_name": "Global Wellness Importers LLC",
        "contact_person": "Sarah Jenkins",
        "business_email": "sarah@globalwellness.com",
        "phone_whatsapp": "+1 555 123 4567",
        "country": "United States",
        "business_type": "importer",
        "product_interest": "Organic Incense Sticks - Sandalwood (9-inch)",
        "message": "Please send export sample kit and catalog."
    }
    response = client.post("/api/enquiries", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["company_name"] == "Global Wellness Importers LLC"
    assert data["status"] == "Received"
    assert "id" in data
