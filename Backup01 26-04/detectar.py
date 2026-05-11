from PIL import Image
import os

carpetas = {
    "editorial":         9,
    "experimental":      14,
    "hotelFlowerDesign": 21,
    "proyect01":         32,
    "proyect02":         16,
    "proyect03":         14,
    "proyect04":         7,
    "proyect05":         40,
    "proyect06":         13,
}

for carpeta, total in carpetas.items():
    print(f"\n=== {carpeta} ===")
    for i in range(1, total + 1):
        num  = f"{i:02d}"
        path = f"img/{carpeta}/{num}.webp"
        try:
            with Image.open(path) as img:
                w, h = img.size
                ori  = "horiz" if w > h else "vert"
                print(f"  {num}: {ori}  ({w}x{h})")
        except Exception as e:
            print(f"  {num}: ERROR — {e}")