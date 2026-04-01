"""
Edge TTS 로컬 서버
===================
설치:
    pip install edge-tts flask flask-cors

실행:
    python edge_tts_server.py

접속: http://localhost:5050
"""

from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
import edge_tts
import asyncio
import io

app = Flask(__name__)
CORS(app)  # 브라우저 CORS 허용

# 사용 가능한 일본어 음성 목록
JA_VOICES = [
    "ja-JP-NanamiNeural",   # 여성 (고품질, 권장)
    "ja-JP-KeitaNeural",    # 남성 (고품질, 권장)
    "ja-JP-AoiNeural",      # 여성
    "ja-JP-DaichiNeural",   # 남성
    "ja-JP-MayuNeural",     # 여성
    "ja-JP-NaokiNeural",    # 남성
    "ja-JP-ShioriNeural",   # 여성
]


@app.route("/health")
def health():
    """서버 상태 확인 — 앱에서 연결 가능 여부 체크용"""
    return jsonify({"status": "ok", "service": "edge-tts"})


@app.route("/voices")
def voices():
    """사용 가능한 일본어 음성 목록 반환"""
    return jsonify([{"id": v, "name": v.replace("ja-JP-", "").replace("Neural", "")} for v in JA_VOICES])


@app.route("/synthesize")
def synthesize():
    """
    텍스트를 MP3로 변환하여 반환
    쿼리 파라미터:
        text  : 일본어 텍스트 (필수)
        voice : 음성 ID (기본: ja-JP-NanamiNeural)
        rate  : 속도 (+0%, -10% 등, 기본: -5%)
    """
    text  = request.args.get("text", "").strip()
    voice = request.args.get("voice", "ja-JP-NanamiNeural")
    rate  = request.args.get("rate",  "-5%")

    if not text:
        return jsonify({"error": "text is required"}), 400

    if voice not in JA_VOICES:
        voice = "ja-JP-NanamiNeural"

    try:
        communicate = edge_tts.Communicate(text, voice, rate=rate)
        buffer = io.BytesIO()

        async def _generate():
            async for chunk in communicate.stream():
                if chunk["type"] == "audio":
                    buffer.write(chunk["data"])

        asyncio.run(_generate())
        buffer.seek(0)
        return send_file(buffer, mimetype="audio/mpeg", as_attachment=False)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    print("=" * 50)
    print("  Edge TTS 로컬 서버 시작")
    print("  http://localhost:5050")
    print("  종료: Ctrl+C")
    print("=" * 50)
    app.run(host="0.0.0.0", port=5050, debug=False)
