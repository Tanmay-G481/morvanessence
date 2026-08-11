from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

try:
    import resend
except ImportError:
    resend = None

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
    if resend and os.environ.get("RESEND_API_KEY") and os.environ.get("OWNER_NOTIFY_EMAIL"):
        asyncio.create_task(send_enquiry_alert(doc))
    return EnquiryResponse(**doc)

async def send_enquiry_alert(doc):
    try:
        resend.api_key = os.environ["RESEND_API_KEY"]
        rows = "".join(
            f'<tr><td style="padding:8px 12px;color:#767169;font-size:13px;border-bottom:1px solid #eee;">{k}</td>'
            f'<td style="padding:8px 12px;font-size:13px;border-bottom:1px solid #eee;"><b>{v}</b></td></tr>'
            for k, v in [
                ("Enquiry Type", doc["enquiry_type"]),
                ("Company", doc["company_name"]),
                ("Contact Person", doc["contact_person"]),
                ("Business Email", doc["business_email"]),
                ("Phone / WhatsApp", doc["phone_whatsapp"]),
                ("Country", doc["country"]),
                ("Business Type", doc["business_type"]),
                ("Product Interest", doc["product_interest"]),
                ("Message", doc.get("message") or "—"),
                ("Reference ID", doc["id"]),
                ("Received (UTC)", doc["timestamp"]),
            ]
        )
        html = (
            '<div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;border:1px solid #E8E2D5;border-radius:12px;overflow:hidden;">'
            '<div style="background:#4A5D4E;color:#fff;padding:20px 24px;">'
            '<h2 style="margin:0;font-size:20px;">Morvan Essence — New B2B Enquiry</h2></div>'
            f'<table style="width:100%;border-collapse:collapse;background:#fff;">{rows}</table>'
            '<div style="padding:14px 24px;background:#F9F8F5;color:#767169;font-size:12px;">Reply directly to the buyer\'s email to continue the conversation.</div></div>'
        )
        params = {
            "from": os.environ.get("SENDER_EMAIL", "onboarding@resend.dev"),
            "to": [os.environ["OWNER_NOTIFY_EMAIL"]],
            "subject": f"New B2B Enquiry — {doc['company_name']} ({doc['enquiry_type']})",
            "html": html,
        }
        await asyncio.to_thread(resend.Emails.send, params)
        logging.info(f"Enquiry alert email sent for {doc['id']}")

        confirm_html = (
            '<div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;border:1px solid #E8E2D5;border-radius:12px;overflow:hidden;">'
            '<div style="background:#4A5D4E;color:#fff;padding:24px;text-align:center;">'
            '<div style="width:52px;height:52px;border-radius:50%;background:#C5A059;color:#22201D;font-size:26px;line-height:52px;margin:0 auto 10px;">M</div>'
            '<h2 style="margin:0;font-size:20px;">Morvan Essence</h2>'
            '<p style="margin:6px 0 0;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#E8E2D5;">Vrindavan • Global Export</p></div>'
            '<div style="padding:28px 24px;background:#fff;color:#22201D;font-size:14px;line-height:1.7;">'
            f'<p>Dear {doc["contact_person"]},</p>'
            '<p>Thank you for your enquiry. Our export desk has received your request and will respond within 24 hours with samples, pricing, or partnership details as applicable.</p>'
            f'<p style="background:#F9F8F5;border-left:3px solid #C5A059;padding:12px 16px;margin:16px 0;">'
            f'<b>Reference ID:</b> {doc["id"][:8]}<br/><b>Enquiry Type:</b> {doc["enquiry_type"]}<br/><b>Product Interest:</b> {doc["product_interest"]}</p>'
            '<p>For anything urgent, reply to this email or reach us on WhatsApp at <b>+91 70603 74484</b>.</p>'
            '<p>Warm regards,<br/><b>The Morvan Essence Export Desk</b><br/>Vrindavan, India</p></div>'
            '<div style="padding:14px 24px;background:#F9F8F5;color:#767169;font-size:11px;text-align:center;">Authentic Indian Incense, Inspired by Vrindavan — Crafted for the World.</div></div>'
        )
        confirm_params = {
            "from": os.environ.get("SENDER_EMAIL", "onboarding@resend.dev"),
            "to": [doc["business_email"]],
            "subject": "We received your enquiry — Morvan Essence Export Desk",
            "html": confirm_html,
        }
        await asyncio.to_thread(resend.Emails.send, confirm_params)
        logging.info(f"Buyer confirmation email sent for {doc['id']} to {doc['business_email']}")
    except Exception as e:
        logging.error(f"Enquiry alert email failed for {doc.get('id')}: {e}")

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
