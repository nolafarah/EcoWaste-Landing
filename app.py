from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
from dotenv import load_dotenv
import os
import json

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "EcoWaste Backend Running"

@app.route("/analyze", methods=["POST"])
def analyze():

    if "image" not in request.files:
        return jsonify({
            "success": False,
            "message": "Gambar tidak ditemukan."
        }),400

    image_file=request.files["image"]
    image_bytes = image_file.read()

    prompt="""
Kamu adalah AI untuk identifikasi sampah.

Analisis gambar berikut.

Jawab HANYA dalam format JSON.

{
    "waste_name":"",
    "category":"",
    "status":"",
    "confidence":""
}

Penjelasan field:

waste_name = nama benda

category = Organik / Anorganik / B3 / Elektronik

status = apakah bisa didaur ulang atau tidak

confidence = persentase keyakinan contoh:
95%
"""

    try:

        from google.genai import types

        response = client.models.generate_content(
            model="gemini-flash-latest",
            contents=[
                prompt,
                types.Part.from_bytes(
                    data=image_bytes,
                    mime_type=image_file.mimetype
                )
            ]
        )

        print("========================")
        print(response.text)
        print("========================")

        result=response.text.strip()

        if result.startswith("```json"):
            result=result.replace("```json","").replace("```","").strip()

        elif result.startswith("```"):
            result=result.replace("```","").strip()

        data=json.loads(result)

        return jsonify({
            "success":True,
            "result":data
        })

    except Exception as e:

        return jsonify({
            "success":False,
            "message":str(e)
        }),500


if __name__=="__main__":
    app.run(debug=True)