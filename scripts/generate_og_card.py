import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_og_card():
    WIDTH = 1200
    HEIGHT = 630
    
    # 1. Base obsidian canvas (#060606)
    img = Image.new("RGBA", (WIDTH, HEIGHT), (6, 6, 6, 255))
    draw = ImageDraw.Draw(img)
    
    # Dot matrix background
    dot_spacing = 28
    for x in range(14, WIDTH, dot_spacing):
        for y in range(14, HEIGHT, dot_spacing):
            draw.point((x, y), fill=(255, 255, 255, 20))

    # 2. Card Dimensions
    CARD_MARGIN_X = 65
    CARD_MARGIN_Y = 50
    CARD_W = WIDTH - 2 * CARD_MARGIN_X
    CARD_H = HEIGHT - 2 * CARD_MARGIN_Y
    card_box = [CARD_MARGIN_X, CARD_MARGIN_Y, CARD_MARGIN_X + CARD_W, CARD_MARGIN_Y + CARD_H]

    # 3. Top-Center Emerald Green Gradient Halo Bloom (Matching Project J.A.R.V.I.S. Card)
    halo_layer = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    halo_draw = ImageDraw.Draw(halo_layer)
    
    halo_cx = WIDTH // 2
    halo_cy = CARD_MARGIN_Y + 10
    
    # Multi-layered Gaussian bloom: deep emerald core + diffuse glow
    for r in range(360, 0, -10):
        t = 1 - (r / 360)
        alpha = int(120 * math.pow(t, 2.2))
        halo_draw.ellipse(
            [halo_cx - r * 1.6, halo_cy - r * 0.75, halo_cx + r * 1.6, halo_cy + r * 0.75],
            fill=(16, 185, 129, alpha) # #10B981
        )
    for r in range(180, 0, -8):
        t = 1 - (r / 180)
        alpha = int(90 * math.pow(t, 1.8))
        halo_draw.ellipse(
            [halo_cx - r * 1.2, halo_cy - r * 0.5, halo_cx + r * 1.2, halo_cy + r * 0.5],
            fill=(52, 211, 153, alpha) # #34D399 brighter mint
        )
    halo_layer = halo_layer.filter(ImageFilter.GaussianBlur(32))
    img = Image.alpha_composite(img, halo_layer)
    draw = ImageDraw.Draw(img)

    # 4. Silicon IC Card Body with subtle inner gradient
    card_layer = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    card_draw = ImageDraw.Draw(card_layer)
    
    # Base dark rounded card
    card_draw.rounded_rectangle(card_box, radius=22, fill=(10, 10, 16, 246), outline=(16, 185, 129, 130), width=2)

    # Internal top subtle emerald gradient sheen
    sheen_mask = Image.new("L", (WIDTH, HEIGHT), 0)
    sheen_draw = ImageDraw.Draw(sheen_mask)
    sheen_draw.rounded_rectangle(card_box, radius=22, fill=255)
    
    sheen_layer = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    sheen_s_draw = ImageDraw.Draw(sheen_layer)
    for y in range(CARD_MARGIN_Y, CARD_MARGIN_Y + 220):
        factor = 1.0 - ((y - CARD_MARGIN_Y) / 220.0)
        s_alpha = int(32 * math.pow(factor, 1.5))
        sheen_s_draw.line([(CARD_MARGIN_X, y), (CARD_MARGIN_X + CARD_W, y)], fill=(16, 185, 129, s_alpha))
        
    card_layer = Image.composite(sheen_layer, card_layer, sheen_mask)
    card_draw = ImageDraw.Draw(card_layer)
    
    # Card outer border glow
    card_draw.rounded_rectangle(card_box, radius=22, outline=(16, 185, 129, 140), width=2)

    # 5. Silicon Leadframe Contact Pins (Left & Right Edges)
    PIN_COUNT = 9
    pin_spacing = (CARD_H - 140) / (PIN_COUNT - 1)
    for pi in range(PIN_COUNT):
        py = CARD_MARGIN_Y + 70 + int(pi * pin_spacing)
        # Gold/Amber metallic pins on left
        card_draw.rounded_rectangle(
            [CARD_MARGIN_X - 10, py - 4, CARD_MARGIN_X + 2, py + 4],
            radius=2, fill=(245, 158, 11, 240)
        )
        card_draw.line([(CARD_MARGIN_X - 9, py), (CARD_MARGIN_X, py)], fill=(254, 240, 138, 255), width=1)
        
        # Gold/Amber metallic pins on right
        card_draw.rounded_rectangle(
            [CARD_MARGIN_X + CARD_W - 2, py - 4, CARD_MARGIN_X + CARD_W + 10, py + 4],
            radius=2, fill=(245, 158, 11, 240)
        )
        card_draw.line([(CARD_MARGIN_X + CARD_W, py), (CARD_MARGIN_X + CARD_W + 9, py)], fill=(254, 240, 138, 255), width=1)

    # 6. Background Circuit Trace Lines
    trace_col = (16, 185, 129, 25)
    node_col = (16, 185, 129, 80)
    
    # Top trace
    card_draw.line([(CARD_MARGIN_X + 45, CARD_MARGIN_Y + 115), (CARD_MARGIN_X + 175, CARD_MARGIN_Y + 115), (CARD_MARGIN_X + 225, CARD_MARGIN_Y + 165), (CARD_MARGIN_X + 390, CARD_MARGIN_Y + 165)], fill=trace_col, width=2)
    card_draw.ellipse([CARD_MARGIN_X + 388, CARD_MARGIN_Y + 163, CARD_MARGIN_X + 394, CARD_MARGIN_Y + 169], fill=node_col)

    # Bottom trace
    card_draw.line([(CARD_MARGIN_X + CARD_W - 45, CARD_MARGIN_Y + CARD_H - 125), (CARD_MARGIN_X + CARD_W - 195, CARD_MARGIN_Y + CARD_H - 125), (CARD_MARGIN_X + CARD_W - 245, CARD_MARGIN_Y + CARD_H - 175), (CARD_MARGIN_X + CARD_W - 420, CARD_MARGIN_Y + CARD_H - 175)], fill=trace_col, width=2)
    card_draw.ellipse([CARD_MARGIN_X + CARD_W - 422, CARD_MARGIN_Y + CARD_H - 177, CARD_MARGIN_X + CARD_W - 416, CARD_MARGIN_Y + CARD_H - 171], fill=node_col)

    img = Image.alpha_composite(img, card_layer)
    draw = ImageDraw.Draw(img)

    # 7. Exact Google Fonts (Syne + JetBrains Mono)
    syne_path = os.path.abspath(r"scripts\Syne.ttf")
    jb_path = os.path.abspath(r"scripts\JetBrainsMono.ttf")
    
    font_title = ImageFont.truetype(syne_path, 52)
    font_mono_hdr = ImageFont.truetype(jb_path, 18)
    font_mono_md = ImageFont.truetype(jb_path, 17)
    font_mono_sm = ImageFont.truetype(jb_path, 15)
    font_mono_term = ImageFont.truetype(jb_path, 15)
    font_subtitle = ImageFont.truetype(jb_path, 18)
    font_corner = ImageFont.truetype(jb_path, 20)
    font_badge = ImageFont.truetype(jb_path, 13)

    # 8. Exact Chip Corner Registration Marks
    draw.text((CARD_MARGIN_X + 16, CARD_MARGIN_Y + 10), "┌", fill=(100, 116, 139, 140), font=font_corner)
    draw.text((CARD_MARGIN_X + CARD_W - 32, CARD_MARGIN_Y + 10), "┐", fill=(100, 116, 139, 140), font=font_corner)
    draw.text((CARD_MARGIN_X + 16, CARD_MARGIN_Y + CARD_H - 34), "└", fill=(100, 116, 139, 140), font=font_corner)
    draw.text((CARD_MARGIN_X + CARD_W - 32, CARD_MARGIN_Y + CARD_H - 34), "┘", fill=(100, 116, 139, 140), font=font_corner)

    # 9. Header: Live LED + NODE_01 // ARCHITECT & TECH LEAD + TAG
    hdr_y = CARD_MARGIN_Y + 34
    # Pulsing emerald circle
    draw.ellipse([CARD_MARGIN_X + 50, hdr_y + 4, CARD_MARGIN_X + 64, hdr_y + 18], fill=(16, 185, 129, 255))
    draw.ellipse([CARD_MARGIN_X + 47, hdr_y + 1, CARD_MARGIN_X + 67, hdr_y + 21], outline=(16, 185, 129, 100), width=1)
    
    draw.text((CARD_MARGIN_X + 76, hdr_y), "NODE_01 // FULL-STACK & BACKEND ARCHITECT", fill=(16, 185, 129, 255), font=font_mono_hdr)
    
    right_tag = "TECH LEAD // 4+ YRS EXP"
    draw.text((CARD_MARGIN_X + CARD_W - 305, hdr_y), right_tag, fill=(16, 185, 129, 255), font=font_mono_hdr)

    # Subtle separator line
    draw.line([(CARD_MARGIN_X + 50, hdr_y + 30), (CARD_MARGIN_X + CARD_W - 50, hdr_y + 30)], fill=(255, 255, 255, 24), width=1)

    # 10. Main Typography
    title_y = hdr_y + 45
    draw.text((CARD_MARGIN_X + 50, title_y), "AMARJIT YADAV", fill=(255, 255, 255, 255), font=font_title)
    
    # Subtitle
    sub_y = title_y + 64
    draw.text((CARD_MARGIN_X + 50, sub_y), "Yadav Amarjit Vinod  •  Distributed Systems Engineer  •  Tech Lead", fill=(148, 163, 184, 255), font=font_subtitle)

    # 11. Emerald System Alert Terminal Box (Matching Image 2 Node 04)
    term_x = CARD_MARGIN_X + 50
    term_y = sub_y + 38
    term_w = CARD_W - 100
    term_h = 136
    
    draw.rounded_rectangle(
        [term_x, term_y, term_x + term_w, term_y + term_h],
        radius=10, fill=(7, 12, 10, 255), outline=(16, 185, 129, 90), width=1
    )
    
    # Terminal Top Strip
    draw.text((term_x + 18, term_y + 14), "[SYSTEM ALERT // PRODUCTION TELEMETRY]", fill=(16, 185, 129, 255), font=font_mono_md)
    draw.text((term_x + term_w - 240, term_y + 14), "SLA: 99.98% // ACTIVE NODES", fill=(16, 185, 129, 220), font=font_mono_md)
    
    draw.line([(term_x + 18, term_y + 38), (term_x + term_w - 18, term_y + 38)], fill=(16, 185, 129, 45), width=1)
    
    # Terminal Executable Trace Logs
    draw.text((term_x + 18, term_y + 50), "01  $ High-Concurrency Python/FastAPI Backends & Asynchronous Webhook Pipelines", fill=(241, 245, 249, 245), font=font_mono_term)
    draw.text((term_x + 18, term_y + 76), "02  $ Sub-Second Next.js Frontends • Real-Time State Engines • Partitioned Multi-Tenancy", fill=(110, 231, 183, 255), font=font_mono_term)
    draw.text((term_x + 18, term_y + 102), "03  $ Containerized Cloud Run CI/CD Clusters • Automated HMAC Security • Redis Queues", fill=(148, 163, 184, 230), font=font_mono_term)

    # 12. Tech Stack Badge Chips
    chips = ["PYTHON", "FASTAPI", "NEXT.JS", "TYPESCRIPT", "MONGODB", "DOCKER", "GCP", "SOCKET.IO", "REDIS"]
    chip_x = CARD_MARGIN_X + 50
    chip_y = term_y + term_h + 22
    
    for c in chips:
        bbox = font_badge.getbbox(c)
        c_w = bbox[2] - bbox[0] + 20
        c_h = 28
        draw.rounded_rectangle(
            [chip_x, chip_y, chip_x + c_w, chip_y + c_h],
            radius=6,
            fill=(18, 24, 22, 255),
            outline=(16, 185, 129, 90),
            width=1
        )
        draw.text((chip_x + 10, chip_y + 5), c, fill=(226, 232, 240, 255), font=font_badge)
        chip_x += c_w + 10

    # Live domain pill at bottom right
    domain_text = "yadavamarjit.vercel.app  ↗"
    draw.text((CARD_MARGIN_X + CARD_W - 275, chip_y + 5), domain_text, fill=(0, 240, 255, 255), font=font_mono_md)

    # 13. Save image to public directories
    os.makedirs(r"d:\portfolio-new\public", exist_ok=True)
    os.makedirs(r"d:\portfolio-new\public\assets", exist_ok=True)
    
    out_1 = r"d:\portfolio-new\public\og-card.png"
    out_2 = r"d:\portfolio-new\public\assets\og-card.png"
    
    img.save(out_1, "PNG", optimize=True)
    img.save(out_2, "PNG", optimize=True)
    print(f"Generated pixel-perfect OpenGraph Card at {out_1}")

if __name__ == "__main__":
    create_og_card()
