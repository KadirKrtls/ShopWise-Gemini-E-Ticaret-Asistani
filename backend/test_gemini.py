import asyncio
import traceback
from app.services.gemini_service import gemini_service

async def test_gemini():
    try:
        result = await gemini_service.generate_chat_response('merhaba', 'test')
        print('Result:', result)
    except Exception as e:
        print('Error:', str(e))
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_gemini()) 