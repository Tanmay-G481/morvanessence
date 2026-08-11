from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(mongo_url)
db_name = os.environ.get('DB_NAME')
db = client[db_name]

app = FastAPI(title="Morvan Essence B2B Export API")
api_router = APIRouter(prefix="/api")

# Models for B2B Enquiries
class EnquiryCreate(BaseModel):
    model_config = ConfigDict(extra="ignore")
    enquiry_type: str = Field(..., description="sample, quote, distributor, private_label")
    company_name: str
    contact_person: str
    business_email: str
    phone_whatsapp: str
    country: str
    business_type: str = Field(..., description="importer, wholesaler, distributor, retailer, private_label")
    product_interest: str
    message: Optional[str] = None

class EnquiryResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    enquiry_type: str
    company_name: str
    contact_person: str
    business_email: str
    phone_whatsapp: str
    country: str
    business_type: str
    product_interest: str
    message: Optional[str] = None
    status: str = "Received"
    timestamp: str

@api_router.get("/")
async def root():
    return {
        "brand": "Morvan Essence",
        "tagline": "Authentic Indian Incense, Inspired by Vrindavan — Crafted for the World.",
        "status": "operational",
        "location": "Vrindavan, India"
    }

@api_router.post("/enquiries", response_model=EnquiryResponse)
async def create_enquiry(input: EnquiryCreate):
    enquiry_id = str(uuid.uuid4())
    timestamp = datetime.now(timezone.utc).isoformat()
    
    doc = {
        "id": enquiry_id,
        "enquiry_type": input.enquiry_type,
        "company_name": input.company_name,
        "contact_person": input.contact_person,
        "business_email": input.business_email,
        "phone_whatsapp": input.phone_whatsapp,
        "country": input.country,
        "business_type": input.business_type,
        "product_interest": input.product_interest,
        "message": input.message,
        "status": "Received",
        "timestamp": timestamp
    }
    
    await db.enquiries.insert_one(doc)
    logging.info(f"New B2B Enquiry saved: {enquiry_id} from {input.company_name} ({input.country})")
    return EnquiryResponse(**doc)

@api_router.get("/enquiries", response_model=List[EnquiryResponse])
async def get_enquiries():
    enquiries = await db.enquiries.find({}, {"_id": 0}).sort("timestamp", -1).to_list(100)
    return enquiries

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
