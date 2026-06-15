import os
import time
from selenium import webdriver
from selenium.webdriver.edge.options import Options
from selenium.webdriver.common.by import By
import img2pdf

def capture_slides():
    base_dir = r"d:\DRIVE (Ai) Agents\00 Projects\Workplace CSR Slides"
    output_pdf = r"C:\Users\hashm\Desktop\PhD_Thesis_Website_Slides.pdf"
    
    files = [
        "index.html",
        "chapter-01.html",
        "chapter-02.html",
        "chapter-03.html",
        "chapter-04.html",
        "chapter-05.html",
        "chapter-06.html",
        "chapter-07.html",
        "appendices.html",
        "bibliography.html",
        "academic-engagements.html"
    ]
    
    options = Options()
    options.add_argument('--headless')
    options.add_argument('--window-size=1920,1080')
    options.add_argument('--hide-scrollbars')
    options.add_argument('--disable-gpu')
    
    try:
        driver = webdriver.Edge(options=options)
    except Exception as e:
        print("Failed to start Edge webdriver:", e)
        try:
            from selenium.webdriver.chrome.options import Options as ChromeOptions
            chrome_options = ChromeOptions()
            chrome_options.add_argument('--headless')
            chrome_options.add_argument('--window-size=1920,1080')
            chrome_options.add_argument('--hide-scrollbars')
            driver = webdriver.Chrome(options=chrome_options)
        except Exception as e2:
            print("Failed to start Chrome webdriver:", e2)
            return False

    png_data_list = []
    
    try:
        for file_name in files:
            file_path = os.path.join(base_dir, file_name)
            if not os.path.exists(file_path):
                print(f"Skipping {file_name}")
                continue
                
            file_url = f"file:///{file_path.replace(chr(92), '/')}"
            print(f"Loading {file_url}")
            driver.get(file_url)
            
            # Wait a bit for animations and fonts to load
            time.sleep(1.5)
            
            # Force light mode and hide any overlay elements that might interfere
            driver.execute_script("document.documentElement.setAttribute('data-theme', 'light');")
            driver.execute_script("document.body.style.overflow = 'hidden';")
            
            # If there's a back button or nav, maybe hide it if it overlaps the slide? 
            # The slide container usually has the content.
            driver.execute_script("""
                const nav = document.querySelector('.chap-nav');
                if (nav) nav.style.display = 'none';
                const backBtn = document.querySelector('.back-btn');
                if (backBtn) backBtn.style.display = 'none';
            """)
            
            # Find all slides
            slides = driver.find_elements(By.CSS_SELECTOR, "section.slide")
            
            # To capture each slide, it might be better to scroll it into view, 
            # or hide other slides so it's alone on screen.
            driver.execute_script("""
                document.querySelectorAll('section.slide').forEach(s => s.style.display = 'none');
            """)
            
            for i in range(len(slides)):
                # Show only current slide
                driver.execute_script(f"""
                    document.querySelectorAll('section.slide')[{i}].style.display = 'flex';
                """)
                time.sleep(0.5)
                
                # capture the body viewport instead of just the element so we get the full 1920x1080 background
                png_bytes = driver.get_screenshot_as_png()
                png_data_list.append(png_bytes)
                
                # hide it again
                driver.execute_script(f"""
                    document.querySelectorAll('section.slide')[{i}].style.display = 'none';
                """)
                
    finally:
        driver.quit()
        
    if png_data_list:
        with open(output_pdf, "wb") as f:
            f.write(img2pdf.convert(png_data_list))
        print(f"Successfully saved {len(png_data_list)} slides to {output_pdf}")
        return True
    return False

if __name__ == '__main__':
    capture_slides()
